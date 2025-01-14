import { PropsWithChildren } from "react";
import { BaseProps } from "../../components/BaseProps";
import styled from "styled-components";

export type MainBodyProps = PropsWithChildren<BaseProps>;

export const MainBody = (props: MainBodyProps) => {
  const { children, className } = props;

  return <BodyWrapper className={className}>{children}</BodyWrapper>;
};

const BodyWrapper = styled.div`
  padding: 32px 42px;
`;
