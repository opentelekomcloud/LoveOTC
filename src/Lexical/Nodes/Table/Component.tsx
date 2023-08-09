import { makeStyles, mergeClasses } from "@fluentui/react-components";
import { $generateJSONFromSelectedNodes, $generateNodesFromSerializedNodes, $insertGeneratedNodes } from "@lexical/clipboard";
import { $generateNodesFromDOM } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import { mergeRegister } from "@lexical/utils";
import type { LexicalNode, RangeSelection, TextFormatType } from "lexical";
import {
  $createParagraphNode,
  $createRangeSelection,
  $getNodeByKey,
  $getRoot,
  $getSelection,
  $isNodeSelection,
  $isRangeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  COPY_COMMAND,
  CUT_COMMAND,
  EditorThemeClasses,
  FORMAT_TEXT_COMMAND,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_LEFT_COMMAND,
  KEY_ARROW_RIGHT_COMMAND,
  KEY_ARROW_UP_COMMAND,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND,
  KEY_TAB_COMMAND,
  LexicalEditor,
  NodeKey,
  PASTE_COMMAND,
  createEditor
} from "lexical";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  ICell, IRow,
  TableNode,
  cellHTMLCache,
  cellTextContentCache,
  createCell,
  createRow,
  exportTableCellsToHTML,
  plainTextEditorJSON
} from ".";
import { CellContext } from "../../Plugins/TablePlugin";
import { createUID } from "../../Utils/createUID";
import { IS_APPLE } from "../../Utils/environment";
import { TableCell } from "./TableCell";

//#region Functions

export type SortOptions = { type: "ascending" | "descending"; x: number };

const NO_CELLS: [] = [];

function $createSelectAll(): RangeSelection {
  const sel = $createRangeSelection();
  sel.focus.set("root", $getRoot().getChildrenSize(), "element");
  return sel;
}

function focusCell(tableElem: HTMLElement, id: string): void {
  const cellElem = tableElem.querySelector(`[data-id=${id}]`) as HTMLElement;
  if (!cellElem)
    return;

  cellElem.focus();
}

function isStartingResize(target: HTMLElement): boolean {
  return target.nodeType === 1 && target.hasAttribute("data-table-resize");
}

function getCurrentDocument(editor: LexicalEditor): Document {
  const rootElement = editor.getRootElement();
  return rootElement ? rootElement.ownerDocument : document;
}

function isCopy(keyCode: number, shiftKey: boolean, metaKey: boolean, ctrlKey: boolean): boolean {
  if (shiftKey)
    return false;

  if (keyCode === 67)
    return IS_APPLE ? metaKey : ctrlKey;

  return false;
}

function isCut(keyCode: number, shiftKey: boolean, metaKey: boolean, ctrlKey: boolean): boolean {
  if (shiftKey)
    return false;

  if (keyCode === 88)
    return IS_APPLE ? metaKey : ctrlKey;

  return false;
}

function isPaste(keyCode: number, shiftKey: boolean, metaKey: boolean, ctrlKey: boolean): boolean {
  if (shiftKey)
    return false;

  if (keyCode === 86)
    return IS_APPLE ? metaKey : ctrlKey;

  return false;
}

function getCellID(domElement: HTMLElement): null | string {
  let node: null | HTMLElement = domElement;
  while (node) {
    const possibleID = node.getAttribute("data-id");
    if (possibleID)
      return possibleID;

    node = node.parentElement;
  }
  return null;
}

function getTableCellWidth(domElement: HTMLElement): number {
  let node: null | HTMLElement = domElement;
  while (node) {
    if (node.nodeName === "TH" || node.nodeName === "TD")
      return node.getBoundingClientRect().width;

    node = node.parentElement;
  }
  return 0;
}

function $updateCells(
  rows: IRow[],
  ids: string[],
  cellCoordMap: Map<string, [number, number]>,
  cellEditor: null | LexicalEditor,
  updateTableNode: (fn2: (tableNode: TableNode) => void) => void,
  fn: () => void
): void {
  for (const id of ids) {
    const cell = getCell(rows, id, cellCoordMap);

    if (cell && cellEditor) {
      const editorState = cellEditor.parseEditorState(cell.json);
      cellEditor._headless = true;
      cellEditor.setEditorState(editorState);
      cellEditor.update(fn, { discrete: true });
      cellEditor._headless = false;

      const newJSON = JSON.stringify(cellEditor.getEditorState());
      updateTableNode((tableNode) => {
        const [x, y] = cellCoordMap.get(id)!;
        tableNode.updateCellJSON(x, y, newJSON);
      });
    }
  }
}

function isTargetOnPossibleUIControl(target: HTMLElement): boolean {
  let node: HTMLElement | null = target;
  while (node) {
    const nodeName = node.nodeName;
    if (
      nodeName === "BUTTON" ||
      nodeName === "INPUT" ||
      nodeName === "TEXTAREA"
    ) return true;

    node = node.parentElement;
  }
  return false;
}

interface IRect {
  startX: number;
  endX: number;
  startY: number;
  endY: number;
}

function getSelectedRect(startID: string, endID: string, cellCoordMap: Map<string, [number, number]>): null | IRect {
  const startCoords = cellCoordMap.get(startID);
  const endCoords = cellCoordMap.get(endID);
  if (!startCoords || !endCoords)
    return null;

  const startX = Math.min(startCoords[0], endCoords[0]);
  const endX = Math.max(startCoords[0], endCoords[0]);
  const startY = Math.min(startCoords[1], endCoords[1]);
  const endY = Math.max(startCoords[1], endCoords[1]);

  return {
    endX,
    endY,
    startX,
    startY,
  };
}

function getSelectedIDs(rows: IRow[], startID: string, endID: string, cellCoordMap: Map<string, [number, number]>): string[] {
  const rect = getSelectedRect(startID, endID, cellCoordMap);
  if (!rect)
    return [];

  const { startX, endY, endX, startY } = rect;
  const ids = [];

  for (let x = startX; x <= endX; x++)
    for (let y = startY; y <= endY; y++)
      ids.push(rows[y].cells[x].id);

  return ids;
}

function extractCellsFromRows(rows: IRow[], rect: IRect): IRow[] {
  const { startX, endY, endX, startY } = rect;
  const newRows: IRow[] = [];

  for (let y = startY; y <= endY; y++) {
    const row = rows[y];
    const newRow = createRow();

    for (let x = startX; x <= endX; x++) {
      const cellClone = { ...row.cells[x] };
      cellClone.id = createUID();
      newRow.cells.push(cellClone);
    }

    newRows.push(newRow);
  }

  return newRows;
}

function getCell(rows: IRow[], cellID: string, cellCoordMap: Map<string, [number, number]>): null | ICell {
  const coords = cellCoordMap.get(cellID);
  if (!coords)
    return null;

  const [x, y] = coords;
  const row = rows[y];
  return row.cells[x];
}

function extractRowsFromHTML(tableElem: HTMLTableElement): IRow[] {
  const rowElems = tableElem.querySelectorAll("tr");
  const rows: IRow[] = [];

  for (let y = 0; y < rowElems.length; y++) {
    const rowElem = rowElems[y];
    const cellElems = rowElem.querySelectorAll("td,th");
    if (!cellElems || cellElems.length === 0)
      continue;

    const cells: ICell[] = [];
    for (let x = 0; x < cellElems.length; x++) {
      const cellElem = cellElems[x] as HTMLElement;
      const isHeader = cellElem.nodeName === "TH";
      const cell = createCell(isHeader ? "header" : "normal");

      cell.json = plainTextEditorJSON(JSON.stringify(cellElem.innerText.replace(/\n/g, " ")));
      cells.push(cell);
    }

    const row = createRow();
    row.cells = cells;
    rows.push(row);
  }

  return rows;
}

function $isTableNode(node: LexicalNode | null | undefined): node is TableNode {
  return node instanceof TableNode;
}

//#endregion

interface ITableComponent {
  nodeKey: NodeKey;
  rows: IRow[];
  theme: EditorThemeClasses;
}

function TableComponent({ nodeKey, rows: rawRows, theme, }: ITableComponent): JSX.Element | null {
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);
  const { cellEditorConfig } = useContext(CellContext);
  const [editor] = useLexicalComposerContext();

  const resizeMeasureRef = useRef<{ size: number; point: number }>({ point: 0, size: 0 });
  const tableResizerRulerRef = useRef<HTMLDivElement>(null);
  const addRowsRef = useRef<HTMLButtonElement>(null);
  const lastCellIDRef = useRef<string | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const mouseDownRef = useRef(false);

  const [primarySelectedCellID, setPrimarySelectedCellID] = useState<null | string>(null);
  const [sortingOptions, setSortingOptions] = useState<null | SortOptions>(null);
  const [selectedCellIDs, setSelectedCellIDs] = useState<string[]>([]);
  const [resizingID, setResizingID] = useState<null | string>(null);
  const [showAddColumns, setShowAddColumns] = useState(false);
  const [showAddRows, setShowAddRows] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  //#region useMemo

  const cellCoordMap = useMemo(() => {
    const map = new Map();

    for (let y = 0; y < rawRows.length; y++) {
      const row = rawRows[y];
      const cells = row.cells;
      for (let x = 0; x < cells.length; x++) {
        const cell = cells[x];
        map.set(cell.id, [x, y]);
      }
    }

    return map;
  }, [rawRows]);

  const rows = useMemo(() => {
    if (!sortingOptions)
      return rawRows;

    const _rows = rawRows.slice(1);
    _rows.sort((a, b) => {
      const aCells = a.cells;
      const bCells = b.cells;
      const x = sortingOptions.x;
      const aContent = cellTextContentCache.get(aCells[x].json);
      const bContent = cellTextContentCache.get(bCells[x].json);
      if (!aContent || !bContent)
        return 1;

      if (sortingOptions.type === "ascending")
        return aContent.localeCompare(bContent);

      return bContent.localeCompare(aContent);
    });

    _rows.unshift(rawRows[0]);
    return _rows;
  }, [rawRows, sortingOptions]);

  const cellEditor = useMemo<null | LexicalEditor>(() => {
    if (!cellEditorConfig)
      return null;

    const _cellEditor = createEditor({
      namespace: cellEditorConfig.namespace,
      nodes: cellEditorConfig.nodes,
      onError: (error) => cellEditorConfig.onError(error, _cellEditor),
      theme: cellEditorConfig.theme,
    });

    return _cellEditor;
  }, [cellEditorConfig]);

  const selectedCellSet = useMemo<Set<string>>(() => new Set(selectedCellIDs), [selectedCellIDs]);

  //#endregion

  //#region useCallback

  const updateTableNode = useCallback((fn: (tableNode: TableNode) => void) => {
    editor.update(() => {
      const tableNode = $getNodeByKey(nodeKey);
      if ($isTableNode(tableNode))
        fn(tableNode);
    });
  }, [editor, nodeKey]);

  const modifySelectedCells = useCallback((x: number, y: number, extend: boolean) => {
    const id = rows[y].cells[x].id;
    lastCellIDRef.current = id;

    if (extend) {
      const selectedIDs = getSelectedIDs(
        rows,
        primarySelectedCellID as string,
        id,
        cellCoordMap
      );
      setSelectedCellIDs(selectedIDs);
    } else {
      setPrimarySelectedCellID(id);
      setSelectedCellIDs(NO_CELLS);
      focusCell(tableRef.current as HTMLElement, id);
    }
  }, [cellCoordMap, primarySelectedCellID, rows]);

  const saveEditorToJSON = useCallback(() => {
    if (cellEditor && primarySelectedCellID) {
      const json = JSON.stringify(cellEditor.getEditorState());
      updateTableNode((tableNode) => {
        const coords = cellCoordMap.get(primarySelectedCellID);
        if (coords === undefined)
          return;

        const [x, y] = coords;
        tableNode.updateCellJSON(x, y, json);
      });
    }
  }, [cellCoordMap, cellEditor, primarySelectedCellID, updateTableNode]);

  const selectTable = useCallback(() => {
    setTimeout(() => {
      const parentRootElement = editor.getRootElement();
      if (parentRootElement) {
        parentRootElement.focus({ preventScroll: true });
        window.getSelection()?.removeAllRanges();
      }
    }, 20);
  }, [editor]);

  const updateCellsByID = useCallback((ids: Array<string>, fn: () => void) => {
    $updateCells(rows, ids, cellCoordMap, cellEditor, updateTableNode, fn);
  }, [cellCoordMap, cellEditor, rows, updateTableNode]);

  const clearCellsCommand = useCallback((): boolean => {
    if (primarySelectedCellID && !isEditing) {
      updateCellsByID([primarySelectedCellID, ...selectedCellIDs], () => {
        const root = $getRoot();
        root.clear();
        root.append($createParagraphNode());
      });

      return true;
    } else if (isSelected)
      updateTableNode((tableNode) => {
        tableNode.selectNext();
        tableNode.remove();
      });

    return false;
  }, [
    isEditing,
    isSelected,
    primarySelectedCellID,
    selectedCellIDs,
    updateCellsByID,
    updateTableNode,
  ]);

  //#endregion

  //#region useEffect

  useEffect(() => {
    const tableElem = tableRef.current;
    if (
      isSelected &&
      document.activeElement === document.body &&
      tableElem
    )
      tableElem.focus();
  }, [isSelected]);

  useEffect(() => {
    const tableElem = tableRef.current;
    if (!tableElem)
      return;

    const doc = getCurrentDocument(editor);

    function isAtEdgeOfTable(event: PointerEvent) {
      const x = event.clientX - tableRect.x;
      const y = event.clientY - tableRect.y;
      return x < 5 || y < 5;
    }

    function handlePointerDown(event: PointerEvent) {
      const possibleID = getCellID(event.target as HTMLElement);

      if (possibleID && editor.isEditable() &&
        tableElem!.contains(event.target as HTMLElement)) {

        if (isAtEdgeOfTable(event)) {
          setSelected(true);
          setPrimarySelectedCellID(null);
          selectTable();
          return;
        }

        setSelected(false);

        if (isStartingResize(event.target as HTMLElement)) {
          setResizingID(possibleID);
          tableElem!.style.userSelect = "none";
          resizeMeasureRef.current = {
            point: event.clientX,
            size: getTableCellWidth(event.target as HTMLElement),
          };
          return;
        }

        mouseDownRef.current = true;

        if (primarySelectedCellID !== possibleID) {
          if (isEditing)
            saveEditorToJSON();

          setPrimarySelectedCellID(possibleID);
          setIsEditing(false);
          lastCellIDRef.current = possibleID;
        } else
          lastCellIDRef.current = null;

        setSelectedCellIDs(NO_CELLS);

      } else if (primarySelectedCellID &&
        !isTargetOnPossibleUIControl(event.target as HTMLElement)) {

        setSelected(false);
        mouseDownRef.current = false;
        if (isEditing)
          saveEditorToJSON();

        setPrimarySelectedCellID(null);
        setSelectedCellIDs(NO_CELLS);
        setIsEditing(false);
        lastCellIDRef.current = null;
      }
    }

    const tableRect = tableElem.getBoundingClientRect();

    function handlePointerMove(event: PointerEvent) {
      if (resizingID) {
        const tableResizerRulerElem = tableResizerRulerRef.current;

        if (tableResizerRulerElem) {
          const { size, point } = resizeMeasureRef.current;
          const diff = event.clientX - point;
          const newWidth = size + diff;
          let x = event.clientX - tableRect.x;

          if (x < 10)
            x = 10;
          else if (x > tableRect.width - 10)
            x = tableRect.width - 10;
          else if (newWidth < 20)
            x = point - size + 20 - tableRect.x;

          tableResizerRulerElem.style.left = `${x}px`;
        }

        return;
      }

      if (!isEditing) {
        const { clientX, clientY } = event;
        const { width, x, y, height } = tableRect;
        const isOnRightEdge = clientX > x + width * 0.9 &&
          clientX < x + width + 40 &&
          !mouseDownRef.current;

        setShowAddColumns(isOnRightEdge);
        const isOnBottomEdge = event.target === addRowsRef.current ||
          (clientY > y + height * 0.85 &&
            clientY < y + height + 5 &&
            !mouseDownRef.current);

        setShowAddRows(isOnBottomEdge);
      }

      if (isEditing ||
        !mouseDownRef.current ||
        !primarySelectedCellID) {
        return;
      }

      const possibleID = getCellID(event.target as HTMLElement);
      if (possibleID && possibleID !== lastCellIDRef.current) {
        if (selectedCellIDs.length === 0)
          tableElem!.style.userSelect = "none";

        const selectedIDs = getSelectedIDs(
          rows,
          primarySelectedCellID,
          possibleID,
          cellCoordMap
        );

        if (selectedIDs.length === 1)
          setSelectedCellIDs(NO_CELLS);
        else
          setSelectedCellIDs(selectedIDs);

        lastCellIDRef.current = possibleID;
      }
    }

    function handlePointerUp(event: PointerEvent) {
      if (resizingID) {
        const { size, point } = resizeMeasureRef.current;
        const diff = event.clientX - point;
        let newWidth = size + diff;
        if (newWidth < 10)
          newWidth = 10;

        updateTableNode((tableNode) => {
          const [x] = cellCoordMap.get(resizingID) as [number, number];
          tableNode.updateColumnWidth(x, newWidth);
        });

        setResizingID(null);
      }

      if (tableElem &&
        selectedCellIDs.length > 1 &&
        mouseDownRef.current) {
        tableElem.style.userSelect = "text";
        window.getSelection()?.removeAllRanges();
      }

      mouseDownRef.current = false;
    }

    doc.addEventListener("pointerdown", handlePointerDown);
    doc.addEventListener("pointermove", handlePointerMove);
    doc.addEventListener("pointerup", handlePointerUp);

    return () => {
      doc.removeEventListener("pointerdown", handlePointerDown);
      doc.removeEventListener("pointermove", handlePointerMove);
      doc.removeEventListener("pointerup", handlePointerUp);
    };
  }, [
    cellEditor,
    editor,
    isEditing,
    rows,
    saveEditorToJSON,
    primarySelectedCellID,
    selectedCellSet,
    selectedCellIDs,
    cellCoordMap,
    resizingID,
    updateTableNode,
    setSelected,
    selectTable,
  ]);

  useEffect((): (() => void) | void => {
    if (!isEditing && primarySelectedCellID) {
      const doc = getCurrentDocument(editor);

      function loadContentIntoCell(cell: ICell | null) {
        if (cell && cellEditor) {
          const editorStateJSON = cell.json;
          const editorState = cellEditor.parseEditorState(editorStateJSON);
          cellEditor.setEditorState(editorState);
        }
      }

      function handleDblClick(event: MouseEvent) {
        const possibleID = getCellID(event.target as HTMLElement);
        if (possibleID === primarySelectedCellID && editor.isEditable()) {
          const cell = getCell(rows, possibleID!, cellCoordMap);
          loadContentIntoCell(cell);
          setIsEditing(true);
          setSelectedCellIDs(NO_CELLS);
        }
      }

      function handleKeyDown(event: KeyboardEvent) {
        // Ignore arrow keys, escape or tab
        const keyCode = event.keyCode;
        if (keyCode === 16 ||
          keyCode === 27 ||
          keyCode === 9 ||
          keyCode === 37 ||
          keyCode === 38 ||
          keyCode === 39 ||
          keyCode === 40 ||
          keyCode === 8 ||
          keyCode === 46 ||
          !editor.isEditable())
          return;

        if (keyCode === 13)
          event.preventDefault();

        if (!isEditing &&
          primarySelectedCellID &&
          editor.getEditorState().read(() => !$getSelection()) &&
          (event.target as HTMLElement).contentEditable !== "true") {

          if (isCopy(keyCode, event.shiftKey, event.metaKey, event.ctrlKey)) {
            editor.dispatchCommand(COPY_COMMAND, event);
            return;
          }

          if (isCut(keyCode, event.shiftKey, event.metaKey, event.ctrlKey)) {
            editor.dispatchCommand(CUT_COMMAND, event);
            return;
          }

          if (isPaste(keyCode, event.shiftKey, event.metaKey, event.ctrlKey)) {
            editor.dispatchCommand(PASTE_COMMAND, event);
            return;
          }
        }

        if (event.metaKey || event.ctrlKey || event.altKey)
          return;

        const cell = getCell(rows, primarySelectedCellID!, cellCoordMap);
        loadContentIntoCell(cell);
        setIsEditing(true);
        setSelectedCellIDs(NO_CELLS);
      }

      doc.addEventListener("dblclick", handleDblClick);
      doc.addEventListener("keydown", handleKeyDown);

      return () => {
        doc.removeEventListener("dblclick", handleDblClick);
        doc.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [
    cellEditor,
    editor,
    isEditing,
    rows,
    primarySelectedCellID,
    cellCoordMap,
  ]);

  useEffect(() => {
    const tableElem = tableRef.current;
    if (!tableElem)
      return;

    function copyDataToClipboard(
      event: ClipboardEvent,
      htmlString: string,
      lexicalString: string,
      plainTextString: string) {

      const clipboardData = event instanceof KeyboardEvent ? null : event.clipboardData;
      event.preventDefault();

      if (clipboardData) {
        clipboardData.setData("text/html", htmlString);
        clipboardData.setData("text/plain", plainTextString);
        clipboardData.setData("application/x-lexical-editor", lexicalString);
      } else {
        const clipboard = navigator.clipboard;
        if (clipboard) {
          // Most browsers only support a single item in the clipboard at one time.
          // So we optimize by only putting in HTML.
          const data = [
            new ClipboardItem({
              "text/html": new Blob([htmlString as BlobPart], {
                type: "text/html",
              }),
            }),
          ];
          clipboard.write(data);
        }
      }
    }

    async function getTypeFromObject(clipboardData: DataTransfer | ClipboardItem, type: string): Promise<string> {
      try {
        return clipboardData instanceof DataTransfer
          ? clipboardData.getData(type)
          : clipboardData instanceof ClipboardItem
            ? await (await clipboardData.getType(type)).text()
            : "";
      } catch {
        return "";
      }
    }

    async function pasteContent(event: ClipboardEvent) {
      let clipboardData: null | DataTransfer | ClipboardItem = (event instanceof InputEvent ? null : event.clipboardData) || null;

      if (primarySelectedCellID && cellEditor) {
        event.preventDefault();

        if (!clipboardData) {
          try {
            const items = await navigator.clipboard.read();
            clipboardData = items[0];
          } catch { }
        }

        const lexicalString = clipboardData
          ? await getTypeFromObject(clipboardData, "application/x-lexical-editor") : "";

        if (lexicalString) {
          try {
            const payload = JSON.parse(lexicalString);
            if (payload.namespace === editor._config.namespace &&
              Array.isArray(payload.nodes)) {

              $updateCells(
                rows,
                [primarySelectedCellID],
                cellCoordMap,
                cellEditor,
                updateTableNode,
                () => {
                  const root = $getRoot();
                  root.clear();
                  root.append($createParagraphNode());
                  root.selectEnd();
                  const nodes = $generateNodesFromSerializedNodes(
                    payload.nodes
                  );
                  const sel = $getSelection();
                  if ($isRangeSelection(sel)) {
                    $insertGeneratedNodes(cellEditor, nodes, sel);
                  }
                }
              );

              return;
            }
          } catch { }
        }

        const htmlString = clipboardData
          ? await getTypeFromObject(clipboardData, "text/html")
          : "";

        if (htmlString) {
          try {
            const parser = new DOMParser();
            const dom = parser.parseFromString(htmlString, "text/html");
            const possibleTableElement = dom.querySelector("table");

            if (possibleTableElement) {
              const pasteRows = extractRowsFromHTML(possibleTableElement);
              updateTableNode((tableNode) => {
                const [x, y] = cellCoordMap.get(primarySelectedCellID) as [
                  number,
                  number
                ];
                tableNode.mergeRows(x, y, pasteRows);
              });

              return;
            }

            $updateCells(
              rows,
              [primarySelectedCellID],
              cellCoordMap,
              cellEditor,
              updateTableNode,
              () => {
                const root = $getRoot();
                root.clear();
                root.append($createParagraphNode());
                root.selectEnd();
                const nodes = $generateNodesFromDOM(editor, dom);
                const sel = $getSelection();
                if ($isRangeSelection(sel)) {
                  $insertGeneratedNodes(cellEditor, nodes, sel);
                }
              }
            );

            return;
            // eslint-disable-next-line no-empty
          } catch { }
        }

        // Multi-line plain text in rich text mode pasted as separate paragraphs
        // instead of single paragraph with linebreaks.
        const text = clipboardData
          ? await getTypeFromObject(clipboardData, "text/plain")
          : "";

        if (text)
          $updateCells(
            rows,
            [primarySelectedCellID],
            cellCoordMap,
            cellEditor,
            updateTableNode,
            () => {
              const root = $getRoot();
              root.clear();
              root.selectEnd();
              const sel = $getSelection();
              if (sel)
                sel.insertRawText(text);
            }
          );
      }
    }

    function copyPrimaryCell(event: ClipboardEvent) {
      if (primarySelectedCellID && cellEditor) {
        const cell = getCell(rows, primarySelectedCellID, cellCoordMap) as ICell;
        const json = cell.json;
        const htmlString = cellHTMLCache.get(json) || null;
        if (!htmlString)
          return;

        const editorState = cellEditor.parseEditorState(json);
        const plainTextString = editorState.read(() => $getRoot().getTextContent());

        const lexicalString = editorState.read(() => JSON.stringify(
          $generateJSONFromSelectedNodes(cellEditor, null)
        ));

        copyDataToClipboard(event, htmlString, lexicalString, plainTextString);
      }
    }

    function copyCellRange(event: ClipboardEvent) {
      const lastCellID = lastCellIDRef.current;
      if (primarySelectedCellID &&
        cellEditor && lastCellID) {

        const rect = getSelectedRect(
          primarySelectedCellID,
          lastCellID,
          cellCoordMap
        );
        if (!rect)
          return;

        const dom = exportTableCellsToHTML(rows, rect);
        const htmlString = dom.outerHTML;
        const plainTextString = dom.outerText;

        const tableNodeJSON = editor.getEditorState().read(() => {
          const tableNode = $getNodeByKey(nodeKey) as TableNode;
          return tableNode.exportJSON();
        });

        tableNodeJSON.rows = extractCellsFromRows(rows, rect);
        const lexicalJSON = {
          namespace: cellEditor._config.namespace,
          nodes: [tableNodeJSON],
        };
        const lexicalString = JSON.stringify(lexicalJSON);

        copyDataToClipboard(event, htmlString, lexicalString, plainTextString);
      }
    }

    function handlePaste(event: ClipboardEvent, activeEditor: LexicalEditor) {
      const selection = $getSelection();

      if (primarySelectedCellID &&
        !isEditing &&
        !selection &&
        activeEditor === editor) {
        pasteContent(event);
        mouseDownRef.current = false;
        setSelectedCellIDs(NO_CELLS);
        return true;
      }

      return false;
    }

    function handleCopy(event: ClipboardEvent, activeEditor: LexicalEditor) {
      const selection = $getSelection();
      if (primarySelectedCellID &&
        !isEditing && !selection &&
        activeEditor === editor) {

        if (selectedCellIDs.length === 0)
          copyPrimaryCell(event);
        else
          copyCellRange(event);

        return true;
      }

      return false;
    }

    return mergeRegister(
      editor.registerCommand(
        CLICK_COMMAND,
        (payload) => {
          const selection = $getSelection();
          if ($isNodeSelection(selection))
            return true;

          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<ClipboardEvent>(
        PASTE_COMMAND,
        handlePaste,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<ClipboardEvent>(
        COPY_COMMAND,
        handleCopy,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<ClipboardEvent>(
        CUT_COMMAND,
        (event: ClipboardEvent, activeEditor) => {
          if (handleCopy(event, activeEditor)) {
            clearCellsCommand();
            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<KeyboardEvent>(
        KEY_BACKSPACE_COMMAND,
        clearCellsCommand,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<KeyboardEvent>(
        KEY_DELETE_COMMAND,
        clearCellsCommand,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<TextFormatType>(
        FORMAT_TEXT_COMMAND,
        (payload) => {
          if (primarySelectedCellID && !isEditing) {
            $updateCells(
              rows,
              [primarySelectedCellID, ...selectedCellIDs],
              cellCoordMap,
              cellEditor,
              updateTableNode,
              () => {
                const sel = $createSelectAll();
                sel.formatText(payload);
              }
            );

            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<KeyboardEvent>(
        KEY_ENTER_COMMAND,
        (event, targetEditor) => {
          const selection = $getSelection();
          if (
            !primarySelectedCellID &&
            !isEditing &&
            $isNodeSelection(selection) &&
            selection.has(nodeKey) &&
            selection.getNodes().length === 1 &&
            targetEditor === editor
          ) {
            const firstCellID = rows[0].cells[0].id;
            setPrimarySelectedCellID(firstCellID);
            focusCell(tableElem, firstCellID);
            event.preventDefault();
            event.stopPropagation();
            clearSelection();

            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<KeyboardEvent>(
        KEY_TAB_COMMAND,
        (event) => {
          const selection = $getSelection();
          if (
            !isEditing &&
            !selection &&
            primarySelectedCellID
          ) {
            const isBackward = event.shiftKey;
            const [x, y] = cellCoordMap.get(primarySelectedCellID) as [
              number,
              number
            ];

            event.preventDefault();
            let nextX = null;
            let nextY = null;

            if (x === 0 && isBackward) {
              if (y !== 0) {
                nextY = y - 1;
                nextX = rows[nextY].cells.length - 1;
              }
            } else if (x === rows[y].cells.length - 1 && !isBackward) {
              if (y !== rows.length - 1) {
                nextY = y + 1;
                nextX = 0;
              }
            } else if (!isBackward) {
              nextX = x + 1;
              nextY = y;
            } else {
              nextX = x - 1;
              nextY = y;
            }

            if (nextX && nextY) {
              modifySelectedCells(nextX, nextY, false);
              return true;
            }
          }

          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<KeyboardEvent>(
        KEY_ARROW_UP_COMMAND,
        (event, targetEditor) => {
          const selection = $getSelection();
          if (!isEditing && !selection) {
            const extend = event.shiftKey;
            const cellID = extend
              ? lastCellIDRef.current || primarySelectedCellID
              : primarySelectedCellID;

            if (cellID) {
              const [x, y] = cellCoordMap.get(cellID) as [number, number];
              if (y !== 0) {
                modifySelectedCells(x, y - 1, extend);
                return true;
              }
            }
          }

          if (!$isRangeSelection(selection) || targetEditor !== cellEditor)
            return false;

          if (
            selection.isCollapsed() &&
            !selection.anchor
              .getNode()
              .getTopLevelElementOrThrow()
              .getPreviousSibling()
          ) {
            event.preventDefault();
            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<KeyboardEvent>(
        KEY_ARROW_DOWN_COMMAND,
        (event, targetEditor) => {
          const selection = $getSelection();
          if (!isEditing && !selection) {
            const extend = event.shiftKey;
            const cellID = extend
              ? lastCellIDRef.current || primarySelectedCellID
              : primarySelectedCellID;

            if (cellID) {
              const [x, y] = cellCoordMap.get(cellID) as [number, number];
              if (y !== rows.length - 1) {
                modifySelectedCells(x, y + 1, extend);
                return true;
              }
            }
          }

          if (!$isRangeSelection(selection) || targetEditor !== cellEditor)
            return false;

          if (
            selection.isCollapsed() &&
            !selection.anchor
              .getNode()
              .getTopLevelElementOrThrow()
              .getNextSibling()
          ) {
            event.preventDefault();
            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<KeyboardEvent>(
        KEY_ARROW_LEFT_COMMAND,
        (event, targetEditor) => {
          const selection = $getSelection();
          if (!isEditing && !selection) {
            const extend = event.shiftKey;
            const cellID = extend
              ? lastCellIDRef.current || primarySelectedCellID
              : primarySelectedCellID;

            if (cellID) {
              const [x, y] = cellCoordMap.get(cellID) as [number, number];
              if (x !== 0) {
                modifySelectedCells(x - 1, y, extend);
                return true;
              }
            }
          }

          if (!$isRangeSelection(selection) || targetEditor !== cellEditor)
            return false;

          if (selection.isCollapsed() && selection.anchor.offset === 0) {
            event.preventDefault();
            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<KeyboardEvent>(
        KEY_ARROW_RIGHT_COMMAND,
        (event, targetEditor) => {
          const selection = $getSelection();
          if (!isEditing && !selection) {
            const extend = event.shiftKey;
            const cellID = extend
              ? lastCellIDRef.current || primarySelectedCellID
              : primarySelectedCellID;

            if (cellID) {
              const [x, y] = cellCoordMap.get(cellID) as [number, number];
              if (x !== rows[y].cells.length - 1) {
                modifySelectedCells(x + 1, y, extend);
                return true;
              }
            }
          }

          if (!$isRangeSelection(selection) || targetEditor !== cellEditor)
            return false;

          if (selection.isCollapsed()) {
            const anchor = selection.anchor;
            if (
              (anchor.type === "text" &&
                anchor.offset === anchor.getNode().getTextContentSize()) ||
              (anchor.type === "element" &&
                anchor.offset === anchor.getNode().getChildrenSize())
            ) {
              event.preventDefault();
              return true;
            }
          }

          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<KeyboardEvent>(
        KEY_ESCAPE_COMMAND,
        (event, targetEditor) => {
          const selection = $getSelection();

          if (!isEditing && !selection && targetEditor === editor) {
            setSelected(true);
            setPrimarySelectedCellID(null);
            selectTable();
            return true;
          }

          if (!$isRangeSelection(selection))
            return false;

          if (isEditing) {
            saveEditorToJSON();
            setIsEditing(false);
            if (primarySelectedCellID) {
              setTimeout(() => {
                focusCell(tableElem, primarySelectedCellID);
              }, 20);
            }
            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [
    cellCoordMap,
    cellEditor,
    clearCellsCommand,
    clearSelection,
    editor,
    isEditing,
    modifySelectedCells,
    nodeKey,
    primarySelectedCellID,
    rows,
    saveEditorToJSON,
    selectTable,
    selectedCellIDs,
    setSelected,
    updateTableNode,
  ]);

  //#endregion

  function addColumns() {
    updateTableNode((tableNode) => {
      tableNode.addColumns(1);
    });
  }

  function addRows() {
    updateTableNode((tableNode) => {
      tableNode.addRows(1);
    });
  }

  if (!cellEditor)
    return null;

  const style = useStyle();

  return (
    <div className={style.box}>
      <table
        className={mergeClasses(theme.table, isSelected && theme.tableSelected)}
        ref={tableRef}
        tabIndex={-1}
      >
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className={theme.tableRow}>
              {row.cells.map((cell) => {
                const { id } = cell;
                return (
                  <TableCell
                    key={id}
                    cell={cell}
                    theme={theme}
                    isSelected={selectedCellSet.has(id)}
                    isPrimarySelected={primarySelectedCellID === id}
                    isEditing={isEditing}
                    sortingOptions={sortingOptions}
                    cellEditor={cellEditor}
                    updateCellsByID={updateCellsByID}
                    updateTableNode={updateTableNode}
                    cellCoordMap={cellCoordMap}
                    rows={rows}
                    setSortingOptions={setSortingOptions}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {showAddColumns &&
        <button className={theme.tableAddColumns} onClick={addColumns} />}

      {showAddRows &&
        <button
          className={theme.tableAddRows}
          onClick={addRows}
          ref={addRowsRef}
        />}

      {resizingID &&
        <div className={theme.tableResizeRuler} ref={tableResizerRulerRef} />}
    </div>
  );
}

const useStyle = makeStyles({
  box: { position: "relative" }
});

/** @deprecated */
export default TableComponent;
