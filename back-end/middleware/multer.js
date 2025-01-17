import multer from "multer";



// Storage
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

// Upload File
const upload = multer({
  storage: storage,
});

export default upload;