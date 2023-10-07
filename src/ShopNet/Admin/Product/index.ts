import { AdminProductDelete } from "./Delete";
import { AdminProductGet } from "./Get";
import { AdminProductPatch } from "./Patch";
import { AdminProductPost } from "./Post";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export const AdminProduct = {
  Get: AdminProductGet,
  Post: AdminProductPost,
  Patch: AdminProductPatch,
  Delete: AdminProductDelete,
}
