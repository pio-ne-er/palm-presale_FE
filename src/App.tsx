import { BrowserRouter } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Buffer } from "buffer";

import Router from "pages/router";
import { HoverContext, TabContextProvider } from "@features/contexts";
import {
  UserContextProvider,
  WalletConnectProvider,
  WalletModalProvider,
} from "@features/providers";
import { Globalstyles } from "styles/GlobalStyles";
import { useToast } from "@features/toast";

Buffer.from("anything", "base64");
window.Buffer = window.Buffer || Buffer;

function App() {
  const { hover } = useContext(HoverContext);
  const toast = useToast();

  useEffect(() => {
    toast.position({ position: "top-right", auto: true, time: 3 });
  }, []);

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
