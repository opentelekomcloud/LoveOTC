import { Button, DataGridCell, DataGridHeaderCell, Subtitle1, TableColumnDefinition, Toast, ToastTitle, createTableColumn, makeStyles } from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";
import { DelegateDataGrid } from "~/Components/DataGrid";
import { MakeCoverCol } from "~/Helpers/CoverCol";
import { Logger } from "~/Helpers/Logger";
import { Flex } from "~/Helpers/Styles";
import { useErrorToast } from "~/Helpers/useToast";
import { Hub } from "~/ShopNet";
import { AdminHub } from "~/ShopNet/Admin";
import { AdminProductPhotoAction } from "./Action";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  f11: {
    flexBasis: "11%",
    flexGrow: 0
  },
  box: {
    ...Flex,
    justifyContent: "space-between"
  }
});

const log = new Logger("Admin", "Product", "Detail", "Photo");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.3.0
 */
export interface IPhotoItem {
  PhotoId: number;
  ProductId: number;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 1.0.0
 */
const columns: TableColumnDefinition<IPhotoItem>[] = [
  MakeCoverCol(70, log, ({ PhotoId }) => {
    const { data } = Hub.Product.Get.usePhoto(PhotoId, {
      onError: log.error
    });
    return data?.ObjectId || "";
  }),
  createTableColumn({
    columnId: "Caption",
    renderHeaderCell: () => {
      return <DataGridHeaderCell>Caption</DataGridHeaderCell>
    },
    renderCell({ PhotoId }) {
      const { data } = Hub.Product.Get.usePhoto(PhotoId, {
        onError: log.error
      });
      return <DataGridCell>{data?.Caption || "No Caption"}</DataGridCell>
    }
  }),
  createTableColumn({
    columnId: "Action",
    renderHeaderCell: () => {
      return (
        <DataGridHeaderCell className={useStyles().f11}>
          Action
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      return (
        <DataGridCell className={useStyles().f11}>
          <AdminProductPhotoAction {...item} ParentLog={log} />
        </DataGridCell>
      )
    },
  })
]

/**
 * @author Aloento
 * @since 0.5.0
 * @version 1.2.0
 */
export function AdminProductPhoto({ ProdId }: { ProdId: number }) {
  const { data } = Hub.Product.Get.usePhotoList(ProdId, {
    onError: log.error
  });

  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run: newPhoto, loading } = AdminHub.Product.Post.usePhoto(ProdId, log, {
    onBefore([file]) {
      dispatchToast(
        <Toast>
          <ToastTitle>Uploading Photo {file.name} for Product {ProdId}</ToastTitle>
        </Toast>,
        { intent: "info" }
      );
    },
    onError(e, params) {
      dispatch({
        Message: "Failed Upload Photo",
        Request: params,
        Error: e
      });
    },
    onSuccess() {
      dispatchToast(
        <Toast>
          <ToastTitle>Photo Uploaded</ToastTitle>
        </Toast>,
        { intent: "success" }
      );
    }
  });

  return <>
    <div className={useStyles().box}>
      <Subtitle1>Photos</Subtitle1>

      <Button
        disabled={loading}
        appearance="primary"
        icon={<AddRegular />}
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";

          input.onchange = () => {
            if (input.files)
              newPhoto(input.files[0]);
          };
          input.click();
        }}
      >
        {loading ? "Uploading..." : "New Image"}
      </Button>
    </div>

    <DelegateDataGrid
      Items={data?.map(x => ({
        PhotoId: x,
        ProductId: ProdId
      }))}
      Columns={columns}
      getRowId={x => x.PhotoId}
    />
  </>
}
