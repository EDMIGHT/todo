import express from 'express';

import { TodoController } from '@/controllers/todo.controller';

const router = express.Router({ mergeParams: true });

router.get('/', TodoController.getAllTodo);

export default router;
