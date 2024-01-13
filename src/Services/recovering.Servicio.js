import crypto from "crypto"
import { SendToEmail } from "./nodemailer.js";
import User from "../dao/model/User.js";

class PasswordService {
    generateTokenUnic(){
        return crypto.randomBytes(20).toString("hex");
    }


    async findUserToEmail(email){
        return await User.findOne({email})
    }

    async sendEmailRecovering(email,token){
        const htmlMessage = `<p>Haz clic en el siguiente enlace para restablecer tu contraseña: http://localhost:8080/RecoveringPassword/${token}</p>`;
    
        SendToEmail(email, 'Restablecer Contraseña', htmlMessage, (error, info) => {
          if (error) {
            console.error('Error al enviar el correo electrónico:', error);
            return false;
          }
          console.log('Correo electrónico enviado:', info);
          return true;
        });
      }


      async UpdatePassword(token, newPassword) {
        const users = await User.findOne({
          tokenRecovering: token,
          expirationToken: { $gt: Date.now() },
        });
    
        if (User) {
          users.password = newPassword;
          users.tokenRecovering = null;
          users.expirationToken = null;
          await users.save();
          return true;
        } else {
          return false;
        }
      }
    };

    
export default new PasswordService()