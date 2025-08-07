import mongoose from "mongoose";

const balanceSchema = new mongoose.Schema({

    currentBalance: {
        type: Number,
        default: 0,
        min : [0, "Bakiye negatif durumda"]
    },
    creditLimit: {
        type: Number,
        required: [true, "Kredi limiti zorunludur"],
        min: [0, ,"Kredi limiti negatif olamaz"],
        default: 5000
    },
    availableCredit: {
        type:Number,
        default: function(){
            return this.creditLimit + this.currentBalance
        }
    },
    currency: {
        type: String,
        default: "TRY",
        enum : ["TRY", "USD", "EUR"],
        required: [true,"Para birimi zorunludur"]
    },
    status: {
        type:String,
        default:"aktif",
        enum: ["aktif", "donduruldu", "kapalı"]
    },
    creditCardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"CreditCard",
        required: [true, "Kredi kartı Id zorunludur"],
        unique: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
},{
    timestamps:true
})

const Balance = mongoose.model("Balance",balanceSchema)

export default Balance;