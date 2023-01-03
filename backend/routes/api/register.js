import express from "express"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../Firebase/FirebaseConfig.js"

const router = express.Router()
//const authentication = getAuth()

router.post("/", async (req, res) => {
  console.log(req.body)
  const data = await createUserWithEmailAndPassword(
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
