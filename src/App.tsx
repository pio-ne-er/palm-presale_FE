import { BrowserRouter } from "react-router-dom";

import Router from "pages/router";
import { CustomCursor } from "@features/cursor";
import { HoverContextProvider } from "@features/contexts";

function App() {
  return (
    <HoverContextProvider>
      <BrowserRouter>
        <CustomCursor />
        <Router />
      </BrowserRouter>
    </HoverContextProvider>
  );
}

export default App;
