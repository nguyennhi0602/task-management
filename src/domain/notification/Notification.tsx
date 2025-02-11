import { Alert } from "@mui/material"
import Snackbar from "@mui/material/Snackbar"

export type NotificationProps = {
  open: boolean
  message: string
  severity?: "success" | "info" | "warning" | "error"
  onClose: () => void
}

export const Notification = (props: NotificationProps) => {
  const { open, message, severity = "info", onClose } = props

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  )
}
