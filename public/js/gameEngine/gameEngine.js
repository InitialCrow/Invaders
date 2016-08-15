(function(ctx,$P){ // $P = PHysic
	var GameEngine = {
		debug : true,
		game : "",
		player : null,
		playerReady: new Event('playerLoaded'),
		gameReady : false,
		world: null,
		renderer :null,
		init : function(){
			App.consolLog(' ---------------->     GameEngine Loaded !  ')
			self.initWorld();
			self.initPlayer();
			this.update();
			window.onload = function(e){
				
				
			}
			

		},
		initWorld : function(){
			this.world = $P();
			this.renderer = $P.renderer('canvas', {
				el: 'invaders_canvas',
				width : App.canvas.width,
				height : App.canvas.height,
				meta: true,
				autoResize: false,
			});
			
			this.world.add( this.renderer)

			App.consolLog(' ------------------>  Game World Loaded!');

		},
	
		initPlayer : function(){
			socket.on('playerConnect',function(nickname){
				var codeDone = false;
				self.player = new Player(nickname, 50,50,50,50,'#0fffff',81,90,68,83);
				self.player.body = $P.body('rectangle',{
					x: self.player.x,
					y: self.player.y,
					vx:0,
					vy:0,
					width: self.player.width,
					height: self.player.height,
					styles: {
						fillStyle: self.player.color,
					    }
				})
				self.world.add(self.player.body);

				App.consolLog(self.player);
				
				
				codeDone = true;
				if(codeDone == true){
					document.dispatchEvent(self.playerReady);
				}


				
			});
		},
		update : function(){

			document.addEventListener('playerLoaded', function(){
				self.world.render();
				self.gameReady = true;

			})
			$P.util.ticker.on(function( time, dt ){
				self.world.step( time );
			});			
			$P.util.ticker.start();
			self.world.on('step', function(){
				if(self.gameReady === true){
					self.world.render();
			   		self.player.move(self.player);
				}
			   	
			   	
			});
		
			
			
			
		}

		
	}
	ctx.GameEngine = GameEngine;
	var self = GameEngine;
})(App, Physics);