import { ScaleButton } from "@telekom/scale-components-react";
import "@telekom/scale-components/dist/scale-components/scale-components.css";
import { defineCustomElements } from "@telekom/scale-components/loader";
import ReactDOM from "react-dom/client";

defineCustomElements();

function App() {
  return (
    <div>
      Click on the Vite and React logos to learn more
      <ScaleButton>Some</ScaleButton>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("LoveOTC")!).render(<App />);
