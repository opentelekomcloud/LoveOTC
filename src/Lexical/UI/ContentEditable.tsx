import { makeStyles, mergeClasses, shorthands } from "@fluentui/react-components";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { useLexical } from "../Context/Setting";

const useStyle = makeStyles({
  root: {
    ...shorthands.border(0),
    fontSize: "15px",
    display: "block",
    position: "relative",
    tabSize: 1,
    ...shorthands.outline(0),
    ...shorthands.padding("8px", "28px"),
    minHeight: "calc(100% - 16px)"
  },
  table: {
    minHeight: "20px",
    ...shorthands.border(0),
    resize: "none",
    cursor: "text",
    display: "block",
    position: "relative",
    tabSize: 1,
    ...shorthands.outline(0),
    ...shorthands.padding(0),
    userSelect: "text",
    fontSize: "15px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    zIndex: 3
  },
  display: {
    ...shorthands.padding(0),
  }
});

export function LexContentEditable({ className, table }: { className?: string, table?: true }): JSX.Element {
  const style = useStyle();
  const { Display } = useLexical();

  return <ContentEditable className={mergeClasses(
    "LexEditor_Content",
    className || table ? style.table : style.root,
    !table && Display && style.display
  )} />;
}
