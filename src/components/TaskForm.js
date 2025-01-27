"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskForm({ task, onSave }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        }
    }, [task]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = {
            title,
            description,
            completed: false
        };
        try {
            let response;
            if (task) {
                response = await axios.put(`http://localhost:8080/tasks/${task.id}`, taskData);
            } else {
                response = await axios.post('http://localhost:8080/tasks', taskData);
            }
            console.log('Task saved:', response.data);
            onSave(response.data);
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    return (
        <div className="max-w-lg mx-auto my-3">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        placeholder="Enter Task Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        placeholder="Task Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    {task ? 'Update Task' : 'Add Task'}
                </button>
            </form>
        </div>
    );
}

export default TaskForm;
