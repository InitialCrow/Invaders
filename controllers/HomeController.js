/*need modules : 
 - http
 - fs
 - path
 - express
 - mysql
 - bodyParser
 - session

 this modules are load in server.js

*/

// connect database
var db = require('../models/Database.js');
//set database to mysql
var mysql_use = db.mysqlDB();
var mailer = require('../models/Sender_email.js');


var HomeController = function() {
	
};

HomeController.prototype = {
	'log' : function(req, res) {
		var login = req.body.login.trim().replace(/(<([^>]+)>)/ig,"");
		var password = req.body.password.trim().replace(/(<([^>]+)>)/ig,"");
		
		var selectQuery = "SELECT * FROM users WHERE login LIKE'"+login+"' AND password='"+password+"'";
		
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
				_session.token = result[0].token;
				res.send('/inv/'+result[0].token);
				res.end();
			}
			
		});
	},
	'sign': function(req,res){
		var login = req.body.login.trim().replace(/(<([^>]+)>)/ig,"");
		var password = req.body.password.trim().replace(/(<([^>]+)>)/ig,"");
		var email = req.body.email.trim().replace(/(<([^>]+)>)/ig,"");
		var nickname = req.body.nickname.trim().replace(/(<([^>]+)>)/ig,"");
		var token = generateToken(20);
		var checked = false;
		var url = req.originalUrl;

		var selectQuery = "SELECT * FROM users WHERE login LIKE '"+login+"' OR nickname LIKE '"+nickname+"' OR email='"+email+"' ";
		var insertQuery = "INSERT INTO users (login,nickname,password,email,token,validate) VALUES('"+login+"', '"+nickname+"','"+password+"','"+email+"','"+token+"','0');";

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
				_session.home_url = 'http://192.168.0.44:8000/inv'+token;
				
				res.send([true,token]);
				

				console.log(login +' was subscribe ! confirm mailsending to ... '+email);
				
				var mail ={
					to : email,
					subject : 'Invaders-game Confirm your email',
					html : "<head><style>body{font-family : verdana;}</style></head><body><h1> Welcome " +login+" </h1><p>you need confim your email for join the battle <a href =http://192.168.0.44:8000"+url+"/confirm_email/"+token+"> click here</a> to confirm </p></body>"
				};
				mailer.sendNodemailer('smtp',mail.to,mail.subject,mail.html);// type send, to, subject, html
				res.end();
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
	},
	'confirmEmail' :function(res,req, callback){
		var url = req.req.url;
		var part = url.split('/');
		var token = part[part.length-1];
		var updateQuery ="UPDATE Invaders.users SET validate = '1' WHERE users.token LIKE '"+token+"' ; ";
	
		mysql_use.query(updateQuery,function(err, result, field){
			
			if (err){
				console.log('confirm mail error : ' + err);
			}
			else{
				console.log('mail confirmed !! for token_user : ' + token);
				callback();
				return;

			}
		});
		



		
	}
};
/*----------------------helper function-------------------*/
function generateToken(nb){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

    for( var i=0; i < nb; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
module.exports = new HomeController();