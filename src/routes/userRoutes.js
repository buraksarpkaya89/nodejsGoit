import express from "express"

import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/userController.js"

const router = express.Router()

//GET /users

router.get("/", getAllUsers)

//Get byId
router.get("/:id", getUserById)

// post 
router.post("/",createUser)

//put 
router.put("/:id", updateUser)

// delete

router.delete("/:id",deleteUser)

export default router