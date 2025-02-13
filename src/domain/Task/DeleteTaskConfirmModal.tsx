import CloseIcon from "@mui/icons-material/Close"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import IconButton from "@mui/material/IconButton"
import { theme } from "../../theme/useCustomTheme"
import { Task } from "./Task"

export type DeleteTaskConfirmModalProps = {
  taskDetail: Task | undefined
  open: boolean
  onClose: () => void
  onDelete: (data: any) => void
}

export const DeleteTaskConfirmModal = (props: DeleteTaskConfirmModalProps) => {
  const { taskDetail, open, onClose, onDelete } = props

  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true}>
      <DialogTitle sx={{ m: 0, p: 2 }} color="error">
        Delete task
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
        <h3>{`Are you want to remove ${taskDetail?.name}?`}</h3>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onDelete}>
          Delete
        </Button>
        <Button
          sx={{
            color: theme().palette.text.primary,
          }}
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
