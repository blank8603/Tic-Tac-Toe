import { useState } from "react";



export default function GameBoard({onselectSquare ,board}){


    return (
        
        <ol id = "game-board">
        <h2>Game Board</h2>
        {board.map((row,rowindex)=> (
        <li key={rowindex}>
            <ol>
                {row.map((playerSymbol , colIndex)=>( 
                    <li key={colIndex}>
                        <button onClick={()=> onselectSquare(rowindex,colIndex)} disabled={playerSymbol!== null}>{playerSymbol}</button>
                    </li>
                ))}   
            </ol>
        </li>))}
    </ol>
    );
}