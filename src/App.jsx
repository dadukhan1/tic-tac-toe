import { useState } from "react"
import GameBoard from "./components/GameBoard.jsx"
import Player from "./components/Player.jsx"
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from './winningCombination.js';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function derivedActivePlayer(gameTurn) {
  let currentPlayer = 'X';

  if (gameTurn.length > 0 && gameTurn[0].player === 'X')
    currentPlayer = 'O';

  return currentPlayer;
}

function App() {
  const [gameTurn, setGameTurn] = useState([]);

  let gameBoard = initialGameBoard;

  for (const turn of gameTurn) {
    let { square, player } = turn;
    let { row, col } = square;
    gameBoard[row][col] = player;
  }
  let activePlayer = derivedActivePlayer(gameTurn);
  let winner;


  for (let combination of WINNING_COMBINATIONS) {

    const firstCombination = gameBoard[combination[0].row][combination[0].column];
    const secondCombination = gameBoard[combination[1].row][combination[1].column];
    const thirdCombination = gameBoard[combination[2].row][combination[2].column];
    if (firstCombination !== null && firstCombination === secondCombination && firstCombination === thirdCombination) {
      winner = firstCombination; // Store the winning player ('X' or 'O')
      console.log(winner);
      break;
    }

  }

  const handleActivePlayer = (rowIndex, colIndex) => {
    setGameTurn((prevTurn) => {
      let currentPlayer = derivedActivePlayer(prevTurn);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurn
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container" >
        <ol id="players" className="highlight-player">
          <Player name="player 1" symbol={"X"} isActive={activePlayer === 'X'} />
          <Player name="player 2" symbol={"O"} isActive={activePlayer === 'O'} />
        </ol>
        {winner && <p> You won {activePlayer} !!! </p>}
        <GameBoard changeActivePlayer={handleActivePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurn} />
    </main>
  )
}

export default App
