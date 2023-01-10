import React, { Component } from 'react'
import { Input, Button } from 'antd';
import TextInputs from './components/TextInputs';
import InputName from './components/InputName';
import InputId from './components/InputId';
import Articles from './components/Articles';
import { crimes } from './utils/constants';
import { alertMessage } from './utils/alert';
import "./App.css";
const { TextArea } = Input;

export default class App extends Component {
  state = {
    totalSentence: 0,
    totalFee: 0,
    markedSentences: []
  };

  removeSentence = (sentenceArray, sentence) => {
    const sentenceIndex = sentenceArray.indexOf(sentence);
    if (sentenceIndex < 0) return sentenceArray;
    console.log(sentenceArray, sentenceIndex);
    return sentenceArray.splice(sentenceIndex, 1);
  }

  calculateSentence = ({ target }) => {
    let { value, checked } = target;
    this.setState(( prevState ) => ({
      totalSentence: checked 
        ? prevState.totalSentence + value[0] : prevState.totalSentence - value[0],
      totalFee: checked 
        ? prevState.totalFee + value[1] : prevState.totalFee - value[1],
      markedSentences: !checked 
        ? this.removeSentence(prevState.markedSentences, value[2]) 
        : [...prevState.markedSentences, value[2]]
    }), () => {

    });
  };

  render() {
    const { totalSentence, totalFee, markedSentences } = this.state;
    const maxSentence = 200;
    const currency = totalFee.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return (
      <>
        <h1 className="title">Informações do Preso</h1>
        <div className="main-content">
          <InputName />
          <InputId />
        </div>
        <div className="main-content">
          <div className="article-main-box">
            <Articles
              titulo={ crimes[0].titulo }
              artigos={ crimes[0].artigos }
              handleChange={ this.calculateSentence }
            />
          </div>
          <div className="article-main-box">
            <Articles
              titulo={ crimes[1].titulo }
              artigos={ crimes[1].artigos }
              handleChange={ this.calculateSentence }
            />
            <hr 
              style={{
                marginTop: 30,
              }}
            ></hr>
             <Articles
              titulo={ crimes[2].titulo }
              artigos={ crimes[2].artigos }
              handleChange={ this.calculateSentence }
            />           
          </div>  
          <div className="article-main-box">
            <Articles
              titulo={ crimes[3].titulo }
              artigos={ crimes[3].artigos }
              handleChange={ this.calculateSentence }
            />
          </div>
          <div className="article-main-box">
            <div className="calculator-box">
            <h1>🧮 CALCULADORA</h1>
            <TextInputs
              value={currency}
              title="Multa"
              icon="💸"
            />  
            <TextInputs
              value={currency}
              title="Fiança"
              icon="💸"
            />     
              <TextInputs
                value={totalSentence > maxSentence 
                  ? `${maxSentence} Meses` : `${totalSentence} Meses`}
                title="Pena"
                icon="⚖️"
              />
          </div>
          <div className='sentence-clipboard'>
            <TextArea 
              className='sentence-input'
              value={ markedSentences }
              autoSize={ { minRows: 6, maxRows: 6 } }
            /> 
          <Button
            className="copy-button"
            type="primary" 
            size="large"
            onClick={() => {
              navigator.clipboard.writeText(markedSentences);
              alertMessage();
            }}
          >
            Copiar Dados
          </Button>                               
          </div>                    
        </div>    
      </div>
      </>
    )
  }
}
