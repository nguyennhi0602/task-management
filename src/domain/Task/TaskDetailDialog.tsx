import CloseIcon from "@mui/icons-material/Close"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import IconButton from "@mui/material/IconButton"
import styled from "styled-components"
import { categories } from "../../db.json"
import data from "../../db.json"
import { theme } from "../../theme/useCustomTheme"
import { TaskComment } from "../comment/TaskComment"
import { Task } from "./Task"

export type TaskDetailDialogProps = {
  open: boolean
  taskDetails: Task | undefined
  onClose: () => void
}

const getCategoryNameById = (id: number): string => {
  return categories.find((c) => c.id == id)?.name || ""
}

export const TaskDetailDialog = (props: TaskDetailDialogProps) => {
  const { open, taskDetails, onClose } = props

  const findAssignee = (id: string | undefined) => {
    const assignee = data.users.find((user) => user.id === id)
    return assignee ? `${assignee.firstName} ${assignee.lastName}` : ""
  }

  const currentUserId = data.users.find((user) => user.username === localStorage.getItem("email"))?.id ?? ""

  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true}>
      <DialogTitle sx={{ m: 0, p: 2 }} color={theme().palette.text.primary}>
        {taskDetails?.name}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.text.primary,
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {taskDetails && <ChipWrapper label={getCategoryNameById(taskDetails.category)} color="primary" />}
        <Description>
          <h4>Description: </h4>
          <p>{taskDetails?.description}</p>
        </Description>
        <AssignWrapper>
          <h4>Assign to: </h4>
          <p>{findAssignee(taskDetails?.assignee)}</p>
        </AssignWrapper>
        <DeadlineWrapper>
          <h4>Deadline at: </h4>
          <DeadlineAtWrapper>{taskDetails?.deadlineAt}</DeadlineAtWrapper>
        </DeadlineWrapper>
        <hr />
        <br />
        <TaskComment comments={taskDetails?.comments ?? []} taskId={taskDetails?.id ?? ""} userId={currentUserId} />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            color: theme().palette.text.primary,
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const ChipWrapper = styled(Chip)`
  float: right;
`

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
`

const DeadlineWrapper = styled.div`
  display: flex;
  align-items: center;
`

const DeadlineAtWrapper = styled.div<{ $isExpired?: boolean }>`
  max-width: 50%;
  padding: 2px;
  background-color: ${(p) => (p.$isExpired ? "#ffd2cc" : "#bee3be")};
  color: ${(p) => (p.$isExpired ? "#ae2a19" : "#044d15")};
  border-radius: 2px;
  height: 50%;
  margin-left: 6px;
`

const AssignWrapper = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-left: 6px;
  }
`
