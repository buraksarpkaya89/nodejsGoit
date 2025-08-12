import Joi from "joi";

export const createUserSchema = Joi.object({
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
            'string.email' : "Geçerli bir email giriniz",
            'any.required': "Email alanı zorunludur"
        })
})

export const updateUserSchema = Joi.object({
    name: Joi.string().trim().min(2).max(10).required()
        .messages({
            'string.min': "İsim değeri 2 karakterden az olmaz",
            'string.max': "İsim değeri 10 karakterden fazla olamaz"
        }),

    email: Joi.string().email().lowercase().trim().required()
        .messages({
            'string.email' : "Geçerli bir email giriniz"
        })
}).min(1) // en az 1 tane alan güncellenmeli