import CreditCard from "../db/models/CreditCard.js"
import User from "../db/models/User.js"


//Tüm kredi kartlarını çağır
export const getAllCreditCards = async (req, res) => {
    try {
        const creditCards = await CreditCard.find()
            .populate("userId", "name email")
            .sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            count: creditCards.length,
            data: creditCards
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Sunucu hatası",
            error: error.message
        })
    }
}

//Id'ye göre

export const getCreditCardById = async (req, res) => {
    try {
        const creditCard = await CreditCard.findById(req.params.id)
            .populate("userId", "name email")

        if (!creditCard) {
            return res.status(404).json({
                success: false,
                message: "Kredi kartı bulunamadı"
            })
        }

        res.status(200).json({
            success: true,
            data: creditCard
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Sunucu hatası",
            error: error.message
        })
    }
}

// yeni kredi kartı oluştur

export const createCreditCard = async (req, res) => {
    try {
        const {
            cardNumber,
            cardHolderName,
            expiryMonth,
            expiryYear,
            cvv,
            userId
        } = req.body

        if (!cardNumber || !cardHolderName || !expiryMonth || !expiryYear || !cvv || !userId) {
            return res.status(400).json({
                success: false,
                message: "Tüm alanlar zorunludur"
            })
        }

        // kullanıcıları kontrol et
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Kullanıcı bulunamadı"
            })
        }

        const newCreditCard = new CreditCard({
            cardNumber,
            cardHolderName,
            expiryMonth,
            expiryYear,
            cvv,
            userId
        })
        const savedCreditCard = await newCreditCard.save()

        res.status(201).json({
            success: true,
            message: "Kredi kartı oluşturuldu",
            data: savedCreditCard
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Sunucu hatası",
            error: error.message
        })
    }
}

// Kart güncelleme
export const updateCreditCard = async (req, res) => {
    try {
        const {
            cardHolderName,
            expiryMonth,
            expiryYear,
            cvv
        } = req.body

        const cardId = req.params.id

        const updatedCreditCard = await CreditCard.findByIdAndUpdate(
            cardId,
            {
                cardHolderName,
                expiryMonth,
                expiryYear,
                cvv
            }, { new: true, runValidators: true }
        ).populate("userId", "name email")

        if (!updatedCreditCard) {
            return res.status(404).json({
                success: false,
                message: "Kredi kartı bulunamadı"
            })
        }
        res.status(200).json({
            success: true,
            message: "Kredi kartı güncellendi",
            data: updatedCreditCard
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Sunucu hatası",
            error: error.message
        })
    }
}

//delete işlemleri
export const deleteCreditCard = async (req, res) => {
    try {
        const cardId = req.params.id

        const deletedCreditCard = await CreditCard.findByIdAndDelete(cardId)
        if (!deletedCreditCard) {
            return res.status(404).json({
                success: false,
                message: "Kredi kartı bulunamadı"
            })
        }
        res.status(200).json({
            success: true,
            message: "Kredi kartı başarıyla silindi",
            data: deletedCreditCard
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Sunucu hatası",
            error: error.message
        })
    }
}





