import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

export const uploadImageToCloudinary = (fileBuffer, folder = 'parapet-blog') => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};
