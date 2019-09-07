// React & Styling.
import React from 'react';
import './Square.scss';

// Components
import XShape from '../XShape';
import OShape from '../OShape';

const Square = props => {
  const { position, selected } = props;
  return (
    <section
      onClick={() => {
        if (!position.fill.active) return selected(position);
      }}
      className={`square square-${position.i}-${position.j}`}>
      <span className="square-name">{position.name}</span>
      {position.fill.active && (position.fill.isX ? <XShape /> : <OShape />)}
    </section>
  );
};

export default Square;
