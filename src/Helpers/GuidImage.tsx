import { Image } from "@fluentui/react-components";
import { useConst } from "@fluentui/react-hooks";
import { useRequest } from "ahooks";
import { ComponentProps, useEffect } from "react";
import { Hub } from "~/ShopNet";
import type { Logger } from "./Logger";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.2.1
 */
export function GuidImage({ Guid, Log, ...rest }: { Guid?: string, Log: Logger } & ComponentProps<typeof Image>) {
  const log = useConst(() => Log.With("GuidImage"));

  const { data, run } = useRequest(Hub.Storage.GetBySlice.bind(Hub.Storage), {
    manual: true,
    onError: log.error,
  });

  useEffect(() => {
    Guid && run(Guid, log);
  }, [Guid]);

  return <Image {...rest} src={data ? URL.createObjectURL(new Blob(data)) : "https://placehold.co/400?text=Loading..."} />;
}
