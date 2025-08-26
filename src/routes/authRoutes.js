import express from "express"
import { validateRequest } from "../middleware/validation.js"
import {
    registerUserController,
    loginUserController,
    logoutUserController,
    refreshUsersSessionController,
    requestResetEmailController,
    resetPasswordController
} from "../controllers/authController.js"

import {registerUserSchema,loginUserSchema, requestResetEmailSchema, resetPasswordSchema} from "../validators/authValidator.js"


const router = express.Router()

//kayıt olma

router.post("/register",validateRequest(registerUserSchema),registerUserController)

//giriş işlemi

router.post("/login",validateRequest(loginUserSchema),loginUserController)

// çıkış işlemi

router.post("/logout",logoutUserController)

//token yenileme

router.post("/refresh",refreshUsersSessionController)

//şifre sıfırlama email gönderme endpoint'i

router.post("/request-reset-email",validateRequest(requestResetEmailSchema),requestResetEmailController)

//Şİfre sıfırlama

router.post("/reset-password",validateRequest(resetPasswordSchema),resetPasswordController)

export default router