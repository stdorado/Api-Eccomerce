import { Router } from "express";
import { showForgotPasswordForm, handleForgotPassword, getPassword, resetPasswordWithToken } from "../controllers/ControllersMemory/Recover.controller.js";

const router = Router();

// Rutas para recuperación de contraseña
router.get('/forgot-password', showForgotPasswordForm);
router.post('/password-resent', handleForgotPassword);
router.get('/password-reset-sent', (req, res) => {
    res.render('password-resent-sent');
});


router.get('/reset-password/:token', resetPasswordWithToken); 

router.get('/password', getPassword); 

export default router;