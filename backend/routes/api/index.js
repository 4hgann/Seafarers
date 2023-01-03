import express from "express"
import login from "./login.js"
import register from "./register.js"
import items from "./items.js"

const router = express.Router()

router.use("/login", login)
router.use("/register", register)
router.use("/items", items)

export default router
