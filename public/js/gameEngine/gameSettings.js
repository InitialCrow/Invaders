(function(ctx){
	var config = {
		// set params of canvas	
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
			gravity : {
				'x':0,
				'y':0
			},
		},
		// set params of player
		'player' : {
			size : {
				'width':50,
				'height':50,
			},
			body : {
				'density': 1.0, 
				'friction': 0.0, 
				'restitution': 0.8,
				'mass' : 0.8,
			},
			input : {
				'left':81,//q
				'up':90,//z
				'right':68,//d
				'down':83,//s
			},
			speed: 0.2,

		}
	}
	ctx.config = config;
})(App);
