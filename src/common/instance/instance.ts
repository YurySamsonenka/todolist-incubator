import axios from 'axios';

export const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	headers: {
		Authorization: 'Bearer f0191812-a3f4-4861-9f62-a6181a5e3238',
		'API-KEY': '8f2534e2-22a4-4052-894e-a66c04807482',
	},
})
