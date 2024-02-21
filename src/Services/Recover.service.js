import { generateToken } from "../utils.js";
import { SendToEmail } from "./nodemailer.service.js";
import UserManager from "../dao/DaoDataBase/User.manager.js";
import { logger } from "../utils/logger.js";
import JWT from "jsonwebtoken";

class RecoverService {
  async generateResetToken(email) {
    try {
      const user = await UserManager.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }

      const resetToken = generateToken({ userId: user._id });
      user.resetPaswordToken = resetToken;
      user.resetPasswordExpire = Date.now() + 3600000;
      await user.save();

      return { user, resetToken };
    } catch (error) {
      logger.error("Error generating reset token:", error);
      throw error;
    }
  }

  async getPasswordByEmail(userId) {
    try {
      const user = await UserManager.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      return user.password;
    } catch (error) {
      logger.error("Error fetching password from database:", error);
      throw error;
    }
  }

  async sendResetEmail(email, token) {
    const resetLink = `http://localhost:8080/api/recover/reset-password/${token}`;
    const message = `
        <div style="font-family: sans-serif; max-width: 32rem; margin: 0 auto; padding: 1rem; text-align: left;">
            <p style="font-size: 1.25rem;">Haz clic en el siguiente botón para restablecer tu contraseña:</p>
            <a href="${resetLink}" style="display: inline-block; background-color: #3490dc; color: #ffffff; font-weight: bold; padding: 0.5rem 1rem; border-radius: 0.25rem; text-decoration: none; margin-top: 1rem;">
                <span style="vertical-align: middle;">Recuperar Contraseña</span>
                <i class="fas fa-unlock-alt" style="vertical-align: middle; margin-left: 0.5rem;"></i>
            </a>
        </div>`;

    try {
      await SendToEmail(email, "Recover Password", message);
      logger.info("Password reset email sent successfully");
    } catch (error) {
      logger.error("Error sending password reset email:", error);
      throw error;
    }
  }

  getTokenFromAuthorizationHeader(authorizationHeader) {
    if (!authorizationHeader) {
      throw new Error("Authorization header not provided");
    }
    const token = authorizationHeader.split("Bearer ")[1];
    if (!token) {
      throw new Error("Bearer token not provided");
    }
    return token;
  }

  verifyToken(token) {
    try {
      const decodedToken = JWT.verify(token, process.env.JWT_SECRET_KEY);
      if (!decodedToken) {
        throw new Error("Invalid token");
      }
      return decodedToken;
    } catch (error) {
      logger.error("Error verifying token:", error);
      throw error;
    }
  }
}

export default new RecoverService();
