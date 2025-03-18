const routes = require("express").Router()
const areaController = require("../controllers/AreaControllers")

routes.post("/addarea",areaController.addarea)

module.exports = routes