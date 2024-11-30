import { EditableSpan } from 'common/components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { TodolistType } from '../../../../../../app/App';
import { changeTodolistTitleAC, removeTodolistAC } from '../../../../model/todolists-reducer';
import { useAppDispatch } from 'common/hooks/useAppDispatch';

type Props = {
	todolist: TodolistType
}

export const TodolistTitle = ({ todolist }: Props) => {
	const { id, title } = todolist;

	const dispatch = useAppDispatch();

	const removeTodolistHandler = () => {
		dispatch(removeTodolistAC(id));
	};

	const updateTodolistHandler = (title: string) => {
		dispatch(changeTodolistTitleAC({ id, title }));
	};

	return (
		<>
			<div className={'container'}>
				<h3>
					<EditableSpan value={title} onChange={updateTodolistHandler} />
				</h3>
				<IconButton onClick={removeTodolistHandler}>
					<DeleteIcon />
				</IconButton>
			</div>
		</>
	);
};
