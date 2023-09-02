import express from "express"
import { check, userLogin, userLogout, userSignup } from "../Controller/UserAuthController.js"
const router=express.Router()
router.post("/signup",userSignup)
router.post("/login",userLogin)
router.get("/check",check)
router.get("/logout",userLogout)

export default router