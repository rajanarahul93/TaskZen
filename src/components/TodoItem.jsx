import React, { useState } from 'react'
import { useTodo } from '../contexts'

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const [todoTitle, setTodoTitle] = useState(todo.title)
  const [todoDescription, setTodoDescription] = useState(todo.description)
  const [subtask, setSubtask] = useState('')

  const { updateTodo, deleteTodo, toggleCompleteTodo } = useTodo()

  const editTodo = () => {
    updateTodo(todo.id, { title: todoTitle, description: todoDescription })
    setIsTodoEditable(false)
  }

  const toggleCompleted = () => {
    toggleCompleteTodo(todo.id)
  }

  const addSubtask = () => {
    // Prevent adding empty subtasks
    if (!subtask.trim()) return;

    const newSubtasks = [...(todo.subtasks || []), { title: subtask, completed: false }]
    updateTodo(todo.id, { ...todo, subtasks: newSubtasks })
    setSubtask('')
  }

  const toggleSubtaskComplete = (index) => {
    const updatedSubtasks = (todo.subtasks || []).map((st, i) => i === index ? { ...st, completed: !st.completed } : st)
    updateTodo(todo.id, { ...todo, subtasks: updatedSubtasks })
  }

  return (
    <div
      className={`flex flex-col border border-black/10 rounded-lg px-3 py-1.5 gap-y-2 shadow-sm shadow-white/50 duration-300 text-black ${todo.completed ? 'bg-[#c6e9a7]' : 'bg-[#ccbed7]'}`}
    >
      <div className="flex items-center gap-x-2">
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={todo.completed}
          onChange={toggleCompleted}
        /><strong>Title:</strong>
        <input
          type="text"
          className={`border outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? 'border-black/10 px-2' : 'border-transparent'} ${todo.completed ? 'line-through' : ''}`}
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          readOnly={!isTodoEditable}
        />
        <button
          className="inline-flex items-center px-2 py-1 bg-blue-600 text-white rounded-md"
          onClick={() => setIsTodoEditable(!isTodoEditable)}
        >
          {isTodoEditable ? 'Save' : 'Edit'}
        </button>
        <button
          className="ml-2 inline-flex items-center px-2 py-1 bg-red-600 text-white rounded-md"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
      </div>
      <strong>Description:</strong>
      <textarea
        className="w-full border border-transparent px-2 rounded-lg bg-transparent"
        value={todoDescription}
        onChange={(e) => setTodoDescription(e.target.value)}
        readOnly={!isTodoEditable}
      />

      {/* Category Display */}
      <div>
        <strong>Category:</strong> {todo.category}
      </div>

      {/* Due Date */}
      <div>
        <strong>Due Date:</strong> {new Date(todo.dueDate).toLocaleDateString()}
      </div>

      {/* Subtasks */}
      <div className="ml-4">
        <strong>Subtasks:</strong>
        <ul className="mt-1">
          {(todo.subtasks || []).map((st, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={st.completed}
                onChange={() => toggleSubtaskComplete(index)}
              />
              <span className={`ml-2 ${st.completed ? 'line-through' : ''}`}>{st.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Subtask */}
      <div className="flex items-center mt-2">
        <input
          type="text"
          placeholder="New Subtask"
          className="w-full border border-black/10 rounded-lg px-3 py-1.5 bg-white/20"
          value={subtask}
          onChange={(e) => setSubtask(e.target.value)}
        />
        <button
          className="ml-2 inline-flex items-center px-2 py-1 bg-green-600 text-white rounded-md"
          onClick={addSubtask}
        >
          Add Subtask
        </button>
      </div>
    </div>
  )
}

export default TodoItem