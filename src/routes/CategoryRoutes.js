const routes = require("express").Router()
const categoryController = require("../controllers/CategoryControllers")

routes.post("/addcategory",categoryController.addCategory)
routes.get("/getcategory",categoryController.getCategory)

module.exports= routes