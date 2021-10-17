import React, {ChangeEvent} from 'react';
import {getCities, getCity, getCountries, getWeather,} from '../../service/weather';
import {getUser} from '../../service/user';
import {Progress} from '../Progress';
import {setState} from 'jest-circus/build/state';

type State = {
	countries: any,
	city: string,
	weather: any,
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
			weather: {},
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
				weather.current.condition.icon = weather.current.condition.icon.replace('//cdn.weatherapi.com', '/images');
				this.setState(() => ({
					weather: weather.current,
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
		getCity(city).then((city: any) => console.log(city))
	}

	render() {
		if (this.state.error)
			return <>error</>

		if (this.state.ready)
			return (
				<div>
					<img src={this.state.weather.condition.icon} alt=''/>
					{this.state.city}
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
