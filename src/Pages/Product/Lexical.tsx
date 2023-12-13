import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { BaseCard } from "~/Helpers/Styles";
import { Lexical } from "~/Lexical";
import { Hub } from "~/ShopNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyle = makeStyles({
  lex: {
    ...BaseCard,
    ...shorthands.padding(tokens.spacingHorizontalXL)
  }
})

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export function ProductLexicalRender({ ProdId }: { ProdId: number }) {
  const style = useStyle();

  const { data, loading } = useRequest(() => Hub.Product.Get.Lexical(ProdId));

  return (
    <div className={style.lex}>
      {loading ? "Loading..." : <Lexical Display State={data} />}
    </div>
  )
}
