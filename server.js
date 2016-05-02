
// init module ...

var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var session = require('express-session');
var app = express();
var server = app.listen(8000,'127.0.0.1');

// app set ...

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var _session;
app.use(session({
    secret: '1234',
    name: 'test',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

var mysql_use = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'Invaders'
});

mysql_use.connect(function(err){
	if(!err) {
	    console.log("Database is connected ... nn");    
	} else {
	    console.log("Error connecting database ... nn");    
	}
});
// end of init-------------------------------------------------------------


// routes of app 
app.get('/',function (req, res) {
	res.render('index.ejs');
	app.use(express.static(path.join(__dirname + '/')));
});
app.post('/log',function (req, res) {
	var login = req.body.login.trim().replace(/(<([^>]+)>)/ig,"");
	var password = req.body.password.trim().replace(/(<([^>]+)>)/ig,"");
	
	var selectQuery = "SELECT * FROM users WHERE login LIKE'%"+login+"%' AND password='"+password+"'";
	mysql_use.query(selectQuery,function(err, result, field){
		var msg = "";
		if(result == ""){

			msg = "<p><strong>Login</strong> or Password are not good !</p>";
			
			res.send([false,msg]);
			res.end();
			
		}
		else{
			_session=req.session;
			_session.user = login;
			res.send('/inv/'+result[0].token);
			res.end();
		}
		
	});
});
app.post('/sign',function (req, res) {
	var login = req.body.login.trim().replace(/(<([^>]+)>)/ig,"");
	var password = req.body.password.trim().replace(/(<([^>]+)>)/ig,"");
	var email = req.body.email.trim().replace(/(<([^>]+)>)/ig,"");
	var nickname = req.body.nickname.trim().replace(/(<([^>]+)>)/ig,"");
	var token = generateToken(20);
	var checked = false;

	var selectQuery = "SELECT * FROM users WHERE login LIKE '%"+login+"%' OR nickname LIKE '%"+nickname+"%' OR email='"+email+"' ";
	var insertQuery = "INSERT INTO users (login,nickname,password,email,token) VALUES('"+login+"', '"+nickname+"','"+password+"','"+email+"','"+token+"');";

	mysql_use.query(selectQuery,function(err, result, field){
		var msg={
			'type':'',
			'msg':''
		};
		if(result == ""){
			checked = true;	
		}
		else{
			checked = false;		
		}
		if( checked === true){
			mysql_use.query(insertQuery);

			_session=req.session;
			_session.user = login;
			
			res.send([true,token]);
			res.end();
			console.log('new user comming !');
		}
		else{
			if(login === result[0].login){
				msg.type = 'login';
				msg.msg = "<p><strong>Login</strong> already taken !</p> ";
			}
			
			if(nickname === result[0].nickname){
				msg.type = "nickname";
				msg.msg = "<p><strong>Nickname</strong> already taken !</p> ";
			}
			
			if(email === result[0].email){
				msg.type = "email";
				msg.msg = "<p><strong>Email</strong> already taken !</p> ";
			} 
			
			res.send([false,msg]);
			res.end();	
		}
	});

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

function generateToken(nb){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

    for( var i=0; i < nb; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}



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