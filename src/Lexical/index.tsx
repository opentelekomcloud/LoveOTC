import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { Dic } from "~/Helpers/Dic";
import { LexDisplayPreset } from "./Context/Display";
import { LexRichTextPreset } from "./Context/RichText";
import { LexicalContext, type ILexical } from "./Context/Setting";
import { LexEditor } from "./Editor";
import { LexicalNodes } from "./Nodes/LexicalNodes";
import { TableContext } from "./Plugins/TablePlugin";
import { useLexEditorTheme } from "./Theme";

/**
 * Lexical Editor
 *
 * @author Aloento
 * @since MusiLand 0.5.0
 * @version 0.1.0
 */
function Lexical({
  Namespace = Dic.Name,
  Plugin = LexRichTextPreset,
  Editable = true,
  OnError = (e) => { throw e; },
  State,
  Placeholder,
  Display
}: ILexical): JSX.Element {
  Editable = Display ? false : Editable;

  return (
    <LexicalComposer initialConfig={{
      editorState: State,
      namespace: Namespace,
      nodes: [...LexicalNodes],
      onError: OnError,
      theme: useLexEditorTheme(),
      editable: Editable,
    }}>
      <LexicalContext {...{
        Namespace,
        Plugin: Display ? LexDisplayPreset : Plugin,
        Editable,
        OnError,
        State,
        Placeholder,
        Display
      }}>
        <TableContext>
          <LexEditor />
        </TableContext>
      </LexicalContext>
    </LexicalComposer>
  );
}

/** @deprecated */
export default Lexical;
