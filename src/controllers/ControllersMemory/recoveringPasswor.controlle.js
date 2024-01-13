import PasswordService from "../../Services/recovering.Servicio.js"


export const passwordController = {
    forgetpassword : async(req,res)=>{
        const {email} = req.body

        const user = await PasswordService.findUserToEmail(email);

        if(!user){
            return res.send("the email is not registered")
        }

        const recoveringToken = PasswordService.generateTokenUnic()
        user.recoveringToken = recoveringToken
        user.expirationToken = new Date(Date.now() + 3600000);

        await user.save()

        const send = await PasswordService.sendEmailRecovering(email,recoveringToken)

        if ( send){
            res.send("Email sent successfully. Please check your inbox, spam or promotions.")
        }else{
            res.status(500).send("error to send email")
        }
    },

    recoveringPassword : async ( req,res)=>{
        const {token} = req.params;
        const {newPassword} = req.body

        const success = await PasswordService.UpdatePassword(token,newPassword)

        if(success){
            res.send("password reset successfully ")
        }else{
            res.status(400).send("Token expire or not valid")
        }
    }
    
}

