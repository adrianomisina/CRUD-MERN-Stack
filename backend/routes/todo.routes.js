import express from 'express';
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoById, // Descomente se quiser incluir a funcionalidade
} from '../controllers/todo.controller.js';

const router = express.Router();

// Rotas para manipulação de todas as tarefas
router.route('/todos')
  .get(getAllTodos)
  .post(createTodo);

// Rotas para manipulação de uma tarefa específica por ID
router.route('/todos/:id') // Corrigido aqui, adicionando ":" antes de "id"
  .get(getTodoById) // Descomente se quiser incluir a funcionalidade
  .put(updateTodo)
  .delete(deleteTodo);

export default router;
