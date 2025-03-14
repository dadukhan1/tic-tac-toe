import { useState } from "react"
import GameBoard from "./components/GameBoard.jsx"
import Player from "./components/Player.jsx"
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from './winningCombination.js';
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
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



const derivedGameBoard = (gameTurn) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurn) {
    let { square, player } = turn;
    let { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

const derivedWinner = (gameBoard, playerName) => {
  let winner = false;

  for (let combination of WINNING_COMBINATIONS) {
    const firstCombination = gameBoard[combination[0].row][combination[0].column];
    const secondCombination = gameBoard[combination[1].row][combination[1].column];
    const thirdCombination = gameBoard[combination[2].row][combination[2].column];

    if (firstCombination !== null && firstCombination === secondCombination && firstCombination === thirdCombination) {
      winner = playerName[firstCombination]; // Store the winning player ('X' or 'O')
    }
  }
  return winner;
}

function App() {
  const [playerName, setPlayerName] = useState(PLAYERS)
  const [gameTurn, setGameTurn] = useState([]);

  const gameBoard = derivedGameBoard(gameTurn);
  const winner = derivedWinner(gameBoard, playerName);

  let activePlayer = derivedActivePlayer(gameTurn);
  let gameDraw = gameTurn.length === 9 && !winner;

  const handleActivePlayer = (rowIndex, colIndex) => {
    setGameTurn((prevTurn) => {
      let currentPlayer = derivedActivePlayer(prevTurn);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurn
      ];
      return updatedTurns;
    });
  }

  const handleReset = () => {
    setGameTurn([]);
  }

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayerName(prevName => {
      return {
        ...prevName,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container" >
        <ol id="players" className="highlight-player">
          <Player name={playerName.X} symbol={"X"} isActive={activePlayer === 'X'} playerNameChange={handlePlayerNameChange} />
          <Player name={playerName.O} symbol={"O"} isActive={activePlayer === 'O'} playerNameChange={handlePlayerNameChange} />
        </ol>
        {(winner || gameDraw) && <GameOver winner={winner} onReset={handleReset} />}
        <GameBoard changeActivePlayer={handleActivePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurn} />
    </main>
  )
}

export default App
