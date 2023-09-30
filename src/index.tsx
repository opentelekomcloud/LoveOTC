import { BrandVariants, FluentProvider, Toaster, createLightTheme } from "@fluentui/react-components";
import ReactDOM from "react-dom/client";
import { Layout } from "./Components/Layout";
import { BrowserRouter } from "./Components/Router";
import { ShopCartContext } from "./Components/ShopCart/Context";
import { EShopContent } from "./Pages";

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

ReactDOM.createRoot(document.getElementById("LoveOTC")!).render(
  <BrowserRouter>
    <FluentProvider theme={createLightTheme(Magenta)}>
      <ShopCartContext>
        <Layout>
          <EShopContent />
          <Toaster pauseOnHover />
        </Layout>
      </ShopCartContext>
    </FluentProvider>
  </BrowserRouter>
);
