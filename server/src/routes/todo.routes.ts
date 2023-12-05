import express from 'express';

import { TodoController } from '@/controllers/todo.controller';
import {
  createTodoValidation,
  getAllToDosValidation,
  updateTodoValidation,
} from '@/lib/validations/todo.validations';
import { validation } from '@/middlewares/validation.middleware';

const router = express.Router({ mergeParams: true });

router.get('/', getAllToDosValidation, validation, TodoController.getAll);

router.post('/', createTodoValidation, validation, TodoController.create);

router.patch('/:id', updateTodoValidation, validation, TodoController.update);

router.delete('/:id', TodoController.delete);

export default router;
