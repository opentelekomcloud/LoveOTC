import { DataGridCell, DataGridHeaderCell, TableColumnDefinition, createTableColumn } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { DelegateDataGrid } from "~/Components/DataGrid";
import { Logger } from "~/Helpers/Logger";
import { AdminHub } from "~/ShopNet/Admin";
import { AdminUserDelete } from "./Delete";
import { AdminUserGrant } from "./Grant";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export interface IUserItem {
  Id: string;
  Name: string;
  EMail: string;
  Admin?: boolean;
}

const log = new Logger("Admin", "User");

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.3.0
 */
const columns: TableColumnDefinition<IUserItem>[] = [
  createTableColumn<IUserItem>({
    columnId: "Id",
    renderHeaderCell: () => "Id",
    renderCell(item) {
      return item.Id;
    }
  }),
  createTableColumn<IUserItem>({
    columnId: "Name",
    renderHeaderCell: () => "Real Name",
    renderCell(item) {
      return item.Name;
    }
  }),
  createTableColumn<IUserItem>({
    columnId: "Email",
    renderHeaderCell: () => "E-Mail",
    renderCell(item) {
      return item.EMail;
    }
  }),
  createTableColumn<IUserItem>({
    columnId: "Admin",
    renderHeaderCell: () => "Admin",
    renderCell(item) {
      return <AdminUserGrant UserId={item.Id} Admin={item.Admin} Refresh={refreshUser} />
    },
  }),
  createTableColumn<IUserItem>({
    columnId: "Delete",
    renderHeaderCell: () => "Delete",
    renderCell(item) {
      return <AdminUserDelete UserId={item.Id} Refresh={refreshUser} />
    },
  })
].map(({ renderHeaderCell, renderCell, ...col }) => ({
  ...col,
  renderHeaderCell: () => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>,
  renderCell: (item) => <DataGridCell>{renderCell(item)}</DataGridCell>
}))

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
let refreshUser: () => void;

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.2
 */
export function AdminUser() {
  const { data, run } = useRequest(() => AdminHub.User.Get.List(), {
    onError: log.error
  });
  refreshUser = run;

  return (
    <DelegateDataGrid Items={data} Columns={columns} />
  )
}
