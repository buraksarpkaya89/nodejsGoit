import mongoose from "mongoose";


const creditCardSchema = new mongoose.Schema({
    cardNumber: {
        type: String,
        required: [true, "Kart numarası gerekli"],
        trim: true
    },
    cardHolderName: {
        type: String,
        required: [true, "Kart sahibinin adı gerekli"],
        trim: true
    },
    expiryMonth: {
        type: Number,
        required: [true, "Son kullanma ayı zorunludur"],
        min: 1,
        max: 12
    },
    expiryYear: {
        type: Number,
        required: [true, "Son kullanma yılı zorunludur"],
    },
    cvv: {
        type: Number,
        required: [true, "cvv kodu zorunludur"],
        trim: true
    },
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true , "Kullanıcı id zorunludur"]
    }
},{
    timestamps: true
});

const CreditCard = mongoose.model("CreditCard", creditCardSchema)

export default CreditCard;