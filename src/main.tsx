import ReactDOM from "react-dom/client";

import { HoverContextProvider } from "@features/contexts";
import { ToastProvider } from "@features/toast";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ToastProvider>
    <HoverContextProvider>
      <App />
    </HoverContextProvider>
  </ToastProvider>
);
