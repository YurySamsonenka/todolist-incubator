import { TodolistType } from './app/App';
import { AddItemForm } from './AddItemForm';
import { FilterTasksButtons } from './FilterTasksButtons';
import { Tasks } from './Tasks';
import { TodolistTitle } from './TodolistTitle';
import { addTaskAC } from './model/tasks-reducer';
import { useDispatch } from 'react-redux';

type Props = {
	todolist: TodolistType
	addTask: (title: string, todolistId: string) => void
}

export const Todolist = ({
	todolist,
}: Props) => {
	const dispatch = useDispatch();

	const addTaskCallback = (title: string) => {
		dispatch(addTaskAC({ title, todolistId: todolist.id }));
	};

	return (
		<div>
			<TodolistTitle todolist={todolist} />
			<AddItemForm addItem={addTaskCallback} />
			<Tasks todolist={todolist} />
			<FilterTasksButtons todolist={todolist} />
		</div>
	);
};
