import React, { useState } from 'react';
import { Button } from './Button';

type Props = {
	addItem: (title: string) => void
}

export const AddItemForm = ({addItem}:Props) => {
	const [title, setTitle] = useState('');
	const [error, setError] = useState<string | null>(null);

	const addItemHandler = () => {
		if (title.trim() !== '') {
			addItem(title.trim())
			setTitle('');
		} else {
			setError('Title is required');
		}
	};

	const changeItemTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.currentTarget.value);
	};

	const addItemOnKeyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		setError(null);
		if (event.key === 'Enter') {
			addItemHandler();
		}
	};

	return (
		<div>
			<input className={error ? 'error' : ''} value={title}
				onChange={changeItemTitleHandler}
				onKeyUp={addItemOnKeyUpHandler} />
			<Button title={'+'} onClick={addItemHandler} />
			{error && <div className={'error-message'}>{error}</div>}
		</div>
	);
};
