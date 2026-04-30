import express from 'express';
import { symptomChecker, analyzeMedicine, mentalHealthBot } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/symptoms', protect, symptomChecker);
router.post('/medicine', protect, analyzeMedicine);
router.post('/mental-health', protect, mentalHealthBot);

export default router;
