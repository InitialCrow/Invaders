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

			

			self.World.init();
			self.Player.init(); // init player
			self.Map.init();
			this.update();
		},
		update : function(){
			
			window.requestAnimationFrame(self.update);
			self.physic.update(self.World.engine, 1000 / 60);
			if(self.gameReady === true){
				//simulate own gravity cause gravity of matter do a bug with position
				self.World.gravitySimulator([self.Player.player.body], self.config.world.ownGravity.x,  self.config.world.ownGravity.y, false );
				
				self.Player.player.move(self.Player.player, self.Player.speed, self.Player.jump);
				self.Player.player.x = self.Player.player.body.position.x;
				self.Player.player.y = self.Player.player.body.position.y;

				self.Player.choseWeapon(self.Player.weapon);
					
			}
		}

	}
	ctx.GameEngine = GameEngine;
	var self = GameEngine;
})(App, Matter);