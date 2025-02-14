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
  primaryColor: "",
  secondaryColor: "",
  backgroundColor: "",
  backgroundPaperColor: "",
  fontFamily: "",
  setPrimaryColor: (color: string) => {},
  setSecondaryColor: (color: string) => {},
  setBackgroundColor: (color: string) => {},
  setBackgroundPaperColor: (color: string) => {},
  setFontFamily: (font: string) => {},
})

// Theme Provider Component
export const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>("light")
  const [primaryColor, setPrimaryColor] = useState(localStorage.getItem("primaryColor") || "#091E42")
  const [secondaryColor, setSecondaryColor] = useState(localStorage.getItem("secondaryColor") || "#FFFFFF")
  const [backgroundColor, setBackgroundColor] = useState(localStorage.getItem("backgroundColor") || "#F1F2F4")
  const [backgroundPaperColor, setBackgroundPaperColor] = useState(
    localStorage.getItem("backgroundPaperColor") || "#FFFFFF"
  )
  const [fontFamily, setFontFamily] = useState(localStorage.getItem("fontFamily") || "Arial")

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
    setDesignTokens(mode)
  }

  const setDesignTokens = (mode: PaletteMode) => {
    if (mode === "light") {
      updatePrimaryColor("#DEE4EA")
      updateSecondaryColor("#454F59")
      updateBackgroundColor("#22272B")
      updateBackgroundPaperColor("#454F59")
    } else {
      updatePrimaryColor("#091E42")
      updateSecondaryColor("#FFFFFF")
      updateBackgroundColor("#F1F2F4")
      updateBackgroundPaperColor("#FFFFFF")
    }
  }

  const updatePrimaryColor = (color: string) => {
    setPrimaryColor(color)
    localStorage.setItem("primaryColor", color)
  }

  const updateSecondaryColor = (color: string) => {
    setSecondaryColor(color)
    localStorage.setItem("secondaryColor", color)
  }

  const updateBackgroundColor = (color: string) => {
    setBackgroundColor(color)
    localStorage.setItem("backgroundColor", color)
  }

  const updateBackgroundPaperColor = (color: string) => {
    setBackgroundPaperColor(color)
    localStorage.setItem("backgroundPaperColor", color)
  }

  const updateFontFamily = (font: string) => {
    setFontFamily(font)
    localStorage.setItem("fontFamily", font)
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: primaryColor },
          secondary: { main: secondaryColor },
          background: { default: backgroundColor, paper: backgroundPaperColor },
          ...(mode === "dark"
            ? {
                text: { primary: "#ffffff", secondary: "#F1F2F4" },
              }
            : {
                text: { primary: "#000000", secondary: "#9FADBC" }, // Black text
              }),
        },
        typography: { fontFamily },
      }),
    [mode, primaryColor, secondaryColor, backgroundColor, backgroundPaperColor, fontFamily]
  )

  return (
    <ThemeContext.Provider
      value={{
        toggleTheme,
        mode,
        primaryColor,
        secondaryColor,
        backgroundColor,
        backgroundPaperColor,
        fontFamily,
        setPrimaryColor: updatePrimaryColor,
        setSecondaryColor: updateSecondaryColor,
        setBackgroundColor: updateBackgroundColor,
        setBackgroundPaperColor: updateBackgroundPaperColor,
        setFontFamily: updateFontFamily,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

// Custom Hook to use ThemeContext
export const useThemeContext = () => useContext(ThemeContext)
