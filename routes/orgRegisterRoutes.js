const express = require("express");
const router = express.Router();
const { createRegistration1, updateRegistration2, updateRegistration3} = require("../controller/orgRegistersController");
const upload = require("../middleware/fileUpload");


const multiUpload = upload.fields([
  { name: "registerImage", maxCount: 1 },
  { name: "licenceFile", maxCount: 10 },
]);

router.post("/createRegistration1", multiUpload, createRegistration1);
router.post("/updateRegistration2", updateRegistration2);
router.post("/updateRegistration3", updateRegistration3);

module.exports = router;
