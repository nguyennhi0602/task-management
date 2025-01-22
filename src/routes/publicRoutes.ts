import { LoginPage } from "./../domain/login/LoginPage";
import { Login } from "./../domain/login/Login";
import { LoaderFunctionArgs, redirect, RouteObject } from "react-router-dom";
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
        // action: async ({ request }: LoaderFunctionArgs) => {
        //   const formData = await request.formData();
        //   console.log("formData");
        //   console.log(formData);
        //   const email = formData.get("email") as string | null;
        //   const password = formData.get("password") as string | null;
        //   const redirectTo = formData.get("redirectTo") as string | null;

        //   // Validate our form inputs and return validation errors via useActionData()
        //   if (!email || !password) {
        //     return {
        //       error: "You must provide a email and password to log in",
        //     };
        //   }

        //   try {
        //     // await profileApiClient.login({ email, password });
        //     return redirect(redirectTo || "/");
        //   } catch (e) {
        //     console.error("Error while logging in", e);
        //     return {
        //       error: "Invalid login attempt",
        //     };
        // }
        // },
      },
    ],
  },
];
