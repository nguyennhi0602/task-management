import { RouteObject } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";

export const routes: RouteObject[] = [
  {
    children: [...publicRoutes],
  },
];
