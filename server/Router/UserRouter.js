import express from "express"
import { getExpense } from "../Controller/UserController.js"
const router=express.Router()

router.get("/get-expense",getExpense)

export default router