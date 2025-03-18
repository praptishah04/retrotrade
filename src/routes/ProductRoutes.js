const routes = require("express").Router()
const productControllers = require("../controllers/ProductContollers")

routes.post("/addproduct",productControllers.addproduct)
routes.get("/getproduct",productControllers.getproduct)
routes.post("/addwithfile",productControllers.addProductWithFile)
routes.get('/getProductsbyuserid/:userId', productControllers.getAllProductsByUserId);

module.exports=routes