// CIS 197 - React HW
// import io from 'socket/io-client';
var _ = require('lodash');
var socket = io.connect('/');
var React = require('react');
var ReactDOM = require('react-dom');
var createStore = require('redux').createStore;
var GameOfLife = require('./components/GameOfLife.jsx');
var initialState = require('./initialState.js');
var actions = require('./actions/index.js');
var reducers = require('./reducers').mainReducer(socket, _.assign({}, initialState, {}));


var store = createStore(reducers, initialState);

var g = function (func) {
	return function (message) {
		store.dispatch(func(message));
	}
}

socket.on('makeMove', g(actions.oppMove));
socket.on('setcolor', g(actions.setColor));
socket.on('addedToRoom', g(actions.addedToRoom));
socket.on('resign', g(actions.resignOpp)); 
socket.on('playerDisc', g(actions.disc));
socket.on('room_taken', function() {
	alert('room taken');
});
socket.on('clear', g(actions.clear));

var gameOfLife = <GameOfLife store={store} socket={socket}/>;

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    gameOfLife,
    document.getElementById('container')
  );
});
