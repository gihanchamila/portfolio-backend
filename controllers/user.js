import User from "../models/User";

const userController = {
    sendVerificationCode: async (req, res, next) => {
        try {
            const { email } = req.body;

            // Generate a random verification code
            const code = generateCode(6); // Assuming generateCode generates a 6-digit code

            // Check if the user already exists
            let user = await Contact.findOne({ email });
            if (!user) {
                user = new Contact({ email, code, isVerified: false });
            } else {
                user.code = code;
                user.isVerified = false;
            }

            await user.save();

            // Send the verification code via email
            await sendMail({
                emailTo: email,
                subject: "Email Verification Code",
                content: `Your verification code is: ${code}`,
                name: "User"
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

            const user = await Contact.findOne({ email });

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