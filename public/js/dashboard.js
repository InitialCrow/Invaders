(function(ctx, $){
	var app = {
		init : function(){
			// disconect socket on click anv button
			var $nav_disconect = $('.navy-btn');
			$nav_disconect.on('click', function(evt){
				socket.emit('disconnect');
			});
			this.post_content();
			this.update_profile();
		},
		update_profile : function(){
			var update_mode = false;
			var $update_btn = $('.update-profile-btn');
			$update_btn.on('click', function(){
				var $header = $('.main-header');
				var $child_header = $('.main-header').children();
				var $profile_text = $('.profile-text');
				var $news_profile = $('.news-profile');
				var $avatar = $('.profile-img');
				var dataKeeper = {
					'original_presentation' : $profile_text[0].outerText.trim(),
					'original_avatar' : $avatar.attr('src'),
				};

			
				if(update_mode === false){
				
					// update mode enable
					update_mode  = true;
					
					$news_profile.css('display','none');
					$header.empty();
					$profile_text.empty();
					$header.append("<form class='update-form' action='profile/modify' method='post' enctype='multipart/form-data'></form>");
					
					for(var i = 0; i<$child_header.length; i++){
					
						$('.update-form').append($child_header[i]);
					}
					$('.update-form').append("<input type='file' name='avatar' id='avatar-img-file' style='display:none'></input>");
					$avatar.on('mouseover',function(){
						$avatar.css('cursor','pointer');
					})
					$avatar.on('click',function(){
						$("input[id='avatar-img-file']").click();

						
					})

					$profile_text.append("<textarea name='presentation' placeholder='write your presentation here' class='form-control' row='5'>"+dataKeeper.original_presentation+"</textarea>");
					
				}
				else{
					// update mode disable

					update_mode = false;

					// take presentation text value
					$profile_text = $profile_text.children().val();

					$update_form_content = $('.update-form').children();
					$('.update-form').submit();
				
					// $.ajax({
			 	// 		url: $('.update-form').attr('action'),
			 	// 		method : $('.update-form').attr('method'),
			 	// 		data : {'presentation' : $profile_text ,'avatar_file':$avatar_obj },
			 	// 		success : function(res){
			 	// 			$('.update-form').remove();
			 	// 			$header.append($update_form_content);
			 	// 			$('.profile-text > textarea').remove();
			 	// 			$('.profile-text').append("<p>"+$profile_text+"</p>")
			 	// 			$news_profile.css('display','block')
			 				
			 	// 		},
			 	// 		error : function(res){
			 	// 			alert('sorry bug ajax try update your browser or contact me');
			 	// 		}
			 	// 	});






				}
				
			});
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