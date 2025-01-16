import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Task } from "./Task";
import styled from "styled-components";
import Chip from "@mui/material/Chip";
import { categories } from "../../db.json";

export type TaskDetailDialogProps = {
  open: boolean;
  taskDetails: Task | undefined;
  onClose: () => void;
};

const getCategoryNameById = (id: number): string => {
  return categories.find((c) => c.id == id)?.name || "";
};

export const TaskDetailDialog = (props: TaskDetailDialogProps) => {
  const { open, taskDetails, onClose } = props;

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} color="#1976d2">
        {taskDetails?.name}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {taskDetails && (
          <ChipWrapper
            label={getCategoryNameById(taskDetails.category)}
            color="primary"
          />
        )}
        <Description>
          <h4>Description: </h4>
          <p>{taskDetails?.description}</p>
        </Description>
        <AssignWrapper>
          <h4>Assign to: </h4>
          <p>{taskDetails?.assignee}</p>
        </AssignWrapper>
        <DeadlineWrapper>
          <h4>Deadline at: </h4>
          <DeadlineAtWrapper>{taskDetails?.deadlineAt}</DeadlineAtWrapper>
        </DeadlineWrapper>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

const ChipWrapper = styled(Chip)`
  float: right;
`;

const Description = styled.div`
  margin: 0;
  h4 {
    margin: 0;
  }
  p {
    margin: 0px 0px 0px 40px;
  }

  p::before {
    content: "•";
    position: absolute;
    left: 0;
    color: black;
    font-size: 1.2em;
    margin: 0px 0px 0px 40px;
  }
`;

const DeadlineWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DeadlineAtWrapper = styled.div<{ $isExpired?: boolean }>`
  max-width: 50%;
  padding: 2px;
  background-color: ${(p) => (p.$isExpired ? "#ffd2cc" : "#bee3be")};
  color: ${(p) => (p.$isExpired ? "#ae2a19" : "#044d15")};
  border-radius: 2px;
  height: 50%;
  margin-left: 6px;
`;

const AssignWrapper = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-left: 6px;
  }
`;
