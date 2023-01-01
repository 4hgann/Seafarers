import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import Login from "./components/Login"
import { app } from "./Firebase/FirebaseConfig"
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"

const authentication = getAuth()

const handleLogin = (username, password) => {
  console.log(`login with: ${username} : ${password}`)
}

const handleRegistration = (username, password) => {
  console.log(`register with: ${username} : ${password}`)
  createUserWithEmailAndPassword(authentication, username, password).then(
    (res) => {
      console.log(res)
      // Toast with the sucessful response
      sessionStorage.setItem(
        "AuthToken",
        res.response._tokenResponse.refreshToken
      )
    }
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <Login login={handleLogin} register={handleRegistration} />
            }
          />
          <Route path="home" element={<p>Test</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
