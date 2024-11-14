import React, { ChangeEvent } from 'react';
import { FilterValues, Task } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import { filterButtonsContainerSx, getListItemSx } from './Todolist.styles';

type Props = {
	title: string
	tasks: Task[]
	todolistId: string
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (filter: FilterValues, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
	filter: FilterValues
	removeTodolist: (todolistId: string) => void
	updateTask: (todolistId: string, taskId: string, title: string) => void
	updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = ({
	title,
	tasks,
	removeTask,
	changeFilter,
	addTask,
	changeTaskStatus,
	filter,
	todolistId,
	removeTodolist,
	updateTask,
	updateTodolist,
}: Props) => {

	const addTaskCallback = (title: string) => {
		addTask(title, todolistId);
	};

	const changeFilterTasksHandler = (filter: FilterValues) => {
		changeFilter(filter, todolistId);
	};

	const removeTodolistHandler = () => {
		removeTodolist(todolistId);
	};

	const updateTodolistHandler = (title: string) => {
		updateTodolist(todolistId, title);
	};

	return (
		<div>
			<div className={'todolist-title-container'}>
				<h3>
					<EditableSpan value={title} onChange={updateTodolistHandler} />
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
							removeTask(t.id, todolistId);
						};

						const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
							const newStatusValue = e.currentTarget.checked;
							changeTaskStatus(t.id, newStatusValue, todolistId);
						};

						const changeTaskTitleHandler = (title: string) => {
							updateTask(todolistId, t.id, title);
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
			<Box sx={filterButtonsContainerSx}>
				<Button
					variant={filter === 'all' ? 'outlined' : 'text'}
					color={'inherit'}
					onClick={() => changeFilterTasksHandler('all')}
				>
					All
				</Button>
				<Button
					variant={filter === 'active' ? 'outlined' : 'text'}
					color={'primary'}
					onClick={() => changeFilterTasksHandler('active')}
				>
					Active
				</Button>
				<Button
					variant={filter === 'completed' ? 'outlined' : 'text'}
					color={'secondary'}
					onClick={() => changeFilterTasksHandler('completed')}
				>
					Completed
				</Button>
			</Box>
		</div>
	);
};
