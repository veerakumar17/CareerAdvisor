import express from 'express';
import { getCareers, getCareerById, createCareer, matchCareers } from '../controllers/careerController.js';

const router = express.Router();

router.get('/', getCareers);
router.post('/match', matchCareers);
router.get('/:id', getCareerById);
router.post('/', createCareer);

export default router;
