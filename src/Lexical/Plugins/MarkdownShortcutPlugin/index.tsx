import { MarkdownShortcutPlugin as LexicalMarkdownPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { MarkdownTransformers } from "./Transformers";

export function MarkdownShortcutPlugin(): JSX.Element {
  return <LexicalMarkdownPlugin transformers={MarkdownTransformers} />;
}
