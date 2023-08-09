import { ToggleButton } from "@fluentui/react-components";
import { LockClosedFilled, LockOpenRegular } from "@fluentui/react-icons";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export function LexLockEditor() {
  const [editor] = useLexicalComposerContext();
  const isEditable = editor.isEditable();

  return <ToggleButton
    appearance="outline"
    icon={isEditable ? <LockOpenRegular /> : <LockClosedFilled />}
    checked={!isEditable}
    onClick={() => editor.setEditable(!isEditable)} />;
}
