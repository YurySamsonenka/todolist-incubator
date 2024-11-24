import { getListItemSx } from './Todolist.styles';
import Checkbox from '@mui/material/Checkbox';
import { EditableSpan } from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import { TaskType, TodolistType } from './app/App';
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './model/tasks-reducer';
import { useDispatch } from 'react-redux';
import { ChangeEvent } from 'react';

type Props = {
	task: TaskType
	todolist: TodolistType
}

export const Task = ({ task, todolist }: Props) => {	const dispatch = useDispatch();

	const removeTaskHandler = () => {
		dispatch(removeTaskAC({ taskId: task.id, todolistId: todolist.id }));
	};

	const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const isDone = e.currentTarget.checked;
		dispatch(changeTaskStatusAC({ taskId: task.id, isDone, todolistId: todolist.id }));
	};

	const changeTaskTitleHandler = (title: string) => {
		dispatch(changeTaskTitleAC({ taskId: task.id, title, todolistId: todolist.id }));
	};

	return (
		<ListItem key={task.id} sx={getListItemSx(task.isDone)}>
			<div>
				<Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
				<EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
			</div>
			<IconButton onClick={removeTaskHandler}>
				<DeleteIcon />
			</IconButton>
		</ListItem>
	);
};
