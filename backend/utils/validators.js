import { body } from 'express-validator';

export const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('email').isEmail().withMessage('Please provide a valid email.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
];

export const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email.'),
  body('password').notEmpty().withMessage('Password is required.'),
];

export const analysisValidation = [
  body('jobDescription')
    .trim()
    .isLength({ min: 50 })
    .withMessage('Job description must be at least 50 characters.'),
  body('jobTitle').optional().trim().isLength({ max: 120 }),
  body('companyName').optional().trim().isLength({ max: 120 }),
];
