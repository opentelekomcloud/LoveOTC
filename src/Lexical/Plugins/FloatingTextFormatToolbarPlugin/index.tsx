import { makeStyles, Portal, shorthands, Toolbar, ToolbarToggleButton } from "@fluentui/react-components";
import {
  CodeRegular, LinkRegular, TextBoldRegular, TextItalicRegular, TextStrikethroughRegular,
  TextSubscriptRegular, TextSuperscriptRegular, TextUnderlineRegular
} from "@fluentui/react-icons";
import { $isCodeHighlightNode } from "@lexical/code";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import { BaseCard } from "~/Helpers/Styles";
import { getDOMRangeRect } from "../../Utils/getDOMRangeRect";
import { getSelectedNode } from "../../Utils/getSelectedNode";
import { setFloatingElemPosition } from "../../Utils/setFloatingElemPosition";

interface ITextFormatFloatingToolbar {
  editor: LexicalEditor;
  anchor: HTMLElement;
  isBold: boolean;
  isCode: boolean;
  isItalic: boolean;
  isLink: boolean;
  isStrikethrough: boolean;
  isSubscript: boolean;
  isSuperscript: boolean;
  isUnderline: boolean;
}

function TextFormatFloatingToolbar({
  editor,
  anchor,
  isLink,
  isBold,
  isItalic,
  isUnderline,
  isCode,
  isStrikethrough,
  isSubscript,
  isSuperscript,
}: ITextFormatFloatingToolbar): JSX.Element {
  const popupCharStylesEditorRef = useRef<HTMLDivElement>(null);

  const insertLink = useCallback(() => {
    if (!isLink)
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
    else
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
  }, [editor, isLink]);

  const updateTextFormatFloatingToolbar = useCallback(() => {
    const selection = $getSelection();

    const popupCharStylesEditorElem = popupCharStylesEditorRef.current;
    const nativeSelection = window.getSelection();

    if (!popupCharStylesEditorElem)
      return;

    const rootElement = editor.getRootElement();

    if (
      selection &&
      nativeSelection &&
      !nativeSelection.isCollapsed &&
      rootElement &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const rangeRect = getDOMRangeRect(nativeSelection, rootElement);
      setFloatingElemPosition(rangeRect, popupCharStylesEditorElem, anchor);
    }
  }, [editor, anchor]);

  useEffect(() => {
    const scrollerElem = anchor.parentElement;

    function update() {
      editor.getEditorState().read(() => updateTextFormatFloatingToolbar());
    }

    window.addEventListener("resize", update);
    if (scrollerElem)
      scrollerElem.addEventListener("scroll", update);

    return () => {
      window.removeEventListener("resize", update);
      if (scrollerElem)
        scrollerElem.removeEventListener("scroll", update);
    };
  }, [editor, updateTextFormatFloatingToolbar, anchor]);

  useEffect(() => {
    editor.getEditorState().read(() => updateTextFormatFloatingToolbar());

    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) =>
        editorState.read(() => updateTextFormatFloatingToolbar())),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateTextFormatFloatingToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor, updateTextFormatFloatingToolbar]);

  const checked = [
    isBold && "bold",
    isItalic && "italic",
    isUnderline && "underline",
    isCode && "code",
    isStrikethrough && "strikethrough",
    isSubscript && "subscript",
    isSuperscript && "superscript",
    isLink && "link"
  ] as string[];

  const style = useStyle();

  return (
    <Toolbar
      ref={popupCharStylesEditorRef}
      className={style.toolbar}
      style={{ transition: "opacity 0.5s" }}
      checkedValues={{ opts: checked }}
    >
      <ToolbarToggleButton
        name="opts"
        value="bold"
        appearance="subtle"
        aria-label="Format text as bold"
        icon={<TextBoldRegular />}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
      />

      <ToolbarToggleButton
        name="opts"
        value="italic"
        appearance="subtle"
        aria-label="Format text as italics"
        icon={<TextItalicRegular />}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
      />

      <ToolbarToggleButton
        name="opts"
        value="underline"
        appearance="subtle"
        aria-label="Format text to underlined"
        icon={<TextUnderlineRegular />}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
      />

      <ToolbarToggleButton
        name="opts"
        value="strikethrough"
        appearance="subtle"
        aria-label="Format text with a strikethrough"
        icon={<TextStrikethroughRegular />}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")}
      />

      <ToolbarToggleButton
        name="opts"
        value="subscript"
        appearance="subtle"
        aria-label="Format Subscript"
        icon={<TextSubscriptRegular />}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript")}
      />

      <ToolbarToggleButton
        name="opts"
        value="superscript"
        appearance="subtle"
        aria-label="Format Superscript"
        icon={<TextSuperscriptRegular />}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript")}
      />

      <ToolbarToggleButton
        name="opts"
        value="code"
        appearance="subtle"
        aria-label="Insert code block"
        icon={<CodeRegular />}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
      />

      <ToolbarToggleButton
        name="opts"
        value="link"
        appearance="subtle"
        aria-label="Insert link"
        icon={<LinkRegular />}
        onClick={insertLink}
      />
    </Toolbar>
  );
}

const useStyle = makeStyles({
  toolbar: {
    ...BaseCard,
    ...shorthands.padding("4px"),
    verticalAlign: "middle",
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0,
    height: "35px",
    willChange: "transform"
  }
});

function FloatingTextFormatToolbar({ editor, anchor }: { editor: LexicalEditor; anchor: HTMLElement; }): JSX.Element | null {
  const [isText, setIsText] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const updatePopup = useCallback(() => {
    editor.getEditorState().read(() => {
      // Should not to pop up the floating toolbar when using IME input
      if (editor.isComposing())
        return;

      const selection = $getSelection();
      const nativeSelection = window.getSelection();
      const rootElement = editor.getRootElement();

      if (
        nativeSelection &&
        (!$isRangeSelection(selection) ||
          !rootElement ||
          !rootElement.contains(nativeSelection.anchorNode))
      ) {
        setIsText(false);
        return;
      }

      if (!$isRangeSelection(selection))
        return;

      const node = getSelectedNode(selection);

      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsSubscript(selection.hasFormat("subscript"));
      setIsSuperscript(selection.hasFormat("superscript"));
      setIsCode(selection.hasFormat("code"));

      // Update links
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node))
        setIsLink(true);
      else
        setIsLink(false);

      if (
        !$isCodeHighlightNode(selection.anchor.getNode()) &&
        selection.getTextContent()
      )
        setIsText($isTextNode(node));
      else
        setIsText(false);
    });
  }, [editor]);

  useEffect(() => {
    document.addEventListener("selectionchange", updatePopup);
    return () => document.removeEventListener("selectionchange", updatePopup);
  }, [updatePopup]);

  useEffect(() => mergeRegister(
    editor.registerUpdateListener(() => updatePopup()),
    editor.registerRootListener(() => {
      if (!editor.getRootElement())
        setIsText(false);
    })
  ), [editor, updatePopup]);

  if (!isText || isLink)
    return null;

  return (
    <Portal mountNode={anchor}>
      <TextFormatFloatingToolbar
        editor={editor}
        anchor={anchor}
        isLink={isLink}
        isBold={isBold}
        isItalic={isItalic}
        isStrikethrough={isStrikethrough}
        isSubscript={isSubscript}
        isSuperscript={isSuperscript}
        isUnderline={isUnderline}
        isCode={isCode}
      />
    </Portal>
  );
}

export function FloatingTextFormatToolbarPlugin({ anchor = document.body }: { anchor?: HTMLElement; }): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  return <FloatingTextFormatToolbar {...{ editor, anchor }} />;
}
