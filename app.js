var express = require('express');
var path = require('path');
var ejs = require('ejs');
var socket = require('socket.io');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


var port = process.env.PORT || 3000;
app.set('port', port);

// Use the EJS rendering engine for HTML located in /views
app.set('views', __dirname + '/views');
app.engine('html', ejs.__express);
app.set('view engine', 'html');

// Host static files on URL path
app.use(express.static(path.join(__dirname, 'public')));

// Use express Router middleware for root path
// app.use(app.router);

app.get('/', function(req, res) {
	res.render('index');
});


var flag = false;

var roomNames = {};
io.on('connection', function(socket) {

	socket.emit('news', {
		hello: 'world'
	});

	socket.emit('setcolor', flag ? 2 : 1);
	flag = !flag;

	roomNames[socket.id] = 'main';

	socket.on('addMe', function(name) {
		if (roomNames[socket.id]) {
			var name2 = roomNames[socket.id];
			if (name2 == name) {
				socket.emit('Already in room');
				return;
			} else {
				socket.broadcast.to(name2).emit('playerDisc', {});
			}
		}
		roomNames[socket.id] = name;
		var room = io.sockets.adapter.rooms[name];
		if (!room) {
			socket.join(name);
			// socket.broadcast.to(name).emit('addedToRoom', {length: 0, color: 2});
			socket.emit('addedToRoom', {
				length: 0,
				roomName: name
			});
			socket.emit('setcolor', 1);
		} else if (room.length === 1) {
			socket.join(name);
			socket.broadcast.to(name).emit('addedToRoom', {
				length: 1,
				roomName: name
			});
			socket.emit('setcolor', 2);
			socket.emit('addedToRoom', {
				length: 1,
				roomName: name
			});
		} else {
			socket.emit('room_taken', {});
		}
	});

	socket.on('makeMove', function(data) {
		console.log(JSON.stringify(data));
		socket.broadcast.to(data.roomName).emit('makeMove', data.index);
	});

	socket.on('resign', function(roomName) {
		socket.broadcast.to(roomName).emit('resign');
	});

	socket.on('disconnect', function() {
		var name = roomNames[socket.id];
		delete roomNames[socket.id];
		socket.broadcast.to(name).emit('playerDisc', {});
	})
});

// Start server
server.listen(app.get('port'), function() {
	console.log('Express game server listening on port ' + port);
});