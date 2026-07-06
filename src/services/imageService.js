const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// Upload Image
const uploadImage = (file) => {

    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "ecommerce-products",
            },
            (error, result) => {

                if (error) return reject(error);

                resolve(result);

            }
        );

        streamifier
            .createReadStream(file.buffer)
            .pipe(stream);

    });

};

// Delete Image
const deleteImage = async (publicId) => {

    return await cloudinary.uploader.destroy(publicId);

};

module.exports = {

    uploadImage,
    deleteImage,

};