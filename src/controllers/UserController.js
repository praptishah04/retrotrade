const  UserModel = require("../models/UserModels")
const bcrypt = require("bcrypt")
const mailUtil = require("../utils/MailUtil")

// const addUser1 = async(req,res)=>{


//         try{
//             const createdUser = await UserModel.create(req.body)
//             res.status(201).json({
//              message:"user created.",
//              data:createdUser
//         })

//         }catch(err){
//             res.status(500).json({
//              message:"error",
//              data:err
//         })
//         }
//     }


const signUp = async(req,res)=>{
    try{
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(req.body.password,salt)
        req.body.password = hashedPassword
        const Createduser = await UserModel.create(req.body)
        await mailUtil.sendingMail(Createduser.email,"welcome to retrotrade ","this is welcome mail")
        res.status(201).json({
            message:"user created successfully",
            data:Createduser
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"error",
            data:err
        })
    }
}

const buyerSignUp = async (req, res) => {
    try {
        // Generate a salt and hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        
        // Replace the plain text password with the hashed password
        req.body.password = hashedPassword;

        // Create a new buyer in the database
        // const createdBuyer = await (await UserModel.create(req.body))
        const CreatedBuyer = await UserModel.create(req.body)
        await mailUtil.sendingMail(CreatedBuyer.email,"welcome to retrotrade ","this is welcome mail")

        // Respond with a success message and the created buyer data
        res.status(201).json({
            message: "Buyer created successfully",
            data: CreatedBuyer
        });
    } catch (err) {
        // Log the error and respond with an error message
        console.log(err);
        res.status(500).json({
            message: "Error creating buyer",
            data: err
        });
    }
};


const sellerSignup = async (req, res) => {
    try {
        // Generate a salt and hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        
        // Replace the plain text password with the hashed password
        req.body.password = hashedPassword;

        // Create a new buyer in the database
        const createdBuyer = await UserModel.create(req.body);

        // Respond with a success message and the created buyer data
        res.status(201).json({
            message: "Seller created successfully",
            data: createdBuyer
        });
    } catch (err) {
        // Log the error and respond with an error message
        console.log(err);
        res.status(500).json({
            message: "Error creating buyer",
            data: err
        });
    }
};

const adminSignup = async (req, res) => {
    try {
        // Generate a salt and hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        
        // Replace the plain text password with the hashed password
        req.body.password = hashedPassword;

        // Create a new buyer in the database
        const createdBuyer = await UserModel.create(req.body);

        // Respond with a success message and the created buyer data
        res.status(201).json({
            message: "Admin created successfully",
            data: createdBuyer
        });
    } catch (err) {
        // Log the error and respond with an error message
        console.log(err);
        res.status(500).json({
            message: "Error creating buyer",
            data: err
        });
    }
};

const loginUser = async(req,res)=>{
    
        const email = req.body.email
        const password = req.body.password

        const foundUserFromEmail = await UserModel.findOne({email :  email}).populate("roleId")
        console.log(foundUserFromEmail)
        if(foundUserFromEmail != null){
            const isMatch = await bcrypt.compare(password, foundUserFromEmail.password)
            if(isMatch == true ){
                res.status(200).json({
                    message:"login success",
                    data:foundUserFromEmail
                })
            }else{
                res.status(404).json({
                    message:"invalid credentials",
                })
        }
        }else{
            res.status(404).json({
                message:"email not found..",
            })
        }
    }


// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // ✅ Ensure `roleId` is populated
//         const foundUser = await UserModel.findOne({ email }).populate("roleId");

//         if (!foundUser) {
//             return res.status(404).json({ message: "Email not found." });
//         }

//         console.log("Found User:", foundUser); // Debugging log

//         const isMatch = await bcrypt.compare(password, foundUser.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: "Invalid credentials." });
//         }

//         res.status(200).json({
//             message: "Login successful",
//             data: {
//                 _id: foundUser._id,
//                 email: foundUser.email,
//                 roleId: foundUser.roleId._id,  // ✅ Send role ID
//                 roleName: foundUser.roleId.name,  // ✅ Send role name for frontend redirection
//             }
//         });

//     } catch (error) {
//         console.error("Login Error:", error);
//         res.status(500).json({ message: "Server error", error });
//     }
// };



const addUser = async(req,res)=>{
    const savedUser = await UserModel.create(req.body)

    res.json({
        message:"data addded",
        data:savedUser
    })
}


const getAllUsers = async (req,res)=>{
    const users = await UserModel.find().populate("roleId")

    res.json({
        message:"User fetched succesfully...",
        data:users
    })
}


// const deleteUser = async(req,res)=>{
//     const deletedUser = await UserModel.findByIdAndDelete(req.params.id)

//     res.json({
//         message:"deleted successfully...",
//         data:deletedUser
//     })
// }


// const getUserById = async(req,res)=>{
//     const foundUser = await UserModel.findById(req.params.id)

//     res.json({
//         message:"user found",
//         data:foundUser
//     })
// }




module.exports = {
    signUp,loginUser,addUser,getAllUsers,buyerSignUp,sellerSignup,adminSignup
}