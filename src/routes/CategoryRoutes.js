const routes = require("express").Router()
const categoryController = require("../controllers/CategoryControllers")

routes.post("/addcategory",categoryController.addCategory)
routes.get("/getcategory",categoryController.getCategory)
routes.delete("/categories/seller/:sellerId", categoryController.deleteCategoryBySellerId);
routes.delete("/deletecategory/:categoryId", categoryController.deleteCategoryById);
routes.put("/updatecategory/:categoryId", categoryController.updateCategoryById);


module.exports= routes