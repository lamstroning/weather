import React from 'react';
import {getForcastWeather, TFutureWeather} from '../../service/weather';
import {getDate} from '../../utils/date';

type State = {
	forecast: TFutureWeather[]
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
				const forecastData:any = [];
				forecast.forecastday.forEach((forecast: any) =>
				{
					const forecastItem:any = {}
					forecastItem.date = getDate(forecast.date_epoch * 1000);
					forecastItem.icon = forecast.day.condition.icon.replace('//cdn.weatherapi.com', '/images');
					forecastItem.maxTemp = Math.round(forecast.day.maxtemp_c);
					forecastItem.minTemp = Math.round(forecast.day.mintemp_c);
					forecastData.push(forecastItem);
				})
				this.setState({
					forecast: forecastData
				})
				console.log(forecast);
			})
	}

	render() {
		return (
			<div className='container'>
				<div className='row weather'>
					{this.state.forecast.map((forecast, index) =>
						<div className='col weather__card' key={forecast.date}>
							<img src={forecast.icon} alt=''/>
							<div className='container'>
								<div className='row'>
									<div className='col'>
										{forecast.maxTemp > 0 ? `+${forecast.maxTemp}` : forecast.maxTemp}
									</div>
								</div>
								<div className='row'>
									<div className='col'>
										{forecast.minTemp > 0 ? `+${forecast.minTemp}` : forecast.minTemp}
									</div>
								</div>
							</div>
							<div className='weather__date'>
								{forecast.date}
							</div>
						</div>
					)}
				</div>
			</div>

		)
	}
}
