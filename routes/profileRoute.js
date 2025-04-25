import express from "express";
import authMiddleware from "../middlewares/middleware.js";
import { getProfile, getProfileData, updateProfile, viewProfile } from "../controllers/profileController.js";
import multer from "multer";
import path from "path";
const router = express.Router();



// Set storage engine
const storage = multer.diskStorage({
  destination: "./public/profile/",
  limits: { fileSize: 5*(1024 * 1024) }, // 5MB file size limit
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png|webp|svg/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });


router.get("/page/profile", getProfile);

router.get("/api/profile", authMiddleware, getProfileData);

router.put("/api/profile", authMiddleware, upload.single('profileImage'), updateProfile);
router.get("/page/profile/:id",(req,res)=>{
  res.render("profile/viewsearchprof", { userID: req.params.id });
} );
router.get("/api/viewprofile/:id",viewProfile)
export default router;