import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoutes from "./routes/userRoutes.js"
import creditCardRoutes from "./routes/creditCardRoutes.js"
import balanceRoutes from "./routes/balanceRoutes.js"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
import createDirIfNotExist from './utils/createDirIfNotExist.js';

dotenv.config();
connectDB();

const bootstrap = async() =>{
    await createDirIfNotExist(TEMP_UPLOAD_DIR)
    await createDirIfNotExist(UPLOAD_DIR)
}
bootstrap()


const app = express();
const PORT = process.env.PORT || 3000;



app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use("/uploads",express.static(UPLOAD_DIR))

app.get("/",(req,res)=> {
    res.json({
        message:"Node.js MongoDB çalışıyor",
        status: "success",
        endpoints: {
            users: "/users",
            creditCard: "/credit-cards",
            balance : "/balances",
            auth:"/auth",
            upload:"/upload"
        }
    })
})

app.use("/users", userRoutes)
app.use("/credit-cards", creditCardRoutes)
app.use("/balances", balanceRoutes)
app.use("/auth",authRoutes)

app.use("*",(req,res) =>{
    res.status(404).json({
        success:false,
        message: "Route bulunamadı"
    })
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});