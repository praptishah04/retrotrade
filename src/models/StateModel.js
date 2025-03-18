const mongoose =  require("mongoose")
const Schema =  mongoose.Schema

const stateSchema = new Schema({
    name:{
        type:String,
        required:true,
        default:true
    },
    // stateId:{
    //     type:String,
    // }
})

module.exports = mongoose.model("State",stateSchema)