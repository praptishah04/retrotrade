const routes = require("express").Router()
const auctionControllers = require("../controllers/AuctionControllers")

routes.post("/addauction",auctionControllers.addAuction)
routes.get("/getallauctions",auctionControllers.getAllAuctions)


module.exports=routes