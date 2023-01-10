import React, { Component } from 'react';
import { Checkbox } from 'antd';
import { atenuants } from '../utils/constants';

export default class Atenuants extends Component {
	render() {
		const { titulo, artigos } = atenuants;
		const { handleChange } = this.props;
		return (
			<>
				<div>
					<h1 className="art-title">{titulo}</h1>
					{artigos.map(({ nome, reduction }, index) => (
						<div key={ nome }>
							<Checkbox 
								style={{
									padding: 5,
									fontSize: 17,
								}}
								onChange={ handleChange } 
								value ={[nome, reduction]}
							>
								{nome}
							</Checkbox>               
						</div>
					))}
				</div>				
			</>
		);
	}
}
