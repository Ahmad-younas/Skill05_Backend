const express = require("express");
const router = express.Router();
const recruiterController = require("../controller/recruiterController");
const JwtAuth = require("../JwtAuth");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../assets/images"); // The destination folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // A unique filename for the uploaded file
  },
});

let upload = multer({
  storage: storage,
});

console.log(__dirname);
router.post("/recruiterLogin", recruiterController.recruiterLogin);
router.post("/recruiterSignUp", recruiterController.recruiterSignUp);
router.post(
  "/recruiterpostjob",
  upload.single("companyLogo"),JwtAuth,
  recruiterController.recruiterPostJob
);
router.post("/recruiterprofile", JwtAuth, recruiterController.recruiterProfile);
router.get("/getpostedJob", recruiterController.GetPostedJob);
router.get("/getprofileInfo", JwtAuth, recruiterController.getRecruiterProfile);
router.put("/updateProfileInfo", JwtAuth, recruiterController.UpdateProfileInfo);
router.get("/getJobDetail/:id", JwtAuth,recruiterController.getJobDetials);
module.exports = router;
