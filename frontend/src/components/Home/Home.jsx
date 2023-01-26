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

  console.log("items", items)

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
    fetch(`/api/items?id=${id}`)
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

    const result = fetch(`/api/items?id=${id}`, options).then((res) => {
      if (res.ok) {
        const newItems = [...items]
        newItems.push(item)
        setItems(newItems)
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
          setItems((array) => array.filter((row) => row._id != item._id))
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
      <p style={{ marginTop: 0 }}>Home page </p>
      {items.map((item) => {
        return <p>{item.name}</p>
      })}
      {items.length > 0 && (
        <ComponentTable
          data={items}
          postItem={postRequest}
          updateItem={putRequest}
          deleteItem={deleteRequest}
        />
      )}
      <Button varaint="contained" onClick={() => logoutHandler()}>
        Logout
      </Button>
    </div>
  )
}

export default Home
