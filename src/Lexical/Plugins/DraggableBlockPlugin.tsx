import { makeStyles, mergeClasses, Portal, shorthands } from "@fluentui/react-components";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { eventFiles } from "@lexical/rich-text";
import { mergeRegister } from "@lexical/utils";
import {
  $getNearestNodeFromDOMNode,
  $getNodeByKey,
  $getRoot,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  DRAGOVER_COMMAND,
  DROP_COMMAND,
  LexicalEditor
} from "lexical";
import {
  DragEvent as ReactDragEvent,
  useEffect,
  useRef,
  useState
} from "react";
import { isHTMLElement } from "../Utils/guard";
import { Point } from "../Utils/point";
import { Rect } from "../Utils/rect";

let prevIndex = Infinity;

function getCurrentIndex(keysLength: number): number {
  if (keysLength === 0)
    return Infinity;

  if (prevIndex >= 0 && prevIndex < keysLength)
    return prevIndex;

  return Math.floor(keysLength / 2);
}

function getTopLevelNodeKeys(editor: LexicalEditor): string[] {
  return editor.getEditorState().read(() => $getRoot().getChildrenKeys());
}

const Indeterminate = 0;

function getBlockElement(anchor: HTMLElement, editor: LexicalEditor, event: MouseEvent): HTMLElement | null {
  const anchorElementRect = anchor.getBoundingClientRect();
  const topLevelNodeKeys = getTopLevelNodeKeys(editor);

  let blockElem: HTMLElement | null = null;

  editor.getEditorState().read(() => {
    let index = getCurrentIndex(topLevelNodeKeys.length);
    let direction = Indeterminate;

    while (index >= 0 && index < topLevelNodeKeys.length) {
      const key = topLevelNodeKeys[index];
      const elem = editor.getElementByKey(key);
      if (!elem)
        break;

      const point = new Point(event.x, event.y);
      const domRect = Rect.fromDOM(elem);
      const { marginTop, marginBottom } = window.getComputedStyle(elem);

      const rect = domRect.generateNewRect({
        bottom: domRect.bottom + parseFloat(marginBottom),
        left: anchorElementRect.left,
        right: anchorElementRect.right,
        top: domRect.top - parseFloat(marginTop),
      });

      const {
        result,
        reason: { isOnTopSide, isOnBottomSide },
      } = rect.contains(point);

      if (result) {
        blockElem = elem;
        prevIndex = index;
        break;
      }

      if (direction === Indeterminate)
        if (isOnTopSide)
          direction = -1 // Upward;
        else if (isOnBottomSide)
          direction = 1 // Downward;
        else
          // stop search block element
          direction = Infinity;

      index += direction;
    }
  });

  return blockElem;
}

function isOnMenu(element: HTMLElement): boolean {
  return !!element.closest(".LexEditor_Draggable");
}

const Space = 4;

function setMenuPosition(target: HTMLElement | null, floating: HTMLElement, anchor: HTMLElement) {
  if (!target) {
    floating.style.opacity = "0";
    floating.style.transform = "translate(-10000px, -10000px)";
    return;
  }

  const targetRect = target.getBoundingClientRect();
  const targetStyle = window.getComputedStyle(target);
  const floatingElemRect = floating.getBoundingClientRect();
  const anchorElementRect = anchor.getBoundingClientRect();

  const top =
    targetRect.top +
    (parseInt(targetStyle.lineHeight, 10) - floatingElemRect.height) / 2 -
    anchorElementRect.top;

  floating.style.opacity = "1";
  floating.style.transform = `translate(${Space}px, ${top}px)`; // left
}

function setDragImage(dataTransfer: DataTransfer, draggableBlockElem: HTMLElement) {
  const { transform } = draggableBlockElem.style;

  // Remove dragImage borders
  draggableBlockElem.style.transform = "translateZ(0)";
  dataTransfer.setDragImage(draggableBlockElem, 0, 0);

  setTimeout(() => draggableBlockElem.style.transform = transform);
}

const TextBoxHorizontalPadding = 28;

function setTargetLine(targetLine: HTMLElement, targetBlock: HTMLElement, mouseY: number, anchor: HTMLElement) {
  const targetStyle = window.getComputedStyle(targetBlock);
  const { top: targetBlockElemTop, height: targetBlockElemHeight } = targetBlock.getBoundingClientRect();
  const { top: anchorTop, width: anchorWidth } = anchor.getBoundingClientRect();

  let lineTop = targetBlockElemTop;
  // At the bottom of the target
  if (mouseY - targetBlockElemTop > targetBlockElemHeight / 2)
    lineTop += targetBlockElemHeight + parseFloat(targetStyle.marginBottom);
  else
    lineTop -= parseFloat(targetStyle.marginTop);

  const top = lineTop - anchorTop - 2; // TARGET_LINE_HALF_HEIGHT
  const left = TextBoxHorizontalPadding - Space;

  targetLine.style.transform = `translate(${left}px, ${top}px)`;
  targetLine.style.width = `${anchorWidth - (TextBoxHorizontalPadding - Space) * 2}px`;
  targetLine.style.opacity = ".4";
}

function hideTargetLine(targetLineElem: HTMLElement | null) {
  if (targetLineElem) {
    targetLineElem.style.opacity = "0";
    targetLineElem.style.transform = "translate(-10000px, -10000px)";
  }
}

const DragDataFormat = "application/x-lexical-drag-block";

function DraggableBlockMenu({ editor, anchor }: { editor: LexicalEditor; anchor: HTMLElement; }): JSX.Element {
  const scrollerElem = anchor.parentElement;

  const menuRef = useRef<HTMLDivElement>(null);
  const targetLineRef = useRef<HTMLDivElement>(null);
  const [draggableBlock, setDraggableBlock] = useState<HTMLElement | null>(null);

  useEffect(() => {
    function onMouseMove(event: MouseEvent) {
      const target = event.target;
      if (!isHTMLElement(target)) {
        setDraggableBlock(null);
        return;
      }

      if (isOnMenu(target))
        return;

      const _draggableBlockElem = getBlockElement(anchor, editor, event);

      setDraggableBlock(_draggableBlockElem);
    }

    function onMouseLeave() {
      setDraggableBlock(null);
    }

    scrollerElem?.addEventListener("mousemove", onMouseMove);
    scrollerElem?.addEventListener("mouseleave", onMouseLeave);

    return () => {
      scrollerElem?.removeEventListener("mousemove", onMouseMove);
      scrollerElem?.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [scrollerElem, anchor, editor]);

  useEffect(() => {
    if (menuRef.current)
      setMenuPosition(draggableBlock, menuRef.current, anchor);
  }, [anchor, draggableBlock]);

  useEffect(() => {
    function onDragover(event: DragEvent): boolean {
      const [isFileTransfer] = eventFiles(event);
      if (isFileTransfer)
        return false;

      const { pageY, target } = event;
      if (!isHTMLElement(target))
        return false;

      const targetBlockElem = getBlockElement(anchor, editor, event);
      const targetLineElem = targetLineRef.current;
      if (!targetBlockElem || !targetLineElem)
        return false;

      setTargetLine(targetLineElem, targetBlockElem, pageY, anchor);
      // Prevent default event to be able to trigger onDrop events
      event.preventDefault();
      return true;
    }

    function onDrop(event: DragEvent): boolean {
      const [isFileTransfer] = eventFiles(event);
      if (isFileTransfer)
        return false;

      const { target, dataTransfer, pageY } = event;
      const dragData = dataTransfer?.getData(DragDataFormat) || "";

      const draggedNode = $getNodeByKey(dragData);
      if (!draggedNode)
        return false;

      if (!isHTMLElement(target))
        return false;

      const targetBlockElem = getBlockElement(anchor, editor, event);
      if (!targetBlockElem)
        return false;

      const targetNode = $getNearestNodeFromDOMNode(targetBlockElem);
      if (!targetNode)
        return false;

      if (targetNode === draggedNode)
        return true;

      const { top, height } = targetBlockElem.getBoundingClientRect();
      const shouldInsertAfter = pageY - top > height / 2;

      if (shouldInsertAfter)
        targetNode.insertAfter(draggedNode);
      else
        targetNode.insertBefore(draggedNode);

      setDraggableBlock(null);

      return true;
    }

    return mergeRegister(
      editor.registerCommand(
        DRAGOVER_COMMAND,
        (event) => onDragover(event),
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        DROP_COMMAND,
        (event) => onDrop(event),
        COMMAND_PRIORITY_HIGH
      )
    );
  }, [anchor, editor]);

  function onDragStart(event: ReactDragEvent<HTMLDivElement>): void {
    const dataTransfer = event.dataTransfer;
    if (!dataTransfer || !draggableBlock)
      return;

    setDragImage(dataTransfer, draggableBlock);
    let nodeKey = "";

    editor.update(() => {
      const node = $getNearestNodeFromDOMNode(draggableBlock);
      if (node)
        nodeKey = node.getKey();
    });

    dataTransfer.setData(DragDataFormat, nodeKey);
  }

  function onDragEnd(): void {
    hideTargetLine(targetLineRef.current);
  }

  const style = useStyles();

  return (
    <Portal mountNode={anchor}>
      <div
        className={mergeClasses("LexEditor_Draggable", style.meun)}
        ref={menuRef}
        draggable={true}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className={editor._editable ? mergeClasses(style.icon, "LexEditor_DraggableIcon") : ""} />
      </div>
      <div className={style.line} ref={targetLineRef} />
    </Portal>
  );
}

const useStyles = makeStyles({
  meun: {
    ...shorthands.borderRadius("4px"),
    ...shorthands.padding("2px", "1px"),
    cursor: "grab",
    opacity: 0,
    position: "absolute",
    left: 0,
    top: 0,
    willChange: "transform",
    ":active": {
      cursor: "grabbing"
    },
    ":hover": {
      backgroundColor: "#efefef"
    }
  },
  icon: {
    width: "16px",
    height: "16px",
    opacity: 0.3,
  },
  line: {
    pointerEvents: "none",
    backgroundColor: "deepskyblue",
    height: "4px",
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0,
    willChange: "transform"
  }
});

export function DraggableBlockPlugin({ anchor = document.body }: { anchor?: HTMLElement; }): JSX.Element {
  const [editor] = useLexicalComposerContext();
  return <DraggableBlockMenu anchor={anchor} editor={editor} />;
}
