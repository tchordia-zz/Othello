// CIS 197 - React HW

exports.setColor = function (color) {
  return {
    type:'SET_COLOR',
    color: color 
  };
};

exports.oppMove = function (index) {
  return {
    type:'OPP_CLICKED',
    index: index 
  };
};

exports.addedToRoom = function (obj) {
  return {
    type: 'ADDED_ROOM',
    obj: obj
  }
}

exports.gameStart = function (state) {
  return {
    type:'GAME_START',
    state: state
  };
};

exports.disc = function () {
  return {
    type: 'DISC'
  }
}

exports.gameOver = function (state) {
  return {
    type:'GAME_END'
  };
};

exports.resign = function () {
  return {
    type:'RESIGN'
  };
};

exports.resignOpp = function () {
  return {
    type:'RESIGN_OPP'
  };
};


exports.cellClicked = function (index ) {
  return {
    type:'CELL_CLICKED',
    index:index
  };
};

exports.messageReceived = function(message) {
    return {
    type:'MESSAGE_RECEIVED',
    message: message
  };
}
