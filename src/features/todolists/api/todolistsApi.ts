import { CreateTodolistResponse, DeleteTodolistResponse, Todolist, UpdateTodolistResponse } from './todolistsApi.types';
import { instance } from '../../../common/instance/instance';

export const todolistApi = {
	getTodolist() {
		return instance.get<Todolist[]>('todo-lists');
	},
	updateTodolist(payload: { id: string; title: string }) {
		const { id, title } = payload;
		return instance.put<UpdateTodolistResponse>(`todo-lists/${id}`, { title });
	},
	createTodolist(title: string) {
		return instance.post<CreateTodolistResponse>('todo-lists', { title });
	},
	removeTodolist(id: string) {
		return instance.delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`);
	},
};
