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
 * @version 0.4.0
 */
export function OrderPersona({ OrderId, Admin }: { OrderId: number; Admin?: true }) {
  const style = useStyles();

  const { data: admin } = useRequest(AdminHub.User.Get.OrderUser.bind(AdminHub.User.Get), {
    defaultParams: [OrderId],
    manual: !Admin
  })

  const { data: me } = useRequest(Hub.User.Get.Me.bind(Hub.User.Get), {
    manual: Admin
  });

  const { data: order } = useRequest(Hub.Order.Get.Order.bind(Hub.Order.Get), {
    defaultParams: [OrderId]
  });

  const data = Admin ? admin : me;

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
          <Label>{order?.CreateAt.toLocaleDateString()}</Label>
        </Field>
      </div>

      <div className={style.box}>
        <Field label="Status" size="large">
          <Label>{order?.Status}</Label>
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
            <Label>{order?.TrackingNumber}</Label>
          </Field>
        </div>
      }
    </div>

    <Field label="Address" size="large">
      <Label>{data?.Address}</Label>
    </Field>
  </>;
}
