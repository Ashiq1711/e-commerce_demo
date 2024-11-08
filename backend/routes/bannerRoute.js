import express from "express";
import {
  addBanner,
  listBanner,
  removeBanner,
} from "../controllers/bannerController.js";
import upload from "../middleware/multer.js";
import adminauth from "../middleware/adminAuth.js";

const bannerRoute = express.Router();
bannerRoute.post(
  "/add",adminauth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addBanner
);
bannerRoute.post("/remove", removeBanner);
bannerRoute.get("/list", listBanner);

export default bannerRoute;
