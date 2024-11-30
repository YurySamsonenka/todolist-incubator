import axios from 'axios';
import { CreateTaskResponse, DeleteTaskResponse, DomainTask, GetTasksResponse, UpdateTaskModel, UpdateTaskResponse } from './tasksApi.types';

export const tasksApi = {
	getTask(id: string) {
		return axios.get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}/tasks`,
			{
				headers: {
					Authorization: 'Bearer 2026887c-01d4-466b-bc2c-7397d8c89fb8',
					'API-KEY': 'd9e3a3ee-9579-4622-9ab3-970dc7443157',
				},
			});
	},
	createTask(payload: { title: string, todolistId: string }) {
		const { title, todolistId } = payload;
		return axios.post<CreateTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
			{ title },
			{
				headers: {
					Authorization: 'Bearer 2026887c-01d4-466b-bc2c-7397d8c89fb8',
					'API-KEY': 'd9e3a3ee-9579-4622-9ab3-970dc7443157',
				},
			});
	},
	removeTask(payload: { taskId: string, todolistId: string }) {
		const { taskId, todolistId } = payload;
		return axios.delete<DeleteTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
			{
				headers: {
					Authorization: 'Bearer 2026887c-01d4-466b-bc2c-7397d8c89fb8',
					'API-KEY': 'd9e3a3ee-9579-4622-9ab3-970dc7443157',
				},
			});
	},
	updateTask(payload: { task: DomainTask, model: UpdateTaskModel }) {
		const { task, model } = payload;

		return axios
			.put<UpdateTaskResponse>(
				`https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
				model,
				{
					headers: {
						Authorization: 'Bearer 2026887c-01d4-466b-bc2c-7397d8c89fb8',
						'API-KEY': 'd9e3a3ee-9579-4622-9ab3-970dc7443157',
					},
				},
			);
	},
};
