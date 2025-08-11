const express = require("express");
const router = express.Router();
const {
  getAllLicence,
  getAllLicenceByID,
  getAllActiveLicence,
  createLicence,
  updateLicence,
  deleteLicence,
  changeStatus,
} = require("../controller/licenceApprovalsController");

router.get("/getAllLicence", getAllLicence);
router.get("/getAllActiveLicence", getAllActiveLicence);
router.post("/getAllLicenceByID", getAllLicenceByID);
router.post("/createLicence", createLicence);
router.post("/updateLicence", updateLicence);
router.post("/deleteLicence", deleteLicence);
router.post("/changeStatus", changeStatus);

module.exports = router;
