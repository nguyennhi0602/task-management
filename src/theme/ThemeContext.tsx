import { CssBaseline, PaletteMode } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import React, { createContext, useContext, useMemo, useState } from "react"

// Context for Theme Mode
const ThemeContext = createContext({
  toggleTheme: () => {},
  mode: "light" as PaletteMode,
})

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "dark"
      ? {
          primary: { main: "#44546F" }, // Light Blue
          secondary: { main: "#454F59" }, // Pink
          background: { default: "#22272B", paper: "#454F59" }, // Dark BG
          text: { primary: "#ffffff", secondary: "#F1F2F4" }, // White text
        }
      : {
          primary: { main: "#9FADBC" }, // Blue
          secondary: { main: "#FFFFFF" }, // Red
          background: { default: "#F1F2F4", paper: "#FFFFFF" }, // Light BG
          text: { primary: "#000000", secondary: "#9FADBC" }, // Black text
        }),
  },
})

// Theme Provider Component
export const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>("light")

  const toggleTheme = () => {
    console.log("mode")
    console.log(mode)
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
  }

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

// Custom Hook to use ThemeContext
export const useThemeContext = () => useContext(ThemeContext)
