import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import EditIcon from "@mui/icons-material/Edit"
import { Button, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material"
import { useState } from "react"
import { useThemeContext } from "./ThemeContext"

export const ThemeProvider = ({ onThemeCustomize = () => {} }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const themeContext = useThemeContext()
  const { toggleTheme, mode } = themeContext

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setAnchorEl(null)
  }
  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        Theme
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={toggleTheme}>
          <ListItemIcon>{mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}</ListItemIcon>
          <ListItemText>{mode === "dark" ? "Light Mode" : "Dark Mode"}</ListItemText>
        </MenuItem>
        <MenuItem onClick={onThemeCustomize}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Customization</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
