import { BrowserRouter } from "react-router-dom";

import Router from "pages/router";
import { CustomCursor } from "@features/cursor";
import { HoverContextProvider, TabContextProvider } from "@features/contexts";

function App() {
  return (
    <HoverContextProvider>
      <TabContextProvider>
        <BrowserRouter>
          <CustomCursor />
          <Router />
        </BrowserRouter>
      </TabContextProvider>
    </HoverContextProvider>
  );
}

export default App;
