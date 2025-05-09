import { useState } from "react"
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log.jsx"
import { WINNING_COMBINATIONS }  from "./wining-combinations.js"
import Gameover from "./components/Gameover.jsx"

const PLAYERS ={
  X: 'Player 1',
  O: 'Player 2'
}

  const initialGameboard =[
    [null,null,null],
    [null,null,null],
    [null,null,null],
  ];

function deriveWinner(gameboard,players){
  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol =gameboard[combination[0].row][combination[0].column];
    const SecondSquareSymbol =gameboard[combination[1].row][combination[1].column];
    const ThirdSquareSymbol =gameboard[combination[2].row][combination[2].column];
    if(firstSquareSymbol&& firstSquareSymbol === SecondSquareSymbol&& firstSquareSymbol === ThirdSquareSymbol){
      winner = players[firstSquareSymbol];
    }
    
  }
  return winner;
}

function deriveGameBoad(gameturns){
  let gameboard = initialGameboard.map(row => [...row]);;
  for(const turn of gameturns){
      const {square ,player} = turn;
      const {row,col} = square;
      gameboard[row][col] = player
          
  }
  return gameboard;
  
}


function deriveactiveplayer(gameturns){
  let currentPlayer = 'X';  
      
  if(gameturns.length>0 && gameturns[0].player==='X'){
      currentPlayer ='O';
  }

  return currentPlayer;

  }

function App() {



  const [gameturns,setGameturns] = useState([]);
  const [players,setplayers] = useState(PLAYERS)
    

  
  const activeplayer  = deriveactiveplayer(gameturns);  
  const gameboard = deriveGameBoad(gameturns);
  const winner = deriveWinner(gameboard,players);
  const hasDraw = gameturns.length ===9 &&!winner;


  function handleSelectplayer(rowindex,colIndex){
  
    setGameturns(prevTurns =>{

      const currentPlayer = deriveactiveplayer(prevTurns);

      const updatedTurns = [{square:{row:rowindex ,col: colIndex},player:currentPlayer},...prevTurns]
      return updatedTurns;
    });
  }
  function handleRematch(){
    setGameturns([]);
  }

  function handlePLayerNameChange(symbol,newName){
    setplayers(prevPlayers=>{
      return{
      ...prevPlayers,
      [symbol]:newName
      }
    });
  }
  return (
      <main>
        <h1 >Tic-Tac-Toe</h1>
        <div id= "game-container">
          
          <ol id="players" className="highlight-player">
            <Player intialname ={PLAYERS.X} symbol ="X" isactive ={activeplayer==='X'} onChangeName={handlePLayerNameChange}/>
            <Player intialname ={PLAYERS.O} symbol ="O" isactive ={activeplayer==='O'} onChangeName={handlePLayerNameChange}/>
          </ol>
          
          {(winner || hasDraw) && <Gameover winner={winner} onRestart={handleRematch} />}
          <GameBoard onselectSquare={handleSelectplayer} board={gameboard}/>
          <button className="restart" onClick={handleRematch}>Restart</button>
        </div>
        <Log turns = {gameturns}/>
      </main>
      
  )
}

export default App;

// import { useState,useEffect } from "react";
// import Player from "./components/Player";
// import Gameover from "./components/Gameover";
// import { WINNING_COMBINATIONS } from "./wining-combinations.js";
// import GameBoard from "./components/GameBoard"
// import Log from "./components/Log.jsx"

// const initialGameboard = [
//   [null, null, null],
//   [null, null, null],
//   [null, null, null],
// ];

// function deriveactiveplayer(gameturns) {
//   let currentPlayer = "X";
//   if (gameturns.length > 0 && gameturns[0].player === "X") {
//     currentPlayer = "O";
//   }
//   return currentPlayer;
// }

// function App() {
//   const [player1Name, setPlayer1Name] = useState("player1");
//   const [player2Name, setPlayer2Name] = useState("player2");
//   const [gameturns, setGameturns] = useState([]);
//   const [winner, setWinner] = useState(null);

//   let gameboard = [...initialGameboard.map((array) => [...array])];
//   for (const turn of gameturns) {
//     const { square, player } = turn;
//     const { row, col } = square;
//     gameboard[row][col] = player;
//   }

//   const activeplayer = deriveactiveplayer(gameturns);
//   useEffect(() => {
//     // Check for a winner after every turn
//     for (const combination of WINNING_COMBINATIONS) {
//       const firstSquareSymbol =
//         gameboard[combination[0].row][combination[0].column];
//       const secondSquareSymbol =
//         gameboard[combination[1].row][combination[1].column];
//       const thirdSquareSymbol =
//         gameboard[combination[2].row][combination[2].column];

//       if (
//         firstSquareSymbol &&
//         firstSquareSymbol === secondSquareSymbol &&
//         firstSquareSymbol === thirdSquareSymbol
//       ) {
//         if (firstSquareSymbol === "X") {
//           setWinner(player1Name); // Player 1 wins
//         } else if (firstSquareSymbol === "O") {
//           setWinner(player2Name); // Player 2 wins
//         }
//         return; // Exit the loop if a winner is found
//       }
//     }

//     // Handle a draw condition
//     if (gameturns.length === 9 && !winner) {
//       setWinner(null); // It's a draw
//     }
//   }, [gameboard, gameturns, player1Name, player2Name, winner]);
    
//   const hasDraw = gameturns.length === 9 && !winner;
  

//   function handleSelectplayer(rowIndex, colIndex) {
//     setGameturns((prevTurns) => {
//       const currentPlayer = deriveactiveplayer(prevTurns);
//       const updatedTurns = [
//         { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
//         ...prevTurns,
//       ];
//       return updatedTurns;
//     });
//   }


//   function handleRematch(){
//     setGameturns([]);
//   }

//   return (
//     <main>
//       <div id="game-container">
//         <ol id="players" className="highlight-player">
//           <Player
//             intialname={player1Name}
//             symbol="X"
//             isactive={activeplayer === "X"}
//             setplayername={setPlayer1Name}
//           />
//           <Player
//             intialname={player2Name}
//             symbol="O"
//             isactive={activeplayer === "O"}
//             setplayername={setPlayer2Name}
//           />
//         </ol>
//         {(winner || hasDraw) && <Gameover winner={winner} onRestart={handleRematch} />}
//         <GameBoard onselectSquare={handleSelectplayer} board={gameboard}/>
//       </div>
//       <Log turns = {gameturns}/>
//     </main>
//   );
// }

// export default App;
