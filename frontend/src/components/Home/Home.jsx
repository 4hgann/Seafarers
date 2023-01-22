import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../styles/Home.css"
import ComponentTable from "./Table"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

const Home = () => {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  let token
  let id
  const toastOptions = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }

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
    <div className="background">
      <ToastContainer style={{ width: "500px", textAlign: "center" }} />
      <p style={{ marginTop: 0 }}>Home page </p>
      {items.map((item) => {
        return <p>{item.name}</p>
      })}
      {items.length > 0 && <ComponentTable data={items} />}
      <Button onClick={() => logoutHandler()}>Logout</Button>
    </div>
  )
}

export default Home
