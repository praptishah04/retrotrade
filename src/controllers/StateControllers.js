const stateModel = require("../models/StateModel")


const addState = async(req,res)=>{
    try{
        const savedState = await stateModel.create(req.body)
        res.status(201).json({
            message:"State added Successfully",
            data:savedState
        })
    }catch(error){
        res.status(500).json({
            message: error
        })
    }
}

const getState = async(req,res)=>{
    try{
        const states = await stateModel.find()
        res.status(200).json({
            message:"All States fetched successfully"
        })
    }catch(error){
        res.status(500).json({
            message: error
        })
    }
}

module.exports = {
    addState,getState
}