import { Router } from 'express';
import { createContactMessage, getContactMessages } from '../controllers/contact.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// Public route to submit a contact message
router.post('/', createContactMessage);

// Protected routes
router.get('/', protect, getContactMessages);

export default router;
