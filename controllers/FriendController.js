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
var FriendController = function() {
	
};

FriendController.prototype = {
	'init' : function(req, res, mysql_use){
		req.params = 'token';
		var _session = req.session;
		var selectUser = "SELECT * FROM users WHERE token='"+_session.token+"'";

		mysql_use.query(selectUser, function(err, user, field){
			if(user[0].validate == 1){
				var select = "SELECT * FROM friends WHERE user_id1='"+_session.user_id+"'AND validate = '1'";
				mysql_use.query(select, function(err,relationship,field){
					for(var i=0; i<relationship.length; i++){
						var selectFriend = "SELECT * FROM profiles WHERE user_id="+relationship[i].user_id2;
						mysql_use.query(selectFriend,function(err2,profiles,field2){
							
							res.render('dashboard/dashboard-friend',{
								'profiles' : profiles,
							});
						});
					}
					

				})
				
			}
			else{
				res.send('please valid your email for acces profile option');
				res.end();
			}
		});

	},
	'showFriendProfile':function(req, res, mysql_use){
		
		var _session = req.session;

		var select = "SELECT * FROM users WHERE id='"+req.params.id+"'";

		mysql_use.query(select, function(err, user, field){
		
			if(user[0].validate == 1){
				console.log(user[0])

				
				var selectProfil = "SELECT profiles.avatar, profiles.presentation, scores.score FROM profiles, scores WHERE  profiles.user_id ='"+user[0].id+"' AND scores.user_id ='"+user[0].id+"'";
				mysql_use.query(selectProfil, function(err2,profile,field2){


					var selectPost = "SELECT posts.nickname, posts.content_post, posts.id  FROM users, posts  WHERE posts.user_id ='"+user[0].id+"' AND users.id ='"+user[0].id+"'";
					
					mysql_use.query(selectPost, function(err3,posts,field3){
						var comments = [];
						posts.reverse();// put last post on the top
						
						var post_count =0;

						if(posts == ''){
							res.render('dashboard/dashboard-profile.ejs',{
						                			  'nickname' : user[0].nickname,
						                			  'profile': profile[0],
						                			  'posts': posts,
						                			  'comments':comments
						             })
						}
						posts.forEach(function(post){
							
							var selectComment = "SELECT comments.id, comments.content_com, comments.nickname, comments.post_id FROM comments WHERE post_id='"+post.id+"'"; 
							mysql_use.query(selectComment, function(err4, comment, field4){
								post_count++;

								for(var i =0; i< comment.length; i++){
									comments.push(comment[i]);
								}
								if(post_count === posts.length){

									res.render('dashboard/dashboard-profile.ejs',{
						                			  'nickname' : user[0].nickname,
						                			  'profile': profile[0],
						                			  'posts': posts,
						                			  'comments':comments
						                		});
						             	
								}

							})

						});
					});	
				});	
			}
			else{
				res.send('please valid your email for acces profile option');
				res.end();
			}
		});

	},
	'postFriendStatus' : function(req, res, mysql_use){

		var _session = req.session;
		var select = "SELECT * FROM users WHERE id='"+req.params.id+"'";
		var post_content = req.body.content;

		mysql_use.query(select, function(err, user, field){
			var insertQuery = "INSERT INTO Invaders.posts ( user_id, content_post, nickname) VALUES ('"+user[0].id+"','"+post_content+"' , '"+_session.nickname+"');";
			var result = {'post_nickname':_session.nickname, 'post_content': post_content}; //res of request
			mysql_use.query(insertQuery, function(){
				res.send(result);
			});
		});
		
		
	},
	

};
/*----------------------helper function-------------------*/

module.exports = new FriendController();