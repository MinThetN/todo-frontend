"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskForm({ task, onSave }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [task]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = {
            title,
            description,
            completed: task ? task.completed : false
        };
        try {
            let response;
            if (task && task.id) {
                response = await axios.put(`${process.env.API_BASE_URL}/tasks/${task.id}`, taskData);
            } else {
                response = await axios.post(`${process.env.API_BASE_URL}/tasks`, taskData);
            }
            onSave(response.data);
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    return (
        <div className="flex flex-col items-center w-full px-4 py-2">

            <div className="w-full max-w-md p-6 rounded-lg">
                <form onSubmit={handleSubmit} className="bg-white p-6 shadow-xl rounded-xl">
                    <div className="mb-4">
                        <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            className="appearance-none border-2 border-gray-200 rounded-2xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            id="title"
                            type="text"
                            placeholder="Enter Task Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            className="appearance-none border-2 border-gray-200 rounded-2xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            id="description"
                            placeholder="Task Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline">
                        {task ? 'Update Task' : 'Add Task'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TaskForm;

