import express from "express"
import {
    getAllCreditCards,
    getCreditCardById,
    createCreditCard,
    updateCreditCard,
    deleteCreditCard
} from "../controllers/creditCardController.js"

const router = express.Router()

//GET /credit card

router.get("/", getAllCreditCards)

//Get byId
router.get("/:id", getCreditCardById)

// post 
router.post("/",createCreditCard)

//put 
router.put("/:id", updateCreditCard)

// delete

router.delete("/:id",deleteCreditCard)

export default router

