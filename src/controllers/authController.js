import { ONE_DAY } from "../constants/index.js"
import { registerUser, loginUser, logoutUser, refreshUsersSession } from "../services/authServices.js"

const setupSession = (res, session) => {

    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY)
    })

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY)
    })
}

export const registerUserController = async (req, res) => {
    try {
        const user = await registerUser(req.body)

        res.status(201).json({
            success: true,
            message: "Kullanıcı oluştu",
            data: user
        })
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: "Sunucu Hatası",
            error: error.message
        })
    }
}

export const loginUserController = async (req, res) => {
    try {
        const session = await loginUser(req.body)
        setupSession(res, session)
        res.status(200).json({
            success: true,
            message: "Kullanıcı login oldu",
            data: {
                accessToken: session.accessToken
            }
        })
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: "Sunucu Hatası",
            error: error.message
        })
    }
}

export const logoutUserController = async (req, res) => {
    try {
        if (req.cookies.sessionId) {
            await logoutUser(req.cookies.sessionId)
        }
        res.clearCookie("sessionId")
        res.clearCookie("refreshToken")

    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: "Sunucu Hatası",
            error: error.message
        })
    }
}

export const refreshUsersSessionController = async (req, res) => {
    try {
        const session = await refreshUsersSession({
            sessionId: req.cookies.sessionId,
            refreshToken: req.cookies.refreshToken
        })

        setupSession(res, session)

        res.status(200).json({
            success: true,
            message: "Token yenilendi",
            data: {
                accessToken: session.accessToken
            }
        })
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: "Sunucu Hatası",
            error: error.message
        })
    }
}