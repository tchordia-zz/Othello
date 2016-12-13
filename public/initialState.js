// CIS 197 - React HW

var side = 8;
var x = 48;
var y = 36;

var center = [27, 28, 27 + 8, 28 + 8];

var cells = Array.apply(null, Array(side * side)).map(function (c, index) {
	var alive = center.includes(index);
    return {ours: true, alive:alive};
  });

module.exports = exports = {
  cells: cells,
  x: x,
  y: y,
  color: 0,
  myTurn: false,
  myScore: 2,
  opponentScore: 2,
  gameStarted: false,
  roomName: "main",
  roomEmpty: true
};
