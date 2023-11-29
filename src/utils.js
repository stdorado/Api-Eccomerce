import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


//Bcrypt (encrypt la password que se sube al mongo)
export const hashPassword = async (password) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  } 

//dirname (ruth absolute)
export const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(process.env.JWT_SECRET_KEY)
const SecretKey = process.env.JWT_SECRET_KEY
export const generateToken = (user)=>{
  const token = JWT.sign(user,SecretKey,{expiresIn:"1h"})
  return token
}

export const setTokenCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: 'Strict',
    path: '/',
  };

  res.setHeader('Set-Cookie', serialize(process.env.SESSION_SECRET, token, cookieOptions));
};





console.log(__dirname)