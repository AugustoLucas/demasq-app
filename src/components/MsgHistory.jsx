import { Link } from "react-router-dom";

function MsgHistory() {
    let temp = JSON.parse(localStorage.getItem('msgHistoryData'))
    let msgHistoryData = (temp == null) ? [] : temp

    return (
        <ul>
            {
            msgHistoryData.reverse().map(message => 
                <Link to={`/resultado?text=${message.text}&sender=${message.sender}`} title='Acessar mensagem'>
                <li className="msgPreview">
                    <p>
                        {message.text}
                        <br />
                        <span style={{fontSize:'0.8rem'}}>
                            ENVIADA POR {message.sender}
                        </span>
                    </p>
                    <img className="icon" src="/assets/avancar-icon.svg" />
                </li>
                </Link>
            )}
        </ul>
    );
}

export default MsgHistory;