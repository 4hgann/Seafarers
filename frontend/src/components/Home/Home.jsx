import { Container } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import ComponentTable from "./Table"
import Banner from "./Banner"

import "react-toastify/dist/ReactToastify.css"
import "../../styles/Home.css"

const Home = () => {
  const [items, setItems] = useState([])

  const navigate = useNavigate()
  const token = sessionStorage.getItem("AuthToken")
  const id = sessionStorage.getItem("LocalID")

  useEffect(() => {
    if (token === null || !id === null) {
      LogoutHandler()
    } else {
      getItems()
    }
  }, [])

  const LogoutHandler = () => {
    sessionStorage.removeItem("AuthToken")
    sessionStorage.removeItem("LocalID")
    navigate("/")
  }

  const getItems = async () => {
    await fetch(`/api/items?id=${id}`)
      .then((res) => res.json())
      .then((res) => setItems(res))
  }

  const postRequest = async (item, id) => {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ item }),
    }

    const result = await fetch(`/api/items?id=${id}`, options).then((res) => {
      if (res.ok) {
        return true
      }
      return false
    })
    await getItems()
    return result
  }

  const putRequest = async (item, id) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ item }),
    }

    const result = await fetch(`/api/items?id=${id}`, options).then(
      async (res) => {
        if (res.ok) {
          setItems(
            items.map((row) => {
              if (item._id === row._id) {
                return { ...item }
              }
              return row
            })
          )
          return true
        }
        return false
      }
    )
    return result
  }

  const deleteRequest = async (item, id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ item }),
    }
    const result = await fetch(`/api/items?id=${id}`, options).then(
      async (res) => {
        if (res.ok) {
          if (item != null) {
            setItems((array) => array.filter((row) => row._id != item._id))
            return true
          }
          setItems([])
          return true
        }
        return false
      }
    )
    return result
  }

  return (
    <div className="background">
      <ToastContainer style={{ width: "500px", textAlign: "center" }} />
      <Banner />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <ComponentTable
          data={items}
          postItem={postRequest}
          updateItem={putRequest}
          deleteItem={deleteRequest}
        />
      </Container>
    </div>
  )
}

export default Home
