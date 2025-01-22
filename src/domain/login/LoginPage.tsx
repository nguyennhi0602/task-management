import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "./Login";

export const LoginPage = () => {
  // useNavigateToHomeIfAuthenticated();

  return (
    <div style={{ width: "500px", margin: "auto" }}>
      <Login />
    </div>
  );
};

const useNavigateToHomeIfAuthenticated = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("success");
  }, [navigate]);
};
