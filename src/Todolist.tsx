import React from 'react';
import { FilterValues, Task } from './App';
import { Button } from './Button';

type Props = {
	title: string
	tasks: Task[]
	removeTask: (taskId: number) => void
	changeFilter: (filter: FilterValues) => void
}

export const Todolist = ({ title, tasks, removeTask, changeFilter }: Props) => {
	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input />
				<Button title={'+'} />
			</div>
			{tasks.length === 0 ? (
				<p>Тасок нет</p>
			) : (
				<ul>
					{tasks.map(t => {
						return (
							<li key={t.id}>
								<input type="checkbox" checked={t.isDone} />
								<span>{t.title}</span>
								<Button title={'x'} onClick={() => removeTask(t.id)} />
							</li>
						);
					})}
				</ul>
			)}
			<div>
				<Button title={'All'} onClick={()=>{changeFilter("all")}} />
				<Button title={'Active'} onClick={()=>{changeFilter("active")}}/>
				<Button title={'Completed'} onClick={()=>{changeFilter("completed")}}/>
			</div>
		</div>
	);
};
