import { RouteObject } from "react-router-dom"

export const publicRoutes: RouteObject[] = [
  {
    id: "root-no-auth",
    path: "",
    children: [
      {
        id: "login",
        path: "login",
        lazy: async () => ({
          Component: (await import("../domain/login/LoginPage")).LoginPage,
        }),
      },
    ],
  },
]
