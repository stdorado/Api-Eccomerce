import express from "express";
import passport from "../Services/passport.js";


const router = express.Router();

// Ruta autenticación con GitHub
router.get("/github", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "/home", 
    failureRedirect: "/login", 
  })
);

// Ruta para el inicio de sesión 
router.post("/login", passport.authenticate("local-login", {
  successRedirect: "/home", 
  failureRedirect: "/login", 
}));

// Ruta para el registro 
router.post("/register", passport.authenticate("local-register", {
  successRedirect: "/home", 
  failureRedirect: "/register", 
}));


export default router;