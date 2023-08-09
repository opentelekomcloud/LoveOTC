import {
  DOMConversionMap,
  EditorConfig,
  ElementNode,
  LexicalNode,
  SerializedElementNode,
  Spread
} from "lexical";

type SerializedCollapsibleContentNode = Spread<
  {
    type: "collapsible-content";
    version: 1;
  },
  SerializedElementNode
>;

export class CollapsibleContentNode extends ElementNode {
  public static override getType(): string {
    return "collapsible-content";
  }

  public static override clone(node: CollapsibleContentNode): CollapsibleContentNode {
    return new CollapsibleContentNode(node.__key);
  }

  public override createDOM(config: EditorConfig): HTMLElement {
    const dom = document.createElement("div");
    dom.classList.add("LexEditor_CollapsibleContent");
    return dom;
  }

  public override updateDOM(prevNode: CollapsibleContentNode, dom: HTMLElement): boolean {
    return false;
  }

  public static importDOM(): DOMConversionMap | null {
    return {};
  }

  public static override importJSON(
    serializedNode: SerializedCollapsibleContentNode
  ): CollapsibleContentNode {
    return $createCollapsibleContentNode();
  }

  public override isShadowRoot(): boolean {
    return true;
  }

  public override exportJSON(): SerializedCollapsibleContentNode {
    return {
      ...super.exportJSON(),
      type: "collapsible-content",
      version: 1,
    };
  }
}

export function $createCollapsibleContentNode(): CollapsibleContentNode {
  return new CollapsibleContentNode();
}

export function $isCollapsibleContentNode(
  node: LexicalNode | null | undefined
): node is CollapsibleContentNode {
  return node instanceof CollapsibleContentNode;
}
