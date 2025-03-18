const cloudinary = require("cloudinary").v2;


const uploadFileToCloudinary = async (file) => {

    //conif
        cloudinary.config({
        cloud_name:"djmn7kt1y",
        api_key:"322517511319574",
        api_secret:"Z30SFUDxVqbpmpu3rlGZET9Pl3U"
    })

    const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
    return cloudinaryResponse;



};
module.exports = {
    uploadFileToCloudinary
}