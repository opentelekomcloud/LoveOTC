import { Button, DialogActions, DialogBody, DialogContent, DialogTitle, DialogTrigger, Field, Input } from "@fluentui/react-components";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $createRangeSelection,
  $getSelection,
  $insertNodes,
  $isNodeSelection,
  $isRootOrShadowRoot,
  $setSelection,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  DRAGOVER_COMMAND,
  DRAGSTART_COMMAND,
  DROP_COMMAND,
  LexicalCommand,
  LexicalEditor,
  createCommand
} from "lexical";
import { useEffect, useState } from "react";
import {
  $createImageNode,
  $isImageNode,
  ImageNode,
  ImagePayload
} from "../../Nodes/Image";

export type InsertImagePayload = Readonly<ImagePayload>;

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
  createCommand("INSERT_IMAGE_COMMAND");

export function InsertImageDialog({ editor }: { editor: LexicalEditor }): JSX.Element {
  const [src, setSrc] = useState("https://source.unsplash.com/random");
  const [altText, setAltText] = useState("LoveOTC!");

  return (
    <DialogBody>
      <DialogTitle>
        Insert Image
      </DialogTitle>

      <DialogContent>
        <Field label="Source" required>
          <Input placeholder={src} onChange={(_, v) => setSrc(v.value || "")} />
        </Field>

        <Field label="Alt Text" required>
          <Input placeholder={altText} onChange={(_, v) => setAltText(v.value || "")} />
        </Field>
      </DialogContent>

      <DialogActions>
        <DialogTrigger disableButtonEnhancement>
          <Button onClick={() => {
            editor.dispatchCommand(INSERT_IMAGE_COMMAND, { altText, src });
          }}>
            Confirm
          </Button>
        </DialogTrigger>
      </DialogActions>
    </DialogBody>
  );
}

export function ImagesPlugin({ captionsEnabled }: { captionsEnabled?: boolean; }): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode]))
      throw new Error("ImagesPlugin: ImageNode not registered on editor");

    return mergeRegister(
      editor.registerCommand<InsertImagePayload>(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload);
          $insertNodes([imageNode]);
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
          }

          return true;
        },
        COMMAND_PRIORITY_EDITOR
      ),
      editor.registerCommand<DragEvent>(
        DRAGSTART_COMMAND,
        (event) => onDragStart(event),
        COMMAND_PRIORITY_HIGH
      ),
      editor.registerCommand<DragEvent>(
        DRAGOVER_COMMAND,
        (event) => onDragover(event),
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<DragEvent>(
        DROP_COMMAND,
        (event) => onDrop(event, editor),
        COMMAND_PRIORITY_HIGH
      )
    );
  }, [captionsEnabled, editor]);

  return null;
}

const TRANSPARENT_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const img = document.createElement("img");
img.src = TRANSPARENT_IMAGE;

function onDragStart(event: DragEvent): boolean {
  const node = getImageNodeInSelection();
  if (!node)
    return false;

  const dataTransfer = event.dataTransfer;
  if (!dataTransfer)
    return false;

  dataTransfer.setData("text/plain", "_");
  dataTransfer.setDragImage(img, 0, 0);
  dataTransfer.setData(
    "application/x-lexical-drag",
    JSON.stringify({
      data: {
        altText: node.altText,
        caption: node.caption,
        height: node.height,
        key: node.getKey(),
        maxWidth: node.maxWidth,
        showCaption: node.showCaption,
        src: node.src,
        width: node.width,
      },
      type: "image",
    })
  );

  return true;
}

function onDragover(event: DragEvent): boolean {
  const node = getImageNodeInSelection();
  if (!node)
    return false;

  if (!canDropImage(event))
    event.preventDefault();

  return true;
}

function onDrop(event: DragEvent, editor: LexicalEditor): boolean {
  const node = getImageNodeInSelection();
  if (!node)
    return false;

  const data = getDragImageData(event);
  if (!data)
    return false;

  event.preventDefault();

  if (canDropImage(event)) {
    const range = getDragSelection(event);
    node.remove();
    const rangeSelection = $createRangeSelection();
    if (range)
      rangeSelection.applyDOMRange(range);

    $setSelection(rangeSelection);
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, data);
  }

  return true;
}

function getImageNodeInSelection(): ImageNode | null {
  const selection = $getSelection();
  if (!$isNodeSelection(selection))
    return null;

  const nodes = selection.getNodes();
  const node = nodes[0];
  return $isImageNode(node) ? node : null;
}

function getDragImageData(event: DragEvent): null | InsertImagePayload {
  const dragData = event.dataTransfer?.getData("application/x-lexical-drag");
  if (!dragData)
    return null;

  const { type, data } = JSON.parse(dragData);
  if (type !== "image")
    return null;

  return data;
}

declare global {
  interface DragEvent {
    rangeOffset?: number;
    rangeParent?: Node;
  }
}

function canDropImage(event: DragEvent): boolean {
  const target = event.target;
  return !!(
    target &&
    target instanceof HTMLElement &&
    !target.closest("code, span.LexEditor_Image") &&
    target.parentElement &&
    target.parentElement.closest("div.LexEditor_Content")
  );
}

function getDragSelection(event: DragEvent): Range | null | undefined {
  let range;
  const domSelection = window.getSelection();

  if (document.caretRangeFromPoint)
    range = document.caretRangeFromPoint(event.clientX, event.clientY);
  else if (event.rangeParent && domSelection) {
    domSelection.collapse(event.rangeParent, event.rangeOffset || 0);
    range = domSelection.getRangeAt(0);
  } else
    throw Error(`Cannot get the selection when dragging`);

  return range;
}
