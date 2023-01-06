import express from "express"
import { auth, db } from "../../Firebase/FirebaseConfig.js"

import { signInWithEmailAndPassword } from "firebase/auth"
import { StatusCodes } from "http-status-codes"
import ErrorMessageMap from "../../Firebase/ErrorMessageMap.js"

const router = express.Router()

router.post("/", async (req, res) => {
  await signInWithEmailAndPassword(auth, req.body.username, req.body.password)
    .then((authRes) => {
      res.status(200).json({
        token: authRes._tokenResponse.refreshToken,
        id: authRes._tokenResponse.localId,
      })
    })
    .catch((err) => {
      console.log(err.code)
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
