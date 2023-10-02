import { DelegateDataGrid } from "~/Components/DataGrid/Delegate";
import { HistoryColumns } from "./HistoryColumns";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.1
 */
export interface IHistoryItem {
  Id: number;
  Orders: string[];
  Quantity: number;
  Status: string,
  TrackNumber: string,
  OrderDate: Date
}

const items: IHistoryItem[] = [
  {
    Id: 1,
    Orders: ["OTC SHIRT - GREY", "OTC Cap - Cap and Cap"],
    Quantity: 2,
    OrderDate: new Date(),
    TrackNumber: "Number123456789",
    Status: "Finished"
  },
  {
    Id: 2,
    Orders: ["OTC Cap - Cap and Cap"],
    Quantity: 1,
    OrderDate: new Date(),
    TrackNumber: "Number123456789",
    Status: "Finished"
  },
]

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export function History() {
  return (
    <DelegateDataGrid Items={items} Columns={HistoryColumns} />
  )
}
