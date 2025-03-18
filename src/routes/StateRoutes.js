const routes = require("express").Router()
const stateController = require("../controllers/StateControllers")

routes.post("/addstate",stateController.addState)
routes.get("/getstate",stateController.getState)

module.exports = routes