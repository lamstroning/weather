import React from 'react';

export class Progress extends React.Component {
	render() {
		return (
			<div className='progress'>
				<div className='progress__bar'>
					<div className='progress__square progress__square_1'/>
					<div className='progress__square progress__square_2'/>
					<div className='progress__square progress__square_3'/>
					<div className='progress__square progress__square_4'/>
				</div>
			</div>
		)
	}
}
