import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  LexicalEditor, NodeKey,
  SerializedLexicalNode,
  Spread
} from "lexical";
import { DecoratorNode } from "lexical";
import { Suspense, lazy } from "react";
import { createUID } from "../../Utils/createUID";

//#region Functions

export interface ICell {
  colSpan: number;
  json: string;
  type: "normal" | "header";
  id: string;
  width: number | null;
}

export interface IRow {
  cells: ICell[];
  height: null | number;
  id: string;
}

export const cellHTMLCache: Map<string, string> = new Map();
export const cellTextContentCache: Map<string, string> = new Map();

const emptyEditorJSON =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

export function plainTextEditorJSON(text: string) {
  return text
    ? `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":${text},"type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`
    : emptyEditorJSON;
}

export function createCell(type: "normal" | "header"): ICell {
  return {
    colSpan: 1,
    id: createUID(),
    json: emptyEditorJSON,
    type,
    width: null,
  };
}

export function createRow(): IRow {
  return {
    cells: [],
    height: null,
    id: createUID(),
  };
}

export type SerializedTableNode = Spread<
  {
    rows: IRow[];
    type: "tablesheet";
    version: 1;
  },
  SerializedLexicalNode
>;

function convertTableElement(domNode: HTMLElement): null | DOMConversionOutput {
  const rowElems = domNode.querySelectorAll("tr");
  if (!rowElems || rowElems.length === 0)
    return null;

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

  return { node: $createTableNode(rows) };
}

export function exportTableCellsToHTML(rows: IRow[], rect?: { startX: number; endX: number; startY: number; endY: number }): HTMLElement {
  const table = document.createElement("table");
  const colGroup = document.createElement("colgroup");
  const tBody = document.createElement("tbody");
  const firstRow = rows[0];

  for (
    let x = rect ? rect.startX : 0;
    x < (rect ? rect.endX + 1 : firstRow.cells.length);
    x++
  ) {
    const col = document.createElement("col");
    colGroup.append(col);
  }

  for (
    let y = rect ? rect.startY : 0;
    y < (rect ? rect.endY + 1 : rows.length);
    y++
  ) {
    const row = rows[y];
    const cells = row.cells;
    const rowElem = document.createElement("tr");

    for (
      let x = rect ? rect.startX : 0;
      x < (rect ? rect.endX + 1 : cells.length);
      x++
    ) {
      const cell = cells[x];
      const cellElem = document.createElement(cell.type === "header" ? "th" : "td");

      cellElem.innerHTML = cellHTMLCache.get(cell.json) || "";
      rowElem.appendChild(cellElem);
    }
    tBody.appendChild(rowElem);
  }

  table.appendChild(colGroup);
  table.appendChild(tBody);
  return table;
}

function $createTableNode(rows: IRow[]): TableNode {
  return new TableNode(rows);
}

//#endregion

export class TableNode extends DecoratorNode<JSX.Element> {
  public static override getType(): string {
    return "tablesheet";
  }

  public static override clone(node: TableNode): TableNode {
    return new TableNode(Array.from(node.rows), node.__key);
  }

  public static override importJSON(serializedNode: SerializedTableNode): TableNode {
    return $createTableNode(serializedNode.rows);
  }

  public override exportJSON(): SerializedTableNode {
    return {
      rows: this.rows,
      type: "tablesheet",
      version: 1,
    };
  }

  public static importDOM(): DOMConversionMap | null {
    return {
      table: (_node: Node) => ({
        conversion: convertTableElement,
        priority: 0,
      }),
    };
  }

  public override exportDOM(): DOMExportOutput {
    return { element: exportTableCellsToHTML(this.rows) };
  }

  public constructor(private rows: IRow[] = [], key?: NodeKey) {
    super(key);
  }

  public override createDOM(): HTMLElement {
    const div = document.createElement("div");
    div.style.display = "contents";
    return div;
  }

  public override updateDOM(): false {
    return false;
  }

  public mergeRows(startX: number, startY: number, mergeRows: IRow[]): void {
    const self = this.getWritable();
    const rows = self.rows;
    const endY = Math.min(rows.length, startY + mergeRows.length);

    for (let y = startY; y < endY; y++) {
      const row = rows[y];
      const mergeRow = mergeRows[y - startY];
      const cells = row.cells;
      const cellsClone = Array.from(cells);
      const rowClone = { ...row, cells: cellsClone };
      const mergeCells = mergeRow.cells;
      const endX = Math.min(cells.length, startX + mergeCells.length);

      for (let x = startX; x < endX; x++) {
        const cell = cells[x];
        const mergeCell = mergeCells[x - startX];
        const cellClone = {
          ...cell,
          json: mergeCell.json,
          type: mergeCell.type,
        };
        cellsClone[x] = cellClone;
      }

      rows[y] = rowClone;
    }
  }

  public updateCellJSON(x: number, y: number, json: string): void {
    const self = this.getWritable();
    const rows = self.rows;
    const row = rows[y];
    const cells = row.cells;
    const cell = cells[x];
    const cellsClone = Array.from(cells);
    const cellClone = { ...cell, json };
    const rowClone = { ...row, cells: cellsClone };

    cellsClone[x] = cellClone;
    rows[y] = rowClone;
  }

  public updateCellType(x: number, y: number, type: "header" | "normal"): void {
    const self = this.getWritable();
    const rows = self.rows;
    const row = rows[y];
    const cells = row.cells;
    const cell = cells[x];
    const cellsClone = Array.from(cells);
    const cellClone = { ...cell, type };
    const rowClone = { ...row, cells: cellsClone };

    cellsClone[x] = cellClone;
    rows[y] = rowClone;
  }

  public insertColumnAt(x: number): void {
    const self = this.getWritable();
    const rows = self.rows;

    for (let y = 0; y < rows.length; y++) {
      const row = rows[y];
      const cells = row.cells;
      const cellsClone = Array.from(cells);
      const rowClone = { ...row, cells: cellsClone };
      const type = (cells[x] || cells[x - 1]).type;

      cellsClone.splice(x, 0, createCell(type));
      rows[y] = rowClone;
    }
  }

  public deleteColumnAt(x: number): void {
    const self = this.getWritable();
    const rows = self.rows;

    for (let y = 0; y < rows.length; y++) {
      const row = rows[y];
      const cells = row.cells;
      const cellsClone = Array.from(cells);
      const rowClone = { ...row, cells: cellsClone };

      cellsClone.splice(x, 1);
      rows[y] = rowClone;
    }
  }

  public addColumns(count: number): void {
    const self = this.getWritable();
    const rows = self.rows;

    for (let y = 0; y < rows.length; y++) {
      const row = rows[y];
      const cells = row.cells;
      const cellsClone = Array.from(cells);
      const rowClone = { ...row, cells: cellsClone };
      const type = cells[cells.length - 1].type;

      for (let x = 0; x < count; x++)
        cellsClone.push(createCell(type));

      rows[y] = rowClone;
    }
  }

  public insertRowAt(y: number): void {
    const self = this.getWritable();
    const rows = self.rows;
    const prevRow = rows[y] || rows[y - 1];
    const cellCount = prevRow.cells.length;
    const row = createRow();

    for (let x = 0; x < cellCount; x++) {
      const cell = createCell(prevRow.cells[x].type);
      row.cells.push(cell);
    }

    rows.splice(y, 0, row);
  }

  public deleteRowAt(y: number): void {
    const self = this.getWritable();
    const rows = self.rows;
    rows.splice(y, 1);
  }

  public addRows(count: number): void {
    const self = this.getWritable();
    const rows = self.rows;
    const prevRow = rows[rows.length - 1];
    const cellCount = prevRow.cells.length;

    for (let y = 0; y < count; y++) {
      const row = createRow();
      for (let x = 0; x < cellCount; x++) {
        const cell = createCell(prevRow.cells[x].type);
        row.cells.push(cell);
      }
      rows.push(row);
    }
  }

  public updateColumnWidth(x: number, width: number): void {
    const self = this.getWritable();
    const rows = self.rows;

    for (let y = 0; y < rows.length; y++) {
      const row = rows[y];
      const cells = row.cells;
      const cellsClone = Array.from(cells);
      const rowClone = { ...row, cells: cellsClone };

      cellsClone[x].width = width;
      rows[y] = rowClone;
    }
  }

  public override decorate(_: LexicalEditor, config: EditorConfig): JSX.Element {
    return (
      <Suspense>
        <TableComponent
          nodeKey={this.__key}
          theme={config.theme}
          rows={this.rows}
        />
      </Suspense>
    );
  }

  public override isInline(): false {
    return false;
  }
}

const TableComponent = lazy(() => import("./Component"));
