import { Button, DialogActions, DialogBody, DialogContent, DialogTitle, DialogTrigger, Field, Input } from "@fluentui/react-components";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createNodeSelection,
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  $setSelection,
  COMMAND_PRIORITY_EDITOR,
  EditorThemeClasses,
  Klass,
  LexicalCommand,
  LexicalEditor,
  LexicalNode,
  createCommand
} from "lexical";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { IRow, TableNode, createCell, createRow } from "../../Nodes/Table";
import { invariant } from "../../Utils/invariant";

export type InsertTableCommandPayload = Readonly<{
  columns: string | number;
  rows: string | number;
  includeHeaders?: boolean;
}>;

export type CellContextShape = {
  cellEditorConfig: null | CellEditorConfig;
  cellEditorPlugins: null | JSX.Element | Array<JSX.Element>;
  set: (
    cellEditorConfig: null | CellEditorConfig,
    cellEditorPlugins: null | JSX.Element | Array<JSX.Element>
  ) => void;
};

export type CellEditorConfig = Readonly<{
  namespace: string;
  nodes?: ReadonlyArray<Klass<LexicalNode>>;
  onError: (error: Error, editor: LexicalEditor) => void;
  readOnly?: boolean;
  theme?: EditorThemeClasses;
}>;

export const INSERT_NEW_TABLE_COMMAND: LexicalCommand<InsertTableCommandPayload> =
  createCommand("INSERT_NEW_TABLE_COMMAND");

export const CellContext = createContext({
  cellEditorConfig: null,
  cellEditorPlugins: null,
  set: () => { },
} as CellContextShape);

export function TableContext({ children }: { children: JSX.Element }) {
  const [contextValue, setContextValue] = useState<{
    cellEditorConfig: null | CellEditorConfig;
    cellEditorPlugins: null | JSX.Element | Array<JSX.Element>;
  }>({
    cellEditorConfig: null,
    cellEditorPlugins: null,
  });

  return (
    <CellContext.Provider
      value={useMemo(() => (
        {
          cellEditorConfig: contextValue.cellEditorConfig,
          cellEditorPlugins: contextValue.cellEditorPlugins,
          set: (cellEditorConfig, cellEditorPlugins) =>
            setContextValue({ cellEditorConfig, cellEditorPlugins }),
        }
      ), [contextValue.cellEditorConfig, contextValue.cellEditorPlugins])}>
      {children}
    </CellContext.Provider>
  );
}

export function InsertTableDialog({ editor }: { editor: LexicalEditor; }): JSX.Element {
  const [rows, setRows] = useState("5");
  const [columns, setColumns] = useState("5");

  return (
    <DialogBody>
      <DialogTitle>
        Insert Table
      </DialogTitle>

      <DialogContent>
        <Field label="Rows" required>
          <Input placeholder={rows} onChange={(_, v) => v && setRows(v.value)} />
        </Field>

        <Field label="Cols" required>
          <Input placeholder={columns} onChange={(_, v) => v && setColumns(v.value)} />
        </Field>
      </DialogContent>

      <DialogActions>
        <DialogTrigger disableButtonEnhancement>
          <Button onClick={() => {
            editor.dispatchCommand(INSERT_NEW_TABLE_COMMAND, { columns, rows });
          }}>
            Confirm
          </Button>
        </DialogTrigger>
      </DialogActions>
    </DialogBody>
  );
}

function $createTableNodeWithDimensions(rowCount: number, columnCount: number, includeHeaders = true): TableNode {
  const rows: IRow[] = [];

  for (let y = 0; y < columnCount; y++) {
    const row: IRow = createRow();
    rows.push(row);

    for (let x = 0; x < rowCount; x++)
      row.cells.push(createCell(
        includeHeaders && (y === 0 || x === 0)
          ? "header" : "normal")
      );
  }

  return new TableNode(rows);
}

export function TablePlugin({ cellEditorConfig, children }: {
  cellEditorConfig: CellEditorConfig;
  children: JSX.Element | Array<JSX.Element>;
}): null {

  const [editor] = useLexicalComposerContext();
  const cellContext = useContext(CellContext);

  useEffect(() => {
    if (!editor.hasNodes([TableNode]))
      invariant(false, "TablePlugin: TableNode is not registered on editor");

    cellContext.set(cellEditorConfig, children);

    return editor.registerCommand<InsertTableCommandPayload>(
      INSERT_NEW_TABLE_COMMAND,
      ({ columns, rows, includeHeaders }) => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection))
          return true;

        const focus = selection.focus;
        const focusNode = focus.getNode();

        if (focusNode) {
          const tableNode = $createTableNodeWithDimensions(
            Number(rows),
            Number(columns),
            includeHeaders
          );

          if ($isRootOrShadowRoot(focusNode)) {
            const target = focusNode.getChildAtIndex(focus.offset);

            if (target)
              target.insertBefore(tableNode);
            else
              focusNode.append(tableNode);

            tableNode.insertBefore($createParagraphNode());
          } else {
            const topLevelNode = focusNode.getTopLevelElementOrThrow();
            topLevelNode.insertAfter(tableNode);
          }

          tableNode.insertAfter($createParagraphNode());
          const nodeSelection = $createNodeSelection();
          nodeSelection.add(tableNode.getKey());
          $setSelection(nodeSelection);
        }

        return true;
      }, COMMAND_PRIORITY_EDITOR);

  }, [cellContext, cellEditorConfig, children, editor]);

  return null;
}
