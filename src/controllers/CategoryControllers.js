const categoryModel = require("../models/CategoryModel")

const addCategory = async(req,res)=>{
    try{
        const categories = await categoryModel.create(req.body)
        res.status(200).json({
            message:"Category added successfully",
            data: categories
        })
    }catch(error){
        res.status(500).json({
            message: error
        })
    }
}

const getCategory = async(req,res)=>{
    try{
        const addedcategory = await categoryModel.find()
        res.status(201).json({
            message:"Categories fetched successfully",
            data:addedcategory
        })
    }catch(error){
        res.status(500).json({
            message:error
        })
    }
}

module.exports={
    addCategory,getCategory
}