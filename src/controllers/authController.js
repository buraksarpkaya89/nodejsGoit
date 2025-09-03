import { ONE_DAY } from "../constants/index.js"
import { registerUser, loginUser, logoutUser, refreshUsersSession, requestResetToken, resetPassword, loginOrSignupWithGoogle } from "../services/authServices.js"
import { generateAuthUrl } from "../utils/googleOAuth2.js"

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

        res.status(200).json({
            success: true,
            message: "Çıkış başarılı"
        })

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

// Şifre sıfırlama ve Email

export const requestResetEmailController = async (req, res) => {
    try {
        await requestResetToken(req.body.email)
        res.json({
            success: true,
            message: "Şifre sıfırlama maili başarıyla gönderildi",
            data: {}
        })
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: "Sunucu Hatası",
            error: error.message
        })
    }
}

export const resetPasswordController = async (req, res) => {
    try {
        await resetPassword(req.body)
        res.json({
            success: true,
            message: "Şifre sbaşarıyla sıfırlandı",
            data: {}
        })
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: "Sunucu Hatası",
            error: error.message
        })
    }
}

export const getGoogleOAuthUrlController = async (req, res) => {
    try {
        const url = generateAuthUrl();
        res.json({
            status: 200,
            message: 'Successfully get Google OAuth url!',
            data: {
                url,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Sunucu hatası",
            error: error.message
        })
    }
}

export const loginWithGoogleController = async (req, res) => {

  const code = req.query.code || req.body.code;
  
  
  if (!code) {
    return res.status(400).json({
      success: false,
      message: 'Authorization code is required'
    });
  }
  
  try {
    const session = await loginOrSignupWithGoogle(code);
    
    res.cookie('sessionId', session._id, {
      httpOnly: true,
      expires: new Date(Date.now() + ONE_DAY),
    });

    if (req.method === 'GET') {
      res.redirect('http://localhost:3001/dashboard?login=success');
    } else {
      res.status(200).json({
        status: 200,
        message: 'Successfully logged in via Google OAuth!',
        data: { accessToken: session.accessToken },
      });
    }
  } catch (error) {
    console.error('Google OAuth Error:', error);
    
    if (req.method === 'GET') {
      res.redirect('http://localhost:3001/login?error=oauth_failed');
    } else {
      res.status(500).json({
        success: false,
        message: error.message || 'Google OAuth failed'
      });
    }
  }
};