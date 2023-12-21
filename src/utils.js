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
const SecretKey = process.env.JWT_SECRET_KEY
export const generateToken = (user)=>{
  const token = JWT.sign(user,SecretKey,{expiresIn:"1h"})
  return token
}


export const generateUniqueCode = () => {
  const currentDate = new Date();
  const timestamp = currentDate.getTime(); 
  const randomComponent = Math.floor(Math.random() * 10000); 

  const uniqueCode = `${timestamp}${randomComponent}`;

  return uniqueCode;
};

