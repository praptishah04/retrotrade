const routes = require("express").Router()
const subcategoryController = require("../controllers/SubcategoryControllers")

routes.post("/addsubcategory",subcategoryController.addsubCategory)
routes.get("/getsubcategory",subcategoryController.getsubCategory)
routes.get("/getsubcategorybycategory/:categoryId",subcategoryController.getsubCategoryByCategoryId)

module.exports= routes