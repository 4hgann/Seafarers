import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { Typography } from "@mui/material"
import { useState } from "react"
import validateItem from "../../Util/InputValidation"

export default function PostDialogForm({ open, setOpen, postItem }) {
  const [data, setData] = useState({
    name: "",
    mass: "",
    x: "",
    y: "",
    z: "",
  })
  const keys = Object.keys(data)

  const id = sessionStorage.getItem("LocalID")

  const handleClose = () => {
    setOpen(false)
  }

  const changeHandler = (key, value) => {
    setData({ ...data, [key]: value })
  }

  const handleSubmit = async () => {
    const result = await postItem(data, id)
    console.log("post", result)
    if (result === true) {
      handleClose()
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Component</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <DialogContentText>
            <Typography>
              Create a new component for your vessel here.
            </Typography>
          </DialogContentText>
          {keys.map((key) => {
            return (
              <TextField
                margin="dense"
                label={key}
                variant="standard"
                onChange={(e) => changeHandler(key, e.target.value)}
              />
            )
          })}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
