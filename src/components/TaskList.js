"use client"
import React from 'react';

function TaskList({ tasks, onEdit, onDelete, onToggleCompleted }) {
    return (
        <div className="max-w-lg mx-auto my-8">
            <ul className="list-disc space-y-2 bg-white shadow-md rounded px-8 pt-6 pb-8">
                {tasks.map(task => (
                    <li key={task.id} className="border-b last:border-b-0 py-2 flex justify-between items-center">
                        <div>
                            <span className="font-bold">{task.title}</span> - <span>{task.description}</span> - 
                            <span className={`font-semibold ${task.completed ? 'text-green-500' : 'text-red-500'}`}>
                                {task.completed ? 'Completed' : 'Pending'}
                            </span>
                        </div>
                        <div>
                            <button onClick={() => onToggleCompleted(task)} className="text-xs bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">
                                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                            </button>
                            <button onClick={() => onEdit(task)} className="text-xs bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 rounded">
                                Edit
                            </button>
                            <button onClick={() => onDelete(task.id)} className="text-xs bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
