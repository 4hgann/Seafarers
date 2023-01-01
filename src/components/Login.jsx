import { Button, TextField, Paper } from "@mui/material"
import { green } from "@mui/material/colors"
import { useState, useEffect } from "react"
import "../styles/Login.css"
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { app } from "../Firebase/FirebaseConfig"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const authentication = getAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const token = sessionStorage.getItem("AuthToken")
    if (token) {
      console.log("here2")
      navigate("/home")
    }
  }, [])

  // Will attempt to login with provided credentials
  const handleLogin = () => {
    console.log(`login with: ${username} : ${password}`)
    signInWithEmailAndPassword(authentication, username, password)
      .then((res) => {
        console.log(res)
        //Toast
        sessionStorage.setItem("AuthToken", res._tokenResponse.refreshToken)
      })
      .then(() => navigate("/home"))
  }

  // Will request to create a user with provided credentials
  const handleRegistration = () => {
    console.log(`register with: ${username} : ${password}`)
    createUserWithEmailAndPassword(authentication, username, password).then(
      (res) => {
        console.log(res)
        navigate("/home")
        // Toast with the sucessful response
        sessionStorage.setItem("AuthToken", res._tokenResponse.refreshToken)
      }
    )
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
          onClick={() => handleRegistration()}
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
          onClick={() => handleLogin()}
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
