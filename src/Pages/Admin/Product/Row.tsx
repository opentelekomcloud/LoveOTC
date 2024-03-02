import { DataGridRow, TableRowData } from "@fluentui/react-components";
import { useAsyncEffect, useBoolean } from "ahooks";
import { useState } from "react";
import { Logger } from "~/Helpers/Logger";
import { Hub } from "~/ShopNet";
import { AdminHub } from "~/ShopNet/Admin";
import { IProductItem } from ".";

const log = new Logger("Admin", "Product", "Row");

/**
 * @author Aloento
 * @since 1.3.0
 * @version 0.1.1
 */
export function AdminProductRow({ item: id }: TableRowData<number>) {
  const [detail, setDetail] = useState<IProductItem>(() => ({
    Id: id,
    Cover: "",
    Name: "Loading..."
  }));

  const [block, { setTrue }] = useBoolean();

  const hub = Hub.Product.Get;

  useAsyncEffect(async () => {
    const prod = await hub.Product(id).catch(log.error);

    if (!prod) {
      log.warn(`Product ${id} Not Found`);
      return setTrue();
    }

    let item = {
      ...detail,
      Name: prod.Name,
      Category: prod.Category || "Pending"
    };

    setDetail(item);

    const [coverId] = await hub.PhotoList(id, true);

    if (!coverId)
      log.warn(`Product ${id} has no photo`);

    const cover = await hub.Photo(coverId);

    setDetail(item = {
      ...item,
      Cover: cover.ObjectId
    });

    const count = await AdminHub.Product.Get.Count(id).catch(log.error);

    count && setDetail({
      ...item,
      ...count
    });
  }, []);

  if (block)
    return null;

  return (
    <DataGridRow<IProductItem> key={id}>
      {({ renderCell }) => renderCell(detail)}
    </DataGridRow>
  );
}
