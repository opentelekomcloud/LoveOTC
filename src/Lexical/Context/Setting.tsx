import type { InitialEditorStateType } from "@lexical/react/LexicalComposer";
import type { LexicalEditor } from "lexical";
import { createContext, useContext } from "react";
import type { ILexPlugin } from "./Plugins";

interface IRequired {
  Namespace: string;
  Plugin: ILexPlugin;
  Editable: boolean;
  OnError: (error: Error, editor: LexicalEditor) => void;
}

interface IOptional {
  State?: InitialEditorStateType,
  Placeholder?: string;
  Display?: true;
}

/**
 * Lexical 总配置
 */
export interface ILexical extends Partial<IRequired>, IOptional { }

type Context = IRequired & IOptional;
const LexPlugin = createContext({} as Context);

export function useLexical() {
  return useContext(LexPlugin);
}

export function LexicalContext({ children, ...props }: Context & { children: JSX.Element }): JSX.Element {
  return <LexPlugin.Provider value={props}>{children}</LexPlugin.Provider>;
}
