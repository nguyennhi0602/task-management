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
    ],
  },
]
