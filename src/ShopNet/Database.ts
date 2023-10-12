import Dexie from "dexie";
import { User } from "oidc-client-ts";
import { ICartItem } from "~/Components/ShopCart";
import { Table } from "./Table";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const DB = new Dexie("EShop", { autoOpen: false });

/**
 * @author Aloento
 * @since 0.1.0 MusiLand
 * @version 0.2.0
 */
DB.version(1).stores({
  /** {@link ITable} */
  Shared: "Id, Exp",
  /** {@link ICartItem} */
  ShopCart: "Id",
});

DB.open();

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export const Shared = new Table(DB, "Shared");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export const CartTable = DB.table<Omit<ICartItem, "Name" | "Cover">, never>("ShopCart");

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
const OIDC = localStorage.getItem(
  import.meta.env.DEV
    ? "oidc.user:http://localhost:8080/realms/loveotc:loveotc"
    : "oidc.user:https://keycloak.eco.tsi-dev.otc-service.com/realms/eco:loveotc"
);

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export const AuthUser = OIDC ? User.fromStorageString(OIDC) : null;
