import { Button } from "@fluentui/react-components";
import { useShopCart } from "~/Components/ShopCart/Context";
import { useLimit } from "~/Helpers/useLimit";
import { useRadioGroup } from "./Context";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
interface IProductAddCart {
  ProdId: number;
  Quantity: number;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.1
 */
export function ProductAddCart({ ProdId, Quantity }: IProductAddCart) {
  const { List, Add, Update } = useShopCart();
  const { Current, Combo } = useRadioGroup();
  const [dis] = useLimit(ProdId);

  return (
    <Button
      appearance="primary"
      disabled={dis || !Combo?.Stock}
      onClick={() => {
        const i = List.find(v => {
          if (v.ProdId === ProdId) {
            const source = Object.keys(Current).sort();
            const target = Object.keys(v.Type).sort();

            for (let i = 0; i < target.length; i++) {
              const s = Current[source[i]];
              const t = v.Type[target[i]];

              if (s !== t)
                return false;
            }

            return true;
          }

          return false;
        });

        if (!i) {
          Add(ProdId, Current, Quantity);
          return;
        }

        i.Quantity++;
        Update(List);
      }}
    >
      ADD TO CART
    </Button>
  );
}
