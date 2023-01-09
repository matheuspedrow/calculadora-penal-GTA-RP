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
					className="text-content"
					placeholder="Basic usage" 
					value={value}
				/>
			</>
		);
	}
}
