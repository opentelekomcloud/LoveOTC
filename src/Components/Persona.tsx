import { Field, Label, makeStyles, tokens } from "@fluentui/react-components";
import { useRequest } from "ahooks";
import { ColFlex, Flex } from "~/Helpers/Styles";
import { Hub } from "~/ShopNet";
import { AdminHub } from "~/ShopNet/Admin";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  flex: Flex,
  box: {
    ...ColFlex,
    flexBasis: "50%",
    rowGap: tokens.spacingVerticalM
  },
});

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.3.0
 */
export function OrderPersona({ OrderId, Admin }: { OrderId: number; Admin?: true }) {
  const style = useStyles();
  const { data } = useRequest(Admin ? AdminHub.User.Get.OrderUser : Hub.User.Get.Me, {
    defaultParams: [OrderId]
  });

  const { data: ext } = useRequest(Hub.Order.Get.Extension.bind(Hub.Order.Get), {
    defaultParams: [OrderId]
  });

  return <>
    <div className={style.flex}>
      <div className={style.box}>
        <Field label="Name" size="large">
          <Label>{data?.Name}</Label>
        </Field>
      </div>

      <div className={style.box}>
        <Field label="Phone" size="large">
          <Label>{data?.Phone}</Label>
        </Field>
      </div>
    </div>

    <div className={style.flex}>
      <div className={style.box}>
        <Field label="Order Date" size="large">
          <Label>{ext?.OrderDate.toLocaleDateString()}</Label>
        </Field>
      </div>

      <div className={style.box}>
        <Field label="Status" size="large">
          <Label>{ext?.Status}</Label>
        </Field>
      </div>
    </div>

    <div className={style.flex}>
      <div className={style.box}>
        <Field label="E-Mail" size="large">
          <Label>{data?.EMail}</Label>
        </Field>
      </div>

      {
        !Admin &&
        <div className={style.box}>
          <Field label="Tracking Number" size="large">
            <Label>{ext?.TrackNumber}</Label>
          </Field>
        </div>
      }
    </div>

    <Field label="Address" size="large">
      <Label>{data?.Address}</Label>
    </Field>
  </>;
}
