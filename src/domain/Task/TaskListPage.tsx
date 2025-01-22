import { useState } from "react";
import { TaskCard } from "./TaskCard";
import { MainBody } from "../layout/MainBody";
import styled from "styled-components";
import { TaskDetailDialog } from "./TaskDetailDialog";
import { tasks, categories } from "../../db.json";
import { Task } from "./Task";
import AddIcon from "@mui/icons-material/Add";
import { CreateTaskModal } from "./CreateTaskModal";
import moment from "moment";
import { DeleteTaskConfirmModal } from "./DeleteTaskConfirmModal";
import { RequireAuth } from "../auth/RequireAuth";

export const TaskListPage = () => {
  const [mockData, setMockData] = useState(tasks);
  const [isOpenTaskDetails, setOpenTaskDetails] = useState(false);
  const [isOpenNewTaskModal, setOpenNewTaskModal] = useState(false);
  const [isOpenDeleteTaskConfirmModal, setOpenDeleteTaskConfirmModal] =
    useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const getTasksByCategory = (categoryId: number) => {
    return mockData.filter((task) => task.category === categoryId);
  };

  const handleClickOpen = (task: Task) => {
    setOpenTaskDetails(true);
    setSelectedTask(task);
  };

  const handleClose = () => {
    setOpenTaskDetails(false);
    setSelectedTask(undefined);
  };

  const handleCreateNewTask = (category: number) => {
    setSelectedCategory(category);
    setOpenNewTaskModal(true);
  };

  const handleCreateNewTaskClose = () => {
    setOpenNewTaskModal(false);
    setSelectedTask(undefined);
  };

  const handleSubmitCreateNewTaskForm = (task: Task) => {
    let newMockData: Task[] = [];
    if (!task.id) {
      mockData.push({
        id: mockData[mockData.length - 1].id + 1,
        name: task.name,
        description: task.description,
        assignee: task.assignee,
        deadlineAt: moment(new Date(task.deadlineAt)).format("YYYY-MM-DD"),
        category: selectedCategory,
      } as Task);
      newMockData = mockData;
    } else {
      newMockData = mockData.map((t) => (t.id === task.id ? { ...task } : t));
    }
    setMockData(newMockData);
    setOpenNewTaskModal(false);
    setSelectedTask(undefined);
  };

  const onUpdateOrDeleteTask = (action: string, task: Task) => {
    setSelectedTask(task);
    if (action === "delete") {
      setOpenDeleteTaskConfirmModal(true);
    }
    if (action === "update") {
      setSelectedCategory(0);
      setOpenNewTaskModal(true);
    }
  };

  const handleDeleteTask = (id: number | undefined) => {
    const newMockData = mockData.filter((data) => data.id !== id);
    setMockData(newMockData);
    setOpenDeleteTaskConfirmModal(false);
    setSelectedTask(undefined);
  };

  const handleCloseDeleteTaskModal = () => {
    setOpenDeleteTaskConfirmModal(false);
    setSelectedTask(undefined);
  };

  return (
    <RequireAuth>
      <MainBody>
        <Header>TASK MANAGEMENT</Header>
        <Container>
          {Object.values(categories).map((category) => (
            <TaskColumn>
              <h3>{category.name}</h3>
              <TaskWrapper>
                {getTasksByCategory(category.id).map((task) => (
                  <TaskCard
                    taskDetail={task}
                    onClick={() => handleClickOpen(task)}
                    onAction={(action) => onUpdateOrDeleteTask(action, task)}
                  />
                ))}
              </TaskWrapper>
              <AddButton onClick={() => handleCreateNewTask(category.id)}>
                <AddIcon fontSize="medium" />
              </AddButton>
            </TaskColumn>
          ))}
        </Container>
        <TaskDetailDialog
          open={isOpenTaskDetails}
          taskDetails={selectedTask}
          onClose={handleClose}
        ></TaskDetailDialog>
        <CreateTaskModal
          open={isOpenNewTaskModal}
          onClose={handleCreateNewTaskClose}
          onSubmitForm={handleSubmitCreateNewTaskForm}
          taskDetail={selectedTask}
          selectedCategory={selectedCategory}
        ></CreateTaskModal>
        <DeleteTaskConfirmModal
          open={isOpenDeleteTaskConfirmModal}
          onClose={handleCloseDeleteTaskModal}
          onDelete={() => handleDeleteTask(selectedTask?.id)}
          taskDetail={selectedTask}
        ></DeleteTaskConfirmModal>
      </MainBody>
    </RequireAuth>
  );
};

const Header = styled.h1`
  margin-bottom: 30px;
  font-size: 30px;
`;

const Container = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
`;

const TaskColumn = styled.div`
  min-width: 320px;
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

const AddButton = styled.div`
  background-color: #fff;
  height: 80px;
  border-radius: 6px;
  margin-top: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
