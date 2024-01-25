import { Button, DataGridCell, DataGridHeaderCell, Subtitle1, TableColumnDefinition, Toast, ToastTitle, createTableColumn, makeStyles } from "@fluentui/react-components";
import { AddRegular, ArrowDownRegular, ArrowUpRegular } from "@fluentui/react-icons";
import { useLiveQuery } from "dexie-react-hooks";
import { DelegateDataGrid } from "~/Components/DataGrid";
import { MakeCoverCol } from "~/Helpers/CoverCol";
import { Logger } from "~/Helpers/Logger";
import { Flex } from "~/Helpers/Styles";
import { useErrorToast } from "~/Helpers/useToast";
import { Hub } from "~/ShopNet";
import { AdminHub } from "~/ShopNet/Admin";
import { AdminProductPhotoEdit } from "./Edit";

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
 * @version 0.2.0
 */
export interface IPhotoItem {
  /** PhotoId */
  Id: number;
  /** ObjectId */
  Cover: string;
  Caption?: string;
  ProductId: number;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.3
 */
const columns: TableColumnDefinition<IPhotoItem>[] = [
  MakeCoverCol(70, log),
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
        <DataGridHeaderCell className={useStyles().f11}>
          Action
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      const { dispatch } = useErrorToast(log);

      const { run } = AdminHub.Product.Post.useMovePhoto({
        manual: true,
        onError(e, params) {
          dispatch({
            Message: "Failed Update Order",
            Request: params,
            Error: e
          });
        },
        onSuccess: refreshCarousel
      });

      return (
        <DataGridCell className={useStyles().f11}>
          <Button
            appearance="subtle"
            icon={<ArrowUpRegular />}
            onClick={() => run(item.Id, true)}
          />

          <Button
            appearance="subtle"
            icon={<ArrowDownRegular />}
            onClick={() => run(item.Id, false)}
          />

          <AdminProductPhotoEdit {...item} />
        </DataGridCell>
      )
    },
  })
]

/**
 * @deprecated
 */
let refreshCarousel: () => void = () => { };

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.5.0
 */
export function AdminProductPhoto({ ProdId }: { ProdId: number }) {
  const list = useLiveQuery<IPhotoItem[]>(async () => {
    const [raw] = await Hub.Product.Get.PhotoList(ProdId, log);

    const map = raw.map(x => ({
      Id: x.PhotoId,
      Cover: x.ObjectId,
      Caption: x.Caption || "No Caption",
      ProductId: x.ProductId
    }));

    return map;
  });

  const { dispatch, dispatchToast } = useErrorToast(log);

  const { run: newPhoto } = AdminHub.Product.Post.usePhoto(log, {
    manual: true,
    onBefore([prodId, file]) {
      dispatchToast(
        <Toast>
          <ToastTitle>Uploading Photo {file.name} for Product {prodId}</ToastTitle>
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
        appearance="primary"
        icon={<AddRegular />}
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";

          input.onchange = () => {
            if (input.files)
              newPhoto(ProdId, input.files[0]);
          };
          input.click();
        }}
      >
        New Image
      </Button>
    </div>

    <DelegateDataGrid Items={list} Columns={columns} />
  </>
}
