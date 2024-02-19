import { Body1, Caption1Stronger, Field, Label } from "@fluentui/react-components";
import { useConst } from "@fluentui/react-hooks";
import { useRequest } from "ahooks";
import { ICompLog } from "~/Helpers/Logger";
import { Hub } from "~/ShopNet";
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
 * @since 0.5.0
 * @version 0.2.0
 */
export interface IOrderComp extends ICompLog {
  OrderId: number;
  Refresh: () => void;
  Status?: string;
  Admin?: true;
}

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export function OrderComment({ OrderId, Refresh, ParentLog, Status, Admin }: IOrderComp) {
  const log = useConst(() => ParentLog.With("Comment"));

  const { data, run } = useRequest(() => Hub.Order.Get.Cmts(OrderId, log), {
    manual: true,
    onError: log.error
  });

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

    <CommentAppend OrderId={OrderId} Status={Status} Refresh={run} ParentLog={log} />
  </>;
}
