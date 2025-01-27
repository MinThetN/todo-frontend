"use client"
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Home() {
    const [currentTask, setCurrentTask] = useState(null); // State to hold the task for editing

    // Function to handle setting a task for editing
    const handleEditTask = (task) => {
        setCurrentTask(task);
    };

    // Function to handle saving a task (new or edited)
    const handleSaveTask = (savedTask) => {
        // Logic to refresh the task list or update the state
        console.log('Task saved:', savedTask);
        setCurrentTask(null); // Clear the current task after saving
    };

    // Function to handle the request to add a new task
    const handleAddNewTask = () => {
        setCurrentTask({ title: '', description: '', completed: false }); // Clear any selected task
    };

    return (
        <div className='flex flex-col items-center'>
            <Header />
            {/* Pass the currentTask and onSave function to TaskForm */}
            <TaskForm task={currentTask} onSave={handleSaveTask} onAddNew={handleAddNewTask} />
            {/* Pass the onEdit function to TaskList */}
            <TaskList onEdit={handleEditTask} />
            <Footer />
        </div>
    );
}
