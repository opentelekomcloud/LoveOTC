import { DataGridCell, DataGridHeaderCell, Image, createTableColumn, makeStyles, tokens } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { Hub } from "~/ShopNet";
import { Cover } from "./Styles";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
const useStyle = makeStyles({
  unset: {
    flexBasis: "unset",
    flexGrow: 0
  },
  img: {
    ...Cover,
    aspectRatio: "1",
    marginTop: tokens.spacingVerticalXS,
    marginBottom: tokens.spacingVerticalXS,
  }
})

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
export function MakeCoverCol(Size: number) {
  const w = { width: `${Size}px` };

  return createTableColumn<{
    Cover: string;
  }>({
    columnId: "Cover",
    renderHeaderCell: () => {
      const style = useStyle();

      return (
        <DataGridHeaderCell className={style.unset}>
          <div style={w} />
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      const style = useStyle();
      const { data } = useRequest(Hub.Storage.GetBySlice.bind(Hub.Storage), {
        defaultParams: [item.Cover]
      });

      return (
        <DataGridCell className={style.unset}>
          <Image
            className={style.img}
            style={w}
            src={URL.createObjectURL(new Blob(data))}
          />
        </DataGridCell>
      )
    },
  })
}

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.0
 */
export const CoverCol = MakeCoverCol(50);
