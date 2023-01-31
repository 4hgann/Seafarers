import { Paper, Box, Button } from "@mui/material"
import LogoutIcon from "@mui/icons-material/Logout"
import Logo from "./Logo"
import { useNavigate } from "react-router-dom"

const Banner = () => {
  const navigate = useNavigate()

  const LogoutHandler = () => {
    sessionStorage.removeItem("AuthToken")
    sessionStorage.removeItem("LocalID")
    navigate("/")
  }

  return (
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
        className="title"
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
          onClick={() => LogoutHandler()}
          sx={{
            borderRadius: 0,
            height: "100%",
            ":hover": { backgroundColor: "darkBlue", color: "white" },
          }}
          endIcon={<LogoutIcon />}
        ></Button>
      </Box>
    </Paper>
  )
}

export default Banner
