import express from "express"
import { getExpense, updateMonthlyExpense } from "../Controller/UserController.js"
const router=express.Router()

router.get("/get-expense",getExpense)
router.post("/update-monthlyExpense",updateMonthlyExpense)

export default router