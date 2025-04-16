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

const deleteCategoryBySellerId = async (req, res) => {
    try {
        const { sellerId } = req.params;
        const deleted = await categoryModel.deleteMany({ sellerId });

        if (deleted.deletedCount === 0) {
            return res.status(404).json({
                message: "No categories found for this seller"
            });
        }

        res.status(200).json({
            message: "Categories deleted successfully",
            deletedCount: deleted.deletedCount
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Failed to delete categories"
        });
    }
};

const deleteCategoryById = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const deleted = await categoryModel.findByIdAndDelete(categoryId);

        if (!deleted) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({
            message: "Category deleted successfully",
            data: deleted
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Failed to delete category"
        });
    }
};

const updateCategoryById = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            categoryId,
            req.body,
            { new: true } // returns the updated document
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({
            message: "Category updated successfully",
            data: updatedCategory
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Failed to update category"
        });
    }
};



module.exports={
    addCategory,getCategory,deleteCategoryBySellerId,deleteCategoryById,updateCategoryById
}