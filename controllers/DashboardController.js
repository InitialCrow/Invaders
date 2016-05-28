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
                	});
	},
	'showProfile' : function(req, res, mysql){
		ProfileController.init(req, res, mysql);
	}
};
/*----------------------helper function-------------------*/

module.exports = new DashboardController();