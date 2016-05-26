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



// socket ..
var userConnected = []; // list of current connected users to chat
var history  = []; // history of chat message save in one instance

var ChatController = function() {
	
};

ChatController.prototype = {
	'initChat' : function(io, socket, fs){

		if(_session.user){
			
			userConnected.push(_session.nickname);
			
			userConnected = userConnected.unique();
			io.emit('users_chat_list', userConnected);
			socket.on('first_load', function(){

				socket.emit('msg_receiver', history);
			});
			socket.on('msg_sended',function(msg){
				history.push(msg);
				fs.writeFile('./controllers/chatHistory/historyChat.json', JSON.stringify(history, null, 4) ); 
				io.emit('msg_receiver', history);
			});
			return;

		}	
	}
};
/*----------------------helper function-------------------*/
Array.prototype.unique=[].unique||function(){var o={},i,l=this.length,r=[];for(i=0;i<l;i++)o[this[i]]=this[i];for(i in o)r.push(o[i]);return r}

module.exports = new ChatController();