const mongoose = require("mongoose")
const URL = process.env.DB_URL

const connectDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Database connected successfully...");
    } catch (error) {
         console.log(`Database connection error :${error}`);
    }
}

connectDB()