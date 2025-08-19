import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    accessToken: { // kısa süreli token (15dk)
        type: String,
        required: true
    },
    refreshToken: { // uzun süreli token (1 gün)
        type: String,
        required: true

    },
    accessTokenValidUntil: { // Access token bitiş tarihi
        type: Date,
        required: true
    },
    refreshTokenValidUntil: { // refresh token bitiş tarihi
        type: Date,
        required: true

    }
},{
    timestamps:true
})


const Session = mongoose.model("Session", sessionSchema)

export default Session