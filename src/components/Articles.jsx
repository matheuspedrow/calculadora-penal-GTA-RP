import React, { Component } from 'react';
import { Checkbox } from 'antd';


export default class Articles extends Component {
	render() {
		const { titulo, artigos, handleChange } = this.props;
		return (
			<>
				<div>
					<h1 className="art-title">{titulo}</h1>
					{artigos.map(({ nome, pena, multa }, index) => (
						<div key={ nome }>
							<Checkbox 
								style={{
									padding: 5,
									fontSize: 17,
								}}
								onChange={ handleChange } 
								value ={[pena, multa, nome]}
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
