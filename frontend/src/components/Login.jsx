import { Button, TextField, Paper } from "@mui/material"
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
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        sessionStorage.setItem("AuthToken", res.token)
        sessionStorage.setItem("LocalID", res.id)
        navigate("/home")
      })
  }

  return (
    <Paper className="login-window" elevation={4} sx={{ borderRadius: 4 }}>
      <div>
        <p className="test">Seafarers</p>
      </div>
      <p className="heading">Login or Register</p>
      <div className="fields">
        <TextField
          className="field"
          label="Username"
          variant="outlined"
          sx={{
            margin: 1,
          }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          className="field"
          label="Password"
          variant="outlined"
          sx={{
            margin: 1,
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="buttons">
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
          }}
        >
          Login
        </Button>
      </div>
    </Paper>
  )
}

export default Login
