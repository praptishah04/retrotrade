const cityModel = require("../models/CityModel")

const addCity = async(req, res)=>{
    try{
        const savedCity = await cityModel.create(req.body)
        res.status(200).json({
            message:"City added succesfully",
            data: savedCity
        })
    }catch(error){
        res.status(500).json({
            message:error
        })
    }
}

const getAllCity = async(req,res)=>{
    try{
        const cities = await cityModel.find().populate("stateId")
        res.status(201).json({
            message:"cities fetched successfully",
            data: cities
        })
    }catch(error){
        res.status(500).json({
            message:error
        })
    }
}
module.exports = {
    addCity,getAllCity
}