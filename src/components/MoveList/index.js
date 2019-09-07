// React & Styling.
import React from 'react';
import './MoveList.scss';

const MoveList = props => {
  const { moves, onGoBacK, reset } = props;
  return (
    <section className="move-list">
      <div className="top-title">
        <h1>History Game:</h1>
        <button onClick={reset}>reset</button>
      </div>
      {moves &&
        moves.map((move, idx) => {
          return (
            <div
              className="move"
              onClick={() => onGoBacK(idx)}
              key={idx}>
              {`Player ${move.player} chose ${move.position.name} square`}
            </div>
          );
        })}
        <footer>**Note that you can click on any move you made to step back**</footer>
    </section>
  );
};

export default MoveList;
