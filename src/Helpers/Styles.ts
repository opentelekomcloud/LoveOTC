import { GriffelStyle } from "@griffel/core";

/**
 * @author Aloento
 * @since 0.6.0 ML
 * @version 0.1.0
 */
export const Flex: GriffelStyle = { display: "flex" };

/**
 * @author Aloento
 * @since 0.6.0 ML
 * @version 0.1.0
 */
export const Col: GriffelStyle = { flexDirection: "column" };

/**
 * @author Aloento
 * @since 0.6.0 ML
 * @version 0.1.0
 */
export const ColFlex: GriffelStyle = { ...Flex, ...Col };
