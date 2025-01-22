import { useCallback, useContext, useEffect, useState } from "react";
import {
  createSearchParams,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

export const LayoutPage = () => {
  return <LayoutPageInternal />;
};

const LayoutPageInternal = () => {
  const isLoading = false;

  if (isLoading) return <>LOADING LayoutPage...</>;

  return <Outlet />;
};
