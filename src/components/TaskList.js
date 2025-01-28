// TaskList.js
"use client"
import React from 'react';
import { motion } from 'framer-motion';

function TaskList({ tasks, onEdit, onDelete, onToggleCompleted }) {
    return (
        <div className="max-w-full mx-auto my-8">
            <div className="bg-white shadow-md rounded px-4 pt-4 pb-4">
                <table className="w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Task
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task.id}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <div className="flex items-center">
                                        <motion.input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={() => onToggleCompleted(task)}
                                            className="form-checkbox h-5 w-5 text-green-500"
                                            whileTap={{ scale: 0.9 }}
                                        />
                                        <span className={`ml-2 ${task.completed ? 'line-through' : ''}`}>{task.title}</span>
                                    </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span className="text-gray-900">{task.description}</span>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span className={`relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight ${task.completed ? 'text-green-500' : 'text-red-500'}`}>
                                        {task.completed ? 'Completed' : 'Pending'}
                                    </span>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <button onClick={() => onEdit(task)} className="text-xs bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded mr-2">
                                        Edit
                                    </button>
                                    <button onClick={() => onDelete(task.id)} className="text-xs bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TaskList;
