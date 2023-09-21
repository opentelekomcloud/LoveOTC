import { Title3, ToggleButton, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { useMemo, useState } from "react";
import { ColFlex, Flex } from "~/Helpers/Styles";
import { IComboItem } from "../Admin/Product/Combo";

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
 * @version 0.1.0
 */
interface IRadioGroup {
  Combos?: Omit<IComboItem, "Id">[];
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export function ProductRadioList({ Combos }: IRadioGroup) {
  if (!Combos)
    return null;

  const variants = useMemo(() => {
    const variant: Record<string, Set<string>> = {};

    for (const i of Combos)
      for (const c of i.Combo)
        if (variant.hasOwnProperty(c.Variant))
          variant[c.Variant].add(c.Type);
        else
          variant[c.Variant] = new Set([c.Type]);

    return variant;
  }, [Combos]);

  return Object.keys(variants).map(val => <VariRadioGroup Variant={val} Types={variants[val]} />);
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
interface IVariRadioGroup {
  Variant: string;
  Types: Set<string>;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
function VariRadioGroup({ Variant, Types }: IVariRadioGroup) {
  const style = useStyle();
  const [curr, setCurr] = useState<number>();

  return (
    <div className={style.vari}>
      <Title3 className={style.fore}>
        SELECT {Variant}: SHORT SLEEVE
      </Title3>

      <div className={style.radio}>
        <ToggleButton appearance="outline" checked className={style.btn}>Short Sleeve</ToggleButton>
        <ToggleButton appearance="outline" className={style.btn}>Long Sleeve</ToggleButton>
      </div>
    </div>
  );
}
