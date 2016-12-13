
var React = require('react');
var PropTypes = React.PropTypes;
var ReactDOM = require('react-dom');

var InfoPanel = React.createClass({

	propTypes: {
		myTurn: React.PropTypes.bool.isRequired,
		color: React.PropTypes.number.isRequired,
		myScore:  React.PropTypes.number.isRequired,
		opponentScore: React.PropTypes.number.isRequired,
		gameStarted: React.PropTypes.bool.isRequired
	},

	render: function() {
		if (!this.props.gameStarted) {
			return (<div className="info"> Game not started. Next person to enter will start game.</div>);
		} else {
			return (      
				<div>
			        <div  className="info"> Current turn: </div> 
			        <div  className="turn" style={{"backgroundColor": (this.props.myTurn === (this.props.color === 1)) ? "#AA1411" : "#178DDC"}}> </div>
			        <div  className="info"> Your Color: </div> 
			        <div  className="turn" style={{"backgroundColor": this.props.color === 1 ? "#AA1411" : "#178DDC"}}> </div> 
			        <div  className="info"> Your Score: {this.props.myScore} Opponent Score: {this.props.opponentScore} </div>
			        <br/>
		      </div> );
		}
	}
});

module.exports = InfoPanel;