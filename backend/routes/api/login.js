import express from "express"
import { auth } from "../../Firebase/FirebaseConfig.js"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const router = express.Router()
//const authentication = getAuth()

router.get("/", (req, res) => res.send("tester"))

router.post("/", async (req, res) => {
  console.log(req.body)
  const token = await signInWithEmailAndPassword(
    auth,
    req.body.username,
    req.body.password
  ).then((res) => {
    console.log(res)
    return res._tokenResponse.refreshToken
  })
  res.status(200).json({ token: token })
})

export default router
