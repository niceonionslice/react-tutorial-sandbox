import React from 'react';
import Board from './Board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
    }
  }

  // 次のプレイヤーを決定する
  handleNextPlayer() {
    this.setState({
      xIsNext: !this.state.xIsNext,
    })
  }

  render() {
    return (
      <div className='game'>
        <div className='game-board'>
          <Board nextplaer={this.state.xIsNext} onClick={() => this.handleNextPlayer()}/>
        </ div>
        <div className='game-info'>
          <div>{/* status */}</ div>
          <ol>{/* TODO */}</ ol>
        </ div>
      </ div>
    );
  }
}

export default Game;
