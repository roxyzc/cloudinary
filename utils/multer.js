import multer from "multer";
import path from "path";

// multer config
export default multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) =>{
        let ext = path.extname(file.originalname);
        if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") return cb(new Error("file type is not supported"), false);
        cb(null, true);
    }
});