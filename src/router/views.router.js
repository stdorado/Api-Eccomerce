import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/realtimeProducts", (req, res) => {
  res.render("realtimeProducts");
});

export default router;