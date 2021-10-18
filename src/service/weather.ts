import {API_CONFIG, DEFAULT_PARAMS} from './config';
import {getUser} from './user';
import {getDate} from '../utils/date';

export function getCity(city: string) {
	const url = new URL(`${API_CONFIG.BACKEND}/getCity`);
	const params = {
		city
	}
	url.search = new URLSearchParams(params).toString();
	return fetch(url.href, {method: 'post'})
		.then(response => response.json())
		.catch(console.error)
		.then(({suggestions}) => suggestions?.find((city: any) => city?.data.city)?.data.city || getUser().city)
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

export function getWeather(city = getUser().city) {
	const url = new URL(`${API_CONFIG.BACKEND_WEATHER}/current.json`);
	const params = {
		q: city,
		...DEFAULT_PARAMS
	}
	url.search = new URLSearchParams(params).toString();

	return fetch(url.href)
		.then(response => response.json())
		.catch(console.error)
		.then(weather => {
			return ({
				date: weather.current.condition.date,
				icon: weather.current.condition.icon.replace('//cdn.weatherapi.com', '/images'),
				currentTemp: Math.round(weather.current.temp_c)
			})
		});
}

export async function getForcastWeather(days: number, city = getUser().city) {
	const url = new URL(`${API_CONFIG.BACKEND_WEATHER}/forecast.json`);
	const params = {
		q: city,
		days: days.toString(),
		...DEFAULT_PARAMS
	}
	url.search = new URLSearchParams(params).toString();
	return fetch(url.href)
		.then(response => response.json())
		.catch(console.error)
		.then(({forecast}) => {
			return forecast.forecastday.map((forecast: any) => ({
				date: getDate(forecast.date_epoch * 1000),
				icon: forecast.day.condition.icon.replace('//cdn.weatherapi.com', '/images'),
				maxTemp: Math.round(forecast.day.maxtemp_c),
				minTemp: Math.round(forecast.day.mintemp_c)
			}))
		});
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
