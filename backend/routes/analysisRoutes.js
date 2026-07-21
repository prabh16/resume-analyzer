import express from 'express';
import {
  createAnalysis,
  getAnalyses,
  getAnalysisById,
  deleteAnalysis,
  getDashboardStats,
} from '../controllers/analysisController.js';
import { protect } from '../middleware/auth.js';
import { analysisValidation } from '../utils/validators.js';

const router = express.Router();

router.use(protect);

router.get('/dashboard', getDashboardStats);
router.post('/', analysisValidation, createAnalysis);
router.get('/', getAnalyses);
router.get('/:id', getAnalysisById);
router.delete('/:id', deleteAnalysis);

export default router;
