module.exports = (_path) => {
    const multer  = require("multer");
    const path    = require('path');

    const diskStorage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.join(__dirname, "../public/uploads/" + _path));
        },
        // konfigurasi penamaan file yang unik
        filename: function (req, file, cb) {
          cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
          );
        },
    });

    return multer({ storage: diskStorage })
}