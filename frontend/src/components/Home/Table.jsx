import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import CheckIcon from "@mui/icons-material/Check"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { useState, useEffect } from "react"
import { Button, Container, TextField, Typography } from "@mui/material"
import { toast } from "react-toastify"
import PostDialogForm from "./PostDialogForm"
import validateItem from "../../Util/InputValidation"
import ToastOptions from "../../Util/ToastOptions"

const ComponentTable = ({ data, postItem, updateItem, deleteItem }) => {
  const [currentlyEditing, setCurrentlyEditing] = useState(null)
  const [copy, setCopy] = useState([...data])
  const [showDialog, setShowDialog] = useState(false)

  const COM = { x: 0, y: 0, z: 0 }

  const totalMass =
    data.length > 0
      ? data.reduce((previous, current) => previous + Number(current.mass), 0)
      : 1
  console.log(totalMass)

  data.map((row) => {
    COM.x += row.mass * row.x
    COM.y += row.mass * row.y
    COM.z += row.mass * row.z
  })

  COM.x = Math.round((COM.x / totalMass) * 100) / 100
  COM.y = Math.round((COM.y / totalMass) * 100) / 100
  COM.z = Math.round((COM.z / totalMass) * 100) / 100

  console.log(COM)

  const userId = sessionStorage.getItem("LocalID")

  useEffect(() => {
    setCopy([...data])
  }, [data])

  const headings = ["Component Name", "Mass", "X", "Y", "Z", "Edit", "Delete"]
  const fields = ["name", "mass", "x", "y", "z"]
  const errorString =
    "There was a problem completing your request at this time. Try again later."
  // Edits a temporary copy before submitting
  const handleEdit = (id, field, value) => {
    setCopy(
      copy.map((item) => {
        if (item._id === id) {
          const newItem = { ...item }
          newItem[field] = value
          return newItem
        }
        return item
      })
    )
  }

  const submitEdit = async (id) => {
    if (JSON.stringify(data) === JSON.stringify(copy)) {
      setCurrentlyEditing(null)
      return
    }
    const currentItem = copy.find((item) => item._id === id)
    const isValid = validateItem(currentItem)
    if (isValid != false) {
      const isSuccess = await updateItem(currentItem, userId)
      if (!isSuccess) {
        toast.error(errorString, ToastOptions)
      } else {
        toast.success("Item successfully updated", ToastOptions)
        setCurrentlyEditing(null)
      }
    }
  }

  const submitDelete = async (item) => {
    console.log(item)
    const isSuccess = await deleteItem(item, userId)
    if (isSuccess) {
      toast.success("Item sucessfully deleted", ToastOptions)
    } else {
      toast.error(errorString, ToastOptions)
    }
  }

  return (
    <TableContainer component={Paper}>
      <Container sx={{ textAlign: "center" }}>
        <h1 class="logo">
          Current Center of Mass: {`(${COM.x}, ${COM.y}, ${COM.z})`}
        </h1>
      </Container>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headings.map((heading) => {
              return <TableCell align="center">{heading}</TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            copy.map((row) => (
              <TableRow key={row._id}>
                {row._id === currentlyEditing ? (
                  <>
                    {fields.map((field) => {
                      const copyRow = copy.find((item) => item._id === row._id)
                      return (
                        <TableCell align="center" sx={{ width: "14%" }}>
                          <TextField
                            value={copyRow[field]}
                            onChange={(e) =>
                              handleEdit(row._id, field, e.target.value)
                            }
                          />
                        </TableCell>
                      )
                    })}
                  </>
                ) : (
                  <>
                    {fields.map((field) => {
                      return (
                        <TableCell align="center" sx={{ width: "14%" }}>
                          {row[field]}
                        </TableCell>
                      )
                    })}
                  </>
                )}
                <TableCell align="center">
                  {row._id === currentlyEditing ? (
                    <CheckIcon onClick={() => submitEdit(row._id)} />
                  ) : (
                    <EditIcon onClick={() => setCurrentlyEditing(row._id)} />
                  )}
                </TableCell>
                <TableCell align="center">
                  <DeleteIcon onClick={() => submitDelete(row)} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>
                <h3 className="tableText" style={{ textAlign: "center" }}>
                  Nothing here! Try adding an item using the button below.
                </h3>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Container
        sx={{
          mx: 0,
          px: 0,
          minWidth: "100%",
          display: "flex",
          justifyContent: "flex-end",
          my: 2,
        }}
      >
        <Button
          variant="contained"
          sx={{ mx: 2 }}
          onClick={() => setShowDialog((value) => !value)}
        >
          Add Component
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ mx: 2 }}
          onClick={() => submitDelete(null)}
        >
          Clear All
        </Button>
      </Container>
      <PostDialogForm
        open={showDialog}
        setOpen={setShowDialog}
        postItem={postItem}
      />
    </TableContainer>
  )
}

export default ComponentTable
