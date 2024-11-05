import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';

export type Task = {
	id: number
	title: string
	isDone: boolean
}
export type FilterValues = 'all' | 'active' | 'completed'

function App() {
	const [tasks, setTasks] = useState<Task[]>([
		{ id: 1, title: 'HTML&CSS', isDone: true },
		{ id: 2, title: 'JS', isDone: true },
		{ id: 3, title: 'ReactJS', isDone: false },
		{ id: 4, title: 'Redux', isDone: false },
		{ id: 5, title: 'Typescript', isDone: false },
		{ id: 6, title: 'RTK query', isDone: false },
	]);

	const [filter, setFilter] = useState<FilterValues>('all');

	let tasksForTodolist = tasks;
	if (filter === 'active') {
		tasksForTodolist = tasks.filter(t => !t.isDone);
	}
	if (filter === 'completed') {
		tasksForTodolist = tasks.filter(t => t.isDone);
	}

	const removeTask = (taskId: number) => {
		const filteredTasks = tasks.filter(t => t.id !== taskId);
		setTasks(filteredTasks);
	};

	const changeFilter = (filter: FilterValues) => {
		setFilter(filter);
	};

	return (
		<div className="App">
			<Todolist title="What to learn"
				tasks={tasksForTodolist}
				removeTask={removeTask}
				changeFilter={changeFilter} />
		</div>
	);
}

export default App;
