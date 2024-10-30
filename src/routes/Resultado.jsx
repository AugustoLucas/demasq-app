import { BrowserRouter, Link, Router, useActionData, useLocation, useParams } from "react-router-dom";
import { Message } from '../api/Message.js'
import  Analisys  from "../api/Analisys.js";

function Resultado() {
    const search = new URLSearchParams(useLocation().search)
    const message = new Message(search.get('text'), search.get('sender'))
    
    return (
        <div className="Resultado page">
            <header className="App-header">
                <Link className="backIcon" to={'/'}>
                    <img className="icon" src="../back-icon.svg" />
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

            {Analisys.execute(message).tips.map(tip => 
                <p>{tip}</p>
            )}
            <h3>{Analisys.execute(message).resultado}</h3>
        </div>
    );
}

export default Resultado