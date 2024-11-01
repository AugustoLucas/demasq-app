import { Link, useLocation } from "react-router-dom";
import { Message } from './api/Message.js'
import  Analisys  from "./api/Analisys.js";

function Resultado() {
    const search = new URLSearchParams(useLocation().search)
    const message = new Message(search.get('text'), search.get('sender'))
    const analise = Analisys.execute(message)
    
    return (
        <div className="Resultado page">
            <header className="App-header">
                <Link className="backIcon" to={'/'}>
                    <img className="icon" src="../assets/back-icon.svg" />
                </Link>
                <h2>Analisar mensagem</h2>
            </header>
            <span id="msgTextContainer" className="input">
                <p>
                    {message.text}
                </p>
                <p style={{textAlign:'right', fontSize:'0.8rem'}}>
                    REMETENTE {message.sender}
                </p>
            </span>

            <div className="resAnaliseContainer">
                <img className="resultadoIcon" src={`../public/assets/${analise.result}.svg`} />
                <h3>{analise.result}</h3>
            </div>

            <ul className="tipsList">
                {analise.tips.map(tip => 
                    <li className="tip">
                        <img src="../public/assets/alert.svg" />
                        <p>{tip}</p>
                    </li>
                )}
            </ul>
            
        </div>
    );
}

export default Resultado