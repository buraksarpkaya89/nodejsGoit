import express from "express"
import { validateRequest } from "../middleware/validation.js"
import {
    registerUserController,
    loginUserController,
    logoutUserController,
    refreshUsersSessionController,
    requestResetEmailController,
    resetPasswordController,
    loginWithGoogleController,
    getGoogleOAuthUrlController
} from "../controllers/authController.js"

import {registerUserSchema,loginUserSchema, requestResetEmailSchema, resetPasswordSchema, loginWithGoogleOAuthSchema} from "../validators/authValidator.js"


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

//Google Oauth Url alma

router.get("/get-oauth-url", getGoogleOAuthUrlController)

router.get("/confirm-oauth", loginWithGoogleController)
router.post("/confirm-oauth", validateRequest(loginWithGoogleOAuthSchema),loginWithGoogleController)

export default router