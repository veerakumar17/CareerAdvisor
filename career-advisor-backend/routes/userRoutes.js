import express from 'express';
import { saveCareer, unsaveCareer, getSavedCareers } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/save-career/:careerId', protect, saveCareer);
router.delete('/save-career/:careerId', protect, unsaveCareer);
router.get('/saved-careers', protect, getSavedCareers);

export default router;
