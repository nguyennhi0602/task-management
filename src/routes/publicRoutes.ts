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
        id: "tasks",
        path: "tasks",
        lazy: async () => ({
          Component: (await import("../domain/Task/TaskListPage")).TaskListPage,
        }),
      },
    ],
  },
];
