import { Router } from 'express';
import multer from 'multer';
import { protect } from '../middleware/auth.js';
import { uploadImage } from '../controllers/upload.controller.js';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Protected Admin route
router.post('/', protect, upload.single('image'), uploadImage);

export default router;
