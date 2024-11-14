import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { MenuButton } from './MenuButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';

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

type ThemeMode = 'dark' | 'light'

function App() {
	const [themeMode, setThemeMode] = useState<ThemeMode>('light');

	const theme = createTheme({
		palette: {
			mode: themeMode === 'light' ? 'light' : 'dark',
			primary: {
				main: '#ef6c00',
			},
		},
	});

	const changeModeHandler = () => {
		setThemeMode(themeMode == 'light' ? 'dark' : 'light');
	};

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
	});

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

	const addTodolist = (title: string) => {
		const todolistId = v1();
		const newTodolist: TodolistType = { id: todolistId, title, filter: 'all' };
		setTodolists([newTodolist, ...todolists]);
		setTasks({ ...tasks, [todolistId]: [] });
	};

	const updateTask = (todolistId: string, taskId: string, title: string) => {
		const newTodolistTasks = {
			...tasks,
			[todolistId]: tasks[todolistId].map(t => (t.id === taskId ? { ...t, title } : t)),
		};
		setTasks(newTodolistTasks);
	};

	const updateTodolist = (todolistId: string, title: string) => {
		const newTodolists = todolists.map(tl => (tl.id === todolistId ? { ...tl, title } : tl));
		setTodolists(newTodolists);
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppBar position="static" sx={{ mb: '30px' }}>
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<IconButton color="inherit">
						<MenuIcon />
					</IconButton>
					<div>
						<MenuButton>Login</MenuButton>
						<MenuButton>Logout</MenuButton>
						<MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
						<Switch color={'default'} onChange={changeModeHandler} />
					</div>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container sx={{ mb: '30px' }}>
					<AddItemForm addItem={addTodolist} />
				</Grid>
				<Grid container spacing={4}>
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
							<Paper sx={{ p: '0 20px 20px 20px' }}>
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
									updateTask={updateTask}
									updateTodolist={updateTodolist}
								/>
							</Paper>
						);
					})}
				</Grid>
			</Container>
		</ThemeProvider>
	);
}

export default App;
