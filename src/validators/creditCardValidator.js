import Joi from "joi";

export const createCreditCardSchema = Joi.object({
    cardNumber: Joi.string().trim().pattern(/^[0-9]{15,19}$/).required()
        .messages({
            'string.empty': "kart numarası alanı boş olamaz",
            'any.required': "kart numarası alanı zorunludur",
            'string.pattern.base': "Kart numarası 15-19 haneli sayı olmalıdır"
        }),
    cardHolderName: Joi.string().required().trim().min(2).max(20).messages({
        'string.empty': "kart isim alanı boş olamaz",
        'any.required': "kart isim alanı zorunludur",
        'string.min': "İsim değeri 2 karakterden az olmaz",
        'string.max': "İsim değeri 20 karakterden fazla olamaz",

    }),
    expiryMonth: Joi.number().required().messages({
        'any.required': "Son kullanma ayı zorunludur",
        'number.base': "Son kullanma ayı sayı olmalıdır"
    }),
    expiryYear: Joi.number().required().messages({
        'any.required': "Son kullanma yılı zorunludur",
        'number.base': "Son kullanma yılı sayı olmalıdır"
    }),
    cvv: Joi.number().required().messages({
        'any.required': "cvv zorunludur",
        'number.base': "cvv sayı olmalıdır"
    }),
    userId: Joi.string().required().messages({
        'string.empty': "kart isim alanı boş olamaz",
        'any.required': "kart isim alanı zorunludur",
    })
})


export const updateCreditCardSchema = Joi.object({
    cardNumber: Joi.string().trim().pattern(/^[0-9]{15,19}$/).required()
        .messages({
            'string.empty': "kart numarası alanı boş olamaz",
            'any.required': "kart numarası alanı zorunludur",
            'string.pattern.base': "Kart numarası 15-19 haneli sayı olmalıdır"
        }),
    cardHolderName: Joi.string().required().trim().min(2).max(20).messages({
        'string.empty': "kart isim alanı boş olamaz",
        'any.required': "kart isim alanı zorunludur",
        'string.min': "İsim değeri 2 karakterden az olmaz",
        'string.max': "İsim değeri 20 karakterden fazla olamaz",

    }),
    expiryMonth: Joi.number().required().messages({
        'any.required': "Son kullanma ayı zorunludur",
        'number.base': "Son kullanma ayı sayı olmalıdır"
    }),
    expiryYear: Joi.number().required().messages({
        'any.required': "Son kullanma yılı zorunludur",
        'number.base': "Son kullanma yılı sayı olmalıdır"
    }),
    cvv: Joi.number().required().messages({
        'any.required': "cvv zorunludur",
        'number.base': "cvv sayı olmalıdır"
    }),
    userId: Joi.string().required().messages({
        'string.empty': "kart isim alanı boş olamaz",
        'any.required': "kart isim alanı zorunludur",
    })
}).min(1).messages({
    'object.min':"En az bir alan güncellenmelidir"
})