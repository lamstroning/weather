import React from 'react';
import {getCities, getCity, getCountries, getWeather, TWeather} from '../../service/weather';
import {getUser} from '../../service/user';
import {Progress} from '../Progress';

type State = {
	countries: any,
	city: string,
	weather: TWeather,
	ready: boolean,
	error: boolean,
	cities?: any[]
}

export default class Weather extends React.Component<any, State> {
	constructor(props: any) {
		super(props);
		this.state = {
			countries: [],
			city: getUser().city,
			weather: {
				icon: '',
				currentTemp: 0,
				date: ''
			},
			ready: false,
			error: false,
			cities: undefined
		}

	}

	componentDidMount() {
		getCountries()
			.then(countries => {
				const countriesNames = countries.map((country: any) => country.name);
				this.setState(() => ({countries: countriesNames}));
				this.choiceCity(countriesNames[0]);
			})
		this.weather();
	}

	weather(city?:string) {
		getWeather(city)
			.then(response => response.json())
			.catch(console.error)
			.then(weather => {
				if (weather.error) {
					this.setState(() => ({
						error: true
					}));
					return;
				}
				console.log(weather);
				this.setState(() => ({
					weather: {
						date: weather.current.condition.date,
						icon: weather.current.condition.icon.replace('//cdn.weatherapi.com', '/images'),
						currentTemp: Math.round(weather.current.temp_c)
					},
				}))
			})
			.catch(console.error)
			.finally(() =>
				this.setState(() => ({
					ready: true
				}))
			)
	}

	choiceCountry(country: string) {
		getCities(country).then(cities => this.setState(() => ({cities})));
	}

	choiceCity(city: string) {
		city = 'russia';
		getCity(city).then((city: any) => console.log(city))
	}

	render() {
		if (this.state.error)
			return <>error</>

		if (this.state.ready)
			return (
				<div>
					<img src={this.state.weather.icon} alt=''/>
					{this.state.city}
					{this.state.weather.currentTemp > 0 ? `+${this.state.weather.currentTemp}` : this.state.weather.currentTemp}
					<select onChange={event => this.choiceCountry(event.target.value)}>
						{this.state.countries.map((country: string) =>
							<option key={country} value={country}>
								{country}
							</option>
						)}
					</select>
					{this.state.cities &&
						<select onChange={event => this.choiceCity(event.target.value)}>
							{this.state.cities.map((city: any) =>
								<option key={city.name} value={city.name}>
									{city.name}
								</option>
							)}
						</select>
					}
				</div>
			);
		else
			return (
				<Progress/>
			)
	}
}
