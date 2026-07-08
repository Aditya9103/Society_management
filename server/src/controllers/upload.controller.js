import { uploadImageToCloudinary } from '../services/upload.service.js';

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image file provided' });
    }

    const result = await uploadImageToCloudinary(req.file.buffer);

    res.status(200).json({
      success: true,
      url: result.secure_url,
    });
  } catch (error) {
    next(error);
  }
};
