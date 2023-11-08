import { Route, Routes } from "react-router-dom";

import { pageData } from "./Page-data";
import { routerType } from "../utilities";

export default function Router() {
  const pageRoutes = pageData.map(({ path, title, element }: routerType) => {
    return <Route key={title} path={`/${path}`} element={element}></Route>;
  });

  return <Routes>{pageRoutes}</Routes>;
}
