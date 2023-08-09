import { makeStyles, shorthands } from "@fluentui/react-components";

export const useLexImageStyle = makeStyles({
  caption: {
    display: "block",
    position: "absolute",
    bottom: "4px",
    left: 0,
    right: 0,
    ...shorthands.padding(0),
    ...shorthands.margin(0),
    ...shorthands.borderTop("1px", "solid", "#fff"),
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    minWidth: "100px",
    color: "#000",
    ...shorthands.overflow("hidden"),
  },
  content: {
    minHeight: "20px",
    ...shorthands.border(0),
    resize: "none",
    cursor: "text",
    caretColor: "rgb(5, 5, 5)",
    display: "block",
    position: "relative",
    tabSize: 1,
    ...shorthands.outline(0),
    ...shorthands.padding("10px"),
    userSelect: "text",
    fontSize: "12px",
    width: "calc(100% - 20px)",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word"
  },
  placeholder: {
    fontSize: "12px",
    color: "#888",
    ...shorthands.overflow("hidden"),
    position: "absolute",
    textOverflow: "ellipsis",
    top: "10px",
    left: "10px",
    userSelect: "none",
    whiteSpace: "nowrap",
    display: "inline-block",
    pointerEvents: "none"
  }
});
