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
import { useState } from "react"
import { TextField } from "@mui/material"

const ComponentTable = ({ data }) => {
  const [currentlyEditing, setCurrentlyEditing] = useState(null)
  const headings = ["Component Name", "Mass", "X", "Y", "Z", "Edit", "Delete"]
  const fields = ["name", "mass", "x", "y", "z"]

  const copy = [...data]
  // console.log(copy)

  const handleEdit = (id, field, value) => {
    console.log(id, field, value)
    const row = copy.find((item) => item._id === id)
    row[field] = value
    console.log(copy)
  }

  const submitEdit = (id) => {
    console.log(copy.find((item) => item._id === id))
    setCurrentlyEditing(null)
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
          {data.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {row._id === currentlyEditing ? (
                <>
                  {fields.map((field) => {
                    return (
                      <TableCell align="center" sx={{ width: "14%" }}>
                        <TextField
                          value={row[field]}
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
                <EditIcon onClick={() => setCurrentlyEditing(row._id)} />
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
