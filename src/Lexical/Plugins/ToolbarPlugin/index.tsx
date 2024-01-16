import {
  Dialog,
  DialogSurface,
  DialogTrigger,
  makeStyles, Menu, MenuDivider, MenuItem, MenuList, MenuPopover, MenuTrigger, mergeClasses, tokens,
  Toolbar, ToolbarButton, ToolbarDivider, ToolbarToggleButton
} from "@fluentui/react-components";
import {
  AddRegular, ArrowRedoRegular, ArrowUndoRegular, ClearFormattingRegular, CodeRegular,
  ColorFillRegular,
  ImageRegular, LinkRegular, LocalLanguageRegular,
  SplitHorizontalRegular, TableRegular,
  TextAlignCenterRegular, TextAlignJustifyRegular, TextAlignLeftRegular,
  TextAlignRightRegular, TextBoldRegular, TextCollapseRegular, TextColorRegular,
  TextIndentDecreaseLtrRegular, TextIndentIncreaseLtrRegular, TextItalicRegular,
  TextStrikethroughRegular, TextSubscriptRegular, TextSuperscriptRegular, TextUnderlineRegular
} from "@fluentui/react-icons";
import { $isCodeNode, CODE_LANGUAGE_FRIENDLY_NAME_MAP, CODE_LANGUAGE_MAP, getLanguageFriendlyName } from "@lexical/code";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $isListNode, ListNode } from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isDecoratorBlockNode } from "@lexical/react/LexicalDecoratorBlockNode";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
import { $isHeadingNode } from "@lexical/rich-text";
import { $getSelectionStyleValueForProperty, $patchStyleText, $selectAll } from "@lexical/selection";
import { $findMatchingParent, $getNearestBlockElementAncestorOrThrow, $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import type { NodeKey } from "lexical";
import {
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  $isTextNode,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND
} from "lexical";
import { useCallback, useEffect, useState } from "react";
import { IS_APPLE } from "../../Utils/environment";
import { getSelectedNode } from "../../Utils/getSelectedNode";
import { sanitizeUrl } from "../../Utils/url";
import { INSERT_COLLAPSIBLE_COMMAND } from "../CollapsiblePlugin";
import { InsertImageDialog } from "../ImagesPlugin";
import { InsertTableDialog } from "../TablePlugin";
import { BlockFormat, BlockTypeToBlockName } from "./BlockFormat";
import { LexColorPicker } from "./ColorPopover";
import { FontDropDown } from "./Font";

const useStyles = makeStyles({
  box: {
    columnGap: "1px",
    backgroundColor: "#fff",
    borderTopLeftRadius: tokens.borderRadiusLarge,
    borderTopRightRadius: tokens.borderRadiusLarge
  }
});

const CODE_LANGUAGE_OPTIONS = ((): [string, string][] => {
  const options: [string, string][] = [];

  for (const [lang, friendlyName] of Object.entries(
    CODE_LANGUAGE_FRIENDLY_NAME_MAP
  ))
    options.push([lang, friendlyName]);

  return options;
})();

export function ToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [blockType, setBlockType] = useState<keyof typeof BlockTypeToBlockName>("paragraph");
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(null);
  const [fontSize, setFontSize] = useState<string>("15px");
  const [fontColor, setFontColor] = useState<string>("#000");
  const [bgColor, setBgColor] = useState<string>("#fff");
  const [fontFamily, setFontFamily] = useState<string>("Arial");
  const [isLink, setIsLink] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState<string>("");
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());
  const [checked, setChecked] = useState<string[]>([]);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element = anchorNode.getKey() === "root"
        ? anchorNode
        : $findMatchingParent(anchorNode, (e) => {
          const parent = e.getParent();
          return !!(parent) && $isRootOrShadowRoot(parent);
        });

      if (!element)
        element = anchorNode.getTopLevelElementOrThrow();

      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      // Update text format
      const checked = [];
      if (selection.hasFormat("bold")) checked.push("bold");
      if (selection.hasFormat("italic")) checked.push("italic");
      if (selection.hasFormat("underline")) checked.push("underline");
      if (selection.hasFormat("strikethrough")) checked.push("strikethrough");
      if (selection.hasFormat("subscript")) checked.push("subscript");
      if (selection.hasFormat("superscript")) checked.push("superscript");
      if (selection.hasFormat("code")) checked.push("code");

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();

      if ($isLinkNode(parent) || $isLinkNode(node)) {
        checked.push("link");
        setIsLink(true);
      }
      else
        setIsLink(false);

      setChecked(checked);

      if (elementDOM) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          );

          const type = parentList
            ? parentList.getListType()
            : element.getListType();

          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();

          if (type in BlockTypeToBlockName)
            setBlockType(type as keyof typeof BlockTypeToBlockName);

          if ($isCodeNode(element)) {
            const language = element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
            setCodeLanguage(language ? CODE_LANGUAGE_MAP[language] || language : "");
            return;
          }
        }
      }

      // Handle buttons
      setFontSize($getSelectionStyleValueForProperty(selection, "font-size", "15px"));
      setFontColor($getSelectionStyleValueForProperty(selection, "color", "#000"));
      setBgColor($getSelectionStyleValueForProperty(selection, "background-color", "#fff"));
      setFontFamily($getSelectionStyleValueForProperty(selection, "font-family", "Arial"));
    }
  }, [activeEditor]);

  useEffect(() => editor.registerCommand(
    SELECTION_CHANGE_COMMAND,
    (_payload, newEditor) => {
      updateToolbar();
      setActiveEditor(newEditor);
      return false;
    },
    COMMAND_PRIORITY_CRITICAL
  ), [editor, updateToolbar]);

  useEffect(() => mergeRegister(
    editor.registerEditableListener((editable) => setIsEditable(editable)),

    activeEditor.registerUpdateListener(({ editorState }) =>
      editorState.read(() => updateToolbar())),

    activeEditor.registerCommand<boolean>(
      CAN_UNDO_COMMAND,
      (payload) => {
        setCanUndo(payload);
        return false;
      }, COMMAND_PRIORITY_CRITICAL),

    activeEditor.registerCommand<boolean>(
      CAN_REDO_COMMAND,
      (payload) => {
        setCanRedo(payload);
        return false;
      }, COMMAND_PRIORITY_CRITICAL)
  ), [activeEditor, editor, updateToolbar]);

  const applyStyleText = useCallback((styles: Record<string, string>) => {
    activeEditor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection))
        $patchStyleText(selection, styles);
    });
  }, [activeEditor]);

  const clearFormatting = useCallback(() => {
    activeEditor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $selectAll(selection);
        selection.getNodes().forEach((node) => {
          if ($isTextNode(node)) {
            node.setFormat(0);
            node.setStyle("");
            $getNearestBlockElementAncestorOrThrow(node).setFormat("");
          }
          if ($isDecoratorBlockNode(node))
            node.setFormat("");
        });
      }
    });
  }, [activeEditor]);

  const onFontColorSelect = useCallback((value: string) =>
    applyStyleText({ color: value }), [applyStyleText]);

  const onBgColorSelect = useCallback((value: string) =>
    applyStyleText({ "background-color": value }), [applyStyleText]);

  const insertLink = useCallback(() => {
    if (!isLink)
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl("https://"));
    else
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
  }, [editor, isLink]);

  const onCodeLanguageSelect = useCallback(
    (value: string) => {
      activeEditor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(value);
          }
        }
      });
    },
    [activeEditor, selectedElementKey]
  );

  const style = useStyles();

  return (
    <Toolbar
      checkedValues={{ opts: checked }}
      className={mergeClasses("LexEditor_Toolbar", style.box)}
    >
      <ToolbarButton
        disabled={!canUndo || !isEditable}
        title={IS_APPLE ? "Undo (⌘Z)" : "Undo (Ctrl+Z)"}
        aria-label="Undo"
        icon={<ArrowUndoRegular />}
        onClick={() => activeEditor.dispatchCommand(UNDO_COMMAND, undefined)}
      />

      <ToolbarButton
        disabled={!canRedo || !isEditable}
        title={IS_APPLE ? "Redo (⌘Y)" : "Redo (Ctrl+Y)"}
        aria-label="Redo"
        icon={<ArrowRedoRegular />}
        onClick={() => activeEditor.dispatchCommand(REDO_COMMAND, undefined)}
      />

      <ToolbarDivider />

      {blockType in BlockTypeToBlockName && activeEditor === editor && <>
        <BlockFormat
          disabled={!isEditable}
          blockType={blockType}
          editor={editor}
        />
        <ToolbarDivider />
      </>}

      {blockType === "code" ? (
        <Menu>
          <MenuTrigger>
            <ToolbarButton
              disabled={!isEditable}
              title="Select language"
              aria-label="Select language"
              icon={<LocalLanguageRegular />}
              children={getLanguageFriendlyName(codeLanguage)}
            />
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              {CODE_LANGUAGE_OPTIONS.map(([value, name], i) =>
                <MenuItem key={i} onClick={() => onCodeLanguageSelect(value)} children={name} />)}
            </MenuList>
          </MenuPopover>
        </Menu>
      ) : (
        <>
          <FontDropDown
            disabled={!isEditable}
            style={"font-family"}
            value={fontFamily}
            editor={editor}
          />

          <FontDropDown
            disabled={!isEditable}
            style={"font-size"}
            value={fontSize}
            editor={editor}
          />

          <ToolbarDivider />

          <ToolbarToggleButton
            name="opts"
            value="bold"
            appearance="subtle"
            disabled={!isEditable}
            title={IS_APPLE ? "Bold (⌘B)" : "Bold (Ctrl+B)"}
            aria-label={`Format text as bold. Shortcut: ${IS_APPLE ? "⌘B" : "Ctrl+B"}`}
            icon={<TextBoldRegular />}
            onClick={() => activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
          />

          <ToolbarToggleButton
            name="opts"
            value="italic"
            appearance="subtle"
            disabled={!isEditable}
            title={IS_APPLE ? "Italic (⌘I)" : "Italic (Ctrl+I)"}
            aria-label={`Format text as italics. Shortcut: ${IS_APPLE ? "⌘I" : "Ctrl+I"}`}
            icon={<TextItalicRegular />}
            onClick={() => activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
          />

          <ToolbarToggleButton
            name="opts"
            value="underline"
            appearance="subtle"
            disabled={!isEditable}
            title={IS_APPLE ? "Underline (⌘U)" : "Underline (Ctrl+U)"}
            aria-label={`Format text to underlined. Shortcut: ${IS_APPLE ? "⌘U" : "Ctrl+U"}`}
            icon={<TextUnderlineRegular />}
            onClick={() => activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
          />

          <ToolbarToggleButton
            name="opts"
            value="strikethrough"
            appearance="subtle"
            disabled={!isEditable}
            title="Strikethrough"
            aria-label="Format text with a strikethrough"
            icon={<TextStrikethroughRegular />}
            onClick={() => activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")}
          />

          <ToolbarToggleButton
            name="opts"
            value="subscript"
            appearance="subtle"
            disabled={!isEditable}
            title="Subscript"
            aria-label="Format text with a subscript"
            icon={<TextSubscriptRegular />}
            onClick={() => activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript")}
          />

          <ToolbarToggleButton
            name="opts"
            value="superscript"
            appearance="subtle"
            disabled={!isEditable}
            title="Superscript"
            aria-label="Format text with a superscript"
            icon={<TextSuperscriptRegular />}
            onClick={() => activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript")}
          />

          <ToolbarToggleButton
            name="opts"
            value="code"
            appearance="subtle"
            disabled={!isEditable}
            title="Insert code block"
            aria-label="Insert code block"
            icon={<CodeRegular />}
            onClick={() => activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
          />

          <ToolbarToggleButton
            name="opts"
            value="link"
            appearance="subtle"
            disabled={!isEditable}
            title="Insert link"
            aria-label="Insert link"
            icon={<LinkRegular />}
            onClick={insertLink}
          />

          <LexColorPicker
            disabled={!isEditable}
            ariaLabel="Formatting text color"
            color={fontColor}
            icon={<TextColorRegular />}
            onChange={onFontColorSelect}
          />

          <LexColorPicker
            disabled={!isEditable}
            ariaLabel="Formatting background color"
            color={bgColor}
            icon={<ColorFillRegular />}
            onChange={onBgColorSelect}
          />

          <ToolbarButton
            disabled={!isEditable}
            title="Clear text formatting"
            aria-label="Clear all text formatting"
            icon={<ClearFormattingRegular />}
            onClick={clearFormatting}
          />

          <ToolbarDivider />

          <Menu>
            <MenuTrigger>
              <ToolbarButton
                disabled={!isEditable}
                title="Insert"
                aria-label="Insert specialized editor node"
                icon={<AddRegular />}
              >
                Insert
              </ToolbarButton>
            </MenuTrigger>

            <MenuPopover>
              <MenuList>
                <MenuItem
                  icon={<SplitHorizontalRegular />}
                  onClick={() => activeEditor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)}
                >
                  Horizontal Rule
                </MenuItem>

                <Dialog>
                  <DialogTrigger disableButtonEnhancement>
                    <MenuItem icon={<ImageRegular />}>
                      Image
                    </MenuItem>
                  </DialogTrigger>

                  <DialogSurface>
                    <InsertImageDialog editor={activeEditor} />
                  </DialogSurface>
                </Dialog>

                <Dialog>
                  <DialogTrigger disableButtonEnhancement>
                    <MenuItem icon={<TableRegular />}>
                      Table
                    </MenuItem>
                  </DialogTrigger>

                  <DialogSurface>
                    <InsertTableDialog editor={activeEditor} />
                  </DialogSurface>
                </Dialog>

                <MenuItem
                  icon={<TextCollapseRegular />}
                  onClick={() => editor.dispatchCommand(INSERT_COLLAPSIBLE_COMMAND, undefined)}
                >
                  Collapsible
                </MenuItem>

              </MenuList>
            </MenuPopover>
          </Menu>
        </>
      )}

      <ToolbarDivider />

      <Menu>
        <MenuTrigger>
          <ToolbarButton
            disabled={!isEditable}
            title="Align"
            aria-label="Formatting options for text alignment"
            icon={<TextAlignLeftRegular />}
          >
            Align
          </ToolbarButton>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem
              icon={<TextAlignLeftRegular />}
              onClick={() => activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
            >
              Left Align
            </MenuItem>

            <MenuItem
              icon={<TextAlignCenterRegular />}
              onClick={() => activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
            >
              Center Align
            </MenuItem>

            <MenuItem
              icon={<TextAlignRightRegular />}
              onClick={() => activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}
            >
              Right Align
            </MenuItem>

            <MenuItem
              icon={<TextAlignJustifyRegular />}
              onClick={() => activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")}
            >
              Justify Align
            </MenuItem>

            <MenuDivider />

            <MenuItem
              icon={<TextIndentIncreaseLtrRegular />}
              onClick={() => activeEditor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)}
            >
              Outdent
            </MenuItem>

            <MenuItem
              icon={<TextIndentDecreaseLtrRegular />}
              onClick={() => activeEditor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)}
            >
              Indent
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </Toolbar>
  );
}
