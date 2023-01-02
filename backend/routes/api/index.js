import express from "express"
import login from "./login.js"
import register from "./register.js"

const router = express.Router()

router.use("/login", login)
router.use("/register", register)

export default router
