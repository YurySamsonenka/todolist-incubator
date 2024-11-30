import { Todolist } from './todolistsApi.types';
import { instance } from 'common/instance/instance';
import { BaseResponse } from 'common/types/types';

export const todolistApi = {
	getTodolists() {
		return instance.get<Todolist[]>('todo-lists');
	},
	updateTodolist(payload: { id: string; title: string }) {
		const { id, title } = payload;
		return instance.put<BaseResponse>(`todo-lists/${id}`, { title });
	},
	createTodolist(title: string) {
		return instance.post<BaseResponse<{ item: Todolist }>>('todo-lists', { title });
	},
	deleteTodolist(id: string) {
		return instance.delete<BaseResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`);
	},
};
