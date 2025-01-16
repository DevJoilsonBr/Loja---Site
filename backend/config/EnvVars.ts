import dotenv from 'dotenv';

dotenv.config();

export const ENV_VARS = {
    PORT:<number | undefined> process.env.PORT || 3000,
    MONGO_URI:<string> process.env.MONGO_URI,
    JWT_SECRET:<string> process.env.JWT_SECRET,
    NODE_ENV:<string> process.env.NODE_ENV
}