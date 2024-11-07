import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';

export type TasksStateType = {
	[key: string]: Task[]
}

export type Task = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

type TodolistType = {
	id: string
	title: string
	filter: FilterValues
}

function App() {
	let todolistID1 = v1();
	let todolistID2 = v1();

	let [todolists, setTodolists] = useState<TodolistType[]>([
		{ id: todolistID1, title: 'What to learn', filter: 'all' },
		{ id: todolistID2, title: 'What to buy', filter: 'all' },
	]);

	let [tasks, setTasks] = useState<TasksStateType>({
		[todolistID1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
		],
		[todolistID2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	})

	const removeTask = (taskId: string, todolistId: string) => {
		setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId) });
	};

	const changeFilter = (filter: FilterValues, todolistId: string) => {
		setTodolists(todolists.map(tl => (tl.id === todolistId ? { ...tl, filter } : tl)));
	};

	const addTask = (title: string, todolistId: string) => {
		const newTask = {
			id: v1(),
			title: title,
			isDone: false,
		};
		setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
	};

	const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
		// const newState = tasks.map(t => (t.id === taskId ? { ...t, isDone: taskStatus } : t));
		setTasks({
			...tasks,
			[todolistId]: tasks[todolistId].map(t => (t.id === taskId
				? { ...t, isDone: taskStatus }
				: t)),
		});

	};

	const removeTodolist = (todolistId: string) => {
		const newTodolists = todolists.filter(tl => tl.id !== todolistId);
		setTodolists(newTodolists);

		delete tasks[todolistId];
		setTasks({ ...tasks });
	};

	return (
		<div className="App">
			{todolists.map(tl => {
				const allTodolistTasks = tasks[tl.id];
				let tasksForTodolist = allTodolistTasks;

				if (tl.filter === 'active') {
					tasksForTodolist = allTodolistTasks.filter(task => !task.isDone);
				}

				if (tl.filter === 'completed') {
					tasksForTodolist = allTodolistTasks.filter(task => task.isDone);
				}

				return (
					<Todolist
						key={tl.id}
						title={tl.title}
						todolistId={tl.id}
						tasks={tasksForTodolist}
						removeTask={removeTask}
						changeFilter={changeFilter}
						addTask={addTask}
						changeTaskStatus={changeTaskStatus}
						filter={tl.filter}
						removeTodolist={removeTodolist}
					/>
				);
			})}
		</div>
	);
};

export default App;
