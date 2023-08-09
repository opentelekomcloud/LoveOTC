import {
  DOMConversionMap,
  EditorConfig,
  ElementNode,
  LexicalNode,
  NodeKey,
  SerializedElementNode,
  Spread
} from "lexical";

type SerializedCollapsibleContainerNode = Spread<
  {
    type: "collapsible-container";
    version: 1;
  },
  SerializedElementNode
>;

export class CollapsibleContainerNode extends ElementNode {
  public constructor(private open: boolean, key?: NodeKey) {
    super(key);
    this.open = open;
  }

  public static override getType(): string {
    return "collapsible-container";
  }

  public static override clone(node: CollapsibleContainerNode): CollapsibleContainerNode {
    return new CollapsibleContainerNode(node.open, node.__key);
  }

  public override createDOM(config: EditorConfig): HTMLElement {
    const dom = document.createElement("details");
    dom.classList.add("LexEditor_Collapsible");
    dom.open = this.open;
    return dom;
  }

  public override updateDOM(
    prevNode: CollapsibleContainerNode,
    dom: HTMLDetailsElement
  ): boolean {
    if (prevNode.open !== this.open)
      dom.open = this.open;

    return false;
  }

  public static importDOM(): DOMConversionMap | null {
    return {};
  }

  public static override importJSON(
    serializedNode: SerializedCollapsibleContainerNode
  ): CollapsibleContainerNode {
    const node = $createCollapsibleContainerNode();
    return node;
  }

  public override exportJSON(): SerializedCollapsibleContainerNode {
    return {
      ...super.exportJSON(),
      type: "collapsible-container",
      version: 1,
    };
  }

  public setOpen(open: boolean): void {
    const writable = this.getWritable();
    writable.open = open;
  }

  public getOpen(): boolean {
    return this.open;
  }

  public toggleOpen(): void {
    this.setOpen(!this.getOpen());
  }
}

export function $createCollapsibleContainerNode(): CollapsibleContainerNode {
  return new CollapsibleContainerNode(true);
}

export function $isCollapsibleContainerNode(
  node: LexicalNode | null | undefined
): node is CollapsibleContainerNode {
  return node instanceof CollapsibleContainerNode;
}
