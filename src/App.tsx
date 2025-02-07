import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/router";
import "./theme/theme.scss";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getMessagingToken, onMessageListener } from "./firebase";
import { Notification } from "./domain/notification/Notification";
import { firebaseRegister } from "./firebaseRegister";

export const App = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("This is a notification!");
  const [severity, setSeverity] = useState<
    "success" | "info" | "warning" | "error"
  >("success");

  firebaseRegister();

  const handleShowNotification = (
    message: string,
    severity: "success" | "info" | "warning" | "error",
    open: boolean
  ) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(open);
  };

  useEffect(() => {
    getMessagingToken();
  }, []);

  useEffect(() => {
    onMessageListener().then((data: any) => {
      if (data["notification"]["title"]) {
        handleShowNotification(data["notification"]["title"], "info", true);
      }
    });
  });

  return (
    <>
      <Notification
        open={open}
        message={message}
        severity={severity}
        onClose={() => setOpen(false)}
      />
      <OutletWrapper>
        <RouterProvider
          router={createBrowserRouter(routes)}
          fallbackElement={<p>Initial Load...</p>}
        />
      </OutletWrapper>
    </>
  );
};

const OutletWrapper = styled.div`
  display: contents;
`;
