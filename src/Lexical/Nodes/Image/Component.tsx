import { mergeClasses } from "@fluentui/react-components";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { LexicalNestedComposer } from "@lexical/react/LexicalNestedComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import { mergeRegister } from "@lexical/utils";
import type { GridSelection, LexicalEditor, NodeKey, NodeSelection, RangeSelection } from "lexical";
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  $setSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  DRAGSTART_COMMAND,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND,
  SELECTION_CHANGE_COMMAND
} from "lexical";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { $isImageNode } from ".";
import { LinkPlugin } from '../../Plugins/LinkPlugin';
import { LexContentEditable } from "../../UI/ContentEditable";
import { ImageResizer } from "../../UI/ImageResizer";
import { Placeholder } from "../../UI/Placeholder";
import { useLexImageStyle } from "./Style";

const imageCache = new Set();

function useSuspenseImage(src: string) {
  if (!imageCache.has(src)) {
    throw new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.add(src);
        resolve(null);
      };
    });
  }
}

interface ILazyImage {
  altText: string;
  className: string | null;
  height: "inherit" | number;
  imageRef: { current: null | HTMLImageElement; };
  maxWidth: number;
  src: string;
  width: "inherit" | number;
}

function LazyImage({ altText, className, imageRef, src, width, height, maxWidth }: ILazyImage): JSX.Element {
  useSuspenseImage(src);
  return (
    <img
      className={className || undefined}
      src={src}
      alt={altText}
      ref={imageRef}
      style={{
        height,
        maxWidth,
        width,
      }}
      draggable="false"
    />
  );
}

interface IImageComponent {
  altText: string;
  caption: LexicalEditor;
  height: "inherit" | number;
  maxWidth: number;
  nodeKey: NodeKey;
  resizable: boolean;
  showCaption: boolean;
  src: string;
  width: "inherit" | number;
  captionsEnabled: boolean;
}

function ImageComponent({ src, altText, nodeKey, width, height, maxWidth, resizable, showCaption, caption, captionsEnabled }: IImageComponent): JSX.Element {
  const imageRef = useRef<HTMLImageElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [editor] = useLexicalComposerContext();
  const [selection, setSelection] = useState<RangeSelection | NodeSelection | GridSelection | null>(null);
  const activeEditorRef = useRef<LexicalEditor | null>(null);

  const onDelete = useCallback((payload: KeyboardEvent) => {
    if (isSelected && $isNodeSelection($getSelection())) {
      const event: KeyboardEvent = payload;
      event.preventDefault();
      const node = $getNodeByKey(nodeKey);
      if ($isImageNode(node))
        node.remove();

      setSelected(false);
    }
    return false;
  }, [isSelected, nodeKey, setSelected]);

  const onEnter = useCallback((event: KeyboardEvent) => {
    const latestSelection = $getSelection();
    const buttonElem = buttonRef.current;
    if (
      isSelected &&
      $isNodeSelection(latestSelection) &&
      latestSelection.getNodes().length === 1
    ) {
      if (showCaption) {
        // Move focus into nested editor
        $setSelection(null);
        event.preventDefault();
        caption.focus();
        return true;
      } else if (
        buttonElem !== null &&
        buttonElem !== document.activeElement
      ) {
        event.preventDefault();
        buttonElem.focus();
        return true;
      }
    }
    return false;
  }, [caption, isSelected, showCaption]);

  const onEscape = useCallback((event: KeyboardEvent) => {
    if (
      activeEditorRef.current === caption ||
      buttonRef.current === event.target
    ) {
      $setSelection(null);
      editor.update(() => {
        setSelected(true);
        const parentRootElement = editor.getRootElement();
        if (parentRootElement !== null)
          parentRootElement.focus();
      });
      return true;
    }
    return false;
  }, [caption, editor, setSelected]);

  useEffect(() => mergeRegister(
    editor.registerUpdateListener(({ editorState }) => {
      setSelection(editorState.read(() => $getSelection()));
    }),
    editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_, activeEditor) => {
        activeEditorRef.current = activeEditor;
        return false;
      },
      COMMAND_PRIORITY_LOW
    ),
    editor.registerCommand<MouseEvent>(
      CLICK_COMMAND,
      (payload) => {
        const event = payload;
        if (isResizing)
          return true;

        if (event.target === imageRef.current) {
          if (event.shiftKey)
            setSelected(!isSelected);
          else {
            clearSelection();
            setSelected(true);
          }
          return true;
        }

        return false;
      },
      COMMAND_PRIORITY_LOW
    ),
    editor.registerCommand(
      DRAGSTART_COMMAND,
      (event) => {
        if (event.target === imageRef.current) {
          // TODO This is just a temporary workaround for FF to behave like other browsers.
          // Ideally, this handles drag & drop too (and all browsers).
          event.preventDefault();
          return true;
        }
        return false;
      },
      COMMAND_PRIORITY_LOW,
    ),
    editor.registerCommand(
      KEY_DELETE_COMMAND,
      onDelete,
      COMMAND_PRIORITY_LOW
    ),
    editor.registerCommand(
      KEY_BACKSPACE_COMMAND,
      onDelete,
      COMMAND_PRIORITY_LOW
    ),
    editor.registerCommand(KEY_ENTER_COMMAND, onEnter, COMMAND_PRIORITY_LOW),
    editor.registerCommand(KEY_ESCAPE_COMMAND, onEscape, COMMAND_PRIORITY_LOW)
  ), [clearSelection, editor, isResizing, isSelected, nodeKey, onDelete, onEnter, onEscape, setSelected]);

  function setShowCaption() {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isImageNode(node))
        node.setShowCaption(true);
    });
  }

  function onResizeEnd(nextWidth: "inherit" | number, nextHeight: "inherit" | number) {
    // Delay hiding the resize bars for click case
    setTimeout(() => {
      setIsResizing(false);
    }, 200);

    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isImageNode(node))
        node.setWidthAndHeight(nextWidth, nextHeight);
    });
  }

  const draggable = isSelected && $isNodeSelection(selection) && !isResizing;
  const isFocused = isSelected || isResizing;
  const style = useLexImageStyle();

  return (
    <Suspense>
      <div draggable={draggable}>
        <LazyImage
          className={isFocused ? `focused ${$isNodeSelection(selection) ? "draggable" : ""}` : null}
          src={src}
          altText={altText}
          imageRef={imageRef}
          width={width}
          height={height}
          maxWidth={maxWidth}
        />
      </div>

      {showCaption && (
        <div className={mergeClasses("LexEditor_ImageCaption", style.caption)}>
          <LexicalNestedComposer initialEditor={caption}>
            <AutoFocusPlugin />
            <LinkPlugin />

            <RichTextPlugin
              contentEditable={<LexContentEditable className={style.content} />}
              placeholder={
                <Placeholder className={style.placeholder}>
                  Enter a caption...
                </Placeholder>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />

          </LexicalNestedComposer>
        </div>
      )}

      {resizable && $isNodeSelection(selection) && isFocused && (
        <ImageResizer
          showCaption={showCaption}
          setShowCaption={setShowCaption}
          editor={editor}
          buttonRef={buttonRef}
          imageRef={imageRef}
          maxWidth={maxWidth}
          onResizeStart={() => setIsResizing(true)}
          onResizeEnd={onResizeEnd}
          captionsEnabled={captionsEnabled}
        />
      )}
    </Suspense>
  );
}

/** @deprecated */
export default ImageComponent;
