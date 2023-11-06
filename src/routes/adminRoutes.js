const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const jwtAuth = require('../JwtAuth');

router.get("/recuriter", adminController.GetRecuriter);
router.put("/updaterecuriter", jwtAuth, adminController.UpdateRecuriter);
router.post("/loginadmin", adminController.AdminLogin);
router.post("/addcountry",adminController.AddCountry);
router.post("/addcategory",adminController.AddCategory);

module.exports = router;
