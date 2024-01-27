import {
    generateResetToken,
    sendResetEmail,
    getPasswordByEmail,
    getTokenFromAuthorizationHeader,
    verifyToken
} from "../../Services/Recover.service.js";

const showForgotPasswordForm = (req, res) => {
    res.render('forgot-password-form');
};

const handleForgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const { user, resetToken } = await generateResetToken(email);
        await sendResetEmail(email, resetToken);

        const { password, firstName, _id } = user; 
        res.status(200).json({ message: 'Email Reset password sent successfully', resetToken, userId: _id, password, firstName }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error sending password reset email' });
    }
};

const getPassword = async (req, res) => {
    try {
        const token = getTokenFromAuthorizationHeader(req.headers.authorization);
        const decodedToken = verifyToken(token);
        const { email } = decodedToken;

        
        const password = await getPasswordByEmail(email);

        
        res.status(200).json({ password });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching password from database' });
    }
};

const resetPasswordWithToken = async (req, res) => {
    try {
        const token = req.body.token; 
        if (!token) {
            return res.status(400).json({ error: 'Token not provided in the request body' });
        }
    
        const decodedToken = verifyToken(token);
        const { email } = decodedToken;
        
        const { password, firstName, userId } = await getPasswordByEmail(email);

        res.status(200).json({ password, firstName, email, userId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error resetting password' });
    }
};

export { showForgotPasswordForm, handleForgotPassword, getPassword, resetPasswordWithToken };