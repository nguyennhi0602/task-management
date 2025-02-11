import { redirect, RouteObject } from "react-router-dom"

export const privateRoutes: RouteObject[] = [
  {
    id: "root",
    path: "/",
    lazy: async () => ({
      Component: (await import("../domain/layout/LayoutPage")).LayoutPage,
    }),
    shouldRevalidate: () => false,
    action: async () => {
      // await profileApiClient.logout();
      return redirect("login")
    },
    children: [
      {
        id: "tasks",
        path: "tasks",
        lazy: async () => ({
          Component: (await import("../domain/Task/TaskListPage")).TaskListPage,
        }),
      },
      // {
      //   id: "login",
      //   path: "login",
      //   lazy: async () => ({
      //     Component: (await import("../domain/login/LoginPage")).LoginPage,
      //   }),
      // },
    ],
  },
]
