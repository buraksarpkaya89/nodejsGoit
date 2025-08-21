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