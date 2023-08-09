import {
  $applyNodeReplacement, createEditor, DecoratorNode, DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedEditor,
  SerializedLexicalNode,
  Spread
} from "lexical";
import { lazy, Suspense } from "react";

export interface ImagePayload {
  altText: string;
  caption?: LexicalEditor;
  height?: number;
  key?: NodeKey;
  maxWidth?: number;
  showCaption?: boolean;
  src: string;
  width?: number;
  captionsEnabled?: boolean;
}

export type SerializedImageNode = Spread<
  {
    altText: string;
    caption: SerializedEditor;
    height?: number;
    maxWidth: number;
    showCaption: boolean;
    src: string;
    width?: number;
    type: "image";
    version: 1;
  },
  SerializedLexicalNode
>;

function convertImageElement(domNode: Node): null | DOMConversionOutput {
  if (domNode instanceof HTMLImageElement) {
    const { alt: altText, src } = domNode;
    const node = $createImageNode({ altText, src });
    return { node };
  }
  return null;
}

export class ImageNode extends DecoratorNode<JSX.Element> {
  public static override getType(): string {
    return "image";
  }

  public static override clone(node: ImageNode): ImageNode {
    return new ImageNode(
      node.src,
      node.altText,
      node.maxWidth,
      node.width,
      node.height,
      node.showCaption,
      node.caption,
      node.captionsEnabled,
      node.__key
    );
  }

  public static override importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { altText, height, width, maxWidth, caption, src, showCaption } = serializedNode;
    const node = $createImageNode({ altText, height, maxWidth, showCaption, src, width });
    const nestedEditor = node.caption;
    const editorState = nestedEditor.parseEditorState(caption.editorState);
    if (!editorState.isEmpty())
      nestedEditor.setEditorState(editorState);

    return node;
  }

  public override exportDOM(): DOMExportOutput {
    const element = document.createElement("img");
    element.setAttribute("src", this.src);
    element.setAttribute("alt", this.altText);
    return { element };
  }

  public static importDOM(): DOMConversionMap | null {
    return {
      img: (node: Node) => ({
        conversion: convertImageElement,
        priority: 0,
      }),
    };
  }

  public constructor(
    public src: string,
    public altText: string,
    public maxWidth: number,
    public width: "inherit" | number = "inherit",
    public height: "inherit" | number = "inherit",
    public showCaption: boolean = false,
    public caption: LexicalEditor = createEditor(),
    // Captions cannot yet be used within editor cells
    private captionsEnabled: boolean = true,
    key?: NodeKey
  ) {
    super(key);
  }

  public override exportJSON(): SerializedImageNode {
    return {
      altText: this.getAltText(),
      caption: this.caption.toJSON(),
      height: this.height === "inherit" ? 0 : this.height,
      maxWidth: this.maxWidth,
      showCaption: this.showCaption,
      src: this.getSrc(),
      type: "image",
      version: 1,
      width: this.width === "inherit" ? 0 : this.width,
    };
  }

  public setWidthAndHeight(width: "inherit" | number, height: "inherit" | number): void {
    const writable = this.getWritable();
    writable.width = width;
    writable.height = height;
  }

  public setShowCaption(showCaption: boolean): void {
    const writable = this.getWritable();
    writable.showCaption = showCaption;
  }

  // View
  public override createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement("span");
    const theme = config.theme;
    const className = theme.image;
    if (className)
      span.className = className;

    return span;
  }

  public override updateDOM(): false {
    return false;
  }

  public getSrc(): string {
    return this.src;
  }

  public getAltText(): string {
    return this.altText;
  }

  public override decorate(): JSX.Element {
    return (
      <Suspense fallback={null}>
        <ImageComponent
          src={this.src}
          altText={this.altText}
          width={this.width}
          height={this.height}
          maxWidth={this.maxWidth}
          nodeKey={this.getKey()}
          showCaption={this.showCaption}
          caption={this.caption}
          captionsEnabled={this.captionsEnabled}
          resizable={true}
        />
      </Suspense>
    );
  }
}

const ImageComponent = lazy(() => import("./Component"));

export function $createImageNode({ altText, height, maxWidth = 500, captionsEnabled, src, width, showCaption, caption, key }: ImagePayload): ImageNode {
  return $applyNodeReplacement(
    new ImageNode(
      src,
      altText,
      maxWidth,
      width,
      height,
      showCaption,
      caption,
      captionsEnabled,
      key,
    ),
  );
}

export function $isImageNode(node: LexicalNode | null | undefined): node is ImageNode {
  return node instanceof ImageNode;
}
