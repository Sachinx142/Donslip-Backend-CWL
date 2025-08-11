const religionModel = require("../model/religionSubCategoryModel");

const getAllReligionCategory = async (req, res) => {
  try {
    const data = await religionModel
      .find()
      .populate("categoryId", "categoryName")
      .populate("subcategoryId", "subCategoryName");

    if (!data || data.length === 0) {
      return res.json({
        message: "Unable to get religion data",
        status: 0,
      });
    }

    return res.status(200).json({
      message: "Religion Data Successfully",
      status: 1,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", status: 0 });
  }
};

const getReligionCategorybyId = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.json({
        message: "Unable to get Religion data",
        status: 0,
      });
    }

    const data = await religionModel.findById(id);

    if (!data) {
      return res.status(404).json({
        message: "Religion not found.",
        status: 0,
      });
    }

    return res.status(200).json({
      message: "Religion Data Successfully",
      status: 1,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", status: 0 });
  }
};

const createReligionCategory = async (req, res) => {
  try {
    const { religionName, categoryId, subcategoryId } = req.body;

    if (!religionName) {
      return res.json({
        message: "Religion name is required",
        status: 0,
      });
    }

    if (!categoryId || !subcategoryId) {
      return res.json({
        message: "categoryId and subCategoryId are required",
      });
    }

    const isExists = await religionModel.findOne({ religionName });

    if (isExists) {
      return res.json({
        message: "Religion Already Exits",
        status: 0,
      });
    }

    const data = await religionModel.create({
      religionName,
      categoryId,
      subcategoryId,
      status: 1,
    });

    return res.status(200).json({
      message: "Religion is Created Successfully",
      data: data,
      status: 1,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", status: 0 });
  }
};

const updateReligionCategory = async (req, res) => {
  try {
    const { id, religionName, categoryId, subcategoryId } = req.body;

    if (!id) {
      return res.json({
        message: "Religion ID is Not Found",
        status: 0,
      });
    }

    if (!categoryId || !subcategoryId) {
      return res.json({
        message: "categoryId and subCategoryId are required",
      });
    }

    const data = await religionModel.findByIdAndUpdate(
      { _id: id },
      { religionName, categoryId, subcategoryId }
    );

    if (!data) {
      return res.json({
        message: "Unable to update Religion data",
        status: 0,
      });
    }

    return res.status(200).json({
      message: "Religion Upadated Successfully",
      status: 1,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", status: 0 });
  }
};

const deleteReligionCategory = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.json({
        message: "religion ID is required",
      });
    }

    const data = await religionModel.findByIdAndDelete(id);

    if (!data) {
      res.json({ message: "Unable to update Religion data", status: 0 });
    }

    return res.status(200).json({
      message: "Religion Deleted Successfully",
      status: 1,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", status: 0 });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { status, id } = req.body;

    const data = await religionModel.findByIdAndUpdate(
      { _id: id },
      { status: status === 1 ? 0 : 1 }
    );

    if (!data) {
      res.json({ message: "Unable to Change Status", status: 0 });
    }

    return res
      .status(200)
      .json({ message: "Status Changed", status: 1, data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", status: 0 });
  }
};

const getAllActiveReligioncategory = async (req, res) => {
  try {
    const data = await religionModel.find({ status: 1 });

    if (!data) {
      return res.json({
        message: "Unable to get Religion data",
        status: 0,
      });
    }

    return res.status(200).json({
      message: "Religion Data Successfully",
      status: 1,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", status: 0 });
  }
};

// Filter Data category and Subcategory


module.exports = {
  getAllReligionCategory,
  getReligionCategorybyId,
  createReligionCategory,
  updateReligionCategory,
  deleteReligionCategory,
  changeStatus,
  getAllActiveReligioncategory,
};
