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
    y: PropTypes.number.isRequired,
    alive: PropTypes.bool.isRequired,
    ours: PropTypes.bool.isRequired,
  },

  getDefaultProps: function () {
    return {
      key: 0,
      color: 0,
      index: 0, 
      x: 0,
      y: 0,
      alive: false, 
      ours: true,
    };
  },

  onCellClick: function () {
    this.props.store.dispatch(actions.cellClicked(this.props.index));
  },

  render: function () {
    var color = this.props.ours ? this.props.color : 3 - this.props.color;

    if (!this.props.alive) {
      return <span className='cell-component cell' onClick={this.onCellClick}></span>;
    } else {
      return (<div className='cell-component cell' onClick={this.onCellClick}>
                <div className={color == 1 ? 'circle red' : 'circle blue'}>

                </div>
              </div>) ;
    }
  }
});

module.exports = Cell;
