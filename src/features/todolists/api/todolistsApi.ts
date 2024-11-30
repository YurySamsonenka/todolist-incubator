import axios from 'axios';
import { CreateTodolistResponse, DeleteTodolistResponse, Todolist, UpdateTodolistResponse } from './todolistsApi.types';

export const todolistApi = {
	getTodolist() {
		const promise = axios
			.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists',
				{
					headers: {
						Authorization: 'Bearer 2026887c-01d4-466b-bc2c-7397d8c89fb8',
					},
				});
		return promise;
	},
	updateTodolist(payload: { id: string; title: string }) {
		const { id, title } = payload;
		const promise = axios.put<UpdateTodolistResponse>(
			`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
			{ title },
			{
				headers: {
					Authorization: 'Bearer 2026887c-01d4-466b-bc2c-7397d8c89fb8',
					'API-KEY': 'd9e3a3ee-9579-4622-9ab3-970dc7443157',
				},
			},
		);
		return promise;
	},
	createTodolist(title: string) {
		const promise = axios.post<CreateTodolistResponse>(
			'https://social-network.samuraijs.com/api/1.1/todo-lists',
			{ title },
			{
				headers: {
					Authorization: 'Bearer 2026887c-01d4-466b-bc2c-7397d8c89fb8',
					'API-KEY': 'd9e3a3ee-9579-4622-9ab3-970dc7443157',
				},
			});
		return promise;
	},
	removeTodolist(id: string) {
		const promise = axios.delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
			{
				headers: {
					Authorization: 'Bearer 2026887c-01d4-466b-bc2c-7397d8c89fb8',
					'API-KEY': 'd9e3a3ee-9579-4622-9ab3-970dc7443157',
				},
			});
		return promise;
	},
};
