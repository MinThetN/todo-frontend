"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:8080/tasks');
        setTasks(response.data);
    };

    const handleEditTask = (task) => {
        setCurrentTask(task);
    };

    const handleSaveTask = async (task) => {
        if (task.id) {
            await axios.put(`http://localhost:8080/tasks/${task.id}`, task);
        } else {
            await axios.post('http://localhost:8080/tasks', task);
        }
        fetchTasks();
        setCurrentTask(null);
    };

    const handleDeleteTask = async (id) => {
        await axios.delete(`http://localhost:8080/tasks/${id}`);
        fetchTasks();
    };

    const handleToggleCompleted = async (task) => {
        const updatedTask = { ...task, completed: !task.completed };
        await axios.put(`http://localhost:8080/tasks/${task.id}`, updatedTask);
        fetchTasks();
    };

    return (
        <div className='flex flex-col items-center'>
            <Header />
            <TaskForm task={currentTask} onSave={handleSaveTask} />
            <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} onToggleCompleted={handleToggleCompleted} />
            <Footer />
        </div>
    );
}
