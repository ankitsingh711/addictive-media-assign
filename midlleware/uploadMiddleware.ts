import multer from "multer";
import path from "path";
import { Request } from "express";

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== ".mp4") {
    return cb(new Error("Only MP4 files are allowed") as any, false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 6 * 1024 * 1024 }, // 6MB
  fileFilter: fileFilter,
});

export default upload;
