import { body, query } from 'express-validator';

export const getAllToDosValidation = [
  query('title')
    .isString()
    .withMessage('title must be a string')
    .trim()
    .isLength({ max: 190 })
    .withMessage('the maximum title length is 190 characters'),
];

export const createTodoValidation = [
  body('title')
    .isString()
    .withMessage('title must be a string')
    .trim()
    .isLength({ min: 2 })
    .withMessage('the minimum title length is 2 characters')
    .isLength({ max: 190 })
    .withMessage('the maximum title length is 190 characters'),
  body('status').isBoolean().withMessage('status must be boolean').optional(),
];

export const updateTodoValidation = [
  body('title')
    .if(body('title').exists())
    .isString()
    .trim()
    .withMessage('title must be a string')
    .isLength({ min: 2 })
    .withMessage('the minimum title length is 2 characters')
    .isLength({ max: 190 })
    .withMessage('the maximum title length is 190 characters'),
  body('status').if(body('status').exists()).isBoolean().withMessage('status must be boolean'),
  body().custom((body) => {
    const keys = Object.keys(body);
    if (!keys.includes('title') && !keys.includes('status')) {
      throw new Error('at least one of title or status must be provided');
    }
    return true;
  }),
];
