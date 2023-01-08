import dotenv from "dotenv";

dotenv.config();

export const puerto = process.env.PORT;
export const publicKey = process.env.PUBLIC_KEY
export const serverAPI = process.env.SERVER_API
export const serverAUTH = process.env.SERVER_AUTH