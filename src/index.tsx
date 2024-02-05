import { BrandVariants, FluentProvider, createLightTheme } from "@fluentui/react-components";
import ReactDOM from "react-dom/client";
import { OIDCProvider } from "./Components/Auth";
import { BrowserRouter } from "./Components/Router";
import { ShopCartContext } from "./Components/ShopCart/Context";
import { Dic } from "./Helpers/Dic";
import { Logger } from "./Helpers/Logger";
import { Layout } from "./Pages";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
const Magenta: BrandVariants = {
  10: "#390024",
  20: "#51002f",
  30: "#69003b",
  40: "#810046",
  50: "#9a0052",
  60: "#b2005d",
  70: "#ca0069",
  80: "#e20074",
  90: "#e51e85",
  100: "#e93d95",
  110: "#ec5ba6",
  120: "#ef79b7",
  130: "#f297c7",
  140: "#f6b6d8",
  150: "#f9d4e8",
  160: "#fcf2f9",
};

const theme = createLightTheme(Magenta);
theme.fontFamilyBase = `TeleNeoWeb, ${theme.fontFamilyBase}`;
theme.fontFamilyMonospace = `TeleNeoWeb, ${theme.fontFamilyMonospace}`;
theme.fontFamilyNumeric = `TeleNeoWeb, ${theme.fontFamilyNumeric}`;

const log = new Logger("LoveOTC");
log.info("Version: 1.3.5 2024/02/05");
log.debug("T-Systems, EcoSystem Squad, Aloento");

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.2.0
 */
ReactDOM.createRoot(document.getElementById(Dic.Name)!).render(
  <FluentProvider theme={theme}>
    <BrowserRouter>
      <OIDCProvider>
        <ShopCartContext>
          <Layout />
        </ShopCartContext>
      </OIDCProvider>
    </BrowserRouter>
  </FluentProvider>
);
