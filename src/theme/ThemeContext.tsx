import { CssBaseline, PaletteMode } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import React, { createContext, useContext, useMemo, useState } from "react"

export type ThemeContextType = {
  mode: "light" | "dark"
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  fontFamily: string
  setMode: (mode: "light" | "dark") => void
  setPrimaryColor: (color: string) => void
  setSecondaryColor: (color: string) => void
  setBackgroundColor: (color: string) => void
  setFontFamily: (font: string) => void
}

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
          primary: { main: "#DEE4EA" },
          secondary: { main: "#454F59" },
          background: { default: "#22272B", paper: "#454F59" },
          text: { primary: "#ffffff", secondary: "#F1F2F4" },
        }
      : {
          primary: { main: "#091E42" }, // Blue
          secondary: { main: "#FFFFFF" }, // Red
          background: { default: "#F1F2F4", paper: "#FFFFFF" },
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
