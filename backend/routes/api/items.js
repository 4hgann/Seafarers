import express from "express"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../Firebase/FirebaseConfig.js"

/*
    Items router contains all actions under /api/items.
    Takes query parameter ID to determine the user wanting their items
*/
const router = express.Router()

router.get("/", async (req, res) => {
  const docRef = doc(db, "user-items", req.query.id)
  const docSnap = await getDoc(docRef)
  //console.log(docSnap.data())
  const rawData = docSnap.data()
  let formattedData = []
  Object.keys(rawData).forEach((key, index) => {
    formattedData.push(rawData[key])
  })
  res.status(200).json(formattedData)
  //res.send("yeetem")
})

router.post("/", async (req, res) => {})

export default router
