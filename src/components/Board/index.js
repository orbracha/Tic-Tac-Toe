// React & Styling
import React from 'react';
import './Board.scss';

// Components
import Square from '../Square';


const Board = props => {
  const { SquareSelected, board, playerTurn, isGameOn } = props;
  return (
    <section className="board-container">
      <div className="square-container">
        {board[0].map((position, idx) => (
          <Square selected={SquareSelected} position={position} key={idx} />
        ))}
        {board[1].map((position, idx) => (
          <Square selected={SquareSelected} position={position} key={idx} />
        ))}
        {board[2].map((position, idx) => (
          <Square selected={SquareSelected} position={position} key={idx} />
        ))}
      </div>
      {isGameOn && (
        <h1 className="player-turn">
          Waiting for your move, {playerTurn === 1 ? 'Player 1' : 'Player 2 '}
        </h1>
      )}
    </section>
  );
};

export default Board;
