import cloudinary from "./cloudinary";

export const uploadToCloudinary = async (buffer: Buffer, folder: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url);
      })
      .end(buffer);
  });
};