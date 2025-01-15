import multer from "multer";
import path from "path";
const __dirname = path.resolve();


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