import React, { useState } from 'react';
import './App.css';

const TodoItem = ({ todo, onDelete, onToggle }) => {
    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span onClick={() => onToggle(todo.id)}>{todo.text}</span>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
    );
};


const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const addTodo = () => {
        if (inputValue.trim() !== '') {
            setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
            setInputValue('');
        }
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        }));
    };

    return (
        <div className="todo-list">
            <h1>Todo List</h1>
            <input
                type="text"
                placeholder="Add a new todo"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={addTodo}>Add Todo</button>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={deleteTodo}
                    onToggle={toggleTodo}
                />
            ))}
        </div>
    );
};


function App() {
    return (
        <div className="App">
            <TodoList />
        </div>
    );
}

export default App;