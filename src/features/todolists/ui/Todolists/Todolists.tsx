import { Todolist } from './Todolist/Todolist';
import { addTaskAC } from '../../model/tasks-reducer';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectTodolists } from '../../model/todolistsSelectors';

const Todolists = () => {
	const todolists = useAppSelector(selectTodolists);

	const dispatch = useAppDispatch();

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
