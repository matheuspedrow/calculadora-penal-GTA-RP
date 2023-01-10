import React, { Component } from 'react';
import { Input } from 'antd';

export default class TextInputs extends Component {
	render() {
		const { value, title, icon} = this.props;	
		return (
			<>
				<h2>
				{`${icon} ${title}`}
				</h2>
				<Input
					style={
						{
							width: 300,
							borderRadius: '5px',
							border: '3px solid #e8e8e8',
							padding: '0 10px',
							fontSize: '24px',
							marginBottom: '20px'
						}
					}
					className="text-content"
					placeholder="Basic usage" 
					value={value}
				/>
			</>
		);
	}
}
