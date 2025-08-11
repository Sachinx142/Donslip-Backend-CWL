const registeredModel = require("../model/registeredModel");

const getAllUnderRegister =  async (req, res) => {
  try {
    const data = await registeredModel.find();

    if (!data || data.length === 0) {
      return res.json({
        message: "Unable to get register data",
        status: 0,
      });
    }

    return res.json({
      message: "Registe Data get Successfully",
      status: 1,
      data: data,
    });
  } catch (error) {
    console.error("Error getting register:", error);
    return res.json({
      success: false,
      message: "An error occurred while getting the register.",
      error: error.message,
    });
  }
};

const getAllRegisterdUnderByID = async (req, res) => {
  try {
    const {id} = req.body;

    if (!id) {
      return res.json({
        message: "Unable to get register data",
        status: 0,
      });
    }

    const data = await registeredModel.findById(id)
    
    if (!data) {
      return res.status(404).json({
        message: "Register not found.",
        status: 0,
      });
    }

    return res.json({
      message: "Register Data get Successfully",
      status: 1,
      data: data,
    });
  } catch (error) {
    console.error("Error getting register:", error);
    return res.json({
      success: false,
      message: "An error occurred while getting the register.",
      error: error.message,
    });
  }
};

const createUnderRegister = async (req, res) => {
  try {
    const { registeredUnderName } = req.body;

    if (!registeredUnderName) {
      return res.json({
        message: "Register name is required",
        status: 0,
      });
    }

    const isExists = await registeredModel.findOne({registeredUnderName:registeredUnderName})

    if(isExists){
        return res.json({
        message: "Register Already Exits",
        status: 0,
      });
    }

    const data = await registeredModel.create({
      registeredUnderName,
      status: 1,
    });

    return res.json({
      message: "Register is Created Successfully",
      data: data,
      status: 1,
    });
  } catch (error) {
    console.error("Error adding register:", error);
    return res.json({
      success: false,
      message: "An error occurred while creating the register.",
      error: error.message,
    });
  }
};

const updateUnderRegister = async (req, res) => {
  try {
    const { id, registeredUnderName } = req.body;

    if (!id || !registeredUnderName) {
      return res.json({
        message: "Register ID and Register Name is Required",
        status: 0,
      });
    }


    const data = await registeredModel.findByIdAndUpdate({ _id: id }, { registeredUnderName });

    if (!data) {
      return res.json({
        message: "Unable to update register data",
        status: 0,
      });
    }

    return res.json({
      message: "Register Upadated Successfully",
      status: 1,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error", status: 0 });
  }
};

const deleteUnderRegister = async (req, res) => {
  try {
    const { id } = req.body;

    if(!id){
         return res
        
        .json({ message: "Register Id is required", status: 0 });
    }

    const data = await registeredModel.findByIdAndDelete(id);

    if (!data) {
      res
        
        .json({ message: "Unable to update register data", status: 0 });
    }

    return res.json({
      message: "Register Data Deleted Successfully",
      status: 1,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error", status: 0 });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { status, id } = req.body;

    const data = await registeredModel.findByIdAndUpdate(
      { _id: id },
      { status: status === 1 ? 0 : 1 }
    );

    if (!data) {
      res.json({ message: "Unable to Change Status", status: 0 });
    }

    return res
      
      .json({ message: "Status Changed", status: 1, data: data });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error", status: 0 });
  }
};

const getAllActiveUnderRegister = async (req,res) => {
     try {
      const data = await registeredModel.find({status:1})

      if(!data || data.length === 0){
        return res.json({
          message:"Unable to get register data",
          status:0
        })
      }

      
    return res.json({
         message: "Register Data Successfully",
        status: 1,
        data: data,
    })

     } catch (error) {
        console.error("Error getting register:", error);
    return res.json({
      success: false,
      message: "An error occurred while getting the register.",
      error: error.message,
    });
     }  
}

module.exports = {
  getAllUnderRegister,
  getAllRegisterdUnderByID,
  createUnderRegister,
  updateUnderRegister,
  deleteUnderRegister,
  changeStatus,
  getAllActiveUnderRegister
};
