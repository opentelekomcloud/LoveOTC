import { Button, makeStyles, tokens } from "@fluentui/react-components";
import { CheckmarkFilled, CopyRegular } from "@fluentui/react-icons";
import { $isCodeNode } from "@lexical/code";
import { useDebounceFn } from "ahooks";
import { $getNearestNodeFromDOMNode, $getSelection, $setSelection, LexicalEditor } from "lexical";
import { useState } from "react";

const useStyles = makeStyles({
  green: {
    color: tokens.colorPaletteLightGreenForeground3
  }
});

interface ICopyButton {
  editor: LexicalEditor;
  getCodeDOMNode: () => HTMLElement | null;
}

export function CopyButton({ editor, getCodeDOMNode }: ICopyButton) {
  const [isCopyCompleted, setCopyCompleted] = useState<boolean>(false);

  const { run: removeSuccessIcon } = useDebounceFn(() => {
    setCopyCompleted(false);
  }, { wait: 1000 });

  async function handleClick(): Promise<void> {
    const codeDOMNode = getCodeDOMNode();

    if (!codeDOMNode)
      return;

    let content = "";

    editor.update(() => {
      const codeNode = $getNearestNodeFromDOMNode(codeDOMNode);

      if ($isCodeNode(codeNode))
        content = codeNode.getTextContent();

      const selection = $getSelection();
      $setSelection(selection);
    });

    try {
      await navigator.clipboard.writeText(content);
      setCopyCompleted(true);
      removeSuccessIcon();
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }

  const style = useStyles();

  return <Button size="small" appearance="subtle" onClick={handleClick}
    icon={isCopyCompleted ? <CheckmarkFilled className={style.green} /> : <CopyRegular />} />;
}
