import React, { Component } from 'react';
import { Input } from 'antd';

export default class InputData extends Component {
	render() {
		return (
			<>
				<Input
					style={
						{
							width: 300,
							borderRadius: '5px',
							border: '3px solid #e8e8e8',
							padding: '0 10px',
							fontSize: '24px',
							marginBottom: '10px'
						}
					}
					className="input-data"
					placeholder="Nome do preso" 
				/>
			</>
		);
	}
}
