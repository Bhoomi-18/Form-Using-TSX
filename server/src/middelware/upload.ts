import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary";

export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "user_uploads",
    allowed_formats: ["jpg", "png"],
  }as any,
});

export const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 },
});