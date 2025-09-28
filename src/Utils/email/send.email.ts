import {createTransport, Transporter} from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { BadRequestException } from "../response/error.response";

export const sendEmail = async(data:Mail.Options):Promise<void>=>{
    if(!data.html && !data.attachments?.length && !data.text){
        throw new BadRequestException("Missing Email content");
    }
    const transporter : Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options> = createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.EMAIL_PASSWORD
        }
    });
    await transporter.sendMail({
        ...data,
        from : `"Social media app" <${process.env.EMAIL}>`
    });
}