    const registerModel = require("../model/OrgRegisterModel");
    const uploadedLincenModel = require("../model/uploadedLincenModel");

const createRegistration = async (req, res) => {
  try {
    const {
      categoryId,
      subCategoryId,
      religionId,
      registeredUnderId,
      registeredName,
      alias,
      country,
      state,
      district,
      pincode,
      fullAddress,
      panNo,
      registrationNo,
    } = req.body;

    // Basic validations
    if (!categoryId) return res.json({ status: 0, message: "Category is required" });
    if (!subCategoryId) return res.json({ status: 0, message: "Subcategory is required" });
    if (!religionId) return res.json({ status: 0, message: "Religion is required" });
    if (!registeredUnderId) return res.json({ status: 0, message: "Registered Under is required" });
    if (!registeredName?.trim()) return res.json({ status: 0, message: "Registered name is required" });
    if (!alias?.trim()) return res.json({ status: 0, message: "Alias is required" });
    if (!country?.trim()) return res.json({ status: 0, message: "Country is required" });
    if (!state?.trim()) return res.json({ status: 0, message: "State is required" });
    if (!district?.trim()) return res.json({ status: 0, message: "District is required" });
    if (!pincode?.trim()) return res.json({ status: 0, message: "Pincode is required" });
    if (!fullAddress?.trim()) return res.json({ status: 0, message: "Full address is required" });
    if (!panNo?.trim()) return res.json({ status: 0, message: "PAN number is required" });
    if (!registrationNo?.trim()) return res.json({ status: 0, message: "registrationNo number is required" });

    // Format validation
    if (!/^\d{6}$/.test(pincode)) {
      return res.json({ status: 0, field: "pincode", message: "Invalid 6-digit pincode" });
    }
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(panNo)) {
      return res.json({ status: 0, field: "panNo", message: "Invalid PAN format (e.g., ABCDE1234F)" });
    }

    const registerImage = req.files?.registerImage?.[0]?.filename || null;
    let uploadFiles = req.files?.licenceFile || []; 

    if (!registerImage) return res.json({ status: 0, message: "Register image is required" });



    let lincenDocs = [];
    if (uploadFiles.length > 0) {
        const registrationNo = req.body.registrationNo || null;
      const licenceData = uploadFiles.map(file => ({
        registrationNo,
        uploadRegistrationFile: file.filename
      }));
      lincenDocs = await uploadedLincenModel.insertMany(licenceData);
      console.log(licenceData,"dss")
    }

    console.log("Files uploaded:", req.files);




    const newRegister = await registerModel.create({
      categoryId,
      subCategoryId,
      religionId,
      registeredUnderId,
      registeredName,
      alias,
      country,
      state,
      district,
      pincode,
      fullAddress,
      licenceApprovalId: lincenDocs.map(doc => doc._id), 
      panNo,
      registrationNo,
      registerImage,
      status: 1
    });

    return res.status(200).json({ status: 1, message: "Registered successfully", data: newRegister });
  } catch (error) {
    console.error("Error while registering:", error);
    return res.status(500).json({ status: 0, message: "Internal server error" });
  }
};

    module.exports = { createRegistration };
