import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      unique: true, // Adiciona um índice único ao campo 'task'
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
