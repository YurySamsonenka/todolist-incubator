import { Todolist } from './Todolist/Todolist';
import { addTaskAC } from '../../model/tasks-reducer';
import { TodolistType } from '../../../../app/App';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import { RootState } from '../../../../app/store';
import Grid from '@mui/material/Grid2';

const Todolists = () => {
	const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists);

	const dispatch = useDispatch();

	const addTask = (title: string, todolistId: string) => {
		dispatch(addTaskAC({ title, todolistId }));
	};

	return (
		<>
			{todolists.map(tl => {

				return (
					<Grid key={tl.id}>
						<Paper sx={{ p: '0 20px 20px 20px' }}>
							<Todolist
								key={tl.id}
								todolist={tl}
								addTask={addTask}
							/>
						</Paper>
					</Grid>
				);
			})}
		</>
	);
};

export default Todolists;
