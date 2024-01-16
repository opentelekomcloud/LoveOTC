import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHorizontalRuleNode, INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
import { $insertNodeToNearestRoot } from '@lexical/utils';
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR } from "lexical";
import { useEffect } from "react";

export function HorizontalRulePlugin(): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => editor.registerCommand(
    INSERT_HORIZONTAL_RULE_COMMAND,
    (type) => {
      const selection = $getSelection();

      if (!$isRangeSelection(selection))
        return false;

      const focusNode = selection.focus.getNode();

      if (focusNode) {
        const horizontalRuleNode = $createHorizontalRuleNode();
        $insertNodeToNearestRoot(horizontalRuleNode);
      }

      return true;
    },
    COMMAND_PRIORITY_EDITOR
  ), [editor]);

  return null;
}
