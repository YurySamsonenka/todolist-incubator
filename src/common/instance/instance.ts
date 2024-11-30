import axios from 'axios';

export const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	headers: {
		Authorization: 'Bearer 2026887c-01d4-466b-bc2c-7397d8c89fb8',
		'API-KEY': 'd9e3a3ee-9579-4622-9ab3-970dc7443157',
	},
})
