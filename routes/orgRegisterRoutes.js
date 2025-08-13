const express = require("express");
const router = express.Router();
const { updateRegistration1, updateRegistration2, updateRegistration3, updateRegistration4, updateRegistration5} = require("../controller/orgRegistersController");
const upload = require("../middleware/fileUpload");


const multiUpload = upload.fields([
  { name: "registerImage", maxCount: 1 },
  { name: "licenceFile", maxCount: 10 },
]);

router.post("/updateRegistration1", multiUpload, updateRegistration1);
router.post("/updateRegistration2", updateRegistration2);
router.post("/updateRegistration3", updateRegistration3);
router.post("/updateRegistration4", updateRegistration4);
router.post("/updateRegistration5", updateRegistration5);

module.exports = router;
