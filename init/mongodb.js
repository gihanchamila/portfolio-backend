import mongoose from "mongoose";
import { connectionUrl } from "../config/keys.js";

// connect mongodb
// This use connectionurl imported from keys.js

const connectMongodb = async () => {
    try {
        if (!connectionUrl) {
            throw new Error("MongoDB connection URL is undefined! Check environment variables.");
        }

        await mongoose.connect(connectionUrl);
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

export default connectMongodb