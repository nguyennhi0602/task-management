import { PropsWithChildren } from "react";
import { createSearchParams, Navigate, useLocation } from "react-router-dom";

export type RequireAuthProps = PropsWithChildren;

export const RequireAuth = (props: RequireAuthProps) => {
  const { children } = props;

  const location = useLocation();

  if (!localStorage.getItem("email")) {
    return (
      <Navigate
        to={`/login? + ${createSearchParams({
          from: location.pathname,
        }).toString()}`}
      />
    );
  }

  return children;
};
