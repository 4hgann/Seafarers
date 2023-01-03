import express from "express"
import { auth } from "../../Firebase/FirebaseConfig.js"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const router = express.Router()
//const authentication = getAuth()

router.get("/", (req, res) => res.send("tester"))

router.post("/", async (req, res) => {
  console.log(req.body)
  const data = await signInWithEmailAndPassword(
    auth,
    req.body.username,
    req.body.password
  ).then((res) => {
    console.log(res)
    return {
      token: res._tokenResponse.refreshToken,
      id: res._tokenResponse.localId,
    }
  })
  res.status(200).json(data)
})

export default router
