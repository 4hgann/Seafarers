import express from "express"
import crypto from "crypto"
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore"
import { db } from "../../Firebase/FirebaseConfig.js"

/*
    Items router contains all actions under /api/items.
    Takes query parameter ID to determine the user wanting their items
*/
const router = express.Router()

router.get("/", async (req, res) => {
  const docRef = doc(db, "user-items", req.query.id)
  const docSnap = await getDoc(docRef)
  const rawData = docSnap.data()
  res.status(200).json(rawData.items)
})

router.post("/", async (req, res) => {
  const newItem = {
    _id: crypto.randomUUID(),
    name: "new",
    x: 5,
    y: 6,
    z: 7,
    mass: 5,
  }
  const docRef = doc(db, "user-items", req.query.id)
  const newDoc = await updateDoc(docRef, { items: arrayUnion(newItem) })
  console.log(newDoc)
  res.status(200).json("Success")
})

router.put("/", async (req, res) => {
  const docRef = doc(db, "user-items", req.query.id)
  const docSnap = await getDoc(docRef)
  const items = docSnap.data().items
  console.log(items)
  const index = items.findIndex(
    (x) => x._id === "3243984a-d065-4a6e-aeaa-0628ba733a6d"
  )
  items[index].name = "putName"
  console.log(items)
  await updateDoc(docRef, { items: items })
  res.status(200).json(crypto.randomUUID())
})

export default router
