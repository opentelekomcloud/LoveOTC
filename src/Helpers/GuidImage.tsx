import { Image } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { ComponentProps, useEffect } from "react";
import { Hub } from "~/ShopNet";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.2.0
 */
export function GuidImage({ Guid, ...rest }: { Guid?: string } & ComponentProps<typeof Image>) {
  const { data, run } = useRequest(Hub.Storage.GetBySlice.bind(Hub.Storage), {
    manual: true,
  });

  useEffect(() => {
    Guid && run(Guid);
  }, [Guid]);

  return <Image {...rest} src={data ? URL.createObjectURL(new Blob(data)) : "https://placehold.co/400?text=Loading..."} />;
}
