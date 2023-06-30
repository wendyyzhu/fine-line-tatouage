const multer = require("multer")
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")


cloudinary.config({ 
    cloud_name: 'dtekuqa73', 
    api_key: '937519959935867', 
    api_secret: 'IJ1uxCl1rmQtxVV8NJdBVfpkAmg' 
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