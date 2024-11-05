import React, { useState } from 'react';
import { FilterValues, Task } from './App';
import { Button } from './Button';

type Props = {
	title: string
	tasks: Task[]
	removeTask: (taskId: string) => void
	changeFilter: (filter: FilterValues) => void
	addTask: (title: string) => void
}

export const Todolist = ({ title, tasks, removeTask, changeFilter, addTask }: Props) => {
	const [taskTitle, setTaskTitle] = useState('');

	const addTaskHandler = () => {
		addTask(taskTitle);
		setTaskTitle('');
	};

	const changeTaskTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(event.currentTarget.value);
	};

	const addTaskOnKeyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			addTaskHandler();
		}
	};

	const changeFilterTasksHandler = (filter: FilterValues) => {
		changeFilter(filter);
	};

	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input value={taskTitle}
					onChange={changeTaskTitleHandler}
					onKeyUp={addTaskOnKeyUpHandler} />
				<Button title={'+'} onClick={addTaskHandler} />
			</div>
			{tasks.length === 0 ? (
				<p>Тасок нет</p>
			) : (
				<ul>
					{tasks.map(t => {
						const removeTaskHandler = () => {
							removeTask(t.id);
						};

						return (
							<li key={t.id}>
								<input type="checkbox" checked={t.isDone} />
								<span>{t.title}</span>
								<Button title={'x'} onClick={removeTaskHandler} />
							</li>
						);
					})}
				</ul>
			)}
			<div>
				<Button title={'All'} onClick={() => {
					changeFilterTasksHandler('all');
				}} />
				<Button title={'Active'} onClick={() => {
					changeFilterTasksHandler('active');
				}} />
				<Button title={'Completed'} onClick={() => {
					changeFilterTasksHandler('completed');
				}} />
			</div>
		</div>
	);
};
