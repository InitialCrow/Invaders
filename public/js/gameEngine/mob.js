(function(ctx,$M){ // $M = matter.js
	var Mob = {
		pool : [],
		
		init : function(){
			App.consolLog(' --------------------> Mob Loaded !');
			
			this.spawn(['type1'], [15]);
		},
		initMob : function(type, speed){
			type.body = App.GameEngine.bodies.rectangle(App.config.mob.type1.x, App.config.mob.type1.y, App.config.mob.type1.width, App.config.mob.type1.height,{
					render: {
					         fillStyle: App.config.mob.type1.color,
					    },

				
					label :  App.config.mob.type1.name,
					density: App.GameEngine.config.mob.type1.body.density, 
					friction: App.GameEngine.config.mob.type1.body.friction, 
					restitution: App.GameEngine.config.mob.type1.body.restitution,
					mass : App.GameEngine.config.mob.type1.body.mass,
					collisionFilter :{group:-1}

				});
			type.body.life = App.GameEngine.config.mob.type1.life,
			type.speed = speed || 0.5;
			return type;
		},
		spawn : function(type, nb){
			var types = [type];
			var nb = [nb];


			for(var i =0; i<types.length; i++){
				if(type[i] === 'type1'){
					for(var j =0; j<nb[i]; j++){
						var type1 = {};
						this.initMob(type1, App.GameEngine.config.mob.type1.speed);
						
						var x = App.getRandomInt(0,App.GameEngine.World.renderer.canvas.clientWidth);
						var y = App.getRandomInt(0,App.GameEngine.World.renderer.canvas.clientHeight);
						$M.Body.setPosition(type1.body, {x:x, y:y})
						self.pool[j] = type1;
						App.GameEngine.world.add(App.GameEngine.World.engine.world, self.pool[j].body)
					}
				}
			}
		},
		aggro : function(target, [mob]){
			for(var i = 0; i< mob.length; i++){

				if(target.body.position.x < mob[i].body.position.x ){
					mob[i].body.positionImpulse.x  -= Math.cos(Math.atan2(target.body.position.x -mob[i].body.position.x,target.body.position.y -mob[i].body.position.y)+ Math.PI/2)*mob[i].speed;
			
				}
				else{
					
					mob[i].body.positionImpulse.x  += Math.cos(Math.atan2(target.body.position.x -mob[i].body.position.x,target.body.position.y -mob[i].body.position.y)- Math.PI/2)*mob[i].speed;
					
				}
				if(target.body.position.y < mob[i].body.position.y){
					mob[i].body.positionImpulse.y  += Math.sin(Math.atan2(target.body.position.x -mob[i].body.position.x,target.body.position.y -mob[i].body.position.y)+ Math.PI/2)*mob[i].speed;
					
					

				}
				else{
					mob[i].body.positionImpulse.y  -= Math.sin(Math.atan2(target.body.position.x -mob[i].body.position.x, target.body.position.y -mob[i].body.position.y)- Math.PI/2)*mob[i].speed;

				}
				
			}
		},



	}
	ctx.Mob = Mob;
	var self = Mob;
})(App.GameEngine, Matter);