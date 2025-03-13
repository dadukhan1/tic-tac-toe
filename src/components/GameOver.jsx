import React from 'react';

const GameOver = ({ winner, onReset }) => {
    return (
        <div id='game-over'>
            <h2>GameOver</h2>
            {winner && <p>{winner} won !</p>}
            {!winner && <p>It's a draw</p>}
            <p>
                <button onClick={onReset}>Reset</button>
            </p>
        </div>
    )
}

export default GameOver