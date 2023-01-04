import express from "express"
import crypto from "crypto"
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore"
import { db } from "../../Firebase/FirebaseConfig.js"

/*
    The items router contains all actions under /api/items.
    Takes query parameter ID to determine the user wanting their items
*/
const router = express.Router()

router.get("/", async (req, res) => {
  const items = await getItems(req.query.id)
  res.status(200).json(items)
})

router.post("/", async (req, res) => {
  const docRef = doc(db, "user-items", req.query.id)
  const newItem = {
    _id: crypto.randomUUID(),
    name: "tester",
    x: 2,
    y: 4,
    z: 5,
    mass: 10,
  }
  await updateDoc(docRef, { items: arrayUnion(newItem) })
  res.status(200).json("Success")
})

router.put("/", async (req, res) => {
  const docRef = doc(db, "user-items", req.query.id)
  const items = await getItems(req.query.id)
  const index = items.findIndex(
    (x) => x._id === "3243984a-d065-4a6e-aeaa-0628ba733a6d"
  )
  items[index].name = "putTest"
  await updateDoc(docRef, { items: items })
  res.status(200).json(crypto.randomUUID())
})

// If an item is supplied in the DELETE, remove that item, otherwise purge the document
router.delete("/", async (req, res) => {
  const docRef = doc(db, "user-items", req.query.id)
  console.log(req.body.item)
  console.log(typeof req.body.item)
  if (req.body.item) {
    console.log("removing")
    await updateDoc(docRef, { items: arrayRemove(req.body.item) })
    res.send(200)
  } else {
    await updateDoc(docRef, { items: [] })
    res.send(200)
  }
})

const getItems = async (id) => {
  const docRef = doc(db, "user-items", id)
  const docSnap = await getDoc(docRef)
  return docSnap.data().items
}

export default router
