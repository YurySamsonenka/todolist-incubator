import { TodolistType } from '../../../../../app/App';
import { AddItemForm } from '../../../../../common/components/AddItemForm/AddItemForm';
import { FilterTasksButtons } from './FilterTasksButtons/FilterTasksButtons';
import { Tasks } from './Tasks/Tasks';
import { TodolistTitle } from './TodolistTitle/TodolistTitle';
import { addTaskAC } from '../../../model/tasks-reducer';
import { useAppDispatch } from '../../../../../common/hooks/useAppDispatch';

type Props = {
	todolist: TodolistType
	addTask: (title: string, todolistId: string) => void
}

export const Todolist = ({
	todolist,
}: Props) => {
	const dispatch = useAppDispatch();

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
