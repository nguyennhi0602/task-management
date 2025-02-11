import { Outlet } from "react-router-dom"

export const LayoutPage = () => {
  return <LayoutPageInternal />
}

const LayoutPageInternal = () => {
  const isLoading = false

  if (isLoading) return <>LOADING LayoutPage...</>

  return <Outlet />
}
