import { Button, TextField, Paper } from "@mui/material"
import { green } from "@mui/material/colors"
import { useState } from "react"
import "../styles/Login.css"

const Login = ({ login, register }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const callback = () => {
    console.log(username)
    console.log(password)
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
          onClick={() => register(username, password)}
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
          onClick={() => login(username, password)}
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
