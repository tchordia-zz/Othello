// CIS 197 - React HW

var React = require('react');
var PropTypes = React.PropTypes;
var actions = require('../actions/index.js');

var Cell = React.createClass({
  propTypes: {
    store: PropTypes.object.isRequired,
    color: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  },

  getDefaultProps: function () {
    return {
      key: 0,
      color: 0,
      index: 0, 
      x: 0,
      y: 0,
    };
  },

  onCellClick: function () {
    // TODO: Write the code to dispatch the action corresponding to the
    //       clicking of a cell at a particular index.
    this.props.store.dispatch(actions.cellClicked(this.props.index));
    // console.log("click " + this.props.x + " " + this.props.y);
  },

  render: function () {

    if (this.props.color == 0) {
      return <span className="cell-component cell" onClick={this.onCellClick}></span>;
    } else {
      return (<div className="cell-component cell" onClick={this.onCellClick}>
                <div className={this.props.color == 1 ? "circle red" : "circle blue"}>

                </div>
              </div>) ;
    }
  }
});

module.exports = Cell;
