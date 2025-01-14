import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/router";
import "./theme/theme.scss";
import styled from "styled-components";

export const App = () => {
  return (
    <OutletWrapper>
      <RouterProvider
        router={createBrowserRouter(routes)}
        fallbackElement={<p>Initial Load...</p>}
      />
    </OutletWrapper>
  );
};

const OutletWrapper = styled.div`
  display: contents;
`;
