import {API_CONFIG} from './config';

function getCurrentCity() {
	const url = new URL(`${API_CONFIG.BACKEND_IP}`);
	const params = {
		api_key: API_CONFIG.API_IP_KEY
	}
	url.search = new URLSearchParams(params).toString();
	return fetch(url.href);
}

export function saveUser() {
	if (!localStorage.getItem('userInformation'))
		getCurrentCity()
			.then(response => response.json())
			.then(userInformation => localStorage.setItem('userInformation', JSON.stringify(userInformation)))
			.catch(console.error);
}

export function getUser() {
	return JSON.parse(localStorage.getItem('userInformation') || '{}');
}
