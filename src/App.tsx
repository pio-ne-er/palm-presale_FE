import { BrowserRouter } from "react-router-dom";

import Router from "pages/router";
import { CustomCursor } from "@features/cursor";
import { HoverContextProvider, TabContextProvider } from "@features/contexts";
import { WalletConnectProvider } from "@features/providers";

function App() {
  return (
    <WalletConnectProvider>
      <HoverContextProvider>
        <TabContextProvider>
          <BrowserRouter>
            <CustomCursor />
            <Router />
          </BrowserRouter>
        </TabContextProvider>
      </HoverContextProvider>
    </WalletConnectProvider>
  );
}

export default App;
