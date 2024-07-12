import React, { useState, useEffect } from 'react';
import './App.css';
import TodoInput from './components/TodoInput';
import Todolist from './components/TodoList';
import NavBar from './components/NavBar';

function App() {
  const [listTodo, setListTodo] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // Possible values: 'all', 'pending', 'completed'

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos && storedTodos.length > 0) {
      setListTodo(storedTodos);
    }
  }, []);

  // Filter todos based on current filter
  useEffect(() => {
    if (filter === 'all') {
      setFilteredTodos(listTodo);
    } else if (filter === 'pending') {
      const pendingTodos = listTodo.filter(todo => !todo.completed);
      setFilteredTodos(pendingTodos);
    } else if (filter === 'completed') {
      const completedTodos = listTodo.filter(todo => todo.completed);
      setFilteredTodos(completedTodos);
    }
  }, [listTodo, filter]);

  // Save todos to localStorage whenever listTodo changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(listTodo));
  }, [listTodo]);

  const addList = (inputText) => {
    if (inputText.trim() !== '') {
      const newTodo = {
        text: inputText.trim(),
        completed: false
      };
      setListTodo([...listTodo, newTodo]);
    }
  };

  const deleteListItem = (index) => {
    let newListTodo = [...listTodo];
    newListTodo.splice(index, 1);
    setListTodo(newListTodo);
  };

  const editListItem = (index, newText) => {
    let newListTodo = [...listTodo];
    newListTodo[index].text = newText.trim();
    setListTodo(newListTodo);
  };

  const toggleComplete = (index) => {
    let newListTodo = [...listTodo];
    newListTodo[index].completed = !newListTodo[index].completed;
    setListTodo(newListTodo);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <>
      <NavBar onFilterChange={handleFilterChange} />
      <div className="main-container">
        <div className="center-container">
          <TodoInput addList={addList} />
          <h1 className="app-heading">TODO</h1>
          <hr />
          <ul className="todo-list">
            {filteredTodos.map((todo, i) => (
              <Todolist
                key={i}
                index={i}
                item={todo.text}
                completed={todo.completed}
                deleteItem={deleteListItem}
                editItem={editListItem}
                toggleComplete={() => toggleComplete(i)}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
