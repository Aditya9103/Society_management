import { Router } from 'express';
import { createLead, getLeads, updateLeadStatus } from '../controllers/leads.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// Public route to submit a lead
router.post('/', createLead);

// Protected routes
router.get('/', protect, getLeads);
router.patch('/:id', protect, updateLeadStatus);

export default router;
