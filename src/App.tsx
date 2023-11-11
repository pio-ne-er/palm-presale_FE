import { BrowserRouter } from "react-router-dom";

import Router from "pages/router";
import { CustomCursor } from "@features/cursor";
import { HoverContextProvider, TabContextProvider } from "@features/contexts";
import {
  UserContextProvider,
  WalletConnectProvider,
  WalletModalProvider,
} from "@features/providers";

function App() {
  return (
    <WalletConnectProvider>
      <WalletModalProvider>
        <UserContextProvider>
          <HoverContextProvider>
            <TabContextProvider>
              <BrowserRouter>
                <CustomCursor />
                <Router />
              </BrowserRouter>
            </TabContextProvider>
          </HoverContextProvider>
        </UserContextProvider>
      </WalletModalProvider>
    </WalletConnectProvider>
  );
}

export default App;
