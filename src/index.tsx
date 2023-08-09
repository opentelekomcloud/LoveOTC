import { BrandVariants, FluentProvider, createLightTheme } from "@fluentui/react-components";
import ReactDOM from "react-dom/client";
import { Layout } from "./Components/Layout";
import { BrowserRouter } from "./Components/Router";
import { EShopContent } from "./Pages";

/**
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
const Magenta: BrandVariants = {
  10: "#060203",
  20: "#261017",
  30: "#421525",
  40: "#591830",
  50: "#711A3C",
  60: "#8A1948",
  70: "#A41755",
  80: "#BE1262",
  90: "#D90670",
  100: "#E7317D",
  110: "#ED538B",
  120: "#F26E9A",
  130: "#F786A9",
  140: "#FA9DB8",
  150: "#FDB3C7",
  160: "#FFC9D6"
};

ReactDOM.createRoot(document.getElementById("LoveOTC")!).render(
  <BrowserRouter>
    <FluentProvider applyStylesToPortals theme={createLightTheme(Magenta)}>
      <Layout>
        <EShopContent />
      </Layout>
    </FluentProvider>
  </BrowserRouter>
);
