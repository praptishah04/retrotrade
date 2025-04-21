const buyerModel = require("../models/BuyerModel");
const roleModel = require("../models/RoleModels");
const bcrypt = require("bcrypt")
const mailUtil = require("../utils/MailUtil")

// Add a new buyer (Force roleId to "BUYER" & hash password)
const addbuyer = async (req, res) => {
    try {
        const { firstname, lastname, contactnumber, email, password } = req.body;


        // Check if email already exists
        const existingBuyer = await buyerModel.findOne({ email });
        if (existingBuyer) {
            return res.status(400).json({ message: "Email already exists." });
        }

        // Fetch the "BUYER" role
        const buyerRole = await roleModel.findOne({ name: "BUYER" });
        if (!buyerRole) {
            return res.status(500).json({ message: "BUYER role not found. Please check your roles collection." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create buyer with roleId set to BUYER
        const buyerData = {
            firstname,
            lastname,
            email,
            contactnumber,
            password: hashedPassword,
            roleId: buyerRole._id,
        };

        const buyer = await buyerModel.create(buyerData);
        await mailUtil.sendingMail(buyer.email,"welcome to retrotrade ","this is welcome mail")
        res.status(200).json({
            message: "Buyer added successfully",
            data: buyer,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buyer Login (Verify password)
const loginBuyer = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find buyer by email
        const buyers = await buyerModel.findOne({ email }).populate("roleId");
        if (!buyers) {
            return res.status(404).json({ message: "Buyer not found." });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, buyers.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        res.status(200).json({
            message: "Logged in successfully",
            data: buyers,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addbuyer,
    loginBuyer,
};
