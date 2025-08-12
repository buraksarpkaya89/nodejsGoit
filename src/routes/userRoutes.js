import express from "express"

import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/userController.js"

import {validateRequest} from "../middleware/validation.js"
import {createUserSchema,updateUserSchema} from "../validators/userValidator.js"

const router = express.Router()

//GET /users

router.get("/", getAllUsers)

//Get byId
router.get("/:id", getUserById)

// post 
router.post("/",validateRequest(createUserSchema),createUser)

//put 
router.put("/:id",validateRequest(updateUserSchema), updateUser)

// delete

router.delete("/:id",deleteUser)

export default router