import { RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject[] = [
  {
    id: "root",
    path: "/",
    lazy: async () => ({
      Component: (await import("../domain/layout/LayoutPage")).LayoutPage,
    }),
    shouldRevalidate: () => false,
    children: [
      {
        id: "homepage",
        path: "homepage",
        lazy: async () => ({
          Component: (await import("./../domain/homepage/Homepage")).Homepage,
        }),
      },
    ],
  },
];
