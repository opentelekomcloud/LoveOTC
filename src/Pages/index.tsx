import { useRouter } from "~/Components/Router";

export function EShopContent() {
  const { Paths } = useRouter();
  const path = Paths.at(0);

  return (
    <div>
      Main Content
    </div>
  )
}
