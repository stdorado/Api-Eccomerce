import express from "express";
import passport from "../Services/passport.js";
const router = express.Router();

// Ruta autenticación con google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: "/home",
        failureRedirect: "/login",
    })
);

// Rutas del Profile
router.post("/login", (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect("/login");
        }
        res.redirect("/home");
    })(req, res, next);
});

router.post("/register", passport.authenticate("register"), (req, res) => {
    res.redirect("/home");
});

router.get("/profile",  (req, res) => {
    res.json(req.user);
})


export default router;