import Resume from '../models/Resume.js';
import { extractTextFromPdf, deleteFileIfExists } from '../services/pdfService.js';

export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a PDF resume.' });
    }

    let extractedText = '';

    try {
      extractedText = await extractTextFromPdf(req.file.path);
    } catch (error) {
      deleteFileIfExists(req.file.path);
      return res.status(400).json({ success: false, message: error.message });
    }

    const existingResumes = await Resume.find({ user: req.user._id, isActive: true });

    await Promise.all(
      existingResumes.map(async (resume) => {
        resume.isActive = false;
        await resume.save();
      })
    );

    const resume = await Resume.create({
      user: req.user._id,
      originalFileName: req.file.originalname,
      storedFileName: req.file.filename,
      filePath: req.file.path,
      fileSize: req.file.size,
      extractedText,
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: 'Resume uploaded successfully.',
      data: {
        resume: {
          id: resume._id,
          originalFileName: resume.originalFileName,
          fileSize: resume.fileSize,
          uploadedAt: resume.createdAt,
        },
      },
    });
  } catch (error) {
    if (req.file?.path) {
      deleteFileIfExists(req.file.path);
    }
    next(error);
  }
};

export const getActiveResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id, isActive: true });

    if (!resume) {
      return res.status(200).json({ success: true, data: { resume: null } });
    }

    res.status(200).json({
      success: true,
      data: {
        resume: {
          id: resume._id,
          originalFileName: resume.originalFileName,
          fileSize: resume.fileSize,
          uploadedAt: resume.createdAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id, isActive: true });

    if (!resume) {
      return res.status(404).json({ success: false, message: 'No active resume found.' });
    }

    deleteFileIfExists(resume.filePath);
    resume.isActive = false;
    await resume.save();

    res.status(200).json({ success: true, message: 'Resume deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

export const getResumeHistory = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select('originalFileName fileSize isActive createdAt');

    res.status(200).json({ success: true, data: { resumes } });
  } catch (error) {
    next(error);
  }
};
