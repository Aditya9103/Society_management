import { Router } from 'express';
import { getPosts, getPostBySlug, getAdminPosts, createPost, updatePost, deletePost } from '../controllers/content.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/posts', getPosts);
router.get('/posts/:slug', getPostBySlug);

// Protected Admin routes
router.get('/admin/posts', protect, getAdminPosts);
router.post('/posts', protect, createPost);
router.put('/posts/:id', protect, updatePost);
router.delete('/posts/:id', protect, deletePost);

export default router;
