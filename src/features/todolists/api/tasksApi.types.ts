import { FieldError } from '../../../common/types/types';

export type GetTasksResponse = {
	error: string | null
	totalCount: number
	items: DomainTask[]
}

export type DomainTask = {
	description: string
	title: string
	status: number
	priority: number
	startDate: string
	deadline: string
	id: string
	todoListId: string
	order: number
	addedDate: string
}

export type CreateTaskResponse = {
	data: {
		item: DomainTask
	};
	messages: string[];
	fieldsErrors: FieldError[];
	resultCode: number;
}

export type UpdateTaskModel = {
	status: number
	title: string
	deadline: string
	description: string
	priority: number
	startDate: string
}

export type UpdateTaskResponse = {
	data: {
		item: DomainTask
	};
	messages: string[];
	fieldsErrors: FieldError[];
	resultCode: number;
}

export type DeleteTaskResponse = {
	data: {};
	messages: string[];
	fieldsErrors: FieldError[];
	resultCode: number;
}
