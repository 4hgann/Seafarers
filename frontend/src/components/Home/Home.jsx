import { Button } from "@mui/material"
import { getAuth, signOut } from "firebase/auth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()
  let token

  useEffect(() => {
    token = sessionStorage.getItem("AuthToken")
    if (!token) {
      console.log("here")
      navigate("/")
    }
  }, [])

  const logoutHandler = () => {
    sessionStorage.removeItem("AuthToken")
    navigate("/")
  }

  return (
    <div>
      <p>Home page </p>
      <Button onClick={() => logoutHandler()}>Logout</Button>
    </div>
  )
}

export default Home
