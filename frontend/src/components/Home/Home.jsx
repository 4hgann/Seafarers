import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  let token
  let id

  useEffect(() => {
    token = sessionStorage.getItem("AuthToken")
    id = sessionStorage.getItem("LocalID")
    if (token === null || !id === null) {
      console.log("here")
      navigate("/")
    } else {
      fetch(`/api/items?id=${id}`)
        .then((res) => res.json())
        .then((res) => setItems(res))
    }
  }, [])

  const logoutHandler = () => {
    sessionStorage.removeItem("AuthToken")
    sessionStorage.removeItem("LocalID")
    navigate("/")
  }

  return (
    <div>
      <p>Home page </p>
      {items.map((item) => {
        return <p>{item.name}</p>
      })}
      <Button onClick={() => logoutHandler()}>Logout</Button>
    </div>
  )
}

export default Home
