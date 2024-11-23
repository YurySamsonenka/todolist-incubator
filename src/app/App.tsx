import React from 'react';
import './App.css';
import { Todolist } from '../Todolist';
import { AddItemForm } from '../AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { MenuButton } from '../MenuButton';
import { ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from '../model/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../model/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { getTheme } from '../common/theme/theme';
import { changeThemeAC } from './app-reducer';

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
	const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists);
	const tasks = useSelector<RootState, TasksStateType>(state => state.tasks);
	const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode);

	const dispatch = useDispatch();

	const theme = getTheme(themeMode);

	const removeTask = (taskId: string, todolistId: string) => {
		dispatch(removeTaskAC({ taskId, todolistId }));
	};

	const addTask = (title: string, todolistId: string) => {
		dispatch(addTaskAC({ title, todolistId }));
	};

	const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
		dispatch(changeTaskStatusAC({ taskId, isDone: taskStatus, todolistId }));
	};

	const updateTask = (todolistId: string, taskId: string, title: string) => {
		dispatch(changeTaskTitleAC({ todolistId, title, taskId }));
	};

	const changeFilter = (filter: FilterValues, id: string) => {
		dispatch(changeTodolistFilterAC({ filter, id }));
	};

	const removeTodolist = (todolistId: string) => {
		dispatch(removeTodolistAC(todolistId));
	};

	const addTodolist = (title: string) => {
		dispatch(addTodolistAC(title));
	};

	const updateTodolist = (id: string, title: string) => {
		dispatch(changeTodolistTitleAC({ id, title }));
	};

	const changeModeHandler = () => {
		dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
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
								<Paper sx={{ p: '0 20px 20px 20px' }}>
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
