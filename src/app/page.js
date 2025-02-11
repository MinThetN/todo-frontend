"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL; // Modify based on where it's used
        const url = `${apiUrl}/tasks`;
    
        console.log('Attempting to fetch from:', url); // Debugging output
    
        try {
            const response = await axios.get(url);
            setTasks(response.data); // Assuming setTasks is a state updater from a React hook
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
            console.log('Error details:', error.response ? error.response.data : error.message); // More detailed error info
        }
    };
    

    const handleEditTask = (task) => {
        setCurrentTask(task);
    };

    const handleSaveTask = async (task) => {
        if (task.id) {
            await axios.put(`${process.env.API_BASE_URL}/tasks/${task.id}`, task);
        } else {
            await axios.post(`${process.env.API_BASE_URL}/tasks`, task);
        }
        fetchTasks();
        setCurrentTask(null);
    };

    const handleDeleteTask = async (id) => {
        await axios.delete(`${process.env.API_BASE_URL}/tasks/${id}`);
        fetchTasks();
    };

    const handleToggleCompleted = async (task) => {
        const updatedTask = { ...task, completed: !task.completed };
        await axios.put(`${process.env.API_BASE_URL}/tasks/${task.id}`, updatedTask);
        fetchTasks();
    };

    return (
        <div className='flex flex-col items-center'>
            <Header />
            <TaskForm task={currentTask} onSave={handleSaveTask} />
            <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} onToggleCompleted={handleToggleCompleted} />
        </div>
    );
}
