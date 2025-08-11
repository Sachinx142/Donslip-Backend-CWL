const express = require("express");
const router = express.Router();
const {
    getAllActiveReligioncategory,
    getAllReligionCategory,
    getReligionCategorybyId,
    createReligionCategory,
    updateReligionCategory,
    deleteReligionCategory,
    changeStatus
} = require("../controller/religionSubCategoryController")


router.get("/getAllSubReligionCategory",getAllReligionCategory)
router.get("/getAllActiveSubReligioncategory",getAllActiveReligioncategory)
router.post("/getReligionSubCategorybyId",getReligionCategorybyId)
router.post("/createReligionSubCategory",createReligionCategory)
router.post("/updateReligionSubCategory",updateReligionCategory)
router.post("/deleteReligionSubCategory",deleteReligionCategory)
router.post("/changeStatus",changeStatus)


module.exports = router