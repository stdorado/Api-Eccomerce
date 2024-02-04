import { Router } from "express";
import { uploadDocuments,updateToPremium } from "../controllers/ControllersMemory/user.controller.js";
import { upload } from "../utils/multer.js";


const router = Router()


router.post("/:uid/documents", upload.array('documents'), uploadDocuments);
router.put("/premium/:uid", updateToPremium);


export default router