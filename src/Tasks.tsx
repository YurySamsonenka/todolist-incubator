import List from '@mui/material/List';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { TasksStateType, TodolistType } from './app/App';
import { Task } from './Task';

type Props = {
	todolist: TodolistType
}

export const Tasks = ({ todolist }: Props) => {
	const tasks = useSelector<RootState, TasksStateType>(state => state.tasks);

	const allTodolistTasks = tasks[todolist.id];

	let tasksForTodolist = allTodolistTasks;

	if (todolist.filter === 'active') {
		tasksForTodolist = allTodolistTasks.filter(task => !task.isDone);
	}

	if (todolist.filter === 'completed') {
		tasksForTodolist = allTodolistTasks.filter(task => task.isDone);
	}

	return (
		<>
			{tasksForTodolist.length === 0 ? (
				<p>Тасок нет</p>
			) : (
				<List>
					{tasksForTodolist.map(t => {
						return <Task task={t} todolist={todolist} />;
					})}
				</List>
			)}
		</>
	);
};
