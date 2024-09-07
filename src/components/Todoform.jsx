import React, { useState } from 'react';
import { useTodo } from '../contexts';

function TodoForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Work');
  const [dueDate, setDueDate] = useState('');

  const { addTodo } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !dueDate) return;
    addTodo({
      title,
      description,
      category,
      dueDate,
      completed: false,
      subtasks: [],
    });
    setTitle('');
    setDescription('');
    setCategory('Work');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Title"
        className="w-full border border-gray-600 rounded-lg px-4 py-2 bg-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="w-full border border-gray-600 rounded-lg px-4 py-2 bg-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="4"
      />
      <select
        className="w-full border border-gray-600 rounded-lg px-4 py-2 bg-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Shopping">Shopping</option>
      </select>
      <input
        type="date"
        className="w-full border border-gray-600 rounded-lg px-4 py-2 bg-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg py-2 hover:from-green-600 hover:to-green-700 shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
