const express = require("express");
const router = express.Router();
const {createCategory, updateCategory, deleteCategory, changeStatus, getCategorybyId, getAllCategory,getAllActiveCategory} = require("../controller/categoryController")

router.get("/getCategory",getAllCategory)
router.get("/getAllActiveCategory",getAllActiveCategory)
router.post("/getCategoryById",getCategorybyId)
router.post("/createCategory",createCategory)
router.post("/updateCategory",updateCategory)
router.post("/deleteCategory",deleteCategory)
router.post("/changeStatus",changeStatus)


module.exports = router