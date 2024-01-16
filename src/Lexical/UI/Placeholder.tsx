import { makeStyles, shorthands } from "@fluentui/react-components";
import { ReactNode } from "react";

const useStyles = makeStyles({
  box: {
    fontSize: "15px",
    color: "#999",
    ...shorthands.overflow("hidden"),
    position: "absolute",
    textOverflow: "ellipsis",
    top: "8px",
    left: "28px",
    right: "28px",
    userSelect: "none",
    whiteSpace: "nowrap",
    display: "inline-block",
    pointerEvents: "none"
  }
});

export function Placeholder({ children, className }: { children: ReactNode; className?: string; }): JSX.Element {
  const style = useStyles();
  return <div className={className || style.box}>{children}</div>;
}
