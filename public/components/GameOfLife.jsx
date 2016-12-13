// CIS 197 - React HW

var _ = require('lodash');
var React = require('react');
var PropTypes = React.PropTypes;
var Cell = require('./Cell.jsx');
var actions = require('../actions/index.js');
var initialState = require('../initialState.js');
var ReactDOM = require('react-dom');
var InfoPanel = require('./InfoPanel.jsx');
var sideLength = 8;


var GameOfLife = React.createClass({
  propTypes: {
    store: React.PropTypes.object.isRequired,
    socket: React.PropTypes.object.isRequired
  },

  call: function (pass){
    this.props.store.dispatch(pass);
  },
  
  componentDidMount: function () {
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
    }.bind(this)); 

    var socket = this.props.socket;

  },

  getInitialState: function () {
    return initialState;
  },

  newGame: function () {
    console.log("NEW STARTED");
    this.props.store.dispatch(actions.gameStart(this.initialState));
  },

  resign: function () {
    this.props.store.dispatch(actions.resign());
  },

  joinRoom: function(event) {
    console.log(" JOIN ROOM " + this.input.value);
    if (this.input.value == "main") {
      alert('CANNOT JOIN MAIN');
    } else { 
      this.props.socket.emit('addMe', this.input.value);
    }
    event.preventDefault();
  },

  render: function () {

    var outarr = [];
    for (var i = 0; i < sideLength; i++) {
      var inarr = [];
      for (var j = 0; j < sideLength; j++) {
         inarr.push(<Cell store={this.props.store} x={i} y={j} key={i*sideLength + j} 
            index={i*sideLength + j} color={this.state.color} 
            alive={this.state.cells[i*sideLength + j].alive} 
            ours={this.state.cells[i*sideLength + j].ours}/>);
      }
      outarr.push(<div className="board-row" key={i}> {inarr}</div>);
    }

    const element = 
    <div>
        <InfoPanel 
        myTurn={this.state.myTurn} color={this.state.color}
        myScore =   {this.state.myScore} 
        opponentScore={this.state.opponentScore}
        gameStarted= {this.state.gameStarted}
        />

      <div className="game-component">
          <div className="board-component">
            {outarr}
          </div>

          <div className="controls">
            <h4>Controls</h4>
            <button onClick={this.resign}>Resign</button>
          </div> <br/>

          <div>
            <div className="info"> Join Room: (Current: {this.state.roomName}), Opponent Here: </div> 
            <div className="turn" style={{"backgroundColor": this.state.roomEmpty ? "#DD1111" : "#11DD11"}}> </div>
             <form onSubmit={this.joinRoom}>
              <label>
                Name:
                <input type="text" ref={(input) => this.input = input} />
              </label>
              <input type="submit" value="Submit" />
              </form>
           </div>
      </div>

     </div>;
    return element;
  }
});

module.exports = GameOfLife;
