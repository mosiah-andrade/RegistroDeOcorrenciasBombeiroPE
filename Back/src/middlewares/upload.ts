import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, "uploads/midias/");
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const uniqueName = Date.now() + "-" + crypto.randomUUID();
    const ext = path.extname(file.originalname);
    cb(null, uniqueName + ext);
  }
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 40 * 1024 * 1024
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowed = ["image/png", "image/jpeg", "image/jpg", "video/mp4"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Tipo de arquivo não permitido!"));
    }
    cb(null, true);
  }
});