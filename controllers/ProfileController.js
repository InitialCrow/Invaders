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





var ProfileController = function() {
	
};

ProfileController.prototype = {
	'init':function(req, res, mysql_use){
		req.params = 'token';
		var _session = req.session;

		var select = "SELECT * FROM users WHERE token='"+_session.token+"'";

		mysql_use.query(select, function(err, user, field){
		
			if(user[0].validate == 1){
				var selectProfil = "SELECT profiles.avatar, profiles.presentation, scores.score FROM profiles, scores WHERE  profiles.user_id ='"+user[0].id+"' AND scores.user_id ='"+user[0].id+"'";
				mysql_use.query(selectProfil, function(err2,profile,field2){

					var selectPost = "SELECT users.nickname, posts.content_post, posts.id  FROM users, posts  WHERE posts.user_id ='"+user[0].id+"' AND users.id ='"+user[0].id+"'";
					
					mysql_use.query(selectPost, function(err3,posts,field3){
						var comments = [];
						
						var post_count =0;
						posts.forEach(function(post){
							
							var selectComment = "SELECT comments.content_com, comments.nickname, comments.post_id FROM comments WHERE post_id='"+post.id+"'"; 
							mysql_use.query(selectComment, function(err4, comment, field4){
								post_count++;
								for(var i =0; i< comment.length; i++){
									comments.push(comment[i]);
								}
								if(post_count === posts.length){
									res.render('dashboard/dashboard-profile.ejs',{
						                			  'session':_session,
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
	'postStatus' : function(req, res, mysql_use){
		req.params = 'token';
		var _session = req.session;
		var post_content = req.body.content;
		
		var insert = "INSERT INTO Invaders.posts ( user_id, content_post, nickname) VALUES ('"+_session.user_id+"','"+post_content+"' , '"+_session.nickname+"');"
		mysql_use.query(insert, function(){
			res.send(true);
		});

		
	},
	'commentStatus' : function(req, res, mysql_use){
		req.params = 'token';
		var _session = req.session;
		var comment_content = req.body.content;
		var post_id = req.body.post_id;
		var insert = "INSERT INTO Invaders.comments ( user_id, content_com, post_id, nickname) VALUES ('"+_session.user_id+"','"+comment_content+"' ,'"+post_id+"','"+_session.nickname+"');"
		mysql_use.query(insert, function(){
			res.send(true);
		});

		
	}
};
/*----------------------helper function-------------------*/

module.exports = new ProfileController();