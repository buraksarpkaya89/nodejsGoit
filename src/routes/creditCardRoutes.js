import express from "express"
import {
    getAllCreditCards,
    getCreditCardById,
    createCreditCard,
    updateCreditCard,
    deleteCreditCard
} from "../controllers/creditCardController.js"

import {createCreditCardSchema,updateCreditCardSchema} from "../validators/creditCardValidator.js"
import {validateRequest} from "../middleware/validation.js"

const router = express.Router()

//GET /credit card

router.get("/", getAllCreditCards)

//Get byId
router.get("/:id", getCreditCardById)

// post 
router.post("/",validateRequest(createCreditCardSchema),createCreditCard)

//put 
router.put("/:id",validateRequest(updateCreditCardSchema), updateCreditCard)

// delete

router.delete("/:id",deleteCreditCard)

export default router

