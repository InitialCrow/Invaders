// homme page
'use strict';

$(document).ready(function(){
	
	var mySwiper = new Swiper ('.swiper-container', {
		// Optional parameters
		direction: 'vertical',
		loop: true,
		autoplay:10000,
		speed : 1000,
		effect :'fade',
		fade: {
			crossFade: true
		},

		// If we need pagination
		pagination: '.swiper-pagination',

	  })   
	chooseForm();
})


// sign form or log form typeOfForm = sign || log
function showForm(typeOfForm){
	var type = typeOfForm;
	var $form = $('.form');
	var $alert = $('.alert');
	var url = window.location.href;
	var log_form = "<label for=\"login\">login</label><input class=\"form-control login\" name=\"login\" type=\"text\"  required/><label for=\"pasword\">password</label><input type=\"password\"class=\"form-control password\" name=\"password\" required /><button type=\"submit\" class=\"btn btn-success login-button\">login</button>";
	
	var sign_form = "<label for=\"login\">Enter your login connection</label><input class=\"form-control login\" name=\"login\" type=\"text\"  required/><label for=\"pasword\">Enter your password here</label><input type=\"password\"class=\"form-control password\" name=\"password\" required /><label for=\"email\">Enter your email</label><input type=\"email\" name=\"email\" class=\"email form-control\" required/><label for=\"nickname\">Enter your in game nickname</label><input type=\"text\" name=\"nickname\" class=\"form-control nickname\"  required/><button  class=\"btn btn-success sign-button\">sign in</button>";
	
	if(typeOfForm === 'log'){
		$form.attr('data-type','log');
		$form.empty();
		$form.attr('action',url+'log');
		$form.addClass('log-form');
		$form.append(log_form);
		
	}
	else if(typeOfForm === 'sign'){
		$form.attr('data-type','sign');
		$form.empty();
		$form.attr('action',url+'sign');
		$form.addClass('sign-form');
		$form.append(sign_form);
		
	}
	$form.children('input').on('focus', function(){
			$alert.fadeOut(500);
	});
}
function chooseForm(){
	var $login_btn = $(".login-choose");
	var $sign_btn =$(".sign-choose");
	var $page_form = $('.page-form');
	var $swiper = $('.swiper-container');

	$login_btn.on('click',function(){
		$swiper.fadeOut(400);
		setTimeout(function(){
			$page_form.fadeIn(500);
		},600);
		showForm('log');
		ajaxSubmit();
	});
	$sign_btn.on('click',function(){
		$swiper.fadeOut(400);
		setTimeout(function(){
			$page_form.fadeIn(500);
		},600);
		showForm('sign');
		ajaxSubmit();	
	});
}
function ajaxSubmit(){
	var $form = $('.form');
	var $alert = $(".alert");

	if($form.attr('data-type') === 'sign'){
		$form.on('submit',function(evt){
			evt.preventDefault();
			if(secureForm($form)){
				$.ajax({
				url: $form.attr('action'),
				method : $form.attr('method'),
				data : $form.serialize(),	
				success : function(res){
					if(res[0] === true){
						window.location.href = 'inv/'+res[1];
					}
					else{
						$alert.children('p').last().empty();

						if(res[1].type === 'login'){
							$alert.append(res[1].msg).fadeIn(500).removeClass('hidden');
							
						}
						if(res[1].type === 'nickname'){
							$alert.append(res[1].msg).fadeIn(500).removeClass('hidden');
						}
						if(res[1].type === 'email'){
							$alert.append(res[1].msg).fadeIn(500).removeClass('hidden');
						}
					}
				},
				error : function(res){
					console.log(res);
					}
				})
			}

		});
	}


	if($form.attr('data-type') === 'log'){
		$form.on('submit',function(evt){
			evt.preventDefault();
			if(secureForm($form)){
				$.ajax({
					url: $form.attr('action'),
					method : $form.attr('method'),
					data : $form.serialize(),	
					success : function(res){
						if(res[0] != false){
							window.location.href = res;
						}
						else{
							$alert.children('p').last().empty();
							$alert.append(res[1]).fadeIn(500).removeClass('hidden');
						}
					},
					error : function(res){
						console.log(res);
					}
				});
			}
		});
	}
	
}
function secureForm(form){
	var $form_secure = form;
	var $alert = $('.alert');
	var msg ="";
	var checked = true;
	var $inputs = $form_secure.children('input');

	
	$alert.children('p').last().empty();
	

	// à ameliorer;

	for ( var i =0; i<$inputs.length; i++){
		var $input = $($inputs[i]);
		$input.val($input.val().replace(/(<([^>]+)>)/ig,""));
		if($input.val().trim().length < 4){
			msg = "<p><strong>Error</strong> Please all field need most of 4 charactere length</p>";
			$alert.append(msg).fadeIn(500).removeClass('hidden');
			return false;
		}

	}
	return checked;
}

