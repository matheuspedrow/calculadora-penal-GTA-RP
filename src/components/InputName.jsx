import React, { Component } from 'react';
import { Input } from 'antd';

export default class InputData extends Component {
	render() {
			const { handleChange } = this.props;
		
		return (
			<>
				<h2 className='prisoner-info'>Nome: </h2>
				<Input
					style={
						{
							width: 300,
							height: 40,
							padding: '0 10px',
							fontSize: '24px',
							marginBottom: '10px'
							
						}
					}
					className="input-data"
					placeholder="Nome do preso"
					onChange={ handleChange }
					name="name"
				/>
			</>
		);
	}
}
