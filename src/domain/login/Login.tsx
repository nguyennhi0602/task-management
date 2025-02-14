import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import data from "../../db.json"
import { theme } from "../../theme/useCustomTheme"

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const isValidUser = data.users.filter((user) => user.username === email && user.password === password).length > 0

  const handleLogin = async (e: any) => {
    e.preventDefault()

    try {
      if (isValidUser) {
        localStorage.setItem("email", email)
        navigate("/tasks")
      } else {
        setError("An error occurred while logging in.")
      }
    } catch {
      setError("An error occurred while logging in.")
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 3,
          padding: 4,
          borderRadius: 2,
          background: theme().palette.background.paper,
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ borderColor: "black" }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
