(function(ctx){
	var App = {
		debug : true,
		init : function(){
			if(this.debug === true){
				console.log(' :::::::::::::::::: DEBUG MODE ACTIVATE :::::::::::::::::: ');
			}
			this.consolLog(' ---------------->    App Loaded ! ')
			this.GameEngine.init();
		},
		consolLog : function(msg){
			if(this.debug === true){
				return console.log(msg);
			}	
		},
	}
	ctx.App = App;
})(window);
