import styled from "styled-components";

export const TaskCard = () => {
  return (
    <Wrapper>
      <Title>title</Title>
      <DetailsWrapper>
        <TimeUpdated>02-02-2024</TimeUpdated>
        <>test</>
      </DetailsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 8px;
  background-color: #fff;
  border-radius: 6px;
  gap: 2px;
  cursor: pointer;
`;

const Title = styled.h5`
  margin: 0;
  padding: 10 cpx 0px;
`;

const DetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const TimeUpdated = styled.div`
  max-width: 50%;
  padding: 2px;
  background-color: #ffd2cc;
  color: #ae2a19;
  border-radius: 2px;
  display: flex;
  justify-content: center;
`;
