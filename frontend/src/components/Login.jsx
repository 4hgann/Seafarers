import {
  Button,
  TextField,
  Container,
  Paper,
  Typography,
  Box,
} from "@mui/material"
import { green } from "@mui/material/colors"
import { useState, useEffect } from "react"
import "../styles/Login.css"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  // Redirects from login to home page if the user has an auth token in session storage
  useEffect(() => {
    const token = sessionStorage.getItem("AuthToken")
    const id = sessionStorage.getItem("LocalID")
    if (token != null && id != null) {
      navigate("/home")
    }
  }, [])

  // Will attempt to login with provided credentials
  const handleAuth = (url) => {
    console.log(`login with: ${username} : ${password}`)
    const options = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }
    fetch(url, options)
      .then(async (res) => {
        const data = await res.json()
        return { ...data, ok: res.ok }
      })
      .then((res) => {
        console.log(res)
        if (res.ok) {
          sessionStorage.setItem("AuthToken", res.token)
          sessionStorage.setItem("LocalID", res.id)
          navigate("/home")
        } else {
          // Convert this to toast
          console.log(res.ErrorMessage)
        }
      })
  }

  return (
    <Container component="main">
      <Box
        sx={{
          my: "25vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={10} sx={{ minHeight: "50vh" }}>
          <Container sx={{ py: "10px", textAlign: "center" }}>
            <Typography variant="h3">Seafarers</Typography>
          </Container>
          <Container
            sx={{ display: "flex", flexDirection: "column", pt: "30px" }}
          >
            <TextField
              label="Username"
              variant="outlined"
              sx={{
                margin: 1,
                maxWidth: "sm",
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              sx={{
                margin: 1,
                maxWidth: "sm",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Container>
          <Container sx={{ display: "flex" }}>
            <Button
              className="submit"
              variant="contained"
              size="large"
              onClick={() => handleAuth("/api/register")}
              sx={{
                margin: 1,
                width: 150,
              }}
            >
              Register
            </Button>

            <Button
              className="submit"
              variant="contained"
              size="large"
              onClick={() => handleAuth("/api/login")}
              sx={{
                margin: 1,
                width: 150,
                backgroundColor: "green",
                ":hover": { backgroundColor: "darkGreen" },
              }}
            >
              Login
            </Button>
          </Container>
        </Paper>
      </Box>
    </Container>
  )
}

export default Login
