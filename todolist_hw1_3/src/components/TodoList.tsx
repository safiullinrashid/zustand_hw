import React, { useState } from 'react';
import useTodoStore from '../stores/TodoStore.ts';
import deleteIcon from '../assets/Delete.png';
import './TodoList.css';

const TodoList: React.FC = () => {
    const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore();
    const [newTodo, setNewTodo] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(event.target.value);
    };

    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            addTodo(newTodo.trim());
            setNewTodo('');
        }
    };

    const handleToggleTodo = (id: string) => {
        toggleTodo(id);
    };

    const handleDeleteTodo = (id: string) => {
        deleteTodo(id);
    };

    return (
        <div className="todo-list">
            <h1>Todo List</h1>
            <div className="todo-input">
                <input
                    type="text"
                    placeholder="Add a new todo"
                    value={newTodo}
                    onChange={handleInputChange}
                    className="todo-input-field"
                />
                <button onClick={handleAddTodo} className="todo-input-button">
                    Add
                </button>
            </div>
            <ul className="todo-items">
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className={`todo-item ${todo.completed ? 'completed' : ''}`}
                    >
                        <div className="todo-item-content">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggleTodo(todo.id)}
                                className="todo-item-checkbox"
                            />
                            <span className="todo-item-text">{todo.text}</span>
                            <button
                                className="todo-item-delete-button"
                                onClick={() => handleDeleteTodo(todo.id)}
                            >
                                <img src={deleteIcon} alt="Delete" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
