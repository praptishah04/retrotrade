const routes = require("express").Router()
const cityController = require("../controllers/CityControllers")

routes.post("/addcity",cityController.addCity)
routes.get("/getcity",cityController.getAllCity)

module.exports = routes