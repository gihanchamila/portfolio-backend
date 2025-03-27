import nodemail from "nodemailer"
import { senderEmail, emailPassword } from "../config/kyes.js"

export const sendMail = async ({emailTo, subject, content, name}) => {

    try{
        const transporter = nodemail.createTransport({
            host : "smtp.gmail.com",
            port : 587,
            secure : false,
            auth : {
                user : senderEmail,
                pass : emailPassword
            }
        });
    
        const message = {
            to : emailTo,
            subject,
            html : 
                    `<!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>${content}</title>
                    </head>
                    <body style="margin: 0; padding: 0; background-color: #f9f9f9;">
                        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                            <div style="background-color: #1D4ED8; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                                <h2 style="margin: 0;">Message Received</h2>
                            </div>
                            <div style="padding: 20px;">
                                <p style="margin: 0; font-size: 16px;">Hello, ${name}</p>
                                <p style="margin: 10px 0;">Thank you for reaching out to me. I have received your message and will reply as soon as possible. I appreciate your patience.</p>
                                <p style="margin: 10px 0;">This is an auto-generated message, so please do not reply to this email.</p>
                                <p style="margin: 10px 0;">Best regards,<br>Gihan Chamila</p>
                            </div>
                            <div style="text-align: center; font-size: 12px; color: #888; padding: 20px;">
                                <p style="margin: 0;">Need help? Contact our support team at support@omni.com</p>
                            </div>
                        </div>
                    </body>
                </html>` 
        }
        await transporter.sendMail(message)
    } catch(error){
        console.error("Error sending email:", error)
        throw new Error("Failed to send email")
    }
    
}