const cloudinary = require("../utils/cloudinary");

const UploadImage = (req, res) => {
  cloudinary.uploader.upload(req.file.path, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "error",
      });
    }

    res.status(200).json({
      success: true,
      message: "Uploaded!",
      url: result,
      // data.secure_url
    });
  });
};

module.exports = UploadImage;
