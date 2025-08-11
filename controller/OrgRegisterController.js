    const registerModel = require("../model/OrgRegisterModel");

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
                licenceApprovalId,
                companyActRegNo,
                panNo,
                licenceName,
            } = req.body;

            console.log(req.body,)



            // Validate required fields
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
            if (!licenceApprovalId) return res.json({ status: 0, message: "Licence approval is required" });
            if (!companyActRegNo?.trim()) return res.json({ status: 0, message: "Company Act Reg No is required" });
            if (!panNo?.trim()) return res.json({ status: 0, message: "PAN number is required" });
            if (!licenceName?.trim()) return res.json({ status: 0, message: "Licence name is required" });

            // Validate pincode and PAN format
            if (!/^\d{6}$/.test(pincode)) {
                return res.json({ status: 0, field: "pincode", message: "Invalid 6-digit pincode" });
            }
            if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(panNo)) {
                return res.json({ status: 0, field: "panNo", message: "Invalid PAN format (e.g., ABCDE1234F)" });
            }

        
            const registerImage = req.files?.registerImage?.[0]?.filename || null;
            const companyActFile = req.files?.companyActFile?.[0]?.filename || null;
            const panFile = req.files?.panFile?.[0]?.filename || null;
            const licenceFile = req.files?.licenceFile?.[0]?.filename || null;

          
            // Validate uploaded files
            if (!registerImage) return res.json({ status: 0, message: "Register image is required" });
            if (!companyActFile) return res.json({ status: 0, message: "Company Act file is required" });
            if (!panFile) return res.json({ status: 0, message: "PAN file is required" });
            if (!licenceFile) return res.json({ status: 0, message: "Licence file is required" });

            // Create new registration
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
                licenceApprovalId,
                companyActRegNo,
                panNo,
                licenceName,
                registerImage,
                companyActFile,
                panFile,
                licenceFile,
                status:1
            });

            console.log(newRegister, "Registration successful");

            return res.status(200).json({ status: 1, message: "Registered successfully", data: newRegister });
        } catch (error) {
            console.error("Error while registering:", error);
            return res.status(500).json({ status: 0, message: "Internal server error" });
        }
    };

    module.exports = { createRegistration };
