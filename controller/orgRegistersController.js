const organizationModel = require("../model/organizationModel");
const uploadedLincenModel = require("../model/uploadedLincenModel");
const manageMentModel = require("../model/manageMentModel");

// For First Form Registrer
const updateRegistration1 = async (req, res) => {
  try {
    const {
      id,
      categoryId,
      subCategoryId,
      religionSubCategoryId,
      religionId,
      registeredUnderId,
      registeredName,
      alias,
      country,
      state,
      district,
      pincode,
      fullAddress,
      registrationNo,
    } = req.body;

    if (!id) return res.json({ status: 0, message: "ID is required" });
    if (!categoryId)
      return res.json({ status: 0, message: "Category is required" });
    if (!subCategoryId)
      return res.json({ status: 0, message: "Subcategory is required" });
    if (!religionSubCategoryId)
      return res.json({
        status: 0,
        message: "religionSubCategoryId is required",
      });
    if (!registeredUnderId)
      return res.json({ status: 0, message: "Registered Under is required" });
    if (!registeredName?.trim())
      return res.json({ status: 0, message: "Registered name is required" });
    if (!alias?.trim())
      return res.json({ status: 0, message: "Alias is required" });
    if (!country?.trim())
      return res.json({ status: 0, message: "Country is required" });
    if (!state?.trim())
      return res.json({ status: 0, message: "State is required" });
    if (!district?.trim())
      return res.json({ status: 0, message: "District is required" });
    if (!pincode?.trim() || !/^\d{6}$/.test(pincode))
      return res.json({ status: 0, message: "Invalid 6-digit pincode" });
    if (!fullAddress?.trim())
      return res.json({ status: 0, message: "Full address is required" });
    if (!registrationNo?.trim())
      return res.json({
        status: 0,
        message: "Registration number is required",
      });

    // Check existing organization
    const isExisting = await organizationModel.findOne({
      $or: [{ registeredName }, { fullAddress }],
    });
    if (isExisting)
      return res.json({
        status: 0,
        message: "Organization already registered",
      });

    // Register image
    const registerImage = req.files?.registerImage?.[0]?.filename;
    if (!registerImage)
      return res.json({ status: 0, message: "Register image is required" });

    // Licence files
    const uploadFiles = req.files?.licenceFile || [];
    if (!uploadFiles.length)
      return res.json({ status: 0, message: "Licence file is required" });

    const lincenDocs = await uploadedLincenModel.insertMany(
      uploadFiles.map((file) => ({
        registrationNo,
        uploadRegistrationFile: file.filename,
      }))
    );

    const docIds = lincenDocs.map((doc) => doc._id);

    const newRegister = await organizationModel.findByIdAndUpdate(
      { _id: id },
      {
        categoryId,
        subCategoryId,
        religionSubCategoryId,
        registeredUnderId,
        registeredName,
        alias,
        country,
        state,
        district,
        pincode,
        fullAddress,
        licenceApprovalId: docIds,
        registrationNo,
        registerImage,
        formCounter: 2,
      },
      { new: true }
    );

    return res.status(200).json({
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

//For Two Form Management
const updateRegistration2 = async (req, res) => {
  try {
    const { id, fullname, email, phone, designation, type } = req.body;

    if (!id)
      return res.json({ status: 0, message: "Organization ID is required" });
    if (!fullname?.trim())
      return res.json({ status: 0, message: "Fullname is required" });
    if (!email?.trim())
      return res.json({ status: 0, message: "Email is required" });
    if (!phone?.trim())
      return res.json({ status: 0, message: "Phone is required" });
    if (!designation?.trim())
      return res.json({ status: 0, message: "Designation is required" });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.json({ message: "Invalid email format", status: 0 });
    }

    if (!/^\d{10}$/.test(phone)) {
      return res.json({
        status: 0,
        message: "Invalid phone format",
      });
    }

    const organization = await organizationModel.findById(id);
    if (!organization)
      return res.json({ status: 0, message: "Organization ID not found" });

    // Check for duplicate email/phone only inside this org
    const existingManagement = await manageMentModel.findOne({
      _id: { $in: organization.managements },
      $or: [{ email }, { phone }],
    });

    if (existingManagement) {
      return res.json({
        status: 0,
        message: "Email or phone already registered in this organization",
      });
    }

    if (type === 1) {
      const headExists = await manageMentModel.exists({
        _id: { $in: organization.managements },
        type: 1,
      });
      if (headExists) {
        return res.json({
          status: 0,
          message: "Head already exists in this organization",
        });
      }
    }

    const newManagement = await manageMentModel.create({
      fullname,
      email,
      phone,
      designation,
      type,
    });

    await organizationModel.findByIdAndUpdate(
      { _id: id },
      {
        $addToSet: { managements: newManagement._id },
        formCounter: 3,
      },
      { new: true }
    );

    res.json({ status: 1, message: "Management added", data: newManagement });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 0, message: "Internal server error" });
  }
};

//For Three Form Bank Details
const updateRegistration3 = async (req, res) => {
  try {
    const {
      id,
      accountHolderName,
      accountNumber,
      ifsc,
      bankName,
      address,
      accountType,
    } = req.body;

    if (!id)
      return res.json({ status: 0, message: "Organization ID is required" });
    if (!accountHolderName?.trim())
      return res.json({
        status: 0,
        message: "Account holder name is required",
      });
    if (!accountNumber?.trim())
      return res.json({ status: 0, message: "Account number is required" });
    if (!ifsc?.trim())
      return res.json({ status: 0, message: "IFSC code is required" });
    if (!bankName?.trim())
      return res.json({ status: 0, message: "Bank name is required" });
    if (!address?.trim())
      return res.json({ status: 0, message: "Address is required" });
    if (accountType !== 0 && accountType !== 1) {
      return res.json({
        status: 0,
        message: "Invalid account type (0 for Normal A/C, 1 for FCRA A/C)",
      });
    }

    const organization = await organizationModel.findById(id);
    if (!organization)
      return res.json({ status: 0, message: "Organization ID not found" });

    const accountTypeLabel = accountType === 0 ? "Normal A/C" : "FCRA A/C";

    const isExisting = await organizationModel.findOne({
      accountHolderName,
      _id: { $ne: id },
    });

    if (isExisting) {
      return res.json({ status: 0, message: "Account Already Registered" });
    }


    const newAccount = await organizationModel.findByIdAndUpdate(
      { _id: id },
      {
        accountHolderName,
        accountNumber,
        ifsc,
        bankName,
        address,
        accountType,
        accountTypeLabel,
        formCounter: 4
      },
      { new: true }
    );

    res.status(200).json({
      status: 1,
      message: "Account added successfully",
      data: newAccount,
    });
  } catch (err) {
    console.error("Error in updateRegistration3:", err);
    res.status(500).json({ status: 0, message: "Internal server error" });
  }
};
//For Four Form Contact Details
const updateRegistration4 = async (req, res) => {
  try {
    const {
      id,
      registeredAddress,
      googleLocation,
      phoneNo1,
      phoneNo2,
      emailAddress1,
      emailAddress2,
      websiteURL,
    } = req.body;

    if (!id)
      return res.json({ status: 0, message: "Organization ID is required" });
    if (!registeredAddress?.trim()) {
      return res.json({ status: 0, message: "registeredAddress is required" });
    }

    if (!registeredAddress?.trim()) {
      return res.json({ status: 0, message: "registeredAddress is required" });
    }
    if (!googleLocation?.trim()) {
      return res.json({ status: 0, message: "googleLocation is required" });
    }

    if (!phoneNo1?.trim()) {
      return res.json({ status: 0, message: "phoneNo1 is required" });
    }
    if (!phoneNo2?.trim()) {
      return res.json({ status: 0, message: "phoneNo2 is required" });
    }

    if (!emailAddress1?.trim()) {
      return res.json({ status: 0, message: "emailAddress1 is required" });
    }
    if (!emailAddress2?.trim()) {
      return res.json({ status: 0, message: "emailAddress2 is required" });
    }
    if (!emailAddress1?.trim()) {
      return res.json({ status: 0, message: "emailAddress1 is required" });
    }

    if (!websiteURL?.trim()) {
      return res.json({ status: 0, message: "websiteURL is required" });
    }

    const organization = await organizationModel.findById(id);
    if (!organization)
      return res.json({ status: 0, message: "Organization ID not found" });

    const contact = await organizationModel.findByIdAndUpdate(
      {_id:id},
      {
      registeredAddress,
      googleLocation,
      phoneNo1,
      phoneNo2,
      emailAddress1,
      emailAddress2,
      websiteURL,
      formCounter: 5
    },
    {new:true}
  );

    if (!contact) {
      return res.json({ status: 0, message: "Contact not found" });
    }

    res.status(200).json({
      status: 1,
      message: "Contact Details added successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Error in updateRegistration4:", error);
    res.status(500).json({ status: 0, message: "Internal server error" });
  }
};
//For Five Form About Details
const updateRegistration5 = async (req, res) => {
  try {
    const { id, vision, coreActivities, otherActivities } = req.body;

    if (!id)
      return res.json({ status: 0, message: "Organization ID is required" });

    if (!vision?.trim()) {
      return res.json({ status: 0, message: "vision is required" });
    }
    if (!coreActivities?.trim()) {
      return res.json({ status: 0, message: "coreActivities is required" });
    }

    if (!otherActivities?.trim()) {
      return res.json({ status: 0, message: "otherActivities is required" });
    }

    const organization = await organizationModel.findById(id);
    if (!organization)
      return res.json({ status: 0, message: "Organization ID not found" });

    const about = await organizationModel.findByIdAndUpdate({_id:id},{
      vision,
      coreActivities,
      otherActivities,
    },{new:true});


    res.status(200).json({
      status: 1,
      message: "about Details added successfully",
      data: about,
    });
  } catch (error) {
    console.error("Error in updateRegistration4:", error);
    res.status(500).json({ status: 0, message: "Internal server error" });
  }
};

module.exports = {
  updateRegistration1,
  updateRegistration2,
  updateRegistration3,
  updateRegistration4,
  updateRegistration5,
};
