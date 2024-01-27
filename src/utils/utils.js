import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Bcrypt (encripta la contraseña antes de almacenarla en la base de datos)
export const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
};

// Directorio actual
export const __dirname = dirname(fileURLToPath(import.meta.url));

// Clave secreta para JWT
const SecretKey = process.env.JWT_SECRET_KEY;

// Generar token JWT
export const generateToken = (payload) => {
    const token = JWT.sign(payload, SecretKey, { expiresIn: "1h" });
    return token;
};

// Generar un código único
export const generateUniqueCode = () => {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const randomComponent = Math.floor(Math.random() * 10000);
    const uniqueCode = `${timestamp}${randomComponent}`;
    return uniqueCode;
};