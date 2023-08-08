import { ScaleButton } from "@telekom/scale-components-react";
import { useRouter } from "~/Components/Router";

export function EShopContent() {
  const { Paths } = useRouter();
  const path = Paths.at(0);

  return (
    <div>
      Click on the Vite and React logos to learn more
      <ScaleButton>Some</ScaleButton>
    </div>
  )
}
