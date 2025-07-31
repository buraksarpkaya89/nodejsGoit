import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"isim alanı zorunludur"],
        trim: true,
        maxlength: [50,"İsim 50 karakterden fazla olamaz"]
    },
    email: {
        type:String,
        required: [true, "email alanı zorunludur"],
        unique: true,
        lowercase: true,
        trim:true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{
    timestamps:{createdAt:true, updatedAt:false}
})

const User = mongoose.model("User",userSchema)

export default User;