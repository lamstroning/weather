import React from 'react';
import NewCard from './NewCard';

export default class ShortNews extends React.Component {
	render() {
		return (
			<div className='short-news'>
				<NewCard title='Заголовок' description='Описание'/>
			</div>
		)
	}
}