import { Button, DataGridCell, DataGridHeaderCell, Subtitle1, TableColumnDefinition, createTableColumn } from "@fluentui/react-components";
import { AddRegular, ArrowDownRegular, ArrowUpRegular } from "@fluentui/react-icons";
import { DelegateDataGrid } from "~/Components/DelegateDataGrid";
import { MakeCoverCol } from "~/Helpers/CoverCol";
import { Flex } from "~/Helpers/Styles";
import { AdminProductPhotoEdit } from "./Edit";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
interface IPhotoItem {
  Id: number;
  Image: string;
  Caption?: string;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const columns: TableColumnDefinition<IPhotoItem>[] = [
  MakeCoverCol(70),
  createTableColumn<IPhotoItem>({
    columnId: "Caption",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Caption</DataGridHeaderCell>
    },
    renderCell(item) {
      return <DataGridCell>{item.Caption}</DataGridCell>
    }
  }),
  createTableColumn<IPhotoItem>({
    columnId: "Action",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell style={{ flexBasis: "11%", flexGrow: "unset" }}>
          Action
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell style={{ flexBasis: "11%", flexGrow: "unset" }}>
          <Button
            appearance="subtle"
            icon={<ArrowUpRegular />}
          />

          <Button
            appearance="subtle"
            icon={<ArrowDownRegular />}
          />

          <AdminProductPhotoEdit />
        </DataGridCell>
      )
    },
  })
]

const items: IPhotoItem[] = [
  {
    Id: 0,
    Image: "https://picsum.photos/550",
    Caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    Id: 1,
    Image: "https://picsum.photos/650",
    Caption: "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  }
]

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export function AdminProductPhoto() {
  return <>
    <div style={{
      ...Flex,
      justifyContent: "space-between"
    }}>
      <Subtitle1>Photos</Subtitle1>
      <Button appearance="primary" icon={<AddRegular />}>New Image</Button>
    </div>

    <DelegateDataGrid Items={items} Columns={columns} />
  </>
}
