import { Router } from 'express';
import { loginAdmin, registerAdmin, getMe, logoutAdmin } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/login', loginAdmin);
router.post('/register', registerAdmin);
router.post('/logout', logoutAdmin);
router.get('/me', protect, getMe);

export default router;
