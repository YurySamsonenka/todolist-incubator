import React from 'react';
import { Task } from './App';
import { Button } from './Button';

type Props = {
	title: string
	tasks: Task[]
	data?: string
}

export const Todolist = ({ title, tasks, data }: Props) => {
	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input />
				<button>+</button>
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
							</li>
						);
					})}
				</ul>
			)}
			<div>
				<Button title={'All'} />
				<Button title={'Active'} />
				<Button title={'Completed'} />
			</div>
			<div>{data}</div>
		</div>
	);
};
