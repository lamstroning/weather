import {API_CONFIG, DEFAULT_PARAMS} from './config';
import {getUser} from './user';

export function getCity(city: string) {
	const url = new URL(`${API_CONFIG.BACKEND}/getCity`);
	const params = {
		city
	}
	url.search = new URLSearchParams(params).toString();
	return fetch(url.href, {method: 'post'})
		.then(response => response.json())
		.catch(console.error)
		.then(cities => {
			console.log(cities)
		})
}

export function getCountries() {
	const url = 'https://api.hh.ru/areas';
	return fetch(url)
		.then(response => response.json())
}

export function getCities(currentCountry: string) {
	const url = 'https://api.hh.ru/areas';
	return fetch(url)
		.then(response => response.json())
		.then(countries => countries.find((country: any) => country.name == currentCountry)?.areas)
}

export function getWeather(city?: string) {
	const url = new URL(`${API_CONFIG.BACKEND_WEATHER}/current.json`);
	const params = {
		q: city || getUser().city,
		...DEFAULT_PARAMS
	}
	url.search = new URLSearchParams(params).toString();

	return fetch(url.href);
}

export async function getForcastWeather(days: number, city: string | undefined) {
	const url = new URL(`${API_CONFIG.BACKEND_WEATHER}/forecast.json`);
	const params = {
		q: city || getUser().city,
		days: days.toString(),
		...DEFAULT_PARAMS
	}
	url.search = new URLSearchParams(params).toString();
	return fetch(url.href);
}

export type TWeather = {
	date: string;
	icon: string;
	currentTemp: number;
}
export type TFutureWeather = {
	date: string;
	icon: string;
	maxTemp: number;
	minTemp: number;
}