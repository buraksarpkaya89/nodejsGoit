import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/nodejsgoit`)
        console.log(`MongoDB bağlantısı başarılı : ${conn.connection.host}`);
    } catch (error) {
        console.log("MongoDB Bağlantı hatası");
        process.exit(1)
    }
}

export default connectDB;
