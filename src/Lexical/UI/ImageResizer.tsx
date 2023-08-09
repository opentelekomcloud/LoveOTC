import { Button, makeStyles, mergeClasses, shorthands } from "@fluentui/react-components";
import type { LexicalEditor } from "lexical";
import { useRef } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

const Direction = {
  east: 1 << 0,
  north: 1 << 3,
  south: 1 << 1,
  west: 1 << 2,
};

interface IImageResizer {
  editor: LexicalEditor;
  buttonRef: {
    current: null | HTMLButtonElement;
  };
  imageRef: {
    current: null | HTMLElement;
  };
  maxWidth?: number;
  onResizeEnd: (width: "inherit" | number, height: "inherit" | number) => void;
  onResizeStart: () => void;
  setShowCaption: (show: boolean) => void;
  showCaption: boolean;
  captionsEnabled: boolean;
}

interface IPos {
  currentHeight: "inherit" | number;
  currentWidth: "inherit" | number;
  direction: number;
  isResizing: boolean;
  ratio: number;
  startHeight: number;
  startWidth: number;
  startX: number;
  startY: number;
}

export function ImageResizer({
  onResizeStart,
  onResizeEnd,
  buttonRef,
  imageRef,
  maxWidth,
  editor,
  showCaption,
  setShowCaption,
  captionsEnabled,
}: IImageResizer): JSX.Element {
  const controlWrapperRef = useRef<HTMLDivElement>(null);
  const userSelect = useRef({
    priority: "",
    value: "default",
  });

  const positioningRef = useRef<IPos>({
    currentHeight: 0,
    currentWidth: 0,
    direction: 0,
    isResizing: false,
    ratio: 0,
    startHeight: 0,
    startWidth: 0,
    startX: 0,
    startY: 0,
  });

  const editorRootElement = editor.getRootElement();
  // Find max width, accounting for editor padding.
  const maxWidthContainer = maxWidth
    ? maxWidth
    : editorRootElement
      ? editorRootElement.getBoundingClientRect().width - 20
      : 100;

  const maxHeightContainer =
    editorRootElement
      ? editorRootElement.getBoundingClientRect().height - 20
      : 100;

  const minWidth = 100;
  const minHeight = 100;

  function setStartCursor(direction: number) {
    const ew = direction === Direction.east || direction === Direction.west;
    const ns = direction === Direction.north || direction === Direction.south;

    const nwse = (direction & Direction.north && direction & Direction.west) ||
      (direction & Direction.south && direction & Direction.east);

    const cursorDir = ew ? "ew" : ns ? "ns" : nwse ? "nwse" : "nesw";

    if (editorRootElement)
      editorRootElement.style.setProperty(
        "cursor",
        `${cursorDir}-resize`,
        "important"
      );

    if (document.body) {
      document.body.style.setProperty(
        "cursor",
        `${cursorDir}-resize`,
        "important"
      );
      userSelect.current.value = document.body.style.getPropertyValue(
        "-webkit-user-select"
      );
      userSelect.current.priority = document.body.style.getPropertyPriority(
        "-webkit-user-select"
      );
      document.body.style.setProperty(
        "-webkit-user-select",
        `none`,
        "important"
      );
    }
  }

  function setEndCursor() {
    if (editorRootElement)
      editorRootElement.style.setProperty("cursor", "default");

    if (document.body) {
      document.body.style.setProperty("cursor", "default");
      document.body.style.setProperty(
        "-webkit-user-select",
        userSelect.current.value,
        userSelect.current.priority
      );
    }
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>, direction: number) {
    if (!editor.isEditable())
      return;

    const image = imageRef.current;
    const controlWrapper = controlWrapperRef.current;

    if (image && controlWrapper) {
      const { width, height } = image.getBoundingClientRect();
      const positioning = positioningRef.current;
      positioning.startWidth = width;
      positioning.startHeight = height;
      positioning.ratio = width / height;
      positioning.currentWidth = width;
      positioning.currentHeight = height;
      positioning.startX = event.clientX;
      positioning.startY = event.clientY;
      positioning.isResizing = true;
      positioning.direction = direction;

      setStartCursor(direction);
      onResizeStart();

      controlWrapper.classList.add("image-control-wrapper--resizing");
      image.style.height = `${height}px`;
      image.style.width = `${width}px`;

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    }
  }

  function handlePointerMove(event: PointerEvent) {
    const image = imageRef.current;
    const positioning = positioningRef.current;

    const isHorizontal = positioning.direction & (Direction.east | Direction.west);
    const isVertical = positioning.direction & (Direction.south | Direction.north);

    if (image && positioning.isResizing) {
      // Corner cursor
      if (isHorizontal && isVertical) {
        let diff = Math.floor(positioning.startX - event.clientX);
        diff = positioning.direction & Direction.east ? -diff : diff;

        const width = clamp(
          positioning.startWidth + diff,
          minWidth,
          maxWidthContainer
        );

        const height = width / positioning.ratio;
        image.style.width = `${width}px`;
        image.style.height = `${height}px`;
        positioning.currentHeight = height;
        positioning.currentWidth = width;

      } else if (isVertical) {
        let diff = Math.floor(positioning.startY - event.clientY);
        diff = positioning.direction & Direction.south ? -diff : diff;

        const height = clamp(
          positioning.startHeight + diff,
          minHeight,
          maxHeightContainer
        );

        image.style.height = `${height}px`;
        positioning.currentHeight = height;

      } else {
        let diff = Math.floor(positioning.startX - event.clientX);
        diff = positioning.direction & Direction.east ? -diff : diff;

        const width = clamp(
          positioning.startWidth + diff,
          minWidth,
          maxWidthContainer
        );

        image.style.width = `${width}px`;
        positioning.currentWidth = width;
      }
    }
  }

  function handlePointerUp() {
    const image = imageRef.current;
    const positioning = positioningRef.current;
    const controlWrapper = controlWrapperRef.current;

    if (image && controlWrapper && positioning.isResizing) {
      const width = positioning.currentWidth;
      const height = positioning.currentHeight;
      positioning.startWidth = 0;
      positioning.startHeight = 0;
      positioning.ratio = 0;
      positioning.startX = 0;
      positioning.startY = 0;
      positioning.currentWidth = 0;
      positioning.currentHeight = 0;
      positioning.isResizing = false;

      controlWrapper.classList.remove("image-control-wrapper--resizing");

      setEndCursor();
      onResizeEnd(width, height);

      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    }
  }

  const style = useStyle();

  return (
    <div ref={controlWrapperRef}>
      {!showCaption && captionsEnabled && (
        <Button
          className={style.button}
          ref={buttonRef}
          onClick={() => setShowCaption(!showCaption)}
        >
          Add Caption
        </Button>
      )}

      <div
        className={mergeClasses(style.resizer, style.n)}
        onPointerDown={(event) => handlePointerDown(event, Direction.north)}
      />

      <div
        className={mergeClasses(style.resizer, style.ne)}
        onPointerDown={(event) => handlePointerDown(event, Direction.north | Direction.east)}
      />

      <div
        className={mergeClasses(style.resizer, style.e)}
        onPointerDown={(event) => handlePointerDown(event, Direction.east)}
      />

      <div
        className={mergeClasses(style.resizer, style.se)}
        onPointerDown={(event) => handlePointerDown(event, Direction.south | Direction.east)}
      />

      <div
        className={mergeClasses(style.resizer, style.s)}
        onPointerDown={(event) => handlePointerDown(event, Direction.south)}
      />

      <div
        className={mergeClasses(style.resizer, style.sw)}
        onPointerDown={(event) => handlePointerDown(event, Direction.south | Direction.west)}
      />

      <div
        className={mergeClasses(style.resizer, style.w)}
        onPointerDown={(event) => handlePointerDown(event, Direction.west)}
      />

      <div
        className={mergeClasses(style.resizer, style.nw)}
        onPointerDown={(event) => handlePointerDown(event, Direction.north | Direction.west)}
      />
    </div>
  );
}

const useStyle = makeStyles({
  button: {
    minWidth: "unset",
    fontWeight: "unset",
    width: "fit-content",
    position: "absolute",
    bottom: "20px",
    marginLeft: 'auto',
    left: 0,
    right: 0,
    ...shorthands.margin(0, "auto")
  },
  resizer: {
    display: "block",
    width: "7px",
    height: "7px",
    position: "absolute",
    backgroundColor: "rgb(60, 132, 244)",
    ...shorthands.border("1px", "solid", "#fff")
  },
  n: {
    top: "-6px",
    left: "48%",
    cursor: "n-resize"
  },
  ne: {
    top: "-6px",
    right: "-6px",
    cursor: "ne-resize"
  },
  e: {
    bottom: "48%",
    right: "-6px",
    cursor: "e-resize"
  },
  se: {
    bottom: "-2px",
    right: "-6px",
    cursor: "nwse-resize"
  },
  s: {
    bottom: "-2px",
    left: "48%",
    cursor: "s-resize"
  },
  sw: {
    bottom: "-2px",
    left: "-6px",
    cursor: "sw-resize"
  },
  w: {
    bottom: "48%",
    left: "-6px",
    cursor: "w-resize"
  },
  nw: {
    top: "-6px",
    left: "-6px",
    cursor: "nw-resize"
  }
});
