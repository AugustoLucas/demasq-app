import './App.css'
import React from 'react';
import { useNavigate } from 'react-router-dom'
import MsgHistory from './components/MsgHistory.jsx'

function App() {
  let temp = JSON.parse(localStorage.getItem('msgHistoryData'))
  let messages = (temp == null) ? new Array() : temp

  const [value, setValue] = React.useState('');
  const navigate = useNavigate()

  const storeMessage = (text, sender) => {
    messages.push({
      text: text,
      sender: sender
    })
    localStorage.setItem('msgHistoryData', JSON.stringify(messages));
  };

  const analisar = event => {
    let text = document.getElementById('inputMsg').value
    let sender = document.getElementById('inputSender').value.replace(/\D/g, '')
    
    if (text && sender) {
      if (sender.length >= 3 && sender.length <= 13) {
        storeMessage(text, sender)
        navigate(`/resultado?text=${text}&sender=${sender}`)
      } else {
        alert('Número inválido')
      }
    } else {
      alert('Preencha o texto da mensagem e o número que enviou a mensagem')
    }
  }

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


      <p>Descubra se a mensagem que você recebeu do banco é legítima ou suspeita. Basta informar o texto da mensagem e o número que a enviou:</p>
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
          })}>Colar número</button>
      </div><br />

      <button id='btnAnalisar' type='submit' onClick={analisar}>ANALISAR</button>

      

      <hr className='divider' />

      <h3>Últimas mensagens analisadas</h3>
      <a className='limparHistorico' onClick={limparHistorico}>
        <img className="icon" src="../assets/trash-icon.svg" />
        Limpar histórico
      </a>
      <MsgHistory />
    </div>

    
  );
}

export default App
