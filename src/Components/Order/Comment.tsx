import { Body1, Caption1Stronger, Field, Label } from "@fluentui/react-components";
import { useConst } from "@fluentui/react-hooks";
import { Hub } from "~/ShopNet";
import { IOrderComp } from ".";
import { CommentAppend } from "./Append";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export interface IComment {
  Content: string;
  Time: Date;
  User: string;
}

/**
 * @author Aloento
 * @since 1.0.0
 * @version 1.1.0
 */
export function OrderComment({ OrderId, Admin, ParentLog }: IOrderComp) {
  const log = useConst(() => ParentLog.With("Comment"));
  const { data, refresh } = Hub.Order.Get.useCmts(OrderId, log, Admin);

  return <>
    <Field label="Comment" size="large">
      {data?.length === 0
        ?
        <Label>No Comment</Label>
        :
        data?.map((v, i) => <div key={i}>
          <Caption1Stronger>{v.User} {v.Time.toLocaleString()}</Caption1Stronger>
          <br />
          <Body1>{v.Content}</Body1>
        </div>
        )}
    </Field>

    <CommentAppend OrderId={OrderId} Refresh={refresh} ParentLog={log} Admin={Admin} />
  </>;
}
