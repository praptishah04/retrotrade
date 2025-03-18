const express= require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const roleRoutes = require("./src/routes/RoleRoutes")
app.use(roleRoutes)


const userRoutes = require("./src/routes/UserRoutes")
app.use(userRoutes)

const stateRoutes = require("./src/routes/StateRoutes")
app.use("/state",stateRoutes)

const cityRoutes = require("./src/routes/CityRoutes")
app.use("/city",cityRoutes)

const categoryRoutes = require("./src/routes/CategoryRoutes")
app.use("/category",categoryRoutes)

const subcategoryRoutes = require("./src/routes/SubcategoryRoutes")
app.use("/subcategory",subcategoryRoutes)

const productRoutes = require("./src/routes/ProductRoutes")
app.use("/product",productRoutes)

const areaRoutes = require("./src/routes/AreaRoutes")
app.use("/area",areaRoutes)

const sellerRoutes = require("./src/routes/SellerRoutes")
app.use("/seller",sellerRoutes)

const buyerRoutes = require("./src/routes/BuyerRoutes")
app.use("/buyer",buyerRoutes)

const cartRoutes = require("./src/routes/CartRoutes")
app.use("/cart",cartRoutes)

const orderRoutes = require("./src/routes/OrderRoutes")
app.use("/order",orderRoutes)


mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(()=>{
    console.log("database connected....")
})

const PORT = 4000
app.listen(PORT,()=>{
    console.log("server started on port number ",PORT)
})