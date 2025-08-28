import express from "express"

import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    uploadUserPhotoController
} from "../controllers/userController.js"

import {validateRequest} from "../middleware/validation.js"
import {createUserSchema,updateUserSchema} from "../validators/userValidator.js"
import { requireAdmin,requireAdminOrModerator } from "../middleware/checkRoles.js"
import { authenticate } from "../middleware/auth.js"
import upload from "../middleware/multer.js"

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

//upload photo

router.patch('/photo',authenticate,upload.single("photo"),uploadUserPhotoController )

export default router