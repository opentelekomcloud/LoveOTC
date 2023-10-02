import { Button, Field, Textarea } from "@fluentui/react-components";
import { useState } from "react";
import { Flex } from "~/Helpers/Styles";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export function OrderAppend({ OrderId }: { OrderId: number; }) {
  const [append, setAppend] = useState<string>();

  return <>
    <Field label="Append" size="large">
      <Textarea value={append} onChange={(_, v) => setAppend(v.value)} maxLength={1000} />
    </Field>

    <div style={{
      ...Flex,
      justifyContent: "space-between"
    }}>
      <Button>
        Cancel Order with Reason
      </Button>

      <Button>
        Add Comment
      </Button>
    </div>
  </>;
}
