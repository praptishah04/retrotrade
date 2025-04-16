const routes = require("express").Router()
const productControllers = require("../controllers/ProductContollers")

routes.post("/addproduct",productControllers.addproduct)
routes.get("/getproduct",productControllers.getproduct)
routes.post("/addwithfile",productControllers.addProductWithFile)
routes.get('/getProductsbyuserid/:sellerId', productControllers.getAllProductsByUserId);
routes.delete("/deleteproduct/:productId", productControllers.deleteproduct);  // Add :id parameter
routes.put("/updateproduct/:productId", productControllers.updateProduct);


module.exports=routes