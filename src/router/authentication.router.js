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



// Ruta para el inicio de sesión 
router.post("/login", passport.authenticate("login", {
  successRedirect: "/home", 
  failureRedirect: "/login", 
}));




// Ruta para el registro 
router.post("/register", passport.authenticate("register", {
  successRedirect: "/home", 
  failureRedirect: "/register", 
}));




router.get("/profile", passport.authenticate("profile"), (req,res)=>{
  res.json(req.user)
})


export default router;