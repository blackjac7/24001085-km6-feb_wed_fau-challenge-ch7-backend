const cloudinary = require("../config/cloudinary");

exports.uploader = (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            file.tempFilePath,
            { public_id: file.publicId },
            function (error, result) {
                if (error) {
                    reject(error);
                }

                resolve(result);
            }
        );
    });
};
