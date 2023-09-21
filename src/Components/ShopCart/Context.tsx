import { random } from "lodash-es";
import { createContext, useContext, useState } from "react";
import { ICartItem } from ".";

const items: ICartItem[] = [
  {
    Id: 1,
    ProdId: random(1, 10),
    Image: "https://picsum.photos/550",
    Name: "OTC SHIRT - GREY",
    Type: ["Short Sleeve", "S"],
    Quantity: 1
  },
  {
    Id: 2,
    ProdId: random(1, 10),
    Image: "https://picsum.photos/600",
    Name: "OTC Cap - Cap and Cap",
    Type: ["Red", "Long and Long"],
    Quantity: 1
  }
]

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
interface Context {
  List: ICartItem[];
  Update: (val: ICartItem[]) => void;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const ShopCart = createContext({} as Context);

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export function useShopCart() {
  return useContext(ShopCart);
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export function ShopCartContext({ children }: { children: JSX.Element }) {
  const [list, setList] = useState(items);

  return (
    <ShopCart.Provider value={{
      List: list,
      Update(val) {
        setList([...val]);
      },
    }}>
      {children}
    </ShopCart.Provider>
  );
}
