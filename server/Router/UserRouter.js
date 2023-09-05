import express from "express"
import { addExpense, getCompleteExpense, getExpense, getTotalExpense, updateMonthlyExpense } from "../Controller/UserController.js"
const router=express.Router()

router.get("/get-expense",getExpense)
router.get("/get-all-expense",getCompleteExpense)
router.get("/get-totalExpense",getTotalExpense)
router.post("/update-monthlyExpense",updateMonthlyExpense)
router.post("/add-expense",addExpense)

export default router