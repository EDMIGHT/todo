import { check } from 'express-validator';

export const createTodoValidation = [
  check('title')
    .isString()
    .withMessage('title must be a string')
    .isLength({ min: 2 })
    .withMessage('the minimum title length is 2 characters')
    .isLength({ max: 190 })
    .withMessage('the minimum title length is 190 characters'),
  check('status').isBoolean().withMessage('status must be boolean').optional(),
];
