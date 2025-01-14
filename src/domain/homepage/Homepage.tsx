import { TaskCard } from "../Task/TaskCard";
import { MainBody } from "../layout/MainBody";
import styled from "styled-components";

export const Homepage = () => {
  return (
    <MainBody>
      <Header>Homepage</Header>
      <Container>
        <TaskColumn>
          <h3>Todo</h3>
          <TaskWrapper>
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
          </TaskWrapper>
        </TaskColumn>
        <TaskColumn>
          <h3>In progress</h3>
          <TaskWrapper>
            <TaskCard />
            <TaskCard />
            <TaskCard />
          </TaskWrapper>
        </TaskColumn>
        <TaskColumn>
          <h3>Review</h3>
          <TaskWrapper>
            <TaskCard />
            <TaskCard />
            <TaskCard />
          </TaskWrapper>
        </TaskColumn>
        <TaskColumn>
          <h3>Done</h3>
          <TaskWrapper>
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
          </TaskWrapper>
        </TaskColumn>
      </Container>
    </MainBody>
  );
};

const Header = styled.h1`
  margin-bottom: 20px;
`;

const Container = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
`;

const TaskColumn = styled.div`
  min-width: 250px;
  background-color: #e8e6e6;
  border-radius: 6px;
  padding: 8px;
  grid-template-rows: auto;
  grid-template-columns: auto;
  justify-content: center;
`;

const TaskWrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 10px;
  margin-top: 10px;
`;
