import { Field, Label, makeStyles, tokens } from "@fluentui/react-components";
import { ColFlex, Flex } from "~/Helpers/Styles";
import { Hub } from "~/ShopNet";

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
const useStyles = makeStyles({
  person: Flex,
  inf: {
    ...ColFlex,
    flexBasis: "50%",
    rowGap: tokens.spacingVerticalM
  },
});

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.1.0
 */
export interface IPersona {
  Name: string;
  Phone: string;
  EMail: string;
  Address: string;
}

/**
 * @author Aloento
 * @since 0.5.0
 * @version 0.2.0
 */
export function PersonaInfo() {
  const style = useStyles();
  const { data } = Hub.User.Get.useMe();

  return <>
    <div className={style.person}>
      <div className={style.inf}>
        <Field label="Name" size="large">
          <Label>{data?.Name}</Label>
        </Field>
      </div>

      <div className={style.inf}>
        <Field label="Phone" size="large">
          <Label>{data?.Phone}</Label>
        </Field>
      </div>
    </div>

    <Field label="E-Mail" size="large">
      <Label>{data?.EMail}</Label>
    </Field>

    <Field label="Address" size="large">
      <Label>{data?.Address}</Label>
    </Field>
  </>
}
