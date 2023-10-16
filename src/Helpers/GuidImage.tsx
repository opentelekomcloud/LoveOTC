import { Image } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { ComponentProps } from "react";
import { Hub } from "~/ShopNet";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export function GuidImage({ Guid, ...rest }: { Guid: string } & ComponentProps<typeof Image>) {
  const { data } = useRequest(Hub.Storage.GetBySlice.bind(Hub.Storage), {
    defaultParams: [Guid]
  });

  return <Image {...rest} src={data ? URL.createObjectURL(new Blob(data)) : "https://placehold.co/400?text=Loading..."} />;
}
