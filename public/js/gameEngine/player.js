(function(ctx,$M){ // $M = matter.js
	var Player = {
		life : App.GameEngine.config.player.life,
		ammo : App.GameEngine.config.player.ammo,
		weapon : App.GameEngine.config.player.weapon,
		speed : App.GameEngine.config.player.speed,
		jump : App.GameEngine.config.player.jump,
		player : null,
		fire : false,
		bullet :null,
		
		eventMouse : {
			'mousedown':false,
			'mouseup':false,
		},
		playerReady: new Event('playerLoaded'),
		init : function(){
			self.initPlayer();
			self.initWeapon();
			self.initBullet();
		},
		initPlayer : function(){
			socket.on('playerConnect',function(nickname){
				var codeDone = false;
				self.player = new PlayerClass(nickname, App.GameEngine.config.player.size.width,App.GameEngine.config.player.size.height,50,50,'#0fffff',App.GameEngine.config.player.input.left,App.GameEngine.config.player.input.up,App.GameEngine.config.player.input.right,App.GameEngine.config.player.input.down, App.GameEngine.config.player.input.jump);

				self.player.body = App.GameEngine.bodies.rectangle(self.player.x, self.player.y, self.player.width, self.player.height,{
					render: {
					         fillStyle: self.player.color,
					    },

					collisionFilter :{group:-1},
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
		initWeapon : function(){
			document.addEventListener('mousedown', self.mousedown)
			document.addEventListener('mouseup',self.mouseup)
			
		},
		mousedown : function(){
			self.eventMouse.mousedown = true;
			self.fire = true;
			self.eventMouse.mouseup = false;
		},
		mouseup : function(){
			self.eventMouse.mouseup = true;
			self.eventMouse.mousedown = false;
		},
		choseWeapon : function(weapon){
			var weapon = weapon || 'gun';
			var gunMode = false;
			if(weapon === 'gun'){
				 gunMode = true;
				if(self.eventMouse.mousedown === true && self.fire === true && self.eventMouse.mouseup === false){
					self.fire = true;


				}
			}
			if(weapon === 'smg'){
				if(self.eventMouse.mousedown === true && self.fire === true){
					self.fire = true;
					
				}
				if(self.eventMouse.mouseup === true && self.fire === true){
					
					self.fire = false;
					
				}

			}
			if(self.fire === true){
				if(gunMode === true){
					self.fire = false;
				}
				

				App.GameEngine.world.add(App.GameEngine.World.engine.world, [
					App.GameEngine.bodies.circle(self.player.x,self.player.y, 10 ,{mass:0.1,
						density :0.1,
						friction : 0,
						frictionAir : 0,
						frictionStatic : 0,
						speed:0,
						slop:0,
						sleepThreshold : 0,
						label : 'bullet',
						timeScale: 0,
						collisionFilter :{group:-1}
					}),
				]);
				for(var i =0; i<App.GameEngine.World.engine.world.bodies.length; i++){
					if(App.GameEngine.World.engine.world.bodies[i].label === "bullet"){
						self.bullet = App.GameEngine.World.engine.world.bodies[i];
						
						
						
					}
				}
				self.bullet.position.x +=5;
				
			}	
		},
		initBullet: function(){


			$M.Events.on(App.GameEngine.World.engine, "collisionStart", function(evt){
				
				if(evt.pairs[0].bodyA.label ==="bullet" || evt.pairs[0].bodyB.label === 'bullet'){
					for(var j =0 ; j< App.GameEngine.World.engine.world.bodies.length; j++){
						if(App.GameEngine.World.engine.world.bodies[j].label === 'bullet'){
							
							App.GameEngine.World.engine.world.bodies.splice(App.GameEngine.World.engine.world.bodies.indexOf(App.GameEngine.World.engine.world.bodies[j]),1)
							self.bullet = null;
							break;
							
						}
					
					}
				}

			})

		},
	}
	ctx.Player = Player;
	var self = Player;
})(App.GameEngine, Matter);