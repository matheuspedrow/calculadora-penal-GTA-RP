import React, { Component } from 'react'
import { Input, Button } from 'antd';
import TextInputs from './components/TextInputs';
import InputName from './components/InputName';
import InputId from './components/InputId';
import Articles from './components/Articles';
import Atenuants from './components/Atenuants';
import { crimes } from './utils/constants';
import { alertMessage } from './utils/alert';
import "./App.css";
const { TextArea } = Input;

export default class App extends Component {
  state = {
    name: '',
    id: 0,
    totalSentence: 0,
    totalFee: 0,
    atenuantFee: 1,
    markedSentences: [],
    markedAtenuants: []
  };

  removeSentence = (sentenceArray, sentence) =>
    sentenceArray.filter((currentSentence) => currentSentence !== sentence);

  removeAtenuant = (removeAtenuant, atenuant) =>
    removeAtenuant.filter((currentAtenuant) => currentAtenuant !== atenuant);

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

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleAtenuants = ({ target }) => {
    const { value, checked } = target;
    this.setState((prevState) => ({
      atenuantFee: !checked   
        ? prevState.atenuantFee + value[1] : prevState.atenuantFee - value[1],
      markedAtenuants: !checked
        ? this.removeAtenuant(prevState.markedAtenuants, value[0])
        : [...prevState.markedAtenuants, value[0]]
    }));
  }

  arrayToString = (array) => {
    return array.sort().join('\n');
  };

  showAtenuants = () => {
    const { markedAtenuants } = this.state;
    let atenuantString = "# ATENUANTES:"
    for (let atenuant of markedAtenuants) {
      atenuantString = `${atenuantString}\n* ${atenuant}`
    }
    return atenuantString;
  }

  render() {
    const { totalSentence, totalFee, markedSentences, name, id, atenuantFee } = this.state;
    const maxSentence = 200;
    let sentenceCalculated = totalSentence >= maxSentence 
    ? Math.ceil(maxSentence * atenuantFee) 
    : Math.ceil(totalSentence * atenuantFee);
    sentenceCalculated = sentenceCalculated <= 1 ? 0 : sentenceCalculated;
    const sentences = this.arrayToString(markedSentences)
    const currency = totalFee.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    const clipboard = `# INFORMAÇÕES DO PRESO:
* NOME: ${name}
* RG: ${id}\n
# PENA TOTAL: ${sentenceCalculated} meses (${Math.ceil(atenuantFee * 100)}%)
# MULTA: ${currency}\n
# CRIMES:
${sentences}\n
${this.showAtenuants()}
`;

    return (
      <>
        <h1 className="title">Informações do Preso</h1>
        <div className="prisoner-content">
          <div>
            <InputName handleChange={ this.handleChange }/>
          </div>
          <div>
            <InputId handleChange={ this.handleChange }/>
          </div>          
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
            <Atenuants handleChange={ this.handleAtenuants }/>
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
                value={`${sentenceCalculated} Meses`}
                title="Pena"
                icon="⚖️"
              />
          </div>
          <div className='sentence-clipboard'>
            <TextArea 
              className='sentence-input'
              value={ sentences }
              autoSize={ { minRows: 6, maxRows: 6 } }
            /> 
          <Button
            className="copy-button"
            type="primary" 
            size="large"
            onClick={() => {
              navigator.clipboard.writeText(clipboard);
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
