import mongoose from "mongoose";
import { ENV_VARS } from "../config/EnvVars";

export async function connectDb() {
    try {
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI)
        console.log(`MongoDb connected: ${conn.connection.host}`)
    } catch (error) {
        console.log("Error in connecting to MongoDb", error);
        process.exit(1)
    }
}