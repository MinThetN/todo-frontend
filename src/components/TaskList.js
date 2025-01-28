"use client"
import React from 'react';
import { motion } from 'framer-motion';

function TaskList({ tasks, onEdit, onDelete, onToggleCompleted }) {
    return (
        <div className="max-w-full mx-auto my-8 px-2 sm:px-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider sm:px-5 sm:py-3">
                                Task
                            </th>
                            <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider sm:px-5 sm:py-3">
                                Status
                            </th>
                            <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider sm:px-5 sm:py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task.id}>
                                <td className="px-2 py-4 border-b border-gray-200 bg-white text-sm sm:px-5">
                                    <div className="flex items-center">
                                        <motion.div
                                            initial={{
                                                scale: 1,
                                                backgroundColor: task.completed ? '#10e353' : 'transparent',
                                                border: '2px solid #E5E7EB'
                                            }}
                                            animate={{
                                                backgroundColor: task.completed ? '#10e353' : 'transparent',
                                                borderColor: task.completed ? '#10e353' : '#E5E7EB'
                                            }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 700,
                                                damping: 30
                                            }}
                                            className="h-4 w-4 rounded-full flex justify-center items-center cursor-pointer mr-2"
                                            onClick={() => onToggleCompleted(task)}
                                        >
                                            {task.completed && (
                                                <motion.svg
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0 }}
                                                    style={{ width: '10px', height: '10px', fill: 'white' }}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <polyline
                                                        fill="none"
                                                        stroke="white"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        points="20 6 9 17 4 12"
                                                    />
                                                </motion.svg>
                                            )}
                                        </motion.div>
                                        <div>
                                            <div className={`font-bold ${task.completed ? 'line-through' : ''}`}>{task.title}</div>
                                            <div className={`text-xs font-semibold text-gray-500 ${task.completed ? 'line-through' : ''}`}>{task.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-2 py-4 border-b border-gray-200 bg-white text-sm sm:px-5">
                                    <span className={`relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight ${task.completed ? 'text-green-500' : 'text-blue-500'}`}>
                                        {task.completed ? 'Completed' : 'Pending'}
                                        <span className={`absolute inset-0 ${task.completed ? 'bg-green-300' : 'bg-blue-300'} opacity-50 rounded-full`}></span>
                                    </span>
                                </td>
                                <td className="px-2 py-4 border-b border-gray-200 bg-white text-sm sm:px-5">
                                    <div className="flex flex-col sm:flex-row sm:items-center">
                                        <button onClick={() => onEdit(task)} className="text-xs bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded mb-2 sm:mb-0 sm:mr-2">
                                            Edit
                                        </button>
                                        <button onClick={() => onDelete(task.id)} className="text-xs bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">
                                            Delete
                                        </button>
                                    </div>
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
