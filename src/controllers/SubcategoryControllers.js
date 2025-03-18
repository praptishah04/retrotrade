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
        const categories = await subcategoryModel.find({categoryId:req.params.categoryId})
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

module.exports={
    addsubCategory,getsubCategory,getsubCategoryByCategoryId
}