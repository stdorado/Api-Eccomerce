import { Router } from "express";
const router = Router();

router.get("/", (req,res)=>{
  res.render("init")
})

router.get("/cart", (req,res)=>{
  res.render("cart")
})

router.get("/products", (req, res) => {
  res.render("home");
});

router.get("/realtimeProducts", (req, res) => {
  res.render("realtimeProducts");
});

export default router;