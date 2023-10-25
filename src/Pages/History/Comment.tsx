import { Body1, Caption1Stronger, Field, Label } from "@fluentui/react-components";

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
 * @version 0.1.0
 */
export function OrderComment({ Comments }: { Comments?: IComment[]; }) {
  return (
    <Field label="Comment" size="large">
      {Comments?.length === 0
        ?
        <Label>No Comment</Label>
        :
        Comments?.map((v, i) => <div key={i}>
          <Caption1Stronger>{v.User} {v.Time.toLocaleString()}</Caption1Stronger>
          <br />
          <Body1>{v.Content}</Body1>
        </div>
        )}
    </Field>
  );
}
