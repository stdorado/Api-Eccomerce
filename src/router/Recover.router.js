import { Router } from "express";
import { showForgotPasswordForm, handleForgotPassword, resetPasswordWithToken } from "../controllers/ControllersMemory/recover.controller.js";

const router = Router();

// Rutas para recuperación de contraseña
router.get('/forgot-password', showForgotPasswordForm);
router.post('/password-resent', handleForgotPassword);
router.get('/password-reset-sent', (req, res) => {
    res.render('password-resent-sent');
});

// Redirigir a la vista que muestra la contraseña
router.get('/reset-password/:token', resetPasswordWithToken);

export default router;
