"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TaskList({ onEdit, onDelete, onToggleCompleted }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        axios.get('http://localhost:8080/tasks')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => console.error('Error fetching tasks:', error));
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/tasks/${id}`);
            fetchTasks();  // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleToggleCompleted = async (task) => {
        try {
            const updatedTask = {...task, completed: !task.completed};
            await axios.put(`http://localhost:8080/tasks/${task.id}`, updatedTask);
            fetchTasks();  // Refresh the list after toggle
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div className="max-w-lg mx-auto my-8">
            <ul className="list-disc space-y-2 bg-white shadow-md rounded px-8 pt-6 pb-8">
                {tasks.map(task => (
                    <li key={task.id} className="border-b last:border-b-0 py-2 flex justify-between items-center">
                        <div>
                            <span className="font-bold">{task.title}</span> - <span>{task.description}</span> - <span className={`font-semibold ${task.completed ? 'text-green-500' : 'text-red-500'}`}>
                            {task.completed ? 'Completed' : 'Pending'}</span>
                        </div>
                        <div>
                            <button onClick={() => handleToggleCompleted(task)} className="text-xs bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">{task.completed ? 'Mark Incomplete' : 'Mark Complete'}</button>
                            <button onClick={() => onEdit(task)} className="text-xs bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 rounded">Edit</button>
                            <button onClick={() => handleDelete(task.id)} className="text-xs bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
