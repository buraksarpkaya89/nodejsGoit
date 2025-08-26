import bcrypt from "bcryptjs";
import User from "../db/models/User.js";
import Session from "../db/models/Session.js";
import { FIFTEEN_MINUTES,ONE_DAY, SMTP, TEMPLATES_DIR } from "../constants/index.js";
import createHttpError from "http-errors";
import {randomBytes} from "crypto"
import handlebars from "handlebars"
import jwt from "jsonwebtoken"
import path from "node:path"
import fs from "node:fs/promises"
import { env } from "../utils/env.js";
import { sendEmail } from "../utils/sendMail.js";


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

//Şİfre sıfırlama ve token oluşturma

export const requestResetToken = async(email) => {
    const user = await User.findOne({email})

    if(!user) {
        throw createHttpError(404,"Kullanıcı bulunamadı")
    }

    //jwt.sign(payload,secretkey or private key)

    const resetToken = jwt.sign(
        {
            sub:user.id,
            email
        },
        env("JWT_SECRET"),
        {
            expiresIn : "15m"
        }

    )

    const resetPasswordTemplatePath = path.join(
        TEMPLATES_DIR,
        "reset-password-email.html",
    )

    //template dosyasını oku

    const templateSource = (
        (await fs.readFile(resetPasswordTemplatePath)).toString()
    )

    //handlebars kütüphanesi

    const template = handlebars.compile(templateSource)

    const html = template({
        name: user.name,
        link:`${env("APP_DOMAIN")}/reset-password?token=${resetToken}`
    })

    await sendEmail({
        from:env(SMTP.SMTP_FROM),
        to : email,
        subject: "Şİfre sıfırlama ekranı",
        html
    })

}
// şifre sıfırlama

export const resetPassword = async ({token, password}) => {
    let entires 

    try {
        entires = jwt.verify(token, env("JWT_SECRET"))
    } catch (error) {
        throw error
    }

    //tokendan gelen bilgilerle kullanıcıyı bul

    const user = await User.findOne({
        email:entires.email,
        _id: entires.sub,
    })

    if(!user){
        throw createHttpError(404,"Kullanıcı bulunamadı")
    }

    //yeni şifreyi hashle

    const encryptedPassword = await bcrypt.hash(password,10);

    //kullanıcı şifresini güncelle
    await User.updateOne(
        {_id: user._id},
        { password:encryptedPassword}
    )

    //güvenlik için tüm oturumları sonlandır
    await Session.deleteMany({userId: user._id})

}