(function(ctx,$M){ // $M = matter.js
	var Player = {
		player : null,
		playerReady: new Event('playerLoaded'),
		init : function(){
			self.initPlayer();
		},
		initPlayer : function(){
			socket.on('playerConnect',function(nickname){
				var codeDone = false;
				self.player = new PlayerClass(nickname, App.GameEngine.config.player.size.width,App.GameEngine.config.player.size.height,50,50,'#0fffff',App.GameEngine.config.player.input.left,App.GameEngine.config.player.input.up,App.GameEngine.config.player.input.right,App.GameEngine.config.player.input.down);

				self.player.body = App.GameEngine.bodies.rectangle(self.player.x, self.player.y, self.player.width, self.player.height,{
					render: {
					         fillStyle: self.player.color,
					    },
					label : self.player.name,
					density: App.GameEngine.config.player.body.density, 
					friction: App.GameEngine.config.player.body.friction, 
					restitution: App.GameEngine.config.player.body.restitution,
					mass : App.GameEngine.config.player.body.mass,
				})
				codeDone = true;
				if(codeDone == true){
					document.dispatchEvent(self.playerReady);
				}

			});
		},

	}
	ctx.player = Player;
	var self = Player;
})(App.GameEngine, Matter);