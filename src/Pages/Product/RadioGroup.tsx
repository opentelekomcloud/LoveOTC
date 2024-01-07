import { Title3, ToggleButton, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { ColFlex, Flex } from "~/Helpers/Styles";
import { useRadioGroup } from "./Context";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
const useStyle = makeStyles({
  fore: {
    color: tokens.colorBrandForeground1,
    textTransform: "uppercase"
  },
  btn: shorthands.borderColor(tokens.colorBrandForeground1),
  vari: {
    ...ColFlex,
    rowGap: tokens.spacingVerticalS,
  },
  radio: {
    ...Flex,
    flexWrap: "wrap",
    rowGap: tokens.spacingHorizontalS,
    columnGap: tokens.spacingHorizontalM
  }
})

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.1
 */
interface IProductRadioGroup {
  Variant: string;
  Types: string[];
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.2
 */
export function ProductRadioGroup({ Variant, Types }: IProductRadioGroup) {
  const style = useStyle();
  const { Current, Update } = useRadioGroup();

  return (
    <div className={style.vari}>
      <Title3 className={style.fore}>
        SELECT {Variant}: {Current[Variant]}
      </Title3>

      <div className={style.radio}>
        {Types.map((val, i) =>
          <ToggleButton
            key={i}
            appearance="outline"
            className={style.btn}
            checked={Current[Variant] === val}
            onClick={() => Update({
              ...Current,
              [Variant]: val
            })}
          >
            {val}
          </ToggleButton>)}
      </div>
    </div>
  );
}
