import express from 'express';

import { TodoController } from '@/controllers/todo.controller';
import { createTodoValidation } from '@/lib/validations/todo.validations';
import { validation } from '@/middlewares/validation.middleware';

const router = express.Router({ mergeParams: true });

router.get('/', TodoController.getToDos);

router.post('/', createTodoValidation, validation, TodoController.createTodo);

export default router;
