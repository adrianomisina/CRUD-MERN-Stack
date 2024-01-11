import Todo from '../models/todo.model.js';

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({
      todos,
      message: 'Get all tasks successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Get all tasks failed',
    });
  }
};

// CREATE TODO - POST
export const createTodo = async (req, res) => {
  try {
    const { task } = req.body;

    // Verifica se a tarefa já existe
    const existingTodo = await Todo.findOne({ task });

    if (existingTodo) {
      return res.status(400).json({
        message: 'Task already exists',
      });
    }

    // Se não existir, cria a nova tarefa
    const newTodo = await Todo.create({ task });
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({
      message: 'Create task failed',
    });
  }
};



export const updateTodo = async (req, res) => {
  try {
    const { task } = req.body;
    const todo = await Todo.findByIdAndUpdate(req.params.id, { task }, { new: true });
    res.json(todo);
  } catch (error) {
    res.status(500).json({
      message: 'Update task failed',
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
