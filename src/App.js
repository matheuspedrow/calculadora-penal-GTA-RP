import React, { Component } from 'react'
import { Checkbox, Input, Button } from 'antd';
import TextInputs from './components/TextInputs';
import { crimes } from './utils/constants';
import { alertMessage } from './utils/alert';
import "./App.css";
const { TextArea } = Input;

export default class App extends Component {
  state = {
    totalSentence: 0,
    totalFee: 0,
    markedSentences: ""
  };

  calculateSentence = ({ target }) => {
    let { value, checked } = target;
    this.setState(( prevState ) => ({
      totalSentence: checked 
        ? prevState.totalSentence + value[0] : prevState.totalSentence - value[0],
      totalFee: checked 
        ? prevState.totalFee + value[1] : prevState.totalFee - value[1],
      markedSentences: `${prevState.markedSentences} ${value[2]}\n`
    }));
  };

  copyContent = () => {

  }

  render() {
    const { totalSentence, totalFee, markedSentences } = this.state;
    const maxSentence = 200;
    const currency = totalFee.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return (
      <>
        <div className="main-content">
          {crimes.map(({ titulo, artigos }) => (
            <div key={ titulo }>
              <h1>{titulo}</h1>
              {artigos.map(({ nome, pena, multa }, index) => (
                <div key={ index }>
                  <Checkbox 
                    onChange={ this.calculateSentence } 
                    value ={[pena, multa, nome]}
                  >
                    {nome}
                  </Checkbox>               
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="input-boxes">
          <TextInputs
            value={currency}
            title="Multa:"
            icon="💸"
          />  
          <TextInputs
            value={currency}
            title="Fiança:"
            icon="💸"
          />     
            <TextInputs
              value={totalSentence > maxSentence 
                ? `${maxSentence} meses` : `${totalSentence} meses`}
              title="Pena:"
              icon="⚖️"
            />
        </div>
        <div className='sentence-box'>
          <TextArea 
            className='sentence-input'
            value={ markedSentences }
            autoSize={ { minRows: 6, maxRows: 6 } }
          /> 
         <Button
          style={{
            margin: '30px',
          }}
          type="primary" 
          size="large"
          onClick={() => {
            navigator.clipboard.writeText(markedSentences);
            alertMessage();
          }}
         >
          Primary
        </Button>         
        </div>
     
      </>
    )
  }
}
