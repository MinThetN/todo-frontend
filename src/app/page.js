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
        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/tasks`);
            setTasks(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
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
