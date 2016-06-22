(function(ctx, $){
	var app = {
		init : function(){
			// disconect socket on click anv button
			var $nav_disconect = $('.navy-btn');
			$nav_disconect.on('click', function(evt){
				socket.emit('disconnect');
			});
			this.post_content();
		},
		post_content : function(){
			var $post_btn = $('.post-btn');
			var $comment_btn = $('.comment_btn');
			

			$post_btn.on('click', function(evt){
				var $form = $('form');
				var $this = $(this).attr('data-type');
				evt.preventDefault();
				//if post is a status or comment
				if($this === 'post'){
					$form.attr('action', 'profile/post-status');
				
					$.ajax({
			 			url: $form.attr('action'),
			 			method : $form.attr('method'),
			 			data :{'content' : $('.post-content').val()},	
			 			success : function(res){
			 				
			 			},
			 			error : function(res){
			 				alert('sorry bug ajax try update your browser or contact me');
			 				}
			 			});
				}
				else if($this === 'comment'){
					$form.attr('action', 'profile/post-comment');
					
					var comment_content = $(this).parent().find('textarea').val();					
					$.ajax({
			 			url: $form.attr('action'),
			 			method : $form.attr('method'),
			 			data : {'content' : comment_content , 'post_id': $(this).attr('data-post-id')},	
			 			success : function(res){
			 				
			 			},
			 			error : function(res){
			 				alert('sorry bug ajax try update your browser or contact me');
			 			}
			 		});
					
				}
			});
		}
	};
	var self = app;
	ctx.app = app;
})(window, jQuery);