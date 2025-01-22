import { RouteObject } from "react-router-dom";
import { privateRoutes } from "./privateRoutes";
import { publicRoutes } from "./publicRoutes";

export const routes: RouteObject[] = [
  {
    children: [...privateRoutes, ...publicRoutes],
  },
];
