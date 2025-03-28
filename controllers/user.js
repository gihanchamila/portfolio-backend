import { generateCode } from "../utils/generateCode.js";
import { sendMail } from "../utils/sendEmail.js";
import User from "../models/User.js";
import Contact from "../models/Contact.js";
import notFoundItem from "../utils/notFoundItem.js";

const userController = {
    sendVerificationCode: async (req, res, next) => {
        try {
            const { email } = req.body;

            const code = generateCode(6);

            let user = await User.findOne({ email });
            if (!user) {
                user = new User({ email, code, isVerified: false });
            } else {
                user.code = code;
                user.isVerified = false;
            }

            await user.save();

            await sendMail({
                emailTo: email,
                subject: "Email Verification Code",
                content: `Your verification code is: ${code}`,
                name: "User",
                code
            });

            res.status(200).json({
                status: true,
                message: "Verification code sent successfully"
            });
        } catch (error) {
            next(error);
        }
    },

    verifyUser: async (req, res, next) => {
        try {
            const { email, code } = req.body;

            const user = await User.findOne({ email });

            notFoundItem(user, res, "User");

            if (user.code !== code) {
                return res.status(400).json({
                    status: false,
                    message: "Invalid code"
                });
            }

            user.isVerified = true;
            user.code = null;
            await user.save();

            res.status(200).json({
                status: true,
                message: "User verified successfully"
            });
        } catch (error) {
            next(error);
        }
    }

}

export default userController