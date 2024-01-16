import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { BaseCard, ColFlex } from "~/Helpers/Styles";
import { Lexical } from "~/Lexical/Lazy";
import { Hub } from "~/ShopNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.1
 */
const useStyles = makeStyles({
  lex: {
    ...BaseCard,
    ...shorthands.padding(tokens.spacingHorizontalXL)
  },
  skel: {
    ...ColFlex,
    rowGap: tokens.spacingVerticalM
  }
})

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
export function ProductLexicalRender({ ProdId }: { ProdId: number }) {
  const style = useStyles();
  const { data, loading } = useRequest(() => Hub.Product.Get.Lexical(ProdId));

  if (loading || !data)
    return null;

  return (
    <div className={style.lex}>
      <Lexical Display State={data.Description} />
    </div>
  )
}
