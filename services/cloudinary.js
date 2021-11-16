const cloudinary=require("cloudinary");
const configCloudinary=require("../config/configCloudinary");

cloudinary.config({
    cloud_name:configCloudinary.CLOUD_NAME,
    api_key:configCloudinary.CLOUDINARY_API_KEY,
    api_secret:configCloudinary.CLOUDINARY_API_SERCET
});


module.exports.uploads=(file,folder)=>{
    return new Promise(resolve =>{
        cloudinary.uploader.upload(file,(result)=>{
            resolve({
                url:result.url,
                id:result.public_id
            })
        },{
            resource_type:"auto",
            folder:folder
        })
    })
}
