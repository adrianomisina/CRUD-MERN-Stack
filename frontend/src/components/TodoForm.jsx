/* eslint-disable react/prop-types */
import { useState } from 'react';
import api from '../services/api';

const TodoForm = ({ onSubmit }) => {
  const [task, setTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/todos', { task });
      onSubmit(response.data);
      setTask('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4 p-6 bg-slate-600 border-2 border-sky-700 rounded-md">
      <input
        type="text"
        className="border p-1 mr-2 flex-grow"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Add
      </button>

    </form>
  );
};

export default TodoForm;
