import { SkeletonItem } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { useState } from "react";
import { Logger } from "~/Helpers/Logger";
import { Hub } from "~/ShopNet";
import { useRadioGroup } from "./Context";
import { ProductRadioGroup } from "./RadioGroup";

const log = new Logger("Product", "RadioGroup");

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.5.0
 */
export function ProductRadioList({ ProdId }: { ProdId: number }) {
  const { Update, SetAll } = useRadioGroup();
  const [variants, setVariants] = useState<[string, string[]][]>([]);

  const { loading } = useRequest(() => Hub.Product.Get.ComboList(ProdId, log), {
    onError: log.error,
    onSuccess(data) {
      const variant: Record<string, Set<string>> = {};

      for (const i of data)
        for (const [vari, type] of Object.entries(i.Combo))
          if (variant.hasOwnProperty(vari))
            variant[vari].add(type);
          else
            variant[vari] = new Set([type]);

      SetAll(data);
      Update(data[0].Combo);
      setVariants(Object.entries(variant).map(([vari, type]) => [vari, Array.from(type)]));
    }
  });

  if (loading)
    return <SkeletonItem size={72} />;

  return variants.map(([vari, type], i) => <ProductRadioGroup key={i} Variant={vari} Types={type} />);
}
