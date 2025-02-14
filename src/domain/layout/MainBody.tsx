import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import LogoutIcon from "@mui/icons-material/Logout"
import { Button } from "@mui/material"
import { PropsWithChildren, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { BaseProps } from "../../components/BaseProps"
import { ThemeCustomize } from "../../theme/ThemeCustomize"
import { ThemeProvider } from "../../theme/ThemeProvider"
import { theme } from "../../theme/useCustomTheme"

export type MainBodyProps = PropsWithChildren<BaseProps>

export const MainBody = (props: MainBodyProps) => {
  const { children } = props
  const [openTheme, setOpenTheme] = useState(false)

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("email")

    navigate("/login")
  }

  const HeaderWrapper = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 30px;
  `

  const Header = styled.h1`
    font-size: 30px;
    color: ${theme().palette.text.primary};
  `

  const BodyWrapper = styled.div`
    padding: 32px 42px;
    display: inline-block;
    background-color: ${theme().palette.background.paper};
    min-height: 100vh;
  `

  const ButtonWrapper = styled(Button)`
    float: right;
    background-color: ${theme().palette.background.default};
  `

  return (
    <BodyWrapper>
      <ThemeCustomize open={openTheme} onClose={() => setOpenTheme(false)}></ThemeCustomize>
      <HeaderWrapper>
        <Header>TASK MANAGEMENT</Header>
        <ThemeProvider onThemeCustomize={() => setOpenTheme(!openTheme)}></ThemeProvider>
      </HeaderWrapper>
      {children}
      <ButtonWrapper variant="contained" onClick={handleLogout} sx={{ mt: 2 }} startIcon={<LogoutIcon />}>
        Logout
      </ButtonWrapper>
    </BodyWrapper>
  )
}
