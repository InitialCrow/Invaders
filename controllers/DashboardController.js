/*need modules : 
 - http
 - fs
 - path
 - express
 - mysql
 - bodyParser
 - session
 

 this modules are load in server.js

-chat
*/



var ChatController = require('./ChatController.js');
var ProfileController = require('./ProfileController.js');

var DashboardController = function() {
	
};

DashboardController.prototype = {
	'initSocket' : function( io, fs){
		
		io.sockets.on('connection', function (socket) {
                    		console.log("-> "+_session.user + " s'est connecter à la tavern !");
                    		ChatController.initChat(io,socket, fs);
                    		socket.on('disconnect',function(){
                    			ChatController.disconnect(io,socket, fs);
                    			socket.disconnect();

                    		});
                	});
		
	},
	'showProfile' : function(req, res, mysql){
		ProfileController.init(req, res, mysql);
	},
	'postStatus' : function(req, res, mysql){
		ProfileController.postStatus(req, res, mysql);
	},
	'commentStatus' : function(req, res, mysql){
		ProfileController.commentStatus(req, res, mysql);
	}
};
/*----------------------helper function-------------------*/

module.exports = new DashboardController();