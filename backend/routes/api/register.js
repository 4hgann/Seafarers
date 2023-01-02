import express from "express"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

const router = express.Router()
const authentication = getAuth()

router.post("/", async (req, res) => {
  console.log(req.body)
  const token = await createUserWithEmailAndPassword(
    authentication,
    req.body.username,
    req.body.password
  ).then((res) => {
    console.log(res)
    return res._tokenResponse.refreshToken
  })
  res.status(200).json({ token: token })
})

export default router
