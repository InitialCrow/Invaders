(function(ctx,$M){ // $M = matter.js
	var GameEngine = {
		config : App.config,
		game : "",
		gameReady : false,
		physic : $M.Engine,
		render : $M.Render,
		world : $M.World,
		bodies : $M.Bodies,
		timer : 0,
		dieCounter : 0,

		init : function(){
			App.consolLog(' ---------------->     GameEngine Loaded !  ')

			

			self.World.init();
			self.Player.init(); // init player
			self.Map.init();
			self.Mob.init();
			this.collider();
			self.displayer('1rst wave is comming');
			this.update();
		},
		stater : {

			state1 : {
				initied : false,
				goaled : false,
				msg : [
					'1rst wave is comming',
				],
			},
			state2 : {
				keys_body : null,
				keys : ['blue','green', 'red','yellow'],
				initied : false,
				goaled : false,
				msg : [
					'find good keys in the right order',
				],
				init:function(){
					self.state2.keys_body = self.world.add(self.World.engine.world, [self.bodies.rectangle(window.innerWidth/4,0, 10,window.innerHeight/2 ,{ isStatic: true, collisionFilter :{group:-1} })]);
				},
			},
			init : function(){
				self.timer++; // timer use request anim frame
				if(App.debug === true){
					// console.log('timer : '+self.timer);	
				}				
				if(self.timer > self.config.stater.state1.time && this.state1.initied === false ){
					console.log('spawing 1 ')
					self.Mob.spawn(['type1', 'type2'], [8,2]);
					this.state1.initied = true;
					
					return;
				}
				if(self.dieCounter === self.config.stater.state1.goal && this.state1.initied === true && this.state1.goaled === false ){
						self.timer = 0;
						self.displayer('wave1 clear');
						this.state1.goaled = true;
						
						return
				}
				if(self.timer > self.config.stater.state2.time && this.state1.initied === true && this.state1.goaled === true &&  this.state2.initied === false){
					console.log('spawing 2 ');
					this.state2.keys.shuffle(this.state2.keys);
					
						
					self.displayer(this.state2.keys.toString());
					
					/*self.displayer(this.state2.msg[0]);*/
					// self.Mob.spawn(['type1', 'type2'], [8,2]);
					this.state2.initied = true;
					
					return;
				}
			}
		},
		displayer : function(msg){	
			var displayer = document.getElementsByClassName('game-instruction');
			displayer[0].innerHTML = "<p>"+msg+"</p>";
			window.setTimeout(function(){
				displayer[0].innerHTML = "";
			},5000);
			
			console.log(displayer);

		},
		collider: function(){
			$M.Events.on(App.GameEngine.World.engine, "collisionStart", function(evt){
				
				if(evt.pairs[0].bodyA.label ==="bullet"){
					App.GameEngine.world.remove(App.GameEngine.World.engine.world, evt.pairs[0].bodyA)
					
					self.Player.bullet.body = null;
				}
				if(evt.pairs[0].bodyB.label === 'bullet'){

					// App.GameEngine.World.engine.world.bodies.splice(App.GameEngine.World.engine.world.bodies.indexOf(evt.pairs[0].bodyB),1)
					App.GameEngine.world.remove(App.GameEngine.World.engine.world, evt.pairs[0].bodyB)
					self.Player.bullet.body = null;

				}

				if( (evt.pairs[0].bodyA.label ==="type1"  && evt.pairs[0].bodyB.label === self.Player.player.body.label) || (evt.pairs[0].bodyA.label ===self.Player.player.body.label && evt.pairs[0].bodyB.label === "type1") ||(evt.pairs[0].bodyA.label ==="type2"  && evt.pairs[0].bodyB.label === self.Player.player.body.label )||(evt.pairs[0].bodyA.label ===self.Player.player.body.label && evt.pairs[0].bodyB.label === "type2")){
					
					console.log(self.Player.player.body.label +" se fait attaké")	
					
				}
				if( (evt.pairs[0].bodyA.label ==="type1" && evt.pairs[0].bodyB.label === 'bullet')|| (evt.pairs[0].bodyA.label ==="type2" && evt.pairs[0].bodyB.label === 'bullet')) {
					evt.pairs[0].bodyA.life = evt.pairs[0].bodyA.life - evt.pairs[0].bodyB.hit;
					if(evt.pairs[0].bodyA.life <= 0 ){
						self.dieCounter++;
						App.GameEngine.world.remove(App.GameEngine.World.engine.world, evt.pairs[0].bodyA)
					}

					
					
				}
				if ((evt.pairs[0].bodyA.label ==='bullet' && evt.pairs[0].bodyB.label === "type1" )||(evt.pairs[0].bodyA.label ==="bullet" && evt.pairs[0].bodyB.label === 'type2')){
					evt.pairs[0].bodyB.life = evt.pairs[0].bodyB.life - evt.pairs[0].bodyA.hit;
					if(evt.pairs[0].bodyB.life <= 0 ){
						self.dieCounter++;
						App.GameEngine.world.remove(App.GameEngine.World.engine.world, evt.pairs[0].bodyB)
					}
					

				}

			})
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
				if(App.GameEngine.Mob.pool !== null){
					App.GameEngine.Mob.aggro(self.Player.player, self.Mob.pool)
					
				}
				self.stater.init();
			}
		}

	}
	// helper
	Array.prototype.shuffle = function(a){
    var j, x, i;
    	for (i = a.length; i; i--) {
	        j = Math.floor(Math.random() * i);
	        x = a[i - 1];
	        a[i - 1] = a[j];
	        a[j] = x;
    	}}
	ctx.GameEngine = GameEngine;
	var self = GameEngine;
})(App, Matter);

