import { LexicalEditor } from "lexical";

export let CurrentEditor: LexicalEditor | undefined;

export function SetCurrentEditor(e?: LexicalEditor) {
  CurrentEditor = e;
}
