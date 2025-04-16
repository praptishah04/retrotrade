const routes = require("express").Router()
const subcategoryController = require("../controllers/SubcategoryControllers")

routes.post("/addsubcategory",subcategoryController.addsubCategory)
routes.get("/getsubcategory",subcategoryController.getsubCategory)
routes.get("/getsubcategorybycategory/:categoryId",subcategoryController.getsubCategoryByCategoryId)
routes.get("/getsubcategorybysellerid/:sellerId",subcategoryController.getSubcategoryBySellerId)
routes.delete("/deletesubcategory/:subcategoryId", subcategoryController.deleteSubcategoryById);
routes.put("/updatesubcategory/:subcategoryId", subcategoryController.updateSubcategoryById);
module.exports= routes