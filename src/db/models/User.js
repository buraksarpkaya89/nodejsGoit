import mongoose from "mongoose";
import { ROLES } from "../../constants/index.js";

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
    password: {
        type: String,
        required: [true,"Şifre alanı zorunludur"]
    },
    role:{
        type: String,
        enum: [ROLES.ADMIN,ROLES.MODERATOR,ROLES.USER],
        default:ROLES.USER
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{
    timestamps:{createdAt:true, updatedAt:false}
})
// {name:"Burak",email:"burak@gmail.com"}
//şifre kısmını JSON Response'dan çıkart

userSchema.methods.toJson = function (){
    const obj = this.toObject();
    delete obj.password;
    return obj
}

const User = mongoose.model("User",userSchema)

export default User;