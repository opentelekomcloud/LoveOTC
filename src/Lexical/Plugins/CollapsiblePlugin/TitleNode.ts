import {
  $createParagraphNode,
  $isElementNode,
  DOMConversionMap,
  EditorConfig,
  ElementNode,
  LexicalEditor,
  LexicalNode,
  RangeSelection,
  SerializedElementNode,
  Spread
} from "lexical";

import { $isCollapsibleContainerNode } from "./ContainerNode";
import { $isCollapsibleContentNode } from "./ContentNode";

type SerializedCollapsibleTitleNode = Spread<
  {
    type: "collapsible-title";
    version: 1;
  },
  SerializedElementNode
>;

export class CollapsibleTitleNode extends ElementNode {
  public static override getType(): string {
    return "collapsible-title";
  }

  public static override clone(node: CollapsibleTitleNode): CollapsibleTitleNode {
    return new CollapsibleTitleNode(node.__key);
  }

  public override createDOM(config: EditorConfig, editor: LexicalEditor): HTMLElement {
    const dom = document.createElement("summary");
    dom.classList.add("LexEditor_CollapsibleTitle");
    return dom;
  }

  public override updateDOM(prevNode: CollapsibleTitleNode, dom: HTMLElement): boolean {
    return false;
  }

  public static importDOM(): DOMConversionMap | null {
    return {};
  }

  public static override importJSON(
    serializedNode: SerializedCollapsibleTitleNode
  ): CollapsibleTitleNode {
    return $createCollapsibleTitleNode();
  }

  public override exportJSON(): SerializedCollapsibleTitleNode {
    return {
      ...super.exportJSON(),
      type: "collapsible-title",
      version: 1,
    };
  }

  public override collapseAtStart(_selection: RangeSelection): boolean {
    this.getParentOrThrow().insertBefore(this);
    return true;
  }

  public override insertNewAfter(_: RangeSelection, restoreSelection = true): ElementNode {
    const containerNode = this.getParentOrThrow();

    if (!$isCollapsibleContainerNode(containerNode)) {
      throw new Error(
        "CollapsibleTitleNode expects to be child of CollapsibleContainerNode"
      );
    }

    if (containerNode.getOpen()) {
      const contentNode = this.getNextSibling();
      if (!$isCollapsibleContentNode(contentNode)) {
        throw new Error(
          "CollapsibleTitleNode expects to have CollapsibleContentNode sibling"
        );
      }

      const firstChild = contentNode.getFirstChild();
      if ($isElementNode(firstChild)) {
        return firstChild;
      } else {
        const paragraph = $createParagraphNode();
        contentNode.append(paragraph);
        return paragraph;
      }
    } else {
      const paragraph = $createParagraphNode();
      containerNode.insertAfter(paragraph, restoreSelection);
      return paragraph;
    }
  }
}

export function $createCollapsibleTitleNode(): CollapsibleTitleNode {
  return new CollapsibleTitleNode();
}

export function $isCollapsibleTitleNode(
  node: LexicalNode | null | undefined
): node is CollapsibleTitleNode {
  return node instanceof CollapsibleTitleNode;
}
