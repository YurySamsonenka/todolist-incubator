export type Todolist = {
	id: string;
	title: string;
	addedDate: string;
	order: number;
}

export type FieldError = {
	error: string
	field: string
}

export type CreateTodolistResponse = {
	resultCode: number
	messages: string[]
	fieldsErrors: FieldError[]
	data: {
		item: Todolist
	}
}

export type DeleteTodolistResponse = {
	data: {};
	messages: string[];
	fieldsErrors: FieldError[];
	resultCode: number;
}

export type UpdateTodolistResponse = {
	data: {};
	messages: string[];
	fieldsErrors: FieldError[];
	resultCode: number;
}
