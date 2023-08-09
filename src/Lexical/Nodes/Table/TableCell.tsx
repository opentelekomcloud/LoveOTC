import { Button, Menu, MenuPopover, MenuTrigger, makeStyles, mergeClasses, shorthands } from "@fluentui/react-components";
import { ChevronDownRegular } from "@fluentui/react-icons";
import { $generateHtmlFromNodes } from "@lexical/html";
import { LexicalNestedComposer } from "@lexical/react/LexicalNestedComposer";
import { $getRoot, EditorThemeClasses, LexicalEditor } from "lexical";
import { useContext, useEffect, useState } from "react";
import { ICell, IRow, TableNode, cellHTMLCache, cellTextContentCache } from ".";
import { CellContext } from "../../Plugins/TablePlugin";
import { SortOptions } from "./Component";
import { TableActionMenu } from "./TableActionMenu";

function createEmptyParagraphHTML(theme: EditorThemeClasses): string {
  return `<p class="${theme.paragraph}"><br></p>`;
}

function generateHTMLFromJSON(editorStateJSON: string, cellEditor: LexicalEditor): string {
  const editorState = cellEditor.parseEditorState(editorStateJSON);
  let html = cellHTMLCache.get(editorStateJSON);

  if (!html) {
    html = editorState.read(() => $generateHtmlFromNodes(cellEditor, null));
    const textContent = editorState.read(() => $getRoot().getTextContent());

    cellHTMLCache.set(editorStateJSON, html);
    cellTextContentCache.set(editorStateJSON, textContent);
  }

  return html;
}

function TableCellEditor({ cellEditor }: { cellEditor: LexicalEditor; }) {
  const { cellEditorConfig, cellEditorPlugins } = useContext(CellContext);

  if (!cellEditorPlugins || !cellEditorConfig)
    return null;

  return (
    <LexicalNestedComposer
      initialEditor={cellEditor}
      initialTheme={cellEditorConfig.theme}
      initialNodes={cellEditorConfig.nodes}
      skipCollabChecks={true}
    >
      {cellEditorPlugins}
    </LexicalNestedComposer>
  );
}

interface ITableCell {
  cell: ICell;
  isEditing: boolean;
  isSelected: boolean;
  isPrimarySelected: boolean;
  theme: EditorThemeClasses;
  cellEditor: LexicalEditor;
  updateCellsByID: (ids: Array<string>, fn: () => void) => void;
  updateTableNode: (fn2: (tableNode: TableNode) => void) => void;
  cellCoordMap: Map<string, [number, number]>;
  rows: IRow[];
  setSortingOptions: (options: null | SortOptions) => void;
  sortingOptions: null | SortOptions;
}

export function TableCell({
  cell, cellCoordMap, cellEditor, isEditing, isSelected, isPrimarySelected, theme, updateCellsByID, updateTableNode, rows, setSortingOptions, sortingOptions,
}: ITableCell) {
  const [showMenu, setShowMenu] = useState(false);
  const isHeader = cell.type !== "normal";
  const editorStateJSON = cell.json;
  const CellComponent = isHeader ? "th" : "td";
  const cellWidth = cell.width;
  const coords = cellCoordMap.get(cell.id);
  const isSorted = sortingOptions && coords &&
    coords[0] === sortingOptions.x && coords[1] === 0;

  useEffect(() => {
    if (isEditing || !isPrimarySelected)
      setShowMenu(false);
  }, [isEditing, isPrimarySelected]);

  const style = useStyle();

  return (
    <CellComponent
      className={mergeClasses(theme.tableCell, isHeader && theme.tableCellHeader, isSelected && theme.tableCellSelected)}
      data-id={cell.id}
      tabIndex={-1}
      style={{ width: cellWidth! }}
    >
      {isPrimarySelected &&
        <div className={mergeClasses(theme.tableCellPrimarySelected, isEditing && theme.tableCellEditing)} />}

      {isPrimarySelected && isEditing
        ? <TableCellEditor cellEditor={cellEditor} />
        : <>
          <div
            className={style.prim}
            dangerouslySetInnerHTML={{
              __html: editorStateJSON
                ? generateHTMLFromJSON(editorStateJSON, cellEditor)
                : createEmptyParagraphHTML(theme),
            }} />
          <div className={theme.tableCellResizer} data-table-resize="true" />
        </>}

      {isPrimarySelected && !isEditing && (
        <div className={theme.tableCellActionButtonContainer}>
          <Menu open={showMenu}>
            <MenuTrigger disableButtonEnhancement>
              <Button
                size="small"
                shape="circular"
                className={style.btn}
                children={<ChevronDownRegular />}
                onClick={(e) => {
                  setShowMenu(!showMenu);
                  e.stopPropagation();
                }} />
            </MenuTrigger>

            <MenuPopover>
              <TableActionMenu
                cell={cell}
                updateCellsByID={updateCellsByID}
                onClose={() => setShowMenu(false)}
                updateTableNode={updateTableNode}
                cellCoordMap={cellCoordMap}
                rows={rows}
                setSortingOptions={setSortingOptions}
                sortingOptions={sortingOptions}
              />
            </MenuPopover>
          </Menu>
        </div>
      )}

      {isSorted && <div className={theme.tableCellSortedIndicator} />}

    </CellComponent>
  );
}

const useStyle = makeStyles({
  prim: {
    position: "relative",
    zIndex: 3
  },
  btn: {
    maxWidth: "unset",
    minWidth: "unset",
    ...shorthands.padding("4px"),
  }
});
