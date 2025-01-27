import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDb } from './db/db';
import { ENV_VARS } from './config/EnvVars';
import authRoute from './routes/auth.route'
import productRoute from './routes/product.route'
import categoryRoute from './routes/category.route'
import { authenticatedRoute } from './middleware/authenticatedRoute';

const app = express();

app.use(express.json());
app.use(cookieParser());

dotenv.config();

//Main route
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/product", authenticatedRoute, productRoute)
app.use("/api/v1/category", categoryRoute) //TODO: add protected route for admins

const PORT = ENV_VARS.PORT || 3000

app.listen(PORT, async (): Promise<void> => {
    try {
        await connectDb()
        console.log(`Server started on port ${PORT}`)
        } catch (error) {
        console.log(`Error in connecting on port ${PORT}`, error);
        process.exit(1);
    }
});