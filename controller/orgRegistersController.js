const organizationModel = require("../model/organizationModel");
const uploadedLincenModel = require("../model/uploadedLincenModel");
const manageMentModel = require("../model/manageMentModel");
 const accountModel = require("../model/bankDetailsModel");

const createRegistration1 = async (req, res) => {
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
    if (!categoryId)
      return res.json({ status: 0, message: "Category is required" });
    if (!subCategoryId)
      return res.json({ status: 0, message: "Subcategory is required" });
    if (!religionId)
      return res.json({ status: 0, message: "Religion is required" });
    if (!registeredUnderId)
      return res.json({ status: 0, message: "Registered Under is required" });

    if (!registeredName || !registeredName.trim())
      return res.json({ status: 0, message: "Registered name is required" });
    if (!alias || !alias.trim())
      return res.json({ status: 0, message: "Alias is required" });
    if (!country || !country.trim())
      return res.json({ status: 0, message: "Country is required" });
    if (!state || !state.trim())
      return res.json({ status: 0, message: "State is required" });
    if (!district || !district.trim())
      return res.json({ status: 0, message: "District is required" });
    if (!pincode || !pincode.trim())
      return res.json({ status: 0, message: "Pincode is required" });
    if (!fullAddress || !fullAddress.trim())
      return res.json({ status: 0, message: "Full address is required" });
    if (!panNo || !panNo.trim())
      return res.json({ status: 0, message: "PAN number is required" });
    if (!registrationNo || !registrationNo.trim())
      return res.json({
        status: 0,
        message: "Registration number is required",
      });

    // Format validation
    if (!/^\d{6}$/.test(pincode)) {
      return res.json({
        status: 0,
        field: "pincode",
        message: "Invalid 6-digit pincode",
      });
    }
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(panNo)) {
      return res.json({
        status: 0,
        field: "panNo",
        message: "Invalid PAN format (e.g., ABCDE1234F)",
      });
    }

    // Check Existing Register Org
    const isExisting = await organizationModel.findOne({
        $or:[
            {registeredName:registeredName},
            {fullAddress:fullAddress}
        ]
    })

    if(isExisting){
        return res.json({message:"User already registered "})
    }

    // File validations
    const registerImage = req.files?.registerImage?.[0]?.filename || null;
    if (!registerImage)
      return res.json({ status: 0, message: "Register image is required" });

    let uploadFiles = req.files?.licenceFile || [];
    if (!uploadFiles.length === 0)
      return res.json({
        status: 0,
        message: "uploadRegistrationFile  Image is required",
      });

    let lincenDocs = [];
    if (uploadFiles.length > 0) {
      const registrationNo = req.body.registrationNo || null;
      const licenceData = uploadFiles.map((file) => ({
        registrationNo,
        uploadRegistrationFile: file.filename,
      }));
      lincenDocs = await uploadedLincenModel.insertMany(licenceData);
    }

    const newRegister = await organizationModel.create({
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
      licenceApprovalId: lincenDocs.map((doc) => doc._id),
      panNo,
      registrationNo,
      registerImage,
      status: 1,
    });

   

    return res
    .status(200)
      .json({
        status: 1,
        message: "Registered successfully",
        data: newRegister,
      });
  } catch (error) {
    console.error("Error while registering:", error);
    return res
      .status(500)
      .json({ status: 0, message: "Internal server error" });
  }
};


const updateRegistration2 = async (req, res) => {
  try {
    const { id, fullname, email, phone, designation, type } = req.body;

    if (!id) return res.json({ status: 0, message: "Organization ID is required" });
    if (!fullname?.trim()) return res.json({ status: 0, message: "Fullname is required" });
    if (!email?.trim()) return res.json({ status: 0, message: "Email is required" });
    if (!phone?.trim()) return res.json({ status: 0, message: "Phone is required" });
    if (!designation?.trim()) return res.json({ status: 0, message: "Designation is required" });


    const organization = await organizationModel.findById(id)
    if (!organization) return res.json({ status: 0, message: "Organization ID not found" });

    // Check for duplicate email/phone only inside this org
    const existingManagement = await manageMentModel.findOne({
      _id: { $in: organization.managements },
      $or: [{ email }, { phone }]
    });

    if (existingManagement) {
      return res.json({ status: 0, message: "Email or phone already registered in this organization" });
    }


    if (type === 1) {
      const headExists = await manageMentModel.exists({
        _id: { $in: organization.managements },
        type: 1
      });
      if (headExists) {
        return res.json({ status: 0, message: "Head already exists in this organization" });
      }
    }

  
    const newManagement = await manageMentModel.create({
      fullname,
      email,
      phone,
      designation,
      type
    });


    await organizationModel.findByIdAndUpdate(
      id,
      { $addToSet: { managements: newManagement._id } }
    );

    res.json({ status: 1, message: "Management added", data: newManagement });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 0, message: "Internal server error" });
  }
};


const updateRegistration3 = async (req, res) => {
  try {
    const {
      id,
      accountHolderName,
      accountNumber,
      ifsc,
      bankName,
      address,
      accountType
    } = req.body;

    // 1. Validation
    if (!id) return res.json({ status: 0, message: "Organization ID is required" });
    if (!accountHolderName?.trim()) return res.json({ status: 0, message: "Account holder name is required" });
    if (!accountNumber?.trim()) return res.json({ status: 0, message: "Account number is required" });
    if (!ifsc?.trim()) return res.json({ status: 0, message: "IFSC code is required" });
    if (!bankName?.trim()) return res.json({ status: 0, message: "Bank name is required" });
    if (!address?.trim()) return res.json({ status: 0, message: "Address is required" });
    if (![0, 1].includes(Number(accountType))) {
      return res.json({ status: 0, message: "Invalid account type (0 for Normal A/C, 1 for FCRA A/C)" });
    }


    const organization = await organizationModel.findById(id);
    if (!organization) return res.json({ status: 0, message: "Organization ID not found" });


    const accountTypeLabel = accountType === 0 ? "Normal A/C" : "FCRA A/C";


    const newAccount = await accountModel.create({
      accountHolderName,
      accountNumber,
      ifsc,
      bankName,
      address,
      accountType,
      accountTypeLabel
    });

    await organizationModel.findByIdAndUpdate(id, {
      $addToSet: { accounts: newAccount._id }
    });

    res.status(200).json({
      status: 1,
      message: "Account added successfully",
      data: newAccount
    });

  } catch (err) {
    console.error("Error in createRegistration3:", err);
    res.status(500).json({ status: 0, message: "Internal server error" });
  }
};

module.exports = { createRegistration1,updateRegistration2,updateRegistration3 };
