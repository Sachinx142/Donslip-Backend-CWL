const express = require("express");
const router = express.Router();
const {
  getAllUnderRegister,
  getAllRegisterdUnderByID,
  createUnderRegister,
  updateUnderRegister,
  deleteUnderRegister,
  changeStatus,
  getAllActiveUnderRegister
} = require("../controller/registeredController");

router.get("/getAllUnderRegister", getAllUnderRegister);
router.get("/getAllActiveUnderRegister", getAllActiveUnderRegister);
router.post("/getRegisterdUnderByID", getAllRegisterdUnderByID);
router.post("/createUnderRegister", createUnderRegister);
router.post("/updateUnderRegister", updateUnderRegister);
router.post("/deleteUnderRegister", deleteUnderRegister);
router.post("/changeStatus", changeStatus);

module.exports = router;
