const subcategoryModel = require("../models/SubcategoryModel")

const addsubCategory = async(req,res)=>{
    try{
        const subcategory = await subcategoryModel.create(req.body)
        res.status(200).json({
            message:"SubCategory added successfully",
            data:subcategory
        })
    }catch(error){
        res.status(500).json({
            message:error
        })
    }
}

const getsubCategory = async(req,res)=>{
    try{
        const addedsubcategories = await subcategoryModel.find().populate("categoryId")
        res.status(201).json({
            message:"Subcategory fetched successfully",
            data:addedsubcategories
        })
    }catch(error){
        res.status(500).json({
            message:error
        })
    }
}

const getsubCategoryByCategoryId = async(req,res)=>{
    try{
        const categories = await subcategoryModel.find({categoryId:req.params.categoryId}).populate("categoryId")
        res.status(201).json({
            message:"category found",
            data:categories
        })
    }catch(error){
        res.status(500).json({
            message:error
        })
    }
}

const getSubcategoryBySellerId = async (req, res) => {
  try {
    const foundSubcategory = await subcategoryModel
      .find({ sellerId: req.params.buyerId })
      .populate("sellerId")

    if (!foundSubcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.json({
      message: "Cart Fetched",
      data: foundSubcategory,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message, // Use err.message for better error details
    });
  }
};

module.exports={
    addsubCategory,getsubCategory,getsubCategoryByCategoryId,getSubcategoryBySellerId
}