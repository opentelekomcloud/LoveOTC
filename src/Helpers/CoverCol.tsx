import { DataGridCell, DataGridHeaderCell, Image, createTableColumn, makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import { Cover } from "./Styles";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
const useStyle = makeStyles({
  unset: {
    flexBasis: "unset",
    flexGrow: "unset"
  },
  size: {
    width: "50px"
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
 * @since 0.1.0
 * @version 0.1.0
 */
export const CoverCol = createTableColumn<{
  Image: string;
}>({
  columnId: "Cover",
  renderHeaderCell: () => {
    const style = useStyle();

    return (
      <DataGridHeaderCell className={style.unset}>
        <div className={style.size} />
      </DataGridHeaderCell>
    )
  },
  renderCell(item) {
    const style = useStyle();

    return (
      <DataGridCell className={style.unset}>
        <Image
          shape="square"
          className={mergeClasses(style.img, style.size)}
          src={item.Image}
        />
      </DataGridCell>
    )
  },
})
