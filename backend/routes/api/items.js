import express from "express"
import crypto from "crypto"
import { StatusCodes } from "http-status-codes"
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
  if (!req.query.id) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
  } else {
    const items = await getItems(req.query.id)
    res.status(StatusCodes.OK).json(items)
  }
})

router.post("/", async (req, res) => {
  if (!req.body.item || !req.query.id) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
  } else {
    const item = req.body.item
    const docRef = doc(db, "user-items", req.query.id)

    const newItem = {
      _id: crypto.randomUUID(),
      ...item,
    }

    await updateDoc(docRef, { items: arrayUnion(newItem) })
    res.sendStatus(StatusCodes.CREATED)
  }
})

router.put("/", async (req, res) => {
  const item = req.body.item
  const id = req.query.id

  const docRef = doc(db, "user-items", id)
  const items = await getItems(id)

  const index = items.findIndex((x) => x._id === item._id)
  if (index === -1) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  } else {
    items[index].name = "putTest"
    await updateDoc(docRef, { items: items })
    res.sendStatus(StatusCodes.NO_CONTENT)
  }
})

// If an item is supplied in the DELETE, remove that item, otherwise purge the document
router.delete("/", async (req, res) => {
  const item = req.body.item
  const id = req.query.id
  const docRef = doc(db, "user-items", id)
  if (item) {
    const isExisting = await itemExists(id, item)
    if (isExisting) {
      const test = await updateDoc(docRef, {
        items: arrayRemove(req.body.item),
      })
      res.sendStatus(StatusCodes.NO_CONTENT)
    } else {
      res.sendStatus(StatusCodes.NOT_FOUND)
    }
  } else {
    await updateDoc(docRef, { items: [] })
    res.sendStatus(StatusCodes.NO_CONTENT)
  }
})

const getItems = async (id) => {
  const docRef = doc(db, "user-items", id)
  const docSnap = await getDoc(docRef)
  return docSnap.data().items
}

// Check an item exists in collection
const itemExists = async (id, item) => {
  const items = await getItems(id)
  if (items.findIndex((x) => x._id === item._id) != -1) {
    return true
  }
  return false
}

export default router
