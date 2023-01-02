import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import {} from "react-router"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Home/Home"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
