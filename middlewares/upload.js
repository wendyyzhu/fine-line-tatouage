require("dotenv").config()
const multer = require("multer")
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET 
});

const upload = multer({
    storage: new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: "file-upload-demo"
        }
    })
})


module.exports = upload