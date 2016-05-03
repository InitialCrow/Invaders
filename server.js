
// init module ...

var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require("body-parser");

var app = express();
var server = app.listen(8000,'127.0.0.1');
var session = require('express-session');

app.use(session({
    secret: '1234',
    name: 'test',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

// controllers ...
var HomeController = require('./controllers/HomeController.js');

// app set ...
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// end of init-------------------------------------------------------------


// routes of app 
app.get('/',function (req, res) {
	res.render('index.ejs');
	app.use(express.static(path.join(__dirname + '/')));
});
app.post('/log',function (req, res) {
	HomeController.log(req, res);
});
app.post('/sign',function (req, res) {
	HomeController.sign(req, res);

});
app.get('/inv/:token',function(req,res){
      	_session=req.session;
          if(_session.user){
            req.params = 'token';
            res.render('test.ejs');
          }
          else{
            res.redirect("/");
          }
	
})

console.log('Server running at http://192.168.0.44:8000/');

// -------------------------------helper function---------------------





// -----------------obsolète been----------------

// var io = require('socket.io').listen(server);
// io.sockets.on('connection', function (socket) {
			
//         	socket.on('login',function(obj){
//         		console.log('player connected');
//         		socket.emit('loged',obj)
//         	});
//         	socket.on('move',function(obj){
//         		socket.broadcast.emit('player_move',obj)

//         	})

// });

// var filePath = '.' + request.url;
// if (filePath == './')
// 	filePath = './index.html';
	
// var extname = path.extname(filePath);
// var contentType = 'text/html';
// switch (extname) {
// 	case '.js':
// 		contentType = 'text/javascript';
// 		break;
// 	case '.css':
// 		contentType = 'text/css';
// 		break;
// }

// fs.readFile(filePath, function(error, content) {
// 	if (error) {
// 		response.writeHead(500);
// 		response.end();
// 	}
// 	else {
// 		response.writeHead(200, { 'Content-Type': contentType });
// 		response.end(content, 'utf-8');
// 	}
// });