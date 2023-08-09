import { shorthands, tokens } from "@fluentui/react-components";
import { GriffelStyle } from "@griffel/core";

/**
 * @author Aloento
 * @since 0.6.0 MusiLand
 * @version 0.1.0
 */
export const Flex: GriffelStyle = { display: "flex" };

/**
 * @author Aloento
 * @since 0.6.0 MusiLand
 * @version 0.1.0
 */
export const Col: GriffelStyle = { flexDirection: "column" };

/**
 * @author Aloento
 * @since 0.6.0 MusiLand
 * @version 0.1.0
 */
export const ColFlex: GriffelStyle = { ...Flex, ...Col };

export const BaseCard: GriffelStyle = {
  ...Flex,
  backgroundColor: tokens.colorNeutralBackground1,
  boxShadow: tokens.shadow4,
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
};

/**
 * @author Aloento
 * @since 0.1.0 MusiLand
 * @version 0.1.0
 */
export const NavH = 60;
