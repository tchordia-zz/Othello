// CIS 197 - React HW

var side = 8;
var x = 48;
var y = 36;

module.exports = exports = {
  cells: Array.apply(null, Array(side * side)).map(function () {
    return 0;
  }),
  x: x,
  y: y
};
