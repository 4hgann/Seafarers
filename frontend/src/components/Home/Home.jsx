import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../styles/Home.css"
import ComponentTable from "./Table"

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
        .then()
    }
  }, [])

  const logoutHandler = () => {
    sessionStorage.removeItem("AuthToken")
    sessionStorage.removeItem("LocalID")
    navigate("/")
  }

  return (
    <div className="background">
      <p style={{ marginTop: 0 }}>Home page </p>
      {items.map((item) => {
        return <p>{item.name}</p>
      })}
      <ComponentTable data={items} />
      <Button onClick={() => logoutHandler()}>Logout</Button>
    </div>
  )
}

export default Home
