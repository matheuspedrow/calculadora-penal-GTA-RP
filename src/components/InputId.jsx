import React, { Component } from 'react';
import { Input } from 'antd';

export default class InputData extends Component {
	render() {
		const { handleChange } = this.props;
		return (
			<>
			<h2 className='prisoner-info'>RG: </h2>
				<Input
					style={
						{
							width: 300,
							height: 40,
							fontSize: '24px',
							padding: '0 10px',
						}
					}
          type="number"
					className="input-data"
					placeholder="Rg do preso" 
					min="0"
					name="id"
					onChange={ handleChange }
				/>
			</>
		);
	}
}
