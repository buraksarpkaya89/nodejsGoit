import bcrypt from "bcryptjs";
import User from "../db/models/User.js";
import Session from "../db/models/Session.js";
import { FIFTEEN_MINUTES,ONE_DAY } from "../constants/index.js";
import createHttpError from "http-errors";
import {randomBytes} from "crypto"


export const registerUser = async (payload) => {

    const user = await User.findOne({email:payload.email})

    if(user) throw createHttpError(409 ,"Email zaten kullanımda")

    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    return await User.create({
        ...payload,
        password:encryptedPassword
    })

}

export const createSession = () => {
    const accessToken = randomBytes(30).toString("base64") // kısa süreli token
    const refreshToken = randomBytes(30).toString("base64") // uzun süreli token

    return {
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil : new Date( Date.now() + ONE_DAY)
    }
}


export const loginUser = async (payload) => {
    const user = await User.findOne({email:payload.email}) // kullanıcıyı email ile kotrol et

    if(!user){
        throw createHttpError(404,"Kullanıcı bulunamadı")
    }

    //şifre karşılaştırma

    const isEqual = await bcrypt.compare(payload.password,user.password)

    if(!isEqual){
        throw createHttpError(401, "Unauthorized") // şifre yanlış
    }

    await Session.deleteOne({userId: user._id})

    const sessionData = createSession() // yeni oturum oluştu

    return await Session.create({
        userId: user._id,
        ...sessionData
    })

}


export const logoutUser = async (sessionId) =>{
    await Session.deleteOne({_id: sessionId})
}


export const refreshUsersSession = async({sessionId,refreshToken}) =>{
    const session = await Session.findOne({
        _id : sessionId,
        refreshToken
    })

    if(!session){
        throw createHttpError(401,"Oturum bulunamadı")
    }
    const isSessionTokenExpired = new Date() > new Date(session.refreshTokenValidUntil)

    if(isSessionTokenExpired){
        throw createHttpError(401, "Oturumun token'ı expired olmuş")
    }
    const newSession = createSession()

    await Session.deleteOne({_id: sessionId,refreshToken})

    return Session.create({
        userId: session.userId,
        ...newSession
    })
}