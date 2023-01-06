import express from "express"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../Firebase/FirebaseConfig.js"
import { doc, setDoc } from "firebase/firestore"
import { StatusCodes } from "http-status-codes"
import ErrorMessageMap from "../../Firebase/ErrorMessageMap.js"

const router = express.Router()

router.post("/", async (req, res) => {
  console.log(req.body)
  await createUserWithEmailAndPassword(
    auth,
    req.body.username,
    req.body.password
  )
    .then(async (authRes) => {
      const docRef = doc(db, "user-items", authRes._tokenResponse.localId)
      await setDoc(docRef, { items: [] })
      const data = {
        token: authRes._tokenResponse.refreshToken,
        id: authRes._tokenResponse.localId,
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      let errorMessage
      if (err.code in ErrorMessageMap) {
        errorMessage = ErrorMessageMap[err.code]
      } else {
        errorMessage = "There was a problem completing your request"
      }
      res.status(StatusCodes.BAD_REQUEST).json({ ErrorMessage: errorMessage })
    })
})

export default router
