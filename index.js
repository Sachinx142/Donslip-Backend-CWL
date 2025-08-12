const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const categoryRoutes = require("./routes/categoryRoutes");
const subCategoryRoutes = require("./routes/subCategoryRoutes");
const religionSubCategoryRoutes = require("./routes/religionSubCategoryRoutes");
const registerUnderRoutes = require("./routes/registerUnderRoutes");
const licenceApprovalsRoutes = require("./routes/licenceApprovalsRoutes");
const orgRegisterRoutes = require("./routes/orgRegisterRoutes");
const orgAuthRoutes = require("./routes/orgAuthRoutes");

dotenv.config();

const PORT = process.env.PORT || 8000;
require("./config/connect");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World :)");
});

app.use("/api/category", categoryRoutes);
app.use("/api/subCategory", subCategoryRoutes);
app.use("/api/religionSubCategory", religionSubCategoryRoutes);
app.use("/api/underRegister", registerUnderRoutes);
app.use("/api/licenceApprovals", licenceApprovalsRoutes);
app.use("/api/orgRegisteration", orgRegisterRoutes);
app.use("/api/organizationAuth", orgAuthRoutes);

app.listen(PORT, () => {
  console.log(`Server is Running at ${PORT}`);
});
