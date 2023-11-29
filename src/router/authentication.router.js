import express from "express";
import passport from "../Services/passport.js";
const router = express.Router();

// Ruta autenticación con google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: "/",
        failureRedirect: "/login",
    })
);

// Rutas del Profile
router.post("/login", passport.authenticate("login"), (req, res) => {
    res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
});

router.post("/register", passport.authenticate("register"), (req, res) => {
    res.redirect("/");
});

router.get("/profile",  (req, res) => {
    res.json(req.user);
})


export default router;