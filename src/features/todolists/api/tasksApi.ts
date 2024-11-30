import { CreateTaskResponse, DeleteTaskResponse, DomainTask, GetTasksResponse, UpdateTaskModel, UpdateTaskResponse } from './tasksApi.types';
import { instance } from '../../../common/instance/instance';

export const tasksApi = {
	getTask(id: string) {
		return instance.get<GetTasksResponse>(`todo-lists/${id}/tasks`);
	},
	createTask(payload: { title: string, todolistId: string }) {
		const { title, todolistId } = payload;
		return instance.post<CreateTaskResponse>(`todo-lists/${todolistId}/tasks`, { title });
	},
	removeTask(payload: { taskId: string, todolistId: string }) {
		const { taskId, todolistId } = payload;
		return instance.delete<DeleteTaskResponse>(`todo-lists/${todolistId}/tasks/${taskId}`);
	},
	updateTask(payload: { task: DomainTask, model: UpdateTaskModel }) {
		const { task, model } = payload;

		return instance.put<UpdateTaskResponse>(`todo-lists/${task.todoListId}/tasks/${task.id}`,
			model);
	},
};
