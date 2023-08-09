import { ToggleButton } from "@fluentui/react-components";
import { MarkdownRegular } from "@fluentui/react-icons";
import { $createCodeNode, $isCodeNode } from "@lexical/code";
import { $convertFromMarkdownString, $convertToMarkdownString } from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createTextNode, $getRoot } from "lexical";
import { useCallback } from "react";
import { MarkdownTransformers } from "../MarkdownShortcutPlugin/Transformers";

export function LexConvertMarkdown() {
  const [editor] = useLexicalComposerContext();

  const handleMarkdownToggle = useCallback(() =>
    editor.update(() => {
      const root = $getRoot();
      const firstChild = root.getFirstChild();

      if ($isCodeNode(firstChild) && firstChild.getLanguage() === "markdown")
        $convertFromMarkdownString(
          firstChild.getTextContent(),
          MarkdownTransformers);
      else {
        const markdown = $convertToMarkdownString(MarkdownTransformers);
        root.clear().append(
          $createCodeNode("markdown")
            .append($createTextNode(markdown)));
      }

      root.selectEnd();
    }), [editor]);

  return <ToggleButton
    appearance="outline"
    icon={<MarkdownRegular />}
    onClick={handleMarkdownToggle} />;
}
