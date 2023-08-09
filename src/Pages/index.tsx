import { useRouter } from "~/Components/Router";
import { Lexical } from "~/Lexical";

export function EShopContent() {
  const { Paths } = useRouter();
  const path = Paths.at(0);

  return (
    <Lexical />
  )
}
