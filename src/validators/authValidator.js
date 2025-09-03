import Joi from "joi"
import { ROLES } from "../constants/index.js"

export const registerUserSchema = Joi.object({
    name: Joi.string().trim().min(2).max(10).required()
        .messages({
            'string.empty': "isim alanı boş olamaz",
            'string.min': "İsim değeri 2 karakterden az olmaz",
            'string.max': "İsim değeri 10 karakterden fazla olamaz",
            'any.required': "İsim alanı zorunludur"
        }),

    email: Joi.string().email().lowercase().trim().required()
        .messages({
            'string.empty': "Mail alanı boş olamaz",
            'string.email': "Geçerli bir email giriniz",
            'any.required': "Email alanı zorunludur"
        }),
    password: Joi.string().required()
        .messages({
            'string.empty': "Şifre alanı boş olamaz",
            'any.required': "Şifre alanı zorunludur"

        }),
    role: Joi.string().valid(...Object.values(ROLES)).default(ROLES.USER)
        .messages({
            "any.only": "Geçersiz rol seçimi"
        })
})

export const loginUserSchema = Joi.object({

    email: Joi.string().email().lowercase().trim().required()
        .messages({
            'string.email': "Geçerli bir email giriniz"
        }),

    password: Joi.string().required()
        .messages({
            'string.empty': "Şifre alanı boş olamaz",
            'any.required': "Şifre alanı zorunludur"

        })
}).min(1) // en az 1 tane alan güncellenmeli

export const requestResetEmailSchema = Joi.object({
    email: Joi.string().email().required()
        .messages({
            'string.empty': "email alanı boş olamaz",
            'any.required': "email alanı zorunludur"

        })
})

export const resetPasswordSchema = Joi.object({
    password: Joi.string().required()
        .messages({
            'string.empty': "şifre alanı boş olamaz",
            'any.required': "şifre alanı zorunludur"

        }),
    token: Joi.string().required()
        .messages({
            'string.empty': "Token alanı boş olamaz",
            'any.required': "Token alanı zorunludur"
        })
})

// Google

export const loginWithGoogleOAuthSchema = Joi.object({
    code: Joi.string().required()
        .messages({
            'string.empty': "Kod alanı boş olamaz",
            'any.required': "Kod alanı zorunludur"
        })
})