/* eslint-disable react/prop-types */
import { useState } from 'react';
import api from '../services/api';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [editedTask, setEditedTask] = useState(todo.task);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async () => {
    try {
      const response = await api.put(`/todos/${todo._id}`, { task: editedTask });
      onUpdate(todo._id, response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/todos/${todo._id}`);
      onDelete(todo._id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <li className="mb-2">
      {isEditing ? (
        <div className="flex items-center p-3">
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            className="border p-2 mr-2 flex-grow"
          />
          <button className="bg-green-500 text-white p-2" onClick={handleUpdate}>
            Save
          </button>
        </div>
      ) : (
        <div className="flex items-center p-3">
          <span className="border p-2 mr-2 flex-grow text-white bg-slate-700 rounded-md">{todo.task}</span>
          <button className="bg-yellow-500 text-white p-2" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className="bg-red-500 text-white p-2 ml-2" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
