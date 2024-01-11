import { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import TodoForm from './components/TodoForm';
import api from './services/api';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await api.get('/todos');
        setTodos(response.data.todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
        setError('Failed to fetch todos');
      }
    };

    fetchTodos();
  }, []);

  const handleTodoSubmit = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleTodoUpdate = (id, updatedTodo) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo._id === id ? updatedTodo : todo)));
  };

  const handleTodoDelete = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-800 mt-10 border border-white rounded-md">
      <h1 className="text-4xl font-bold mb-4 text-white text-center">Todo List CRUD MERN Stacks</h1>
      {error && <p className="text-red-500 p-3">{error}</p>}
      <TodoForm onSubmit={handleTodoSubmit} />
      <ul className="mt-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onUpdate={handleTodoUpdate}
            onDelete={handleTodoDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
