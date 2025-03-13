import React from 'react'

const GameBoard = ({ changeActivePlayer, board }) => {


    // const [gameBoard, setGameBoard] = useState(initialGameBoard)

    // const handleClick = (rowIndex, colIndex) => {
    //     setGameBoard((previousGameBoard) => {
    //         const updatedGameBoard = [...previousGameBoard.map(previousRow => [...previousRow])]
    //         updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedGameBoard; 
    //     })

    //     changeActivePlayer();
    // }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li >
                    <ol key={rowIndex} >
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => (changeActivePlayer(rowIndex, colIndex))} disabled={playerSymbol !== null} np>
                                    {playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li >
            ))}
        </ol >
    )
}

export default GameBoard