import RecoverService from "../../Services/Recover.service.js";

const showForgotPasswordForm = (req, res) => {
  res.render("forgot-password-form");
};

const handleForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const { user, resetToken } = await RecoverService.generateResetToken(email);
    await RecoverService.sendResetEmail(email, resetToken);

    const { firstName, _id } = user;
    res
      .status(200)
      .json({
        message: "Email Reset password sent successfully",
        resetToken,
        userId: _id,
        firstName,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error sending password reset email" });
  }
};

const resetPasswordWithToken = async (req, res) => {
  try {
    const token = req.params.token;
    if (!token) {
      return res
        .status(400)
        .json({ error: "Token not provided in the request URL" });
    }

    const { userId } = RecoverService.verifyToken(token);

    const password = await RecoverService.getPasswordByEmail(userId);

    res.render("reset-password", { password });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error resetting password" });
  }
};

export { showForgotPasswordForm, handleForgotPassword, resetPasswordWithToken };
