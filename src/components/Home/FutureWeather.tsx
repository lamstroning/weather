import React from 'react';
import {getForcastWeather, TFutureWeather} from '../../service/weather';

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
		getForcastWeather(3, 'Moscow').then((forecast) => this.setState(() => ({forecast})))
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
