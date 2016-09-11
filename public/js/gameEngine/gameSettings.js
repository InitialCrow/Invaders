(function(ctx){
	var config = {
		// set params of canvas	2
		'render' : {
			size : {
				'width' : window.innerWidth/2,
				'height' : window.innerHeight/2
			},
			border : {
				'width' : window.innerWidth/2,
				'height' : window.innerHeight/2,
				'offset' :20,
			},
			background : '#fafafa',

		},
		// set params of world
		'world' : {
			gravity : { // bug when youse gravity so use own gravity
				'x':0,
				'y':0
			},
			ownGravity : {
				'x':0,
				'y':1
			}
		},
		// set params of player
		'player' : {
			size : {
				'width':50,
				'height':50,
			},
			body : {
				'density': 1.0, 
				'friction': 0, 
				'restitution': 0,
				'mass' : 1,
			},
			input : {
				'left':81,//q
				'up':90,//z
				'right':68,//d
				'down':83,//s
				'jump' : 32, //space
			},
			ammo : 500,
			life : 5,
			weapon : 'gun',
			speed: 1,
			jump : 30,
			canJump : 600,

		}
	}
	ctx.config = config;
})(App);