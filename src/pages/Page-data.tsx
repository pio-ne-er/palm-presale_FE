import { routerType } from "utilities";
import LandingPage from "./Landing-Page";
import { lazyLoadRoutes } from "./Lazy-Loading-Routes";

export const pageData: routerType[] = [
  { path: "", element: <LandingPage />, title: "" },
  { path: "map", element: lazyLoadRoutes("Game-Page"), title: "" },
];
