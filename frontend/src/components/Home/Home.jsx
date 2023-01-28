import { Button, Container, Paper, Typography, Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../styles/Home.css"
import ComponentTable from "./Table"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import LogoutIcon from "@mui/icons-material/Logout"
import Logo from "./Logo"

const Home = () => {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  let token
  let id

  useEffect(() => {
    token = sessionStorage.getItem("AuthToken")
    id = sessionStorage.getItem("LocalID")
    if (token === null || !id === null) {
      navigate("/")
    } else {
      getItems()
    }
  }, [])

  const getItems = async () => {
    id = sessionStorage.getItem("LocalID")
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

  const logoutHandler = () => {
    sessionStorage.removeItem("AuthToken")
    sessionStorage.removeItem("LocalID")
    navigate("/")
  }

  return (
    <div className="background">
      <ToastContainer style={{ width: "500px", textAlign: "center" }} />
      <Paper
        elevation={24}
        sx={{
          borderRadius: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flexBasis: "33%" }}>
          <Logo direction="row" />
        </div>
        <h1
          class="title"
          style={{
            display: "inline-block",
            my: "auto",
            flexBasis: "33%",
            textAlign: "center",
          }}
        >
          Center Of Mass Calculator
        </h1>
        <Box
          style={{
            flexBasis: "33%",
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => logoutHandler()}
            sx={{
              borderRadius: 0,
              height: "100%",
              ":hover": { backgroundColor: "darkBlue", color: "white" },
            }}
            endIcon={<LogoutIcon />}
          ></Button>
        </Box>
      </Paper>
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
