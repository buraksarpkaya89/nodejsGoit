export const validateRequest = (schema) => {
    return (req,res,next) => {
        const {error,value} = schema.validate(req.body, {
            abortEarly : false,
            stripUnknown: true
        })

        if(error){
            const errorMessages = error.details.map(detail => ({
                field : detail.path.join("."),
                message:detail.message
            }))

            return res.status(400).json({
                success:false,
                message:"Validasyon hatası",
                errors: errorMessages
            })
        }

        req.body = value
        next();
    }
}