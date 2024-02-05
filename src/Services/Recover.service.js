import { generateToken } from "../utils.js";
import { SendToEmail } from "./nodemailer.service.js";
import UserManager from "../dao/DaoDataBase/User.manager.js";
import { logger } from "../utils/logger.js";
import JWT from "jsonwebtoken"

export const generateResetToken = async (email) => {
    try {
        const user = await UserManager.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const resetToken = generateToken({ userId: user._id });
        user.resetPaswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 3600000;
        await user.save();

        return { user, resetToken }; 
    } catch (error) {
        logger.error('Error generating reset token:', error);
        throw error;
    }
};

export const getPasswordByEmail = async (email) => {
    try {
        const user = await UserManager.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        return user.password;
    } catch (error) {
        logger.error('Error fetching password from database:', error);
        throw error;
    }
};

export const sendResetEmail = async (email, token) => {
    const resetLink = `http://localhost:8080/api/recover/reset-password/${token}`;
    const message = `<p>Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}</p>`;

    SendToEmail(email, 'Recover Password', message, (error, info) => {
        if (error) {
            logger.error('Error sending password reset email:', error);
            throw error;
        }
        logger.info('Password reset email sent successfully:', info.response);
    });
};

export const getTokenFromAuthorizationHeader = (authorizationHeader) => {
    if (!authorizationHeader) {
        throw new Error('Authorization header not provided');
    }
    const token = authorizationHeader.split('Bearer ')[1];
    if (!token) {
        throw new Error('Bearer token not provided');
    }
    return token;
};

export const verifyToken = (token) => {
    try {
        const decodedToken = JWT.verify(token, process.env.JWT_SECRET_KEY);
        if (!decodedToken) {
            throw new Error('Invalid token');
        }
        return decodedToken;
    } catch (error) {
        logger.error('Error verifying token:', error);
        throw error;
    }
};