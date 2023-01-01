import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
  let token
  const navigate = useNavigate()

  useEffect(() => {
    token = sessionStorage.getItem("AuthToken")
    if (!token) {
      console.log("here")
      navigate("/")
    }
  }, [])

  return (
    <div>
      <p>Home page </p>
    </div>
  )
}

export default Home
