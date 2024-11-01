//import { messages } from "../database";

import { type } from "os"
import { Link } from "react-router-dom";

function MsgHistory() {
    let temp = JSON.parse(localStorage.getItem('msgHistoryData'))
    let msgHistoryData = (temp == null) ? [] : temp

    return (
        <ul>
            {
            msgHistoryData.reverse().map(message => 
                <Link to={`/resultado?text=${message.text}&sender=${message.sender}`}>
                <li className="msgPreview">
                    <p>
                        {message.text}
                    </p>
                    <img className="icon" src="../assets/avancar-icon.svg" />
                </li>
                </Link>
            )}
        </ul>
    );
}

export default MsgHistory;