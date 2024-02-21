import { Router } from "express";
import {
  UploadImage,
  renderUploadForm,
  upgradeToPremium,
} from "../controllers/ControllersMemory/user.controller.js";
import upload from "../utils/multer.js";

const router = Router();

router.get("/upload", renderUploadForm);

router.post("/upload", upload.single("image"), UploadImage);

router.post("/:userId/upgrade", upgradeToPremium);

export default router;
