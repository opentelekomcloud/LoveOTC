import { makeStyles, Portal, shorthands } from "@fluentui/react-components";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { $getRoot, $isParagraphNode } from "lexical";
import { useEffect, useState } from "react";
import { Flex } from "~/Helpers/Styles";
import { LexLockEditor } from "./Lock";
import { LexConvertMarkdown } from "./Markdown";
import { LexImExport } from "./Port";

const useStyles = makeStyles({
  box: {
    ...Flex,
    columnGap: "3px",
    position: "absolute",
    ...shorthands.padding("10px"),
    bottom: 0,
    left: 0
  }
});

/**
 * 右下角四个功能按钮
 */
export function ActionsPlugin({ anchor }: { anchor?: HTMLElement; }): JSX.Element {
  const style = useStyles();
  const [editor] = useLexicalComposerContext();
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());
  const [isEditorEmpty, setIsEditorEmpty] = useState(true);

  useEffect(() => mergeRegister(
    editor.registerEditableListener((editable) => setIsEditable(editable))
  ), [editor]);

  useEffect(() => editor.registerUpdateListener(
    ({ dirtyElements, prevEditorState, tags }) => {
      // If we are in read only mode, send the editor state
      // to server and ask for validation if possible.
      if (!isEditable &&
        dirtyElements.size > 0 &&
        !tags.has("historic") &&
        !tags.has("collaboration")) {
        console.debug(editor.getEditorState());
      }

      editor.getEditorState().read(() => {
        const children = $getRoot().getChildren();

        if (children.length > 1)
          setIsEditorEmpty(false);
        else if ($isParagraphNode(children[0]))
          setIsEditorEmpty(children[0].getChildren().length === 0);
        else
          setIsEditorEmpty(false);
      });
    }
  ), [editor, isEditable]);

  return (
    <Portal mountNode={anchor}>
      <div className={style.box}>
        <LexImExport />
        <LexLockEditor />
        <LexConvertMarkdown />
      </div>
    </Portal>
  );
}
