const VERTICAL_GAP = 10;
const HORIZONTAL_OFFSET = 5;

export function setFloatingElemPosition(
  targetRect: ClientRect | null,
  floating: HTMLElement,
  anchor: HTMLElement,
  verticalGap: number = VERTICAL_GAP,
  horizontalOffset: number = HORIZONTAL_OFFSET
): void {
  const scroller = anchor.parentElement;

  if (!targetRect || !scroller) {
    floating.style.opacity = "0";
    floating.style.transform = "translate(-10000px, -10000px)";
    return;
  }

  const floatingElemRect = floating.getBoundingClientRect();
  const anchorElementRect = anchor.getBoundingClientRect();
  const editorScrollerRect = scroller.getBoundingClientRect();

  let top = targetRect.top - floatingElemRect.height - verticalGap;
  let left = targetRect.left - horizontalOffset;

  if (top < editorScrollerRect.top)
    top += floatingElemRect.height + targetRect.height + verticalGap * 2;

  if (left + floatingElemRect.width > editorScrollerRect.right)
    left = editorScrollerRect.right - floatingElemRect.width - horizontalOffset;

  top -= anchorElementRect.top;
  left -= anchorElementRect.left;

  floating.style.opacity = "1";
  floating.style.transform = `translate(${left}px, ${top}px)`;
}
