import { MenuDivider, MenuItem, MenuList } from "@fluentui/react-components";
import { $createParagraphNode, $getRoot } from "lexical";
import { ICell, IRow, TableNode } from ".";
import { SortOptions } from "./Component";

interface ITableActionMenu {
  cell: ICell;
  updateCellsByID: (ids: Array<string>, fn: () => void) => void;
  onClose: () => void;
  updateTableNode: (fn2: (tableNode: TableNode) => void) => void;
  cellCoordMap: Map<string, [number, number]>;
  rows: IRow[];
  setSortingOptions: (options: null | SortOptions) => void;
  sortingOptions: null | SortOptions;
}

export function TableActionMenu({
  cell, rows, cellCoordMap, updateCellsByID, onClose, updateTableNode, setSortingOptions, sortingOptions,
}: ITableActionMenu) {
  const coords = cellCoordMap.get(cell.id);
  if (!coords)
    return null;

  const [x, y] = coords;

  const header: JSX.Element[] = [];

  if (cell.type === "header" && y === 0) {
    if (sortingOptions && sortingOptions.x === x)
      header.push(
        <MenuItem onClick={() => {
          setSortingOptions(null);
          onClose();
        }}>
          Remove Sorting
        </MenuItem>
      );

    if (!sortingOptions ||
      sortingOptions.x !== x ||
      sortingOptions.type === "descending")
      header.push(
        <MenuItem onClick={() => {
          setSortingOptions({ type: "ascending", x });
          onClose();
        }}>
          Sort Ascending
        </MenuItem>
      );

    if (!sortingOptions ||
      sortingOptions.x !== x ||
      sortingOptions.type === "ascending")
      header.push(
        <MenuItem onClick={() => {
          setSortingOptions({ type: "descending", x });
          onClose();
        }}>
          Sort Descending
        </MenuItem>
      );

    header.push(<MenuDivider />);
  }

  return (
    <MenuList>
      <MenuItem
        onClick={() => {
          updateTableNode((tableNode) => {
            tableNode.updateCellType(
              x, y,
              cell.type === "normal" ? "header" : "normal"
            );
          });
          onClose();
        }}>
        {cell.type === "normal" ? "Make header" : "Remove header"}
      </MenuItem>

      <MenuItem
        onClick={() => {
          updateCellsByID([cell.id], () => {
            const root = $getRoot();
            root.clear();
            root.append($createParagraphNode());
          });
          onClose();
        }}>
        Clear Cell
      </MenuItem>

      <MenuDivider />

      {header}

      <MenuItem onClick={() => {
        updateTableNode((tableNode) => {
          tableNode.insertRowAt(y);
        });
        onClose();
      }}>
        Insert row above
      </MenuItem>

      <MenuItem onClick={() => {
        updateTableNode((tableNode) => {
          tableNode.insertRowAt(y + 1);
        });
        onClose();
      }}>
        Insert row below
      </MenuItem>

      <MenuDivider />

      <MenuItem onClick={() => {
        updateTableNode((tableNode) => {
          tableNode.insertColumnAt(x);
        });
        onClose();
      }}>
        Insert column left
      </MenuItem>

      <MenuItem onClick={() => {
        updateTableNode((tableNode) => {
          tableNode.insertColumnAt(x + 1);
        });
        onClose();
      }}>
        Insert column right
      </MenuItem>

      <MenuDivider />

      {rows[0].cells.length !== 1 &&
        <MenuItem onClick={() => {
          updateTableNode((tableNode) => {
            tableNode.deleteColumnAt(x);
          });
          onClose();
        }}>
          Delete column
        </MenuItem>
      }

      {rows.length !== 1 &&
        <MenuItem onClick={() => {
          updateTableNode((tableNode) => {
            tableNode.deleteRowAt(y);
          });
          onClose();
        }}>
          Delete row
        </MenuItem>
      }

      <MenuItem onClick={() => {
        updateTableNode((tableNode) => {
          tableNode.selectNext();
          tableNode.remove();
        });
        onClose();
      }}>
        Delete table
      </MenuItem>
    </MenuList>
  );
}
