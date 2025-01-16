import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route'
import { connectDb } from './db/db';
import { ENV_VARS } from './config/EnvVars';

const app = express();

app.use(express.json());
app.use(cookieParser());

dotenv.config();

//Main route
app.use("/api/v1/auth", authRoute)

const PORT = ENV_VARS.PORT

app.listen(PORT, async (): Promise<void> => {
    try {
        await connectDb()
        console.log(`Server started on port ${PORT}`)
        } catch (error) {
        console.log(`Error in connecting on port ${PORT}`, error);
        process.exit(1);
    }
});