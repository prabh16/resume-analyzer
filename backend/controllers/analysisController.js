import { validationResult } from 'express-validator';
import Resume from '../models/Resume.js';
import Analysis from '../models/Analysis.js';
import { analyzeResumeAgainstJob } from '../services/analysisService.js';

export const createAnalysis = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { jobDescription, jobTitle = '', companyName = '' } = req.body;

    const resume = await Resume.findOne({ user: req.user._id, isActive: true });

    if (!resume || !resume.extractedText) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a readable PDF resume before running analysis.',
      });
    }

    const analysisResult = analyzeResumeAgainstJob(resume.extractedText, jobDescription);

    const analysis = await Analysis.create({
      user: req.user._id,
      resume: resume._id,
      jobTitle,
      companyName,
      jobDescription,
      overallScore: analysisResult.overallScore,
      scoreBreakdown: analysisResult.scoreBreakdown,
      keywords: analysisResult.keywords,
      skills: analysisResult.skills,
      sections: analysisResult.sections,
      recommendations: analysisResult.recommendations,
    });

    res.status(201).json({
      success: true,
      message: 'Analysis completed successfully.',
      data: { analysis },
    });
  } catch (error) {
    next(error);
  }
};

export const getAnalyses = async (req, res, next) => {
  try {
    const analyses = await Analysis.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select('jobTitle companyName overallScore createdAt');

    res.status(200).json({ success: true, data: { analyses } });
  } catch (error) {
    next(error);
  }
};

export const getAnalysisById = async (req, res, next) => {
  try {
    const analysis = await Analysis.findOne({ _id: req.params.id, user: req.user._id }).populate(
      'resume',
      'originalFileName createdAt'
    );

    if (!analysis) {
      return res.status(404).json({ success: false, message: 'Analysis not found.' });
    }

    res.status(200).json({ success: true, data: { analysis } });
  } catch (error) {
    next(error);
  }
};

export const deleteAnalysis = async (req, res, next) => {
  try {
    const analysis = await Analysis.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!analysis) {
      return res.status(404).json({ success: false, message: 'Analysis not found.' });
    }

    res.status(200).json({ success: true, message: 'Analysis deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (req, res, next) => {
  try {
    const analyses = await Analysis.find({ user: req.user._id }).sort({ createdAt: -1 });
    const activeResume = await Resume.findOne({ user: req.user._id, isActive: true });

    const latestAnalysis = analyses[0] || null;
    const averageScore =
      analyses.length === 0
        ? 0
        : Math.round(analyses.reduce((sum, item) => sum + item.overallScore, 0) / analyses.length);

    res.status(200).json({
      success: true,
      data: {
        totalAnalyses: analyses.length,
        averageScore,
        latestAnalysis,
        activeResume: activeResume
          ? {
              id: activeResume._id,
              originalFileName: activeResume.originalFileName,
              uploadedAt: activeResume.createdAt,
            }
          : null,
      },
    });
  } catch (error) {
    next(error);
  }
};
