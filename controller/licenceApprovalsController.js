const licenceApprovalsModel = require("../model/licenceApprovalsModel");

const getAllLicence =  async (req, res) => {
  try {
    const data = await licenceApprovalsModel.find();

    if (!data || data.length === 0) {
      return res.json({
        message: "Unable to get licence data",
        status: 0,
      });
    }

    return res.status(200).json({
      message: "Licence Data get Successfully",
      status: 1,
      data: data,
    });
  } catch (error) {
    console.error("Error getting licence:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while getting the licence.",
      error: error.message,
    });
  }
};

const getAllLicenceByID = async (req, res) => {
  try {
    const {id} = req.body;

    if (!id) {
      return res.json({
        message: "Unable to get licence data",
        status: 0,
      });
    }

    const data = await licenceApprovalsModel.findById(id)
    
    if (!data) {
      return res.json({
        message: "Licence not found.",
        status: 0,
      });
    }

    return res.status(200).json({
      message: "Licence Data get Successfully",
      status: 1,
      data: data,
    });
  } catch (error) {
    console.error("Error getting licence:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while getting the licence.",
      error: error.message,
    });
  }
};

const createLicence = async (req, res) => {
  try {
    const { lincenceName } = req.body;

    if (!lincenceName) {
      return res.json({
        message: "Licence name is required",
        status: 0,
      });
    }

    const isExists = await licenceApprovalsModel.findOne({lincenceName})

    if(isExists){
        return res.json({
        message: "Licence Already Exits",
        status: 0,
      });
    }

    const data = await licenceApprovalsModel.create({
      lincenceName,
      status: 1,
    });

    return res.status(200).json({
      message: "Licence is Created Successfully",
      data: data,
      status: 1,
    });
  } catch (error) {
    console.error("Error adding licence:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the licence.",
      error: error.message,
    });
  }
};

const updateLicence = async (req, res) => {
  try {
    const { id, lincenceName } = req.body;

    if (!id || !lincenceName) {
      return res.json({
        message: "Licence ID and Licence Name is Required",
        status: 0,
      });
    }


    const data = await licenceApprovalsModel.findByIdAndUpdate({ _id: id }, { lincenceName });

    if (!data) {
      return res.json({
        message: "Unable to update licence data",
        status: 0,
      });
    }

    return res.status(200).json({
      message: "Licence Upadated Successfully",
      status: 1,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", status: 0 });
  }
};

const deleteLicence = async (req, res) => {
  try {
    const { id } = req.body;

    if(!id){
         return res
        .json({ message: "Licence Id is required", status: 0 });
    }

    const data = await licenceApprovalsModel.findByIdAndDelete(id);

    if (!data) {
      res
        .json({ message: "Unable to update licence data", status: 0 });
    }

    return res.status(200).json({
      message: "licence Data Deleted Successfully",
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

    const data = await licenceApprovalsModel.findByIdAndUpdate(
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

const getAllActiveLicence = async (req,res) => {
     try {
      const data = await licenceApprovalsModel.find({status:1})

      if(!data || data.length === 0){
        return res.json({
          message:"Unable to get licence data",
          status:0
        })
      }

      
    return res.status(200).json({
         message: "Licence Data Successfully",
        status: 1,
        data: data,
    })

     } catch (error) {
        console.error("Error getting licence:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while getting the licence.",
      error: error.message,
    });
     }  
}

module.exports = {
  getAllLicence,
  getAllLicenceByID,
  createLicence,
  updateLicence,
  deleteLicence,
  changeStatus,
  getAllActiveLicence
};
