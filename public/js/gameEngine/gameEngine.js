(function(ctx, $P){ // $P = PHASER
	var GameEngine = {
		debug : true,
		game : new $P.Game(window.innerWidth/2, window.innerHeight/2),
		init : function(){
			App.consolLog(' ---------------->     GameEngine Loaded !  ')

		},
		update : function(){

		},

		
	}
	ctx.GameEngine = GameEngine;
	var self = GameEngine;
})(App, Phaser);