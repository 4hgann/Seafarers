import express from "express"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../Firebase/FirebaseConfig.js"

const router = express.Router()

router.get("/", async (req, res) => {
  const items = onSnapshot(collection(db, "user-items"), (snapshot) => {
    snapshot.docs.map((doc) => console.log(doc.data()))
  })
  //console.log(items)
})

router.post("/", async (req, res) => {})

export default router
