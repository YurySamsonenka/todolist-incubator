import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { getTheme } from '../common/theme/theme';
import Header from '../Header';
import { Main } from '../Main';

export type TasksStateType = {
	[key: string]: TaskType[]
}

export type TaskType = {
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

export const App = () => {
	const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode);

	return (
		<ThemeProvider theme={getTheme(themeMode)}>
			<CssBaseline />
			<Header />
			<Main />
		</ThemeProvider>
	);
};
