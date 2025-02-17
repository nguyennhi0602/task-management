import CloseIcon from "@mui/icons-material/Close"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
import { useThemeContext } from "./ThemeContext"
import { theme } from "./useCustomTheme"

export const ThemeCustomize = ({ open = false, onClose = () => {} }) => {
  const themeContext = useThemeContext()
  if (!themeContext) return null // Ensure context exists

  const {
    primaryColor,
    secondaryColor,
    backgroundColor,
    backgroundPaperColor,
    fontFamily,
    setPrimaryColor,
    setSecondaryColor,
    setBackgroundColor,
    setBackgroundPaperColor,
    setFontFamily,
  } = themeContext

  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true}>
      <DialogTitle sx={{ m: 0, p: 2 }} color={theme().palette.text.primary}>
        Theme Customization
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
        <Box component="form" sx={{ "& .MuiTextField-root": { m: 1, width: "100%" } }} noValidate autoComplete="off">
          <div style={{ padding: 20 }}>
            <TextField
              type="color"
              label="Primary Color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              fullWidth
              style={{ marginTop: 10 }}
            />

            <TextField
              type="color"
              label="Secondary Color"
              value={secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
              fullWidth
              style={{ marginTop: 10 }}
            />

            <TextField
              type="color"
              label="Background Default"
              value={backgroundPaperColor}
              onChange={(e) => setBackgroundPaperColor(e.target.value)}
              fullWidth
              style={{ marginTop: 10 }}
            />

            <TextField
              type="color"
              label="Background Paper"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              fullWidth
              style={{ marginTop: 10 }}
            />
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel>Font Family</InputLabel>
              <Select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} label="Select an Option">
                <MenuItem value="Arial">Arial</MenuItem>
                <MenuItem value="Roboto">Roboto</MenuItem>
                <MenuItem value="Georgia">Georgia</MenuItem>
                <MenuItem value="Courier New">Courier New</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Box>
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
