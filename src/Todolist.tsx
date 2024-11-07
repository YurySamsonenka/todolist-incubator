import React, { ChangeEvent, useState } from 'react';
import { FilterValues, Task } from './App';
import { Button } from './Button';

type Props = {
	title: string
	tasks: Task[]
	removeTask: (taskId: string) => void
	changeFilter: (filter: FilterValues) => void
	addTask: (title: string) => void
	changeTaskStatus: (taskId: string, taskStatus: boolean) => void
	filter: FilterValues
}

export const Todolist = ({
	title,
	tasks,
	removeTask,
	changeFilter,
	addTask,
	changeTaskStatus,
	filter,
}: Props) => {
	const [taskTitle, setTaskTitle] = useState('');
	const [error, setError] = useState<string | null>(null);

	const addTaskHandler = () => {
		if (taskTitle.trim() !== '') {
			addTask(taskTitle.trim());
			setTaskTitle('');
		} else {
			setError('Title is required');
		}
	};

	const changeTaskTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(event.currentTarget.value);
	};

	const addTaskOnKeyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		setError(null);
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
				<input className={error ? 'error' : ''} value={taskTitle}
					onChange={changeTaskTitleHandler}
					onKeyUp={addTaskOnKeyUpHandler} />
				<Button title={'+'} onClick={addTaskHandler} />
				{error && <div className={'error-message'}>{error}</div>}
			</div>
			{tasks.length === 0 ? (
				<p>Тасок нет</p>
			) : (
				<ul>
					{tasks.map(t => {
						const removeTaskHandler = () => {
							removeTask(t.id);
						};

						const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
							const newStatusValue = e.currentTarget.checked;
							changeTaskStatus(t.id, newStatusValue);
						};

						return (
							<li key={t.id} className={t.isDone ? 'is-done' : ''}>
								<input type="checkbox"
									checked={t.isDone}
									onChange={changeTaskStatusHandler} />
								<span>{t.title}</span>
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
