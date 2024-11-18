import { TasksStateType } from '../app/App';
import { v1 } from 'uuid';
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState,
	action: ActionsType): TasksStateType => {
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
				action.payload.taskId ? { ...t, isDone: action.payload.taskStatus } : t)],
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
			delete newState[action.payload.id];
			return newState;
		default:
			return state;
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
	taskStatus: boolean
}) => {
	return { type: 'CHANGE-TASK-STATUS', payload } as const;
};
export const changeTaskTitleAC = (payload: {
	todolistId: string;
	taskId: string,
	title: string
}) => {
	return { type: 'CHANGE-TASK-TITLE', payload } as const;
};

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType =
	RemoveTaskActionType
	| AddTaskActionType
	| ChangeTaskStatusActionType
	| ChangeTaskTitleActionType
	| AddTodolistActionType
	| RemoveTodolistActionType
