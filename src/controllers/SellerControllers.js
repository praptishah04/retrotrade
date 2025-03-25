const roleModel = require("../models/RoleModels")
const sellerModel = require("../models/SellerModel")
const bcrypt = require("bcrypt")

const addseller = async (req, res) => {
    try {
        const { firstname, lastname, contactnumber, email, password } = req.body;


        // Check if email already exists
        const existingSeller = await sellerModel.findOne({ email });
        if (existingSeller) {
            return res.status(400).json({ message: "Email already exists." });
        }

        // Fetch the "BUYER" role
        const sellerRole = await roleModel.findOne({ name: "SELLER" });
        console.log("Fetched Seller Role:", sellerRole);
        if (!sellerRole) {
            return res.status(500).json({ message: "SELLER role not found. Please check your roles collection." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create buyer with roleId set to BUYER
        const sellerData = {
            firstname,
            lastname,
            email,
            contactnumber,
            password: hashedPassword,
            roleId: sellerRole._id,
        };

        const seller = await sellerModel.create(sellerData);

        res.status(200).json({
            message: "seller added successfully",
            data: seller,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buyer Login (Verify password)
const loginSeller = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find buyer by email
        const sellers = await sellerModel.findOne({ email }).populate("roleId");
        if (!sellers) {
            return res.status(404).json({ message: "Seller not found." });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, sellers.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        res.status(200).json({
            message: "Logged in successfully",
            data: sellers,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports={
    addseller,loginSeller
}