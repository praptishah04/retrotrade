const areaModel = require("../models/AreaModel")

const addarea = async(req,res)=>{
    try{
        const areas = await areaModel.create(req.body)
        res.status(200).json({
            message:"Area added successfully",
            data:areas
        })
    }catch(error){
        res.status(500).json({
            message:error
        })
    }
}

module.exports={
    addarea
}