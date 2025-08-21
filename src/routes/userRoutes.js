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
import { requireAdmin,requireAdminOrModerator } from "../middleware/checkRoles.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

//GET /users

router.get("/",authenticate,requireAdminOrModerator, getAllUsers)

//Get byId
router.get("/:id",authenticate, getUserById)

// post 
router.post("/",authenticate,requireAdmin,validateRequest(createUserSchema),createUser)

//put 
router.put("/:id",authenticate,requireAdmin,validateRequest(updateUserSchema), updateUser)

// delete

router.delete("/:id",authenticate,requireAdmin,deleteUser)

export default router