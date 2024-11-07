import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';

export type Task = {
	id: string
	title: string
	isDone: boolean
}
export type FilterValues = 'all' | 'active' | 'completed'

function App() {
	const [tasks, setTasks] = useState<Task[]>([
		{ id: v1(), title: 'HTML&CSS', isDone: true },
		{ id: v1(), title: 'JS', isDone: true },
		{ id: v1(), title: 'ReactJS', isDone: false },
	]);

	const [filter, setFilter] = useState<FilterValues>('all');

	let tasksForTodolist = tasks;
	if (filter === 'active') {
		tasksForTodolist = tasks.filter(t => !t.isDone);
	}
	if (filter === 'completed') {
		tasksForTodolist = tasks.filter(t => t.isDone);
	}

	const removeTask = (taskId: string) => {
		const filteredTasks = tasks.filter(t => t.id !== taskId);
		setTasks(filteredTasks);
	};

	const changeFilter = (filter: FilterValues) => {
		setFilter(filter);
	};

	const addTask = (title: string) => {
		const newTask = {
			id: v1(),
			title: title,
			isDone: false,
		};
		setTasks([newTask, ...tasks]);
	};

	const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
		const newState = tasks.map(t => (t.id === taskId ? { ...t, isDone: taskStatus } : t));
		setTasks(newState);
	};

	return (
		<div className="App">
			<Todolist title="What to learn"
				tasks={tasksForTodolist}
				removeTask={removeTask}
				changeFilter={changeFilter}
				addTask={addTask}
				changeTaskStatus={changeTaskStatus}
				filter={filter} />
		</div>
	);
}

export default App;
