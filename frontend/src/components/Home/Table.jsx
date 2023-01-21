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

const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
]

const ComponentTable = ({ data }) => {
  const [currentlyEditing, setCurrentlyEditing] = useState("1")
  const fields = ["name", "mass", "x", "y", "z"]
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Component Name</TableCell>
            <TableCell align="center">Mass</TableCell>
            <TableCell align="center">X</TableCell>
            <TableCell align="center">Y</TableCell>
            <TableCell align="center">Z</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
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
                        <TextField value={row[field]} />
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
                <DeleteIcon onClick={() => setCurrentlyEditing("1")} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ComponentTable
