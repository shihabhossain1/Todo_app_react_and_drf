import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('today');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { text: input, status: 'pending' }]);
    setInput('');
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editTodo = (index) => {
    const newText = prompt('Edit todo:', todos[index].text);
    if (newText !== null) {
      const newTodos = [...todos];
      newTodos[index].text = newText;
      setTodos(newTodos);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'today') return true;
    return todo.status === filter;
  });

  return (
    <div className="todo-container">
    <h2>To-Do List</h2>

    <div className="todo-tabs">
        <button className={filter === 'today' ? 'active' : ''} onClick={() => setFilter('today')}>Today</button>
        <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>Pending</button>
        <button className={filter === 'finished' ? 'active' : ''} onClick={() => setFilter('finished')}>Finished</button>
    </div>

    <div className="todo-input-section">
        <input
        type="text"
        className="todo-input"
        placeholder="Add a task..."
        value={input}
        onChange={e => setInput(e.target.value)}
        />
        <button onClick={addTodo} className="todo-add-button">Add</button>
    </div>

    <table className="todo-table">
        <thead>
        <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {filteredTodos.map((todo, index) => (
            <tr key={index}>
            <td>{todo.text}</td>
            <td>{todo.status}</td>
            <td className="action-icons">
                <FaEdit onClick={() => editTodo(index)} />
                <FaTrash onClick={() => deleteTodo(index)} />
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>

  );
};

export default TodoList;
