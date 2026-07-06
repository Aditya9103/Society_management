import { Router } from 'express';
import { getPosts, getPostBySlug, createPost } from '../controllers/content.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/posts', getPosts);
router.get('/posts/:slug', getPostBySlug);

// Protected Admin routes
router.post('/posts', protect, createPost);

export default router;
