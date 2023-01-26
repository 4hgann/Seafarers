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
import { TextField } from "@mui/material"
import { toast } from "react-toastify"

const ComponentTable = ({ data, updateItem }) => {
  const [currentlyEditing, setCurrentlyEditing] = useState(null)
  const [copy, setCopy] = useState([...data])

  const userId = sessionStorage.getItem("LocalID")

  const headings = ["Component Name", "Mass", "X", "Y", "Z", "Edit", "Delete"]
  const fields = ["name", "mass", "x", "y", "z"]

  // Edits a temporary copy before submitting
  const handleEdit = (id, field, value) => {
    setCopy(
      copy.map((item) => {
        if (item._id === id) {
          const newItem = { ...item }
          newItem[field] = value
          return newItem
        } else {
          return item
        }
      })
    )
  }

  const submitEdit = async (id) => {
    if (JSON.stringify(data) === JSON.stringify(copy)) {
      console.log("ping")
      setCurrentlyEditing(null)
      return
    }
    const currentItem = copy.find((item) => item._id === id)
    try {
      currentItem.name = String(currentItem.name)
      currentItem.mass = Number(currentItem.mass)
      currentItem.x = Number(currentItem.x)
      currentItem.y = Number(currentItem.y)
      currentItem.z = Number(currentItem.z)
      if (
        isNaN(currentItem.mass) ||
        isNaN(currentItem.x) ||
        isNaN(currentItem.y) ||
        isNaN(currentItem.z)
      ) {
        throw new Error(
          "Funny guy, you put the wrong data type in one of the fields, oi"
        )
      } else {
        const isSuccess = await updateItem(currentItem, userId)
        if (!isSuccess) {
          throw new Error(
            "There was a problem completing your update request at this time. Try again later."
          )
        }
        toast.success("Item successfully updated")
        setCurrentlyEditing(null)
      }
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headings.map((heading) => {
              return <TableCell align="center">{heading}</TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {copy.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
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
                <DeleteIcon onClick={() => submitEdit(row._id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ComponentTable
