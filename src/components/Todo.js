import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

export const Todo = ({task,toggleComplete,deleteTodo,editTodo}) => {
    return (
        <div className='Todo'>
            <p onClick={( ) =>toggleComplete(task.id)} className={`${task.completed ?'completed':""}`}>{task.task}</p>
            <div>
                <FaEdit onClick={() =>editTodo(task.id)}/>&nbsp;&nbsp; <FaTrash  onClick={() =>deleteTodo(task.id)}/> 
                
            </div>
        </div>
    )
}