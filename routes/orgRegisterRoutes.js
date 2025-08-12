const express = require("express");
const router = express.Router();
const { createRegistration1,createRegistration2} = require("../controller/orgRegisterController");
const upload = require("../middleware/fileUpload");


const multiUpload = upload.fields([
  { name: "registerImage", maxCount: 1 },
  { name: "licenceFile", maxCount: 10 },
]);

router.post("/createRegistration1", multiUpload, createRegistration1);
router.post("/createRegistration2", createRegistration2);

module.exports = router;
