import React, { ChangeEvent, useState } from 'react';
import { FilterValues, Task } from './App';
import { Button } from './Button';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';

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
				<Button title={'x'} onClick={removeTodolistHandler} />
			</div>
			<AddItemForm addItem={addTaskCallback} />
			{tasks.length === 0 ? (
				<p>Тасок нет</p>
			) : (
				<ul>
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
							<li key={t.id} className={t.isDone ? 'is-done' : ''}>
								<input type="checkbox"
									checked={t.isDone}
									onChange={changeTaskStatusHandler} />
								<EditableSpan value={t.title} onChange={changeTaskTitleHandler} />
								<Button title={'x'} onClick={removeTaskHandler} />
							</li>
						);
					})}
				</ul>
			)}
			<div>
				<Button className={filter === 'all' ? 'active-filter' : ''} title={'All'} onClick={() => {
					changeFilterTasksHandler('all');
				}} />
				<Button className={filter === 'active' ? 'active-filter' : ''}
					title={'Active'}
					onClick={() => {
						changeFilterTasksHandler('active');
					}} />
				<Button className={filter === 'completed' ? 'active-filter' : ''}
					title={'Completed'}
					onClick={() => {
						changeFilterTasksHandler('completed');
					}} />
			</div>
		</div>
	);
};
