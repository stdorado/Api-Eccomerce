import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt"

export const hashPassword = async (password) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  }

export const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(__dirname)