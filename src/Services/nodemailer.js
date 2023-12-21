import nodemailer from "nodemailer"

export function SendToEmail(addressee, affair, Message, callback){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user : process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        },
        tls :{
            rejectUnauthorized : false
        }
    });

const Options = {
    from : "doradosantinotomas@gmail.com",
    to : addressee,
    subject : affair,
    html : Message
}

transporter.sendMail(Options, (error, info)=> {
    if(error){
        return callback(error)
    }
    callback(null,info)
});
}

