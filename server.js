// config ...
var config = require('./config.js');
// init module ...

var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var server = http.createServer(app); 
var session = require('express-session');
var io = require('socket.io').listen(server);

//mysql
// connect database
var db = require('./models/Database.js');
//set database to mysql
var mysql_use = db.mysqlDB();

var initSocket = false;



app.use(session({
    secret: '1234',
    name: 'Invaders-sess',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

// controllers ...
var HomeController = require('./controllers/HomeController.js');
var DashboardController = require('./controllers/DashboardController.js');

// app set ...
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// end of init-------------------------------------------------------------

app.use(express.static(path.join(__dirname + '/')));
// routes of app 
app.get('/',function (req, res) {
      _session= req.session;
      if(_session.user){
            
            res.redirect('/inv/'+_session.token);
      }
      else{
            res.render('home/index.ejs');
      }
	
	
});
app.post('/log',function (req, res) {

	HomeController.log(req, res, mysql_use);
});
app.post('/sign',function (req, res) {
	HomeController.sign(req, res, mysql_use);

});
app.get('/sign/confirm_email/:token',function (req, res) {
      HomeController.confirmEmail(req, res,mysql_use, function(){
        res.render('home/confirmEmail.ejs');

        res.end();
      });
});
app.get('/inv/:token/logout',function(req,res){
        _session=req.session;
        _session.destroy();
        res.redirect("/");
});
app.get('/inv/:token',function(req,res){
      	_session=req.session;
          if(_session.user){
            if(initSocket === false){
              DashboardController.initSocket(io,fs);
              initSocket = true;
            }
           req.params = 'token';
                res.render('dashboard/dashboard.ejs',{
                  'session':_session
                });
                
          }
          else{
            res.redirect("/");
          }
});
app.get('/inv/:token/profile',function(req,res){
        _session=req.session;
          if(_session.user){
           DashboardController.showProfile(req, res, mysql_use);
          }
          else{
            res.redirect("/");
          }
});

app.post('/inv/:token/profile/post-status', function(req, res){
        _session=req.session;
        if(_session.user){
           DashboardController.postStatus(req, res, mysql_use);
        }
          else{
            res.redirect("/");
        }
});
app.post('/inv/:token/profile/post-comment', function(req, res){
        _session=req.session;
        if(_session.user){
           DashboardController.commentStatus(req, res, mysql_use);
        }
          else{
            res.redirect("/");
        }
});


server.listen(config.PORT1);
console.log('Server running at '+ config.BASE_URL + config.PORT1);

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