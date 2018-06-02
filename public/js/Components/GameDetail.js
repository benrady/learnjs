import React from 'react';
import ReactDOM from 'react-dom';

const GameDetail = (props) => {
    return (
        <tr>
            <td>{props.game.name}</td>
            <td>{props.game.description}</td>
            <td>{props.game.url}</td>
        </tr>
    );
}

export default GameDetail;