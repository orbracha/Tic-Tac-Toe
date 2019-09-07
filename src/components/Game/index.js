// React & Styling
import React, { Component } from 'react';
import './Game.scss';

// Components
import Board from '../Board';
import MoveList from '../MoveList';
import Modal from '../Modal';

class Game extends Component {
  state = {
    // --- winning modal ( shown when true )
    isShowModal: false,
    // --- winning modal content
    txt: null,
    // --- Game Board
    // - i - board line num.
    // - j - board column num.
    // - fill - determines shape (isX - true / false) & if displayed (active - true / false ).
    // - name - description square lable.
    board: [
      [
        { i: 0, j: 0, fill: { isX: null, active: false }, name: 'A' },
        { i: 0, j: 1, fill: { isX: null, active: false }, name: 'B' },
        { i: 0, j: 2, fill: { isX: null, active: false }, name: 'C' }
      ],
      [
        { i: 1, j: 0, fill: { isX: null, active: false }, name: 'D' },
        { i: 1, j: 1, fill: { isX: null, active: false }, name: 'E' },
        { i: 1, j: 2, fill: { isX: null, active: false }, name: 'F' }
      ],
      [
        { i: 2, j: 0, fill: { isX: null, active: false }, name: 'G' },
        { i: 2, j: 1, fill: { isX: null, active: false }, name: 'H' },
        { i: 2, j: 2, fill: { isX: null, active: false }, name: 'I' }
      ]
    ],
    // --- counting the number of moves.
    movesCounter: 1,
    // --- is game currently running. ( false - disable actions )
    isGameOn: true,
    // --- keep track of game moves ( used for history )
    moves: [],
    // --- currently playing player 
    playerTurn: 1
  };

  // Square selection functionallity.
  SquareSelected = ({ i, j }) => {
    // --- if game is offline then disable movements.
    if (!this.state.isGameOn) return;
    // --- board obj copy & manipulation.
    const board = Object.assign({}, this.state.board);
    board[i][j].fill.active = true;
    board[i][j].fill.isX = Boolean(this.state.playerTurn === 1);
    // --- updating the relevant state pieces.
    this.setState({
      board,
      playerTurn: this.state.playerTurn === 1 ? 2 : 1,
      movesCounter: (this.state.movesCounter + 1),
      moves : [...this.state.moves, { position: board[i][j], player: this.state.playerTurn }]
    });
    // --- after 4 moves start checking for winner.
    console.log(this.state.movesCounter)
    if (this.state.movesCounter > 4) {
      // --- check current move is Win move
      const result = this.isGameOver(i, j);
      if (result) {
        // --- result options
        const arr = ['PLAYER 1 WON', 'PLAYER 2 WON', "IT'S A TIE"];
        // --- display modal with relevant result.
        this.toggleModal(arr[result - 1]);
        // --- disable game.
        this.setState({
          isGameOn: false
        });
      }
    }
  };

  // --- Check if game is over based on current move.
  isGameOver = (i, j) => {
    // --- board & Counters calculate if win achieved.
    const { board } = this.state;
    let winCounterRowX = 0;
    let winCounterRowO = 0;
    let winCounterCulX = 0;
    let winCounterCulO = 0;
    let winCounterDiagMainX = 0;
    let winCounterDiagMainO = 0;
    let winCounterDiagSecX = 0;
    let winCounterDiagSecO = 0;

    // --- running through rows & cols, updating relevant counters.
    for (let x = 0; x < 3; x++) {
      if (board[i][x].fill.active) {
        if (board[i][x].fill.isX) winCounterRowX++;
        else winCounterRowO++;
      }
      if (board[x][j].fill.active) {
        if (board[x][j].fill.isX) winCounterCulX++;
        else winCounterCulO++;
      }
      if (board[x][x].fill.active) {
        if (board[x][x].fill.isX) winCounterDiagMainX++;
        else winCounterDiagMainO++;
      }
      if (board[x][2 - x].fill.active) {
        if (board[x][2 - x].fill.isX) winCounterDiagSecX++;
        else winCounterDiagSecO++;
      }
    }
    // --- check if win achieved. 
    // console.log(winCounterCulX)
    if (
      winCounterRowO === 3 ||
      winCounterCulO === 3 ||
      winCounterDiagMainO === 3 ||
      winCounterDiagSecO === 3
    )
      return 2;
    if (
      winCounterRowX === 3 ||
      winCounterCulX === 3 ||
      winCounterDiagMainX === 3 ||
      winCounterDiagSecX === 3
    )
      return 1;
    if (this.state.movesCounter === 9) return 3;
    return null;
  };

  // ---  reset board function.
  reset = () => {
    const { board } = this.state;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[i][j].fill.active = false;
        board[i][j].fill.isX = null;
      }
    }
    // --- reset relevant state fields.
    this.setState({
      board,
      movesCounter: 1,
      isGameOn: true,
      playerTurn: 1,
      moves: []
    });
  };

  // --- return to pervious moves functionallity.
  goBack = idx => {
    let { moves, board, movesCounter } = this.state;
    const oldMoves = moves.slice(idx + 1);
    moves = moves.slice(0, idx + 1);
    for (let index = 0; index < oldMoves.length; index++) {
      let { i, j } = oldMoves[index].position;
      board[i][j].fill.active = false;
      board[i][j].fill.isX = null;
    }
    this.setState({
      board,
      moves,
      movesCounter: movesCounter - oldMoves.length,
      isGameOn: true,
      playerTurn: moves[moves.length - 1].player === 1 ? 2 : 1
    });
  };

  // --- toggle modal, display text if provided.
  toggleModal = (txt = null) => {
    this.setState({ txt, isShowModal: !this.state.isShowModal });
  };

  render() {
    // --- destructure pieces from state.
    const { isShowModal, txt, board, moves, isGameOn, playerTurn } = this.state;
    return (
      <section className="game-container">
        <header>
          <h1>Tic Tac Toe</h1>
        </header>
        {isShowModal && <Modal txt={txt} toggleModal={this.toggleModal} />}
        <div className="game-borad">
          <MoveList moves={moves} onGoBacK={this.goBack} reset={this.reset} />
          <Board
            SquareSelected={this.SquareSelected}
            board={board}
            toggleModal={this.toggleModal}
            isGameOn={isGameOn}
            playerTurn={playerTurn}
          />
        </div>
      </section>
    );
  }
}

export default Game;
