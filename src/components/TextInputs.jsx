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
							width: 400,
							height: 60,
							borderRadius: '10px',
							border: '3px solid #d4d1c9',
							padding: '0 10px',
							fontSize: '30px',
							marginBottom: '20px',
							textAlign: 'center',
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
