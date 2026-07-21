import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true,
    },
    jobTitle: {
      type: String,
      trim: true,
      default: '',
    },
    companyName: {
      type: String,
      trim: true,
      default: '',
    },
    jobDescription: {
      type: String,
      required: true,
    },
    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    scoreBreakdown: {
      keywordMatch: { type: Number, default: 0 },
      technicalSkills: { type: Number, default: 0 },
      resumeSections: { type: Number, default: 0 },
      contactInfo: { type: Number, default: 0 },
      actionVerbs: { type: Number, default: 0 },
      measurableAchievements: { type: Number, default: 0 },
      lengthReadability: { type: Number, default: 0 },
    },
    keywords: {
      matched: [{ type: String }],
      missing: [{ type: String }],
      matchPercentage: { type: Number, default: 0 },
      frequency: {
        type: Object,
        default: {},
      },
    },
    skills: {
      resumeSkills: {
        programmingLanguages: [{ type: String }],
        frameworks: [{ type: String }],
        databases: [{ type: String }],
        developerTools: [{ type: String }],
        other: [{ type: String }],
      },
      jobSkills: {
        programmingLanguages: [{ type: String }],
        frameworks: [{ type: String }],
        databases: [{ type: String }],
        developerTools: [{ type: String }],
        other: [{ type: String }],
      },
      matched: [{ type: String }],
      missing: [{ type: String }],
      additional: [{ type: String }],
    },
    sections: {
      contactInfo: { type: String, enum: ['found', 'missing', 'needs_improvement'], default: 'missing' },
      summary: { type: String, enum: ['found', 'missing', 'needs_improvement'], default: 'missing' },
      technicalSkills: { type: String, enum: ['found', 'missing', 'needs_improvement'], default: 'missing' },
      projects: { type: String, enum: ['found', 'missing', 'needs_improvement'], default: 'missing' },
      experience: { type: String, enum: ['found', 'missing', 'needs_improvement'], default: 'missing' },
      education: { type: String, enum: ['found', 'missing', 'needs_improvement'], default: 'missing' },
      certifications: { type: String, enum: ['found', 'missing', 'needs_improvement'], default: 'missing' },
    },
    recommendations: [{ type: String }],
  },
  { timestamps: true }
);

const Analysis = mongoose.model('Analysis', analysisSchema);

export default Analysis;
