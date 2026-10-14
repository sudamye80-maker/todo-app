import React, { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import TodoPage from './pages/TodoPage';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <TodoPage 
      todos={todos} 
      addTodo={addTodo} 
      updateTodo={updateTodo} 
      deleteTodo={deleteTodo}
      TodoInput={TodoInput}
      TodoItem={TodoItem}
    />
  );
}

export default App;
