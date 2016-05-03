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

var HomeController = function() {
	
};

HomeController.prototype = {
	'log' : function(req, res) {
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
	},
	'sign': function(req,res){
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
	},
	'gotTo' :function(res,req){
		
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