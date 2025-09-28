
import { EventEmitter } from "node:events";
import Mail from "nodemailer/lib/mailer";
import { confirmEmailTemplet } from "./sendEmail.templet";
import { sendEmail } from "./send.email";

export const emailEvent = new EventEmitter();


interface IEmail extends Mail.Options{
    otp:number;
    username:string;
}

emailEvent.on("confirmEmail",async(data:IEmail)=>{
    try {
        data.subject="confirm your email";
        data.html = confirmEmailTemplet(data.otp,data.username);
        await sendEmail(data)
    } catch (error) {
        console.log(`fail to send email`,error);
    }
})




