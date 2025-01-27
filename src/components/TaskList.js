"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/tasks')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    return (
        <div className="max-w-lg mx-auto my-8">
            <ul className="list-disc space-y-2 bg-white shadow-md rounded px-8 pt-6 pb-8">
                {tasks.map(task => (
                    <li key={task.id} className="border-b last:border-b-0 py-2">
                        <span className="font-bold">{task.title}</span> - <span>{task.description}</span> - <span className={`font-semibold ${task.completed ? 'text-green-500' : 'text-red-500'}`}>{task.completed ? 'Completed' : 'Pending'}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
