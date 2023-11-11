import { BrowserRouter } from "react-router-dom";
import { useContext } from "react";

import Router from "pages/router";
import { HoverContext, TabContextProvider } from "@features/contexts";
import {
  UserContextProvider,
  WalletConnectProvider,
  WalletModalProvider,
} from "@features/providers";
import { Globalstyles } from "styles/GlobalStyles";

function App() {
  const { hover } = useContext(HoverContext);

  return (
    <WalletConnectProvider>
      <WalletModalProvider>
        <UserContextProvider>
          <TabContextProvider>
            <BrowserRouter>
              <Globalstyles $hover={hover !== ""} />
              <Router />
            </BrowserRouter>
          </TabContextProvider>
        </UserContextProvider>
      </WalletModalProvider>
    </WalletConnectProvider>
  );
}

export default App;
