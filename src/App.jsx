import React, { useState, useEffect } from 'react';
import { TodoProvider } from './contexts';
import TodoForm from './components/Todoform'; // Ensure 'f' matches the file name
import TodoItem from './components/TodoItem';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? { ...prevTodo, ...todo } : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  const toggleCompleteTodo = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos
    .filter((todo) => filterCategory === 'All' || todo.category === filterCategory)
    .sort((a, b) => (sortOrder === 'asc' ? new Date(a.dueDate) - new Date(b.dueDate) : new Date(b.dueDate) - new Date(a.dueDate)));

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleCompleteTodo }}>
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen py-10 flex items-center justify-center">
        <div className="w-full max-w-3xl mx-auto bg-gray-800 text-white rounded-lg shadow-2xl px-8 py-10">
          <h1 className="text-4xl font-extrabold text-center mb-10 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">Manage Your Todos</h1>

          {/* Category Filter */}
          <div className="mb-6 flex items-center justify-between">
            <label className="text-lg font-semibold">Filter by Category:</label>
            <select
              className="border rounded-lg px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Shopping">Shopping</option>
            </select>
          </div>

          {/* Sort by Due Date */}
          <div className="mb-6 flex items-center justify-between">
            <label className="text-lg font-semibold">Sort by Due Date:</label>
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
            </button>
          </div>

          {/* Todo Form */}
          <div className="mb-8">
            <TodoForm />
          </div>

          {/* Todo List */}
          <div className="space-y-6">
            {filteredTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;
