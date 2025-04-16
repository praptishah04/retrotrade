const productModel = require("../models/ProductModel")
const multer = require("multer")
const path = require("path")
const cloudinaryUtil = require("../utils/CloudinaryUtil")


const storage = multer.diskStorage({
    destination:"./uploads",
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload = multer({
    storage:storage,
}).single("image")




const addproduct = async(req,res)=>{
    try{
        const product = await productModel.create(req.body)
        res.status(200).json({
            message:"Product added successfully",
            data:product
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const getproduct = async(req,res)=>{
    try{
        const addedproduct = await productModel.find().populate("categoryId subcategoryId  sellerId")
        res.status(201).json({
            message:"Product fetched succesfully",
            data:addedproduct
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const deleteproduct = async (req, res) => {
  try {
    const { productId } = req.params;    
    const deletedProduct = await productModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};


const updateProduct = async (req, res) => {
  try {
      const { productId } = req.params;
      const updatedData = req.body;

      const updatedProduct = await productModel.findByIdAndUpdate(
          productId,
          updatedData,
          { new: true } // this ensures the updated document is returned
      ).populate("categoryId subcategoryId sellerId");

      if (!updatedProduct) {
          return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({
          message: "Product updated successfully",
          data: updatedProduct,
      });
  } catch (err) {
      res.status(500).json({
          message: err.message,
      });
  }
};



const getAllProductsByUserId = async (req, res) => {
  
    try {
        const products = await productModel.find({ sellerId: req.params.sellerId })
        .populate("categoryId subcategoryId sellerId");
        console.log("....................",products.length)
      if (products.length === 0) {
        res.status(404).json({ message: "No products found" });
      } else {
        res.status(200).json({
          message: "products found successfully",
          data: products,
        });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};


const addProductWithFile = async(req,res)=>{
    upload(req,res,async(err)=>{
        if(err){
            res.status(500).json({
                message:err.message,
            })
        }else{
            console.log(req.file)
            const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req?.file)
            console.log(cloudinaryResponse)
            console.log(req.body)

            req.body.imageURL = cloudinaryResponse.secure_url
            
            const product= await productModel.create(req.body)

            res.status(200).json({
                message:"product saved successfully",
                data:product
            })
        }
    })
}


module.exports={
    addproduct,getproduct,addProductWithFile,getAllProductsByUserId,deleteproduct,updateProduct
}