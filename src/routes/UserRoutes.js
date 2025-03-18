const routes = require("express").Router()
const userController = require("../controllers/UserController")
routes.get("/users", userController.getAllUsers)
// routes.get("/users",userController.addUser1)
routes.post("/user",userController.addUser)
// routes.delete("/user/:id",userController.deleteUser)
// routes.get("/user/:id",userController.getUserById)
routes.post("/user/signup",userController.signUp)
routes.post("/user/login",userController.loginUser)
routes.post("/user/buyersignup",userController.buyerSignUp)
routes.post("/user/sellersignup",userController.sellerSignup)
routes.post("/user/adminsignup",userController.adminSignup)



module.exports = routes
