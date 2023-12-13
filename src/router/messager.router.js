import { Router } from "express";

import { transporter } from "../Services/nodemailer.js";


const router = Router()

router.get("",async (res,req)=>{
const Options = {
    from : "doradosantinotomas@gmail.com",
    to : "santinodorado715@gmail.com",
    subject : "primer email",
    text : "primer mail enviado con nodemailer"
};
await transporter.sendMail(Options)
res.send("ENVIANDO EMAIL")

})


export default router