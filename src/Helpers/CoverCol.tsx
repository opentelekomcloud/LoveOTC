import { DataGridCell, DataGridHeaderCell, createTableColumn, makeStyles, tokens } from "@fluentui/react-components";
import { GuidImage } from "./GuidImage";
import type { Logger } from "./Logger";
import { Cover } from "./Styles";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
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
 * @version 1.0.0
 */
export function MakeCoverCol<T>(size: number, log: Logger, fac: (item: T) => string) {
  const w = { width: `${size}px` };

  return createTableColumn<T>({
    columnId: "Cover",
    renderHeaderCell: () => {
      const style = useStyles();

      return (
        <DataGridHeaderCell className={style.unset}>
          <div style={w} />
        </DataGridHeaderCell>
      )
    },
    renderCell(item) {
      const style = useStyles();
      const cover = fac(item);

      return (
        <DataGridCell className={style.unset}>
          <GuidImage
            className={style.img}
            style={w}
            Guid={cover}
            ParentLog={log}
          />
        </DataGridCell>
      )
    },
  })
}
