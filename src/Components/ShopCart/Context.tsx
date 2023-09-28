import { useRequest } from "ahooks";
import { random } from "lodash-es";
import { createContext, useContext, useState } from "react";
import { Hub } from "~/ShopNet";
import { CartTable } from "~/ShopNet/Database";
import { ICartItem } from ".";

const items: ICartItem[] = [
  {
    Id: 1,
    ProdId: random(1, 10),
    Cover: "https://picsum.photos/550",
    Name: "OTC SHIRT - GREY",
    Type: {
      Color: "White",
      Size: "S"
    },
    Quantity: 1
  },
  {
    Id: 2,
    ProdId: random(1, 10),
    Cover: "https://picsum.photos/600",
    Name: "OTC Cap - Cap and Cap",
    Type: {
      Color: "Red",
      Size: "Long and Long"
    },
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
  Add: (prodId: number, type: Record<string, string>, quantity: number) => void;
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
 * @version 0.3.0
 */
export function ShopCartContext({ children }: { children: JSX.Element }) {
  const [list, setList] = useState<ICartItem[]>([]);

  useRequest(async () => {
    const arr = await CartTable.toArray();
    const res: ICartItem[] = [];

    for (const i of arr) {
      const b = await Hub.Product.Get.Basic(i.ProdId);
      res.push({
        ...i,
        ...b
      });
    }

    setList(res);
  });

  async function Update(val: ICartItem[]) {
    for (let i = 0; i < val.length; i++)
      val[i].Id = i;

    setList([...val]);

    await CartTable.clear();
    await CartTable.bulkPut(val.map(v => ({
      Id: v.Id,
      ProdId: v.ProdId,
      Type: v.Type,
      Quantity: v.Quantity,
    })));
  }

  async function Add(prodId: number, type: Record<string, string>, quantity: number) {
    const res = await Hub.Product.Get.Basic(prodId);
    list.push({
      ...res,
      Id: list.length,
      ProdId: prodId,
      Type: type,
      Quantity: quantity,
    });

    Update(list);
  }

  return (
    <ShopCart.Provider value={{
      List: list,
      Add,
      Update,
    }}>
      {children}
    </ShopCart.Provider>
  );
}
