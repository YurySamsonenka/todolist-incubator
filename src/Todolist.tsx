import { Task, TodolistType } from './app/App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { getListItemSx } from './Todolist.styles';
import { FilterTasksButtons } from './FilterTasksButtons';
import { ChangeEvent } from 'react';

type Props = {
	tasks: Task[]
	todolist: TodolistType
	removeTask: (taskId: string, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
	removeTodolist: (todolistId: string) => void
	updateTask: (todolistId: string, taskId: string, title: string) => void
	updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = ({
	tasks,
	todolist,
	removeTask,
	addTask,
	changeTaskStatus,
	removeTodolist,
	updateTask,
	updateTodolist,
}: Props) => {

	const addTaskCallback = (title: string) => {
		addTask(title, todolist.id);
	};

	const removeTodolistHandler = () => {
		removeTodolist(todolist.id);
	};

	const updateTodolistHandler = (title: string) => {
		updateTodolist(todolist.id, title);
	};

	return (
		<div>
			<div className={'todolist-title-container'}>
				<h3>
					<EditableSpan value={todolist.title} onChange={updateTodolistHandler} />
				</h3>
				<IconButton onClick={removeTodolistHandler}>
					<DeleteIcon />
				</IconButton>
			</div>
			<AddItemForm addItem={addTaskCallback} />
			{tasks.length === 0 ? (
				<p>Тасок нет</p>
			) : (
				<List>
					{tasks.map(t => {
						const removeTaskHandler = () => {
							removeTask(t.id, todolist.id);
						};

						const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
							const newStatusValue = e.currentTarget.checked;
							changeTaskStatus(t.id, newStatusValue, todolist.id);
						};

						const changeTaskTitleHandler = (title: string) => {
							updateTask(todolist.id, t.id, title);
						};

						return (
							<ListItem key={t.id} sx={getListItemSx(t.isDone)}>
								<div>
									<Checkbox checked={t.isDone} onChange={changeTaskStatusHandler} />
									<EditableSpan value={t.title} onChange={changeTaskTitleHandler} />
								</div>
								<IconButton onClick={removeTaskHandler}>
									<DeleteIcon />
								</IconButton>
							</ListItem>
						);
					})}
				</List>
			)}
			<FilterTasksButtons todolist={todolist} />
		</div>
	);
};
