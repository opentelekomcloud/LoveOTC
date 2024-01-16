import { Button, Input, Link, Portal, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { EditFilled } from "@fluentui/react-icons";
import { $isAutoLinkNode, $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $findMatchingParent, mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  GridSelection,
  KEY_ESCAPE_COMMAND,
  LexicalEditor,
  NodeSelection,
  RangeSelection,
  SELECTION_CHANGE_COMMAND
} from "lexical";
import { Dispatch, useCallback, useEffect, useRef, useState } from "react";
import { BaseCard, Col, Flex } from "~/Helpers/Styles";
import { getSelectedNode } from "../Utils/getSelectedNode";
import { setFloatingElemPosition } from "../Utils/setFloatingElemPosition";
import { sanitizeUrl } from "../Utils/url";

interface IFloatingLinkEditor {
  editor: LexicalEditor;
  isLink: boolean;
  setIsLink: Dispatch<boolean>;
  anchor: HTMLElement;
}

function FloatingLinkEditor({ editor, isLink, setIsLink, anchor }: IFloatingLinkEditor): JSX.Element {
  const editorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [linkUrl, setLinkUrl] = useState("");
  const [isEditMode, setEditMode] = useState(false);
  const [lastSelection, setLastSelection] = useState<RangeSelection | GridSelection | NodeSelection>();

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent))
        setLinkUrl(parent.getURL());
      else if ($isLinkNode(node))
        setLinkUrl(node.getURL());
      else
        setLinkUrl("");
    }

    const editorElem = editorRef.current;
    const nativeSelection = window.getSelection();
    const activeElement = document.activeElement;

    if (!editorElem)
      return;

    const rootElement = editor.getRootElement();

    if (
      selection &&
      nativeSelection &&
      rootElement &&
      rootElement.contains(nativeSelection.anchorNode) &&
      editor.isEditable()
    ) {
      const domRange = nativeSelection.getRangeAt(0);
      let rect;

      if (nativeSelection.anchorNode === rootElement) {
        let inner = rootElement;

        while (inner.firstElementChild)
          inner = inner.firstElementChild as HTMLElement;

        rect = inner.getBoundingClientRect();
      } else
        rect = domRange.getBoundingClientRect();

      setFloatingElemPosition(rect, editorElem, anchor);
      setLastSelection(selection);

    } else if (!activeElement || activeElement.className !== "link-input") {
      if (rootElement)
        setFloatingElemPosition(null, editorElem, anchor);

      setLastSelection(undefined);
      setEditMode(false);
      setLinkUrl("");
    }

    return true;
  }, [anchor, editor]);

  useEffect(() => {
    const scrollerElem = anchor.parentElement;

    function update() {
      editor.getEditorState().read(() => updateLinkEditor());
    }

    window.addEventListener("resize", update);

    if (scrollerElem)
      scrollerElem.addEventListener("scroll", update);

    return () => {
      window.removeEventListener("resize", update);

      if (scrollerElem) {
        scrollerElem.removeEventListener("scroll", update);
      }
    };
  }, [anchor.parentElement, editor, updateLinkEditor]);

  useEffect(() => mergeRegister(
    editor.registerUpdateListener(({ editorState }) => editorState.read(() => updateLinkEditor())),

    editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateLinkEditor();
        return true;
      },
      COMMAND_PRIORITY_LOW
    ),

    editor.registerCommand(
      KEY_ESCAPE_COMMAND,
      () => {
        if (isLink) {
          setIsLink(false);
          return true;
        }
        return false;
      },
      COMMAND_PRIORITY_HIGH
    )
  ), [editor, updateLinkEditor, setIsLink, isLink]);

  useEffect(() => {
    editor.getEditorState().read(() => updateLinkEditor());
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (isEditMode && inputRef.current)
      inputRef.current.focus();
  }, [isEditMode]);

  const style = useStyles();

  return (
    <div ref={editorRef} style={{ transition: "opacity 0.5s" }} className={style.editor}>
      {isEditMode ? (
        <Input
          ref={inputRef}
          className={style.input}
          value={linkUrl}
          onChange={(_, v) => setLinkUrl(v.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              if (lastSelection) {
                if (linkUrl)
                  editor.dispatchCommand(
                    TOGGLE_LINK_COMMAND,
                    sanitizeUrl(linkUrl)
                  );

                setEditMode(false);
              }
            } else if (event.key === "Escape") {
              event.preventDefault();
              setEditMode(false);
            }
          }}
        />
      ) : (
        <div className={style.link}>
          <Link href={linkUrl} target="_blank" rel="noopener noreferrer" className={style.a}>
            {linkUrl}
          </Link>
          <Button appearance="subtle" icon={<EditFilled />} onClick={() => setEditMode(true)} />
        </div>
      )}
    </div>
  );
}

const box = {
  ...shorthands.margin("8px", "10px"),
  ...shorthands.padding("4px", "12px"),
}

const useStyles = makeStyles({
  editor: {
    ...BaseCard,
    ...Col,
    position: "absolute",
    top: 0,
    left: 0,
    maxWidth: "400px",
    width: "100%",
    opacity: 0,
    willChange: "transform",
  },
  a: {
    whiteSpace: "nowrap",
    ...shorthands.overflow("hidden"),
    textOverflow: "ellipsis"
  },
  link: {
    ...Flex,
    justifyContent: "space-between",
    alignItems: "center",
    width: "calc(100% - 20px)",
    boxSizing: "border-box",
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: "#eee",
    position: "relative",
    ...box,
  },
  input: box
});

function FloatingLinkEditorToolbar({ editor, anchor }: { editor: LexicalEditor; anchor: HTMLElement; }): JSX.Element | null {
  const [activeEditor, setActiveEditor] = useState(editor);
  const [isLink, setIsLink] = useState(false);

  useEffect(() => editor.registerCommand(
    SELECTION_CHANGE_COMMAND,
    (_, newEditor) => {
      // updateToolbar
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        const node = getSelectedNode(selection);
        const linkParent = $findMatchingParent(node, $isLinkNode);
        const autoLinkParent = $findMatchingParent(node, $isAutoLinkNode);

        // We don't want this menu to open for auto links.
        if (linkParent && !autoLinkParent)
          setIsLink(true);
        else
          setIsLink(false);
      }

      setActiveEditor(newEditor);
      return false;
    },
    COMMAND_PRIORITY_CRITICAL
  ), [editor]);

  return (isLink &&
    <Portal mountNode={anchor}>
      <FloatingLinkEditor
        editor={activeEditor}
        isLink={isLink}
        anchor={anchor}
        setIsLink={setIsLink}
      />
    </Portal>
  ) as JSX.Element;
}

export function FloatingLinkEditorPlugin({ anchor = document.body, }: { anchor?: HTMLElement; }): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  return <FloatingLinkEditorToolbar {...{ editor, anchor }} />;
}
