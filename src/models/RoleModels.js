//database 
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    //fileds /// get
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    }

})

module.exports = mongoose.model("roles",roleSchema)

//roles[roleSchema]
