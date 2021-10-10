import React from 'react';
import logo from './logo.png'

type Props = {
	title: string;
	description: string;
}

export default class NewCard extends React.Component <Props> {
	constructor(props: Props) {
		super(props);
	}


	render() {
		return (
			<div className='news-card'>
				<div className='news-card__image'>
					<img src={logo} alt=''/>
				</div>
				<div className='news-card__title'>
					{this.props.title}
				</div>
				<div className='news-card__description'>
					{this.props.description}
				</div>
			</div>
		);
	}
}