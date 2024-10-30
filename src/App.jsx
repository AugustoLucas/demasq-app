import './App.css'
import React from 'react';
import { Form, Link } from 'react-router-dom'
import MsgHistory from './components/MsgHistory.jsx'

function App() {
  let temp = JSON.parse(localStorage.getItem('msgHistoryData'))
  let messages = (temp == null) ? new Array() : temp

  const [value, setValue] = React.useState('');

  const storeMessage = event => {
    let text = document.getElementById('inputMsg').value
    let sender = document.getElementById('inputSender').value

    messages.push({
      text: text,
      sender: sender
    })
    localStorage.setItem('msgHistoryData', JSON.stringify(messages));
  };

  const limparHistorico = event => {
    localStorage.clear()
    setValue()
  }

  return (
    <div className="App">
      <header className="App-header">
        <span className='logo'>
          <img className='mainLogo' src='icon2.png' />
          <h1>Demasq</h1>
          </span>
      </header>

      <Form method='get' action='/resultado'>
        <div className='inputContainer'>
          <textarea id='inputMsg' className='input' name='text' rows={10} cols={30} />
          <button
            id='btnColarMensagem'
            className='btnColar'
            type='button'
            onClick={(e) => navigator.clipboard.readText()
              .then(text => {
                document.getElementById('inputMsg').innerText = text;
            })
            .catch(err => {
              console.error('Failed to read clipboard contents: ', err);
            })}>Colar mensagem </button>     
        </div><br />

        <div className='inputContainer'>
          <input type='text' id='inputSender' className='input' name='sender' />
          <button
            className='btnColar'
            type='button'
            onClick={(e) => navigator.clipboard.readText()
              .then(text => {
                document.getElementById('inputSender').value = text;
            })  
            .catch(err => {
              console.error('Failed to read clipboard contents: ', err);
            })}>Colar</button>
        </div><br />

        <button id='btnAnalisar' type='submit' onClick={storeMessage}>ANALISAR</button>
      </Form>

      <hr className='divider' />

      <h3>Últimas mensagens analisadas</h3>
      <button onClick={limparHistorico}>Limpar histórico</button>
      <MsgHistory />
    </div>

    
  );
}

export default App