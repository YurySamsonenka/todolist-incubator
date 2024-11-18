import React, { useReducer, useState } from 'react';
import './App.css';
import { Todolist } from '../Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from '../AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { MenuButton } from '../MenuButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from '../model/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from '../model/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';

export type TasksStateType = {
	[key: string]: Task[]
}

export type Task = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export type TodolistType = {
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
		setThemeMode(themeMode === 'light' ? 'dark' : 'light');
	};

	const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists);
	const tasks = useSelector<RootState, TasksStateType>(state => state.tasks);

	const dispatch = useDispatch();

	const removeTask = (taskId: string, todolistId: string) => {
		dispatch(removeTaskAC({ taskId, todolistId }));
	};

	const changeFilter = (filter: FilterValues, todolistId: string) => {
		dispatch(changeTodolistFilterAC({ filter, id: todolistId }));
	};

	const addTask = (title: string, todolistId: string) => {
		dispatch(addTaskAC({ title, todolistId }));
	};

	const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
		dispatch(changeTaskStatusAC({ taskId, taskStatus, todolistId }));
	};

	const removeTodolist = (todolistId: string) => {
		const action = removeTodolistAC(todolistId);
		dispatch(action);
		dispatch(action);
	};

	const addTodolist = (title: string) => {
		const action = addTodolistAC(title);
		dispatch(action);
		dispatch(action);
	};

	const updateTask = (todolistId: string, taskId: string, title: string) => {
		dispatch(changeTaskTitleAC({ todolistId, title, taskId }));
	};

	const updateTodolist = (todolistId: string, title: string) => {
		dispatch(changeTodolistTitleAC({ id: todolistId, title }));
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
							<Grid key={tl.id}>
								<Paper sx={{p: '0 20px 20px 20px'}}>
									<Todolist
										key={tl.id}
										todolistId={tl.id}
										title={tl.title}
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
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</ThemeProvider>
	);
}

export default App;
