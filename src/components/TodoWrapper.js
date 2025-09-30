import React, {useState, useEffect} from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4} from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
uuidv4();

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true) // ✅ Add loading state

    // ✅ IMPROVED: Load todos from localStorage
    useEffect(() => {
        console.log('Loading todos from localStorage...');
        try {
            const savedTodos = localStorage.getItem('todos');
            console.log('Raw saved todos:', savedTodos);
            
            if (savedTodos) {
                const parsedTodos = JSON.parse(savedTodos);
                console.log('Parsed todos:', parsedTodos);
                setTodos(parsedTodos);
            } else {
                console.log('No saved todos found');
            }
        } catch (error) {
            console.error('Error loading todos:', error);
            // If data is corrupted, clear it
            localStorage.removeItem('todos');
        } finally {
            setLoading(false); // ✅ Loading complete
        }
    }, [])

    // ✅ Save todos to localStorage
    useEffect(() => {
        if (!loading) { // ✅ Only save after initial load
            console.log('Saving todos to localStorage:', todos);
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }, [todos, loading])

    const addTodo = todo => {
        if (todo.trim() === '') return;
        const newTodos = [...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}]
        setTodos(newTodos)
        console.log('Todo added:', todo);
    }

    const toggleComplete = id => {
        const newTodos = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo)
        setTodos(newTodos)
    }

    const deleteTodo = id => {
        const newTodos = todos.filter(todo => todo.id !== id)
        setTodos(newTodos)
    }

    const editTodo = id => {
        const newTodos = todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo)
        setTodos(newTodos)
    }

    const editTask = (task, id) => {
        if (task.trim() === '') return;
        const newTodos = todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo)
        setTodos(newTodos)
    }

    // ✅ Show loading state
    if (loading) {
        return (
            <div className='TodoWrapper'>
                <h1>Today Task . . . . !</h1>
                <p style={{color: '#fff', textAlign: 'center'}}>Loading your tasks...</p>
            </div>
        )
    }
 
    return (
        <div className='TodoWrapper'>
            <h1>Today Task . . . . !</h1>
            <TodoForm addTodo={addTodo}/>
            {todos.length === 0 ? (
                <p style={{color: '#fff', textAlign: 'center'}}>No tasks yet. Add one above!</p>
            ) : (
                todos.map((todo) => ( 
                    todo.isEditing ? (
                        <EditTodoForm editTodo={editTask} task={todo} key={todo.id}/>
                    ) : (
                        <Todo task={todo} key={todo.id} toggleComplete={toggleComplete} 
                        deleteTodo={deleteTodo} editTodo={editTodo}/>
                    )  
                ))
            )}
        </div>
    )
}