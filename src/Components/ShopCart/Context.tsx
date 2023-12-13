import { useRequest } from "ahooks";
import { ReactNode, createContext, useContext, useState } from "react";
import { Hub } from "~/ShopNet";
import { CartTable } from "~/ShopNet/Database";
import { ICartItem } from ".";

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
export function ShopCartContext({ children }: { children: ReactNode }) {
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
