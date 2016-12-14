// CIS 197 - React HW

var _ = require('lodash');
// var initialState = require('../initialState.js');

var getReducer = function (socket, initialState) {
  return function (state, action) {
    var cells;
    var numUpd;
    switch (action.type) {
    case 'GAME_START':
      return _.assign({}, action.state, {
        gameStarted: true
      });

    case 'GAME_END':

      return _.assign({}, state, {
        color: state.color,
        myTurn: state.color === 1,
        gameStarted: true,
        roomName: state.roomName,
        roomEmpty: state.roomEmpty,
        cells: getCells(state)
      });

    case 'DISC':
      alert('YOU WIN! Opponent disconnected');
      return _.assign({}, initialState, {
        color: state.color,
        myTurn: state.color === 1,
        gameStarted: false,
        roomName: state.roomName,
        roomEmpty: true,
        cells: getCells(state)
      });

    case 'CLEAR':
      return _.assign({}, initialState, {
        color: state.color,
        myTurn: state.color === 1,
        gameStarted: true,
        roomName: state.roomName,
        roomEmpty: state.roomEmpty,
        cells: getCells(state)
      });

    case 'RESIGN_OPP':
      alert('YOU WIN! Opponent Resigned');
      return _.assign({}, initialState, {
        color: state.color,
        myTurn: state.color === 1,
        gameStarted: true,
        roomName: state.roomName,
        roomEmpty: state.roomEmpty,
        cells: getCells(state)
      });


    case 'RESIGN':
      if (state.gameStarted === false) {
        return state;
      }

      alert('You Lose!');
      socket.emit('resign', state.roomName);
      return _.assign({}, initialState, {
        color: state.color,
        myTurn: state.color === 1,
        gameStarted: true,
        roomName: state.roomName,
        roomEmpty: state.roomEmpty,
        cells: getCells(state)
      });

    case 'ADDED_ROOM':
      return _.assign({}, state, {
        roomName: action.obj.roomName,
        roomEmpty: (action.obj.length === 0),
        gameStarted: action.obj.length == 1
      });

    case 'SET_COLOR':
      console.log('SET_COLOR ' + JSON.stringify(action));
      // var ncells = updateCells(state);
      cells = state.cells.slice(0);

      cells[27].ours = action.color === 1;
      cells[28].ours = action.color !== 1;
      cells[27 + 8].ours = action.color !== 1;
      cells[28 + 8].ours = action.color === 1;


      return _.assign({}, state, {
        color: action.color,
        cells: cells,
        myTurn: action.color === 1
      });

    case 'EXPORT':
      var data = encodeURIComponent(state.cells);
      return document.location = '/export?data=[' + data + ']';

    case 'OPP_CLICKED':
      cells = state.cells.slice(0);

      if (state.myTurn || !state.gameStarted || !isLegal(cells, action.index)) {
        return _.assign({}, state, {
          cells: cells
        });
      }
      numUpd = updateBoard(cells, action.index, false);

      if (gameOver(state)) {
        return _.assign({}, initialState, {
          color: state.color,
          myTurn: state.color === 1,
          gameStarted: true,
          roomName: state.roomName,
          roomEmpty: state.roomEmpty,
          cells: getCells(state)
        });
      } else {
        return _.assign({}, state, {
          cells: cells,
          myTurn: !state.myTurn,
          opponentScore: state.opponentScore + numUpd + 1,
          myScore: state.myScore - numUpd
        });
      }

    case 'CELL_CLICKED':
      console.log('GAME ' + state.gameStarted);
      cells = state.cells.slice(0);
      if (!state.myTurn || !state.gameStarted || !isLegal(cells, action.index)) {
        return _.assign({}, state, {
          cells: cells
        });
      }
      socket.emit('makeMove', {
        roomName: state.roomName,
        index: action.index
      });

      numUpd = updateBoard(cells, action.index, true);

      if (gameOver(state)) {
        return _.assign({}, initialState, {
          color: state.color,
          myTurn: state.color === 1,
          gameStarted: true,
          roomName: state.roomName,
          roomEmpty: state.roomEmpty,
          cells: getCells(state)
        });
      } else {
        return _.assign({}, state, {
          cells: cells,
          myTurn: !state.myTurn,
          myScore: state.myScore + numUpd + 1,
          opponentScore: state.opponentScore - numUpd
        });
      }


    }
    return state;
  };
};

function getCells(state) {
  var side = 8;
  var cells = Array.apply(null, Array(side * side)).map(function (c, index) {
    var center = [27, 28, 27 + 8, 28 + 8];

    var alive = center.includes(index);
    return {
      ours: true,
      alive: alive
    };
  });

  cells[27].ours = state.color === 1;
  cells[28].ours = state.color !== 1;
  cells[27 + 8].ours = state.color !== 1;
  cells[28 + 8].ours = state.color === 1;

  return cells;
}

function gameOver(state) {
  if (state.myScore + state.opponentScore + 1 !== 64) {
    return false;
  }
  var str = (state.myScore > state.opponentScore) ? 'win' : (state.myScore === state.opponentScore) ? 'tie' : 'lose';
  alert('GAME OVER! You ' + str + '!');
  return true;
}

function indtocoord(index) {
  return {
    y: Math.floor(index / 8),
    x: index % 8
  };
}

function coordtoind(coord) {

  return 8 * coord.y + coord.x;
}

function l(index) {
  if (index % 8 === 0) {
    return -1;
  }
  return index - 1;
}

function r(index) {
  if (index % 8 === 7) {
    return -1;
  }
  return index + 1;
}

function u(index) {
  if (index / 8 === 0) {
    return -1;
  }
  return index - 8;
}

function d(index) {
  if (index / 8 === 7) {
    return -1;
  }
  return index + 8;
}

function lu(index) {
  return l(u(index));
}

function ld(index) {
  return l(d(index));
}

function ru(index) {
  return r(u(index));
}

function rd(index) {
  return r(d(index));
}

function inBounds(index) {
  return index >= 0 && index < 64;
}

function inBoundsCoords(coords) {
  return coords.x >= 0 && coords.x < 8 && coords.y >= 0 && coords.y < 8;
}


function isLegal(cells, index) {

  console.log('INDEXX ' + index + ' ' + inBounds(index) + ' ' + cells[index].alive);

  if (!inBounds(index) || cells[index].alive) {
    console.log('GGGG');
    return false;
  }
  var coords = indtocoord(index);

  var flag = false;

  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
      var c = {
        x: coords.x + i,
        y: coords.y + j
      };
      console.log('INDEX ' + index);

      if (!inBoundsCoords(c) || (i === 0 && j === 0)) {
        continue;
      }

      if (cells[coordtoind(c)].alive) {
        flag = true;
      }
    }
  }

  return flag;
}

function updateBoard(cells, index, ours) {
  cells[index].alive = true;
  cells[index].ours = ours;
  var i = 0;
  i += recUpdate(cells, u(index), u, ours).num;
  i += recUpdate(cells, d(index), d, ours).num;
  i += recUpdate(cells, r(index), r, ours).num;
  i += recUpdate(cells, l(index), l, ours).num;

  i += recUpdate(cells, lu(index), lu, ours).num;
  i += recUpdate(cells, ld(index), ld, ours).num;
  i += recUpdate(cells, ru(index), ru, ours).num;
  i += recUpdate(cells, rd(index), rd, ours).num;

  return i;

}

function recUpdate(cells, index, func, ours) {

  console.log('rec ' + index + ' ours ' + ours);
  if (!inBounds(index) || !cells[index].alive) {
    return {
      flag: false,
      num: 0
    };
  }

  if (cells[index].ours === ours) {
    console.log('return ' + true);
    return {
      flag: true,
      num: 0
    };
  }

  var doFlip = recUpdate(cells, func(index), func, ours);

  if (doFlip.flag) {
    console.log('UPDATING ' + index + ' ours ' + ours);
    cells[index].ours = ours;
    doFlip.num += 1;
  }

  return doFlip;
}

module.exports = exports = {
  mainReducer: getReducer
};