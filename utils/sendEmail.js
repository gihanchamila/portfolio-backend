import nodemailer from "nodemailer";
import { senderEmail, emailPassword } from "../config/keys.js";

export const sendMail = async ({ emailTo, subject, content, name, code }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use STARTTLS
            auth: {
                user: senderEmail,
                pass: emailPassword,
            },
        });

        let message;

        // Check if a code is provided (e.g., for verification)
        if (code) {
            message = {
                to: emailTo,
                subject,
                html: `
                    <html>
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>${content}</title>
                            <style>
                                body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f4f7fc; }
                                .container { max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden; }
                                .header { background-color: #4CAF50; color: white; text-align: center; padding: 20px 0; }
                                .header h2 { margin: 0; font-size: 24px; }
                                .content { padding: 30px; font-size: 16px; color: #333; }
                                .content p { margin-bottom: 15px; line-height: 1.6; }
                                .footer { background-color: #f0f0f0; text-align: center; font-size: 12px; padding: 20px 0; color: #888; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h2>Email Verification</h2>
                                </div>
                                <div class="content">
                                    <p>Hello, ${name}</p>
                                    <p>To complete the email verification, please use the following verification code:</p>
                                    <div style="font-size: 24px; font-weight: bold; color: #333; text-align: center; margin: 20px 0;">${code}</div>
                                    <p>This code is valid for the next 10 minutes. Please do not share this code with anyone for your account's security.</p>
                                    <p>If you did not request this verification, please ignore this email.</p>
                                    <p>Best regards,<br>Gihan Chamila</p>
                                </div>
                                <div class="footer">
                                    <p>If you need further assistance, please feel free to contact me again.</p>
                                </div>
                            </div>
                        </body>
                    </html>`
            };
        } else {
            message = {
                to: emailTo,
                subject,
                html: `
                    <html>
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>${content}</title>
                            <style>
                                body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f4f7fc; }
                                .container { max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden; }
                                .header { background-color: #4CAF50; color: white; text-align: center; padding: 20px 0; }
                                .header h2 { margin: 0; font-size: 24px; }
                                .content { padding: 30px; font-size: 16px; color: #333; }
                                .content p { margin-bottom: 15px; line-height: 1.6; }
                                .footer { background-color: #f0f0f0; text-align: center; font-size: 12px; padding: 20px 0; color: #888; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h2>Message Received</h2>
                                </div>
                                <div class="content">
                                    <p>Hello, ${name}</p>
                                    <p>Thank you for reaching out to me. I have received your message and will reply as soon as possible. I appreciate your patience.</p>
                                    <p>This is an auto-generated message, so please do not reply to this email.</p>
                                    <p>Best regards,<br>Gihan Chamila</p>
                                </div>
                                <div class="footer">
                                    <p>If you need further assistance, please feel free to contact me again.</p>
                                </div>
                            </div>
                        </body>
                    </html>`
            };
        }

        // Send the email
        await transporter.sendMail(message);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
};
