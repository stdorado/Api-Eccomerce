import { Router } from "express";
import {
  UploadImage,
  renderUploadForm,
  upgradeToPremium,
  AllUserToDB,
  deleteInactiveUsers,
  deleteUser
} from "../controllers/ControllersMemory/user.controller.js";
import upload from "../utils/multer.js";

const router = Router();

router.get("/upload", renderUploadForm);

router.post("/upload", upload.single("image"), UploadImage);

router.post("/:userId/upgrade", upgradeToPremium);

router.get("/allUsers",AllUserToDB)

router.delete("/UserInactive",deleteInactiveUsers)

router.delete("/OneUserDelete/:userId",deleteUser)


export default router;
