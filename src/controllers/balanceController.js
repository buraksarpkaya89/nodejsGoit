import Balance from "../db/models/Balance.js";
import CreditCard from "../db/models/CreditCard.js";


// get all

export const getAllBalances = async (req,res) => {
    try {
        const balances = await Balance.find()
        .populate("creditCardId","cardNumber cardHolderName cvv")
        .sort({createdAt: -1})

        res.status(200).json({
            success: true,
            data:balances,
            count: balances.length
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Sunucu hatası",
            error: error.message
        })
    }
}

// create 

export const createBalance = async (req,res) => {
    try {
        const {creditCardId, currency,creditLimit} = req.body

        const creditCard = await CreditCard.findById(creditCardId)
        if(!creditCard){
            return res.status(404).json({
                success:false,
                message: "Kredi kartı bulunamadı"
            })
        }

        const balance = new Balance({
            creditCardId,
            creditLimit,
            currency,
            currentBalance:0,

        })

        await balance.save()
        await balance.populate("creditCardId","cardNumber cardHolderName cvv")

        res.status(201).json({
            success:true,
            message:"Bakiye oluştu",
            data:balance
        })

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Sunucu hatası",
            error: error.message
        })
    }
}

// ID ile veri çekme

// put

// delete

//patch