const express = require("express");
const router = express.Router();
const { createRegistration } = require("../controller/OrgRegisterController");
const upload = require("../middleware/fileUpload");


const multiUpload = upload.fields([
  { name: "registerImage", maxCount: 1 },
  { name: "licenceFile", maxCount: 10 },
]);

router.post("/createRegistration", multiUpload, createRegistration);

module.exports = router;
