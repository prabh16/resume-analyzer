import express from 'express';
import {
  uploadResume,
  getActiveResume,
  deleteResume,
  getResumeHistory,
} from '../controllers/resumeController.js';
import { protect } from '../middleware/auth.js';
import { upload, handleUploadError } from '../middleware/upload.js';

const router = express.Router();

router.use(protect);

router.post('/upload', upload.single('resume'), handleUploadError, uploadResume);
router.get('/active', getActiveResume);
router.delete('/active', deleteResume);
router.get('/history', getResumeHistory);

export default router;
