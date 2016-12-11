// CIS 197 - React HW

var _ = require('lodash');
var React = require('react');
var PropTypes = React.PropTypes;
var Cell = require('./Cell.jsx');
var actions = require('../actions/index.js');
var initialState = require('../initialState.js');
var ReactDOM = require('react-dom');
var sideLength = 8;


var GameOfLife = React.createClass({
  propTypes: {
    store: React.PropTypes.object.isRequired
  },

  call: function (pass){
    this.props.store.dispatch(pass);
  }
  
  // Here we subscribe to changes in the store data and update
  // the React component's state by using `store.getState()`.
  // Technically this is non-standard architecture, but we need to
  // organize things this way for the sake of the game's performance.
  // NOTE: further down in the render function, you will need to
  //       access this.state.cells and this.state.x and this.state.y.
  //       For these attributes, be sure to use this.state and not this.props.
  componentDidMount: function () {
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
    }.bind(this));

      socket.on('init', this.);
      socket.on('send:message', this._messageRecieve);
      socket.on('user:join', this._userJoined);
      socket.on('user:left', this._userLeft);
      socket.on('change:name', this._userChangedName);
  },

  getInitialState: function () {
    return initialState;
  },

  onImportSeed: function (seedName) {
    this.props.store.dispatch(actions.importSeed(seedName));
  },

  // TODO: here you'll want to implement the functions that get called
  //       when various actions (such as button clicks) occur in thie view.
  //       These functions should, like onImportSeed above, dispatch the
  //       appropriate actions using the Redux store prop.

  run: function () {
    this.props.store.dispatch(actions.run());
  },

  step: function () {
    this.props.store.dispatch(actions.step());
  },

  stop: function () {
    this.props.store.dispatch(actions.stop());
  },

  clear: function () {
    this.props.store.dispatch(actions.clear());
  },

  export: function () {
    this.props.store.dispatch(actions.export());
  },

  getImport: function (str) {
    var that = this;
    return function () {
      that.onImportSeed(str);
    };
  },

  random: function () {
    this.props.store.dispatch(actions.randomSeed());
  },


  // TODO: Generate the following HTML structure:
  // <div class="game-component">
  //   <div class="board-component" style="width=900px">
  //     <span class="cell-widget cell"></span>
  //     <span class="cell-widget cell"></span>
  //     <span class="cell-widget cell alive "></span>
  //      ...remaining cells
  //   </div>
  //   <div class="controls">
  //     <h4>Controls</h4>
  //     <button>run</button>
  //     <button>step</button>
  //     <button>stop</button>
  //     <button>clear</button>
  //     <button>export</button>
  //   </div>
  //   <div class="seeds">
  //     <button>glider</button>
  //     <button>glider gun</button>
  //     <button>acorn</button>
  //     <button>line</button>
  //     <button>random</button>
  //   </div>
  // </div>
  //
  // HINT: Use the `onClick` prop on your buttons to register click callbacks!
  // NOTE: Please make sure your button text matches the button text above,
  //       as this is necessary for the test suite.
  //       (e.g. your 'step' button should have button text 'step',
  //        and your 'glider gun' button should have button text 'glider gun')
  // HINT: Remember to pass the store as a prop of each <Cell> component
  // HINT: Remember that the application state's `x`, `y`, and `cells` values
  //       are located in this.state and not this.props.
  render: function () {

    var outarr = [];
    for (var i = 0; i < sideLength; i++) {
      var inarr = [];
      for (var j = 0; j < sideLength; j++) {
         inarr.push(<Cell store={this.props.store} x={i} y={j} key={i*sideLength + j} index={i*sideLength + j} color={this.state.cells[i*sideLength + j]}/>);
      }
      outarr.push(<div className="board-row" key={i}> {inarr}</div>);
    }


    const element = 
   <div className="game-component">
     <div className="board-component" style={{width:'900px'}}>
      {outarr}
    </div>
    <div className="controls">
      <h4>Controls</h4>
      <button onClick={this.run}>run</button>
      <button onClick={this.step}>step</button>
      <button onClick={this.stop}>stop</button>
      <button onClick={this.clear}>clear</button>
      <button onClick={this.export}>export</button>
    </div>
    </div>;
    return element;
  }
});

module.exports = GameOfLife;
