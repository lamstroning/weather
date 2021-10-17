import React from 'react';
import {getForcastWeather} from '../../service/weather';
import {getDate} from '../../utils/date';

type State = {
	forecast: any[]
}

export class FutureWeather extends React.Component <any, State> {
	constructor(props: any) {
		super(props)
		this.state = {
			forecast: []
		};
	}

	componentDidMount() {
		getForcastWeather(3, 'Moscow')
			.then(response => response.json())
			.catch(console.error)
			.then(({forecast}) => {
				forecast.forecastday.forEach((forecast: {date: string; date_epoch: number;}) =>
					forecast.date = getDate(forecast.date_epoch * 1000))
				this.setState({
					forecast: forecast.forecastday
				})
				console.log(forecast);
			})
	}

	render() {
		return (
			<div>
				{this.state.forecast.map((forecast, index) =>
					<div key={forecast.date}>
						{forecast.date}
					</div>
				)}
			</div>
		)
	}
}
