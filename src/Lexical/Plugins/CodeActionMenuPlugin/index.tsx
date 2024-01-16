import { makeStyles, mergeClasses, Portal } from "@fluentui/react-components";
import { $isCodeNode, CodeNode, getLanguageFriendlyName } from "@lexical/code";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useDebounceFn } from "ahooks";
import { $getNearestNodeFromDOMNode } from "lexical";
import { useEffect, useRef, useState } from "react";
import { CopyButton } from "./CopyButton";

const CODE_PADDING = 8;

interface Position {
  top: string;
  right: string;
}

const useStyles = makeStyles({
  container: {
    height: "35.8px",
    fontSize: "10px",
    color: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    userSelect: "none"
  },
  lang: {
    marginRight: "4px"
  }
});

function getMouseInfo(event: MouseEvent): {
  codeDOMNode: HTMLElement | null;
  isOutside: boolean;
} {
  const target = event.target;

  if (target && target instanceof HTMLElement) {
    const codeDOMNode = target.closest<HTMLElement>("code.LexEditor_code");
    const isOutside = !(codeDOMNode || target.closest<HTMLElement>("div.LexEditor_CodeMenu"));

    return { codeDOMNode, isOutside };
  } else
    return { codeDOMNode: null, isOutside: true };
}

export function CodeActionMenuPlugin({ anchor = document.body }: { anchor?: HTMLElement; }) {
  const [editor] = useLexicalComposerContext();

  const [isShown, setShown] = useState<boolean>(false);
  const [shouldListenMouseMove, setShouldListenMouseMove] = useState<boolean>(false);

  const [lang, setLang] = useState("");
  const [position, setPosition] = useState<Position>({ right: "0", top: "0" });

  const codeSetRef = useRef(new Set<string>());
  const codeDOMNodeRef = useRef<HTMLElement | null>(null);

  const { run: onMouseMove, cancel } = useDebounceFn(
    (event: MouseEvent) => {
      const { codeDOMNode, isOutside } = getMouseInfo(event);
      if (isOutside) {
        setShown(false);
        return;
      }

      if (!codeDOMNode)
        return;

      codeDOMNodeRef.current = codeDOMNode;

      let codeNode: CodeNode | null = null;
      let lang = "";

      editor.update(() => {
        const maybeCodeNode = $getNearestNodeFromDOMNode(codeDOMNode);

        if ($isCodeNode(maybeCodeNode)) {
          codeNode = maybeCodeNode;
          lang = codeNode.getLanguage() || "";
        }
      });

      if (codeNode) {
        const { y: editorElemY, right: editorElemRight } = anchor.getBoundingClientRect();
        const { y, right } = codeDOMNode.getBoundingClientRect();
        setLang(lang);
        setShown(true);
        setPosition({
          right: `${editorElemRight - right + CODE_PADDING}px`,
          top: `${y - editorElemY}px`,
        });
      }
    }, {
    wait: 100,
    maxWait: 1000,
  });

  useEffect(() => {
    if (!shouldListenMouseMove)
      return;

    document.addEventListener("mousemove", onMouseMove);

    return () => {
      setShown(false);
      cancel();
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [shouldListenMouseMove, onMouseMove]);

  editor.registerMutationListener(CodeNode, (mutations) => {
    editor.getEditorState().read(() => {
      for (const [key, type] of mutations) {
        switch (type) {
          case "created":
            codeSetRef.current.add(key);
            setShouldListenMouseMove(codeSetRef.current.size > 0);
            break;

          case "destroyed":
            codeSetRef.current.delete(key);
            setShouldListenMouseMove(codeSetRef.current.size > 0);
            break;

          default:
            break;
        }
      }
    });
  });
  const codeFriendlyName = getLanguageFriendlyName(lang);

  const style = useStyles();

  return (
    <Portal mountNode={anchor}>
      {isShown &&
        <div className={mergeClasses(style.container, "LexEditor_CodeMenu")} style={position}>
          <div className={style.lang}>{codeFriendlyName}</div>
          <CopyButton editor={editor} getCodeDOMNode={() => codeDOMNodeRef.current} />
        </div>}
    </Portal>
  );
}
