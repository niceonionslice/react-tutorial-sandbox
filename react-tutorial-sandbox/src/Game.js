import React from 'react';
import Board from './Board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const squares = history[history.length - 1].squares.slice();
    if(this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        { squares: squares }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    })
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for(let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  getStatus(squares){
    const winner = this.calculateWinner(squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    return status;
  }

  // history.mapには何が格納されている？
  // mapは実は３つの引数を取得することが可能（配列の値、配列のインデックス、現在処理中の配列）
  getMoves(history) {
    const moves = history.map((step, move) => {
      console.log(step);
      console.log(move);
      const desc = move ?
        'Go to move #' + move :
          'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    return moves
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const squares = history[this.state.stepNumber].squares;

    return (
      <div className='game'>
        <div className='game-board'>
          <Board squares={squares} onClick={i => this.handleClick(i)}/>
        </ div>
        <div className='game-info'>
          <div>{this.getStatus(squares)}</ div>
          <ol>{this.getMoves(history)}</ ol>
        </ div>
      </ div>
    );
  }
}

export default Game;
