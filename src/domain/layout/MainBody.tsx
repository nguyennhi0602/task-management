import { PropsWithChildren } from "react";
import { BaseProps } from "../../components/BaseProps";
import styled from "styled-components";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

export type MainBodyProps = PropsWithChildren<BaseProps>;

export const MainBody = (props: MainBodyProps) => {
  const { children, className } = props;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("email");

    navigate("/login");
  };

  return (
    <BodyWrapper className={className}>
      {children}
      <ButtonWrapper
        variant="contained"
        // color="secondary"
        onClick={handleLogout}
        sx={{ mt: 2 }}
        startIcon={<LogoutIcon />}
      >
        Logout
      </ButtonWrapper>
    </BodyWrapper>
  );
};

const BodyWrapper = styled.div`
  padding: 32px 42px;
`;

const ButtonWrapper = styled(Button)`
  float: right;
  background-color: gray;
`;
