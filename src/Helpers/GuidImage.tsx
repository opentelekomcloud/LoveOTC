import { Image } from "@fluentui/react-components";
import { ComponentProps } from "react";
import { Hub } from "~/ShopNet";
import type { ICompLog } from "./Logger";

const hold = (txt: string) => "https://placehold.co/400?text=" + txt + "...";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.3.0
 */
export function GuidImage({ Guid, ParentLog, ...rest }: { Guid?: string } & ComponentProps<typeof Image> & ICompLog) {
  if (!Guid)
    return <Image {...rest} src={hold("Pending")} />;

  const { data } = Hub.Storage.useGet(Guid, ParentLog);

  return <Image {...rest} src={data ? URL.createObjectURL(new Blob(data)) : hold("Loading")} />;
}
