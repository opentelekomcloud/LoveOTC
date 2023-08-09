import { Button } from "@fluentui/react-components";
import { CloudArrowUpRegular, SaveRegular } from "@fluentui/react-icons";
import { exportFile, importFile } from "@lexical/file";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export function LexImExport(): JSX.Element {
  const [editor] = useLexicalComposerContext();

  return <>
    <Button appearance="outline" icon={<CloudArrowUpRegular />}
      onClick={() => importFile(editor)} />

    <Button appearance="outline" icon={<SaveRegular />}
      onClick={() => exportFile(editor, {
        fileName: `Bunlog ${new Date().toISOString()}`,
        source: "Bunlog",
      })} />
  </>;
}
