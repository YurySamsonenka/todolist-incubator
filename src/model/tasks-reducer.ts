import { TasksStateType } from '../App';
import { v1 } from 'uuid';
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			return {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !==
					action.payload.taskId),
			};
		}
		case 'ADD-TASK' : {
			const newTask = {
				id: v1(),
				title: action.payload.title,
				isDone: false,
			};

			return {
				...state,
				[action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]],
			};
		}
		case 'CHANGE-TASK-STATUS':
			return {
				...state,
				[action.payload.todolistId]: [...state[action.payload.todolistId].map(t => t.id ===
				action.payload.taskId ? { ...t, isDone: action.payload.isDone } : t)],
			};
		case 'CHANGE-TASK-TITLE':
			return {
				...state,
				[action.payload.todolistId]: [...state[action.payload.todolistId].map(t => t.id ===
				action.payload.taskId ? { ...t, title: action.payload.title } : t)],
			};
		case 'ADD-TODOLIST':
			return { ...state, [action.payload.todolistId]: [] };
		case 'REMOVE-TODOLIST':
			const newState = { ...state };
			delete newState[action.payload.id]
			return newState
		default:
			throw new Error('I don\'t understand this type');
	}
};

export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
	return { type: 'REMOVE-TASK', payload } as const;
};

export const addTaskAC = (payload: { todolistId: string; title: string }) => {
	return { type: 'ADD-TASK', payload } as const;
};

export const changeTaskStatusAC = (payload: {
	todolistId: string;
	taskId: string,
	isDone: boolean
}) => {
	return { type: 'CHANGE-TASK-STATUS', payload } as const;
};
export const changeTitleStatusAC = (payload: {
	todolistId: string;
	taskId: string,
	title: string
}) => {
	return { type: 'CHANGE-TASK-TITLE', payload } as const;
};

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTitleStatusActionType = ReturnType<typeof changeTitleStatusAC>

type ActionsType =
	RemoveTaskActionType
	| AddTaskActionType
	| ChangeTaskStatusActionType
	| ChangeTitleStatusActionType
	| AddTodolistActionType
	| RemoveTodolistActionType
