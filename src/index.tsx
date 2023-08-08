import "@telekom/scale-components/dist/scale-components/scale-components.css";
import { defineCustomElements } from "@telekom/scale-components/loader";
import ReactDOM from "react-dom/client";
import { Layout } from "./Components/Layout";
import { BrowserRouter } from "./Components/Router";
import { EShopContent } from "./Pages";

defineCustomElements();

ReactDOM.createRoot(document.getElementById("LoveOTC")!).render(
  <BrowserRouter>
    <Layout>
      <EShopContent />
    </Layout>
  </BrowserRouter>
);
