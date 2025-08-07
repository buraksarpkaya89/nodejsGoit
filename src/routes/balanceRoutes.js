import express from "express"


import {
    getAllBalances,
    createBalance
} from "../controllers/balanceController.js"

const router = express.Router()

//Get all

router.get("/", getAllBalances)

// create

router.post("/", createBalance)

export default router