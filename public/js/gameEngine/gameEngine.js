(function(ctx,$M){ // $M = matter.js
	var GameEngine = {
		config : App.config,
		game : "",
		gameReady : false,
		physic : $M.Engine,
		render : $M.Render,
		world : $M.World,
		bodies : $M.Bodies,
		init : function(){
			App.consolLog(' ---------------->     GameEngine Loaded !  ')

			self.player.init(); // init player

			self.World.init();
			this.update();
		},
		update : function(){
			
			window.requestAnimationFrame(self.update);
			self.physic.update(self.World.engine, 1000 / 60);
			if(self.gameReady === true){
				self.player.player.move(self.player.player, self.config.player.speed);
				self.player.player.x = self.player.player.body.position.x;
				self.player.player.y = self.player.player.body.position.y;
			}
		}

	}
	ctx.GameEngine = GameEngine;
	var self = GameEngine;
})(App, Matter);