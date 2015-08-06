var Character = function(x, y, name) {
	return {
		name: name,
		left: {
			x: -1,
			y: 0
		},
		up: {
			x: 0,
			y: -1
		},
		right: {
			x: 1,
			y: 0
		},
		down: {
			x: 0,
			y: 1
		},
		x: x,
		y: y,
		lastX: x,
		lastY: y,
		rotation: 0
	};
};

var Pacman = function() {

	var pacman = new Character(1, 1, "pacman");

	pacman.move = function(e) {
		var world = this;

		switch (e.keyCode) {
			case 37:
				if (world.level[(pacman.x + pacman.left.x + (pacman.y * 28))] != 1) {
					pacman.x += pacman.left.x;
					pacman.rotation = 180;
				}
				break;
			case 38:
				if (world.level[(pacman.x + ((pacman.y + pacman.up.y) * 28))] != 1) {
					pacman.y = pacman.y + pacman.up.y;
					pacman.rotation = 270;
				}
				break;
			case 39:
				if (world.level[(pacman.x + pacman.right.x + (pacman.y * 28))] != 1) {
					pacman.x = pacman.x + pacman.right.x;
					pacman.rotation = 0;
				}
				break;
			case 40:
				if (world.level[pacman.x + ((pacman.y + pacman.down.y) * 28)] != 1) {
					pacman.y = pacman.y + pacman.down.y;
					pacman.rotation = 90;
				}
				break;
		}
		if (world.level[((pacman.y * 28) + (pacman.x))] == 2) {
			world.level[(pacman.x + (pacman.y * 28))] = 0;
			world.score += 10;
		}
		if (world.level[((pacman.y * 28) + (pacman.x))] == 3) {
			world.level[(pacman.x + (pacman.y * 28))] = 0;
			world.score += 100;
		}

		world.setBoxClass(pacman.lastX + pacman.lastY * 28);
		world.setBoxClass(pacman.x + pacman.y * 28);

		world.drawCharacter(pacman);

		pacman.lastY = pacman.y;
		pacman.lastX = pacman.x;
	}
	return pacman;
};

var Ghost = function(x, y, sx, sy, ax, ay, name) {

	var ghost = new Character(x, y, name);

	ghost.scatterTarget = {
		x: sx,
		y: sy
	};

	ghost.attackTarget = {
		x: ax,
		y: ay
	};

	ghost.mode = 'scatter';

	ghost.move = function(pacman) {
		var world = this, tx, ty;

		if (ghost.mode === 'scatter') {
			console.log("scattering...");
			tx = ghost.scatterTarget.x;
			ty = ghost.scatterTarget.y;
		}

		if (ghost.mode === 'attack') {
			console.log("attacking...");
			tx = ghost.attackTarget.x;
			ty = ghost.attackTarget.y;
		}

		var left = {
				x: ghost.x + ghost.left.x,
				y: ghost.y
			},
			up = {
				x: ghost.x,
				y: ghost.y + ghost.up.y
			},
			right = {
				x: ghost.x + ghost.right.x,
				y: ghost.y
			},
			down = {
				x: ghost.x,
				y: ghost.y + ghost.down.y
			};

		var arr = [left, up, right, down];

		var valid = false;
		while (valid == false) {
			valid = true;
			for (i in arr) {
				var next = world.level[(arr[i].x + arr[i].y * 28)];
				if (next == 1) {
					arr.splice(i, 1);
					valid = false;
				} else if (world.onWorld(arr[i]) == false) {
					arr.splice(i, 1);
					valid = false;
				} else if ((arr[i].x == ghost.lastX && arr[i].y == ghost.lastY)) {
					arr.splice(i, 1);
					valid = false;
				}
			}
		};

		var ctt = {
			x: arr[0].x,
			y: arr[0].y
		};

		for (i in arr) {
			if ((Math.abs(arr[i].x - tx) + Math.abs(arr[i].y - ty)) <= (Math.abs(ctt.x - tx) + Math.abs(ctt.y - ty))) {
				ctt.x = arr[i].x;
				ctt.y = arr[i].y;
			}
		};
		world.drawCharacter(ghost);
		world.setBoxClass(ghost.lastX + ghost.lastY * 28);

		ghost.lastX = ghost.x;
		ghost.lastY = ghost.y;

		ghost.x = ctt.x;
		ghost.y = ctt.y;

	};
	return ghost;
};

var World = function() {

	return {

		level: [
			// 28w * 31l
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
			1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1,
			1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1,
			1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1,
			1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
			1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1,
			1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1,
			1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1,
			1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 0, 0, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1,
			1, 0, 0, 0, 0, 1, 2, 2, 2, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 2, 2, 2, 1, 0, 0, 0, 0, 1,
			1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1,
			1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
			1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1,
			1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1,
			1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1,
			1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1,
			1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1,
			1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1,
			1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
			1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
			1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
		],

		setBoxClass: function(id) {
			switch (this.level[id]) {
				case 0:
					$('#' + id).attr('class', 'blank');
					break;
				case 1:
					$('#' + id).attr('class', 'brick');
					break;
				case 2:
					$('#' + id).attr('class', 'coin');
					break;
				case 3:
					$('#' + id).attr('class', 'cherry');
					break;
			}
		},

		drawWorld: function() {
			$('#world').html("");
			for (var i = 0; i < this.level.length; i++) {
				$("#world").append("<div id='" + i + "'></div>");
				this.setBoxClass(i);
			}
		},

		onWorld: function(position) {
			if ((position.x > 0 && position.x < 27) && (position.y > 0 && position.y < 31)) {
				return true;
			} else {
				return false;
			}
		},

		drawCharacter: function(character) {
			var location = (character.x + character.y * 28);
			$("#" + location).attr('class', character.name);
			$('.' + character.name).css({
				'-webkit-transform': 'rotate(' + character.rotation + 'deg)',
				'-moz-transform': 'rotate(' + character.rotation + 'deg)',
				'-ms-transform': 'rotate(' + character.rotation + 'deg)',
				'-o-transform': 'rotate(' + character.rotation + 'deg)',
				'transform': 'rotate(' + character.rotation + 'deg)'
			});
		}
	};
};

var Game = function() {

	var pacman, clyde, blinky, pinky, inky, world, ghosts = [];

	var initCharacters = function() {
		pacman = new Pacman();

		$(document).on('keydown', function(e) {
			pacman.move.call(world, e);
		});

		clyde = new Ghost(14, 15, 27, 30, 0, 0, 'clyde');
		pinky = new Ghost(14, 12, 1, 1, 0, 0, 'pinky');
		inky = new Ghost(14, 13, 27, 1, 0, 0, 'inky');
		blinky = new Ghost(14, 14, 1, 30, 0, 0, 'blinky');
		ghosts.push(clyde, pinky, inky, blinky);
	};

	var initWorld = function() {
		world = new World();
		world.drawWorld();
		world.drawCharacter(pacman);
		world.drawCharacter(pinky);
		world.drawCharacter(inky);
		world.drawCharacter(blinky);
		world.drawCharacter(clyde);
	};

	var applyToGhosts = function(callback) {
		for (var i = 0; i < ghosts.length; i++) {
			callback(ghosts[i]);
		}
	};

	var currentMode = "scatter";

	var setMode = function(mode) {
		currentMode = mode;
		applyToGhosts(function(ghost) {
			ghost.mode = mode;
		});
	};

	var counter = 0,
		rounds = 1,
		timer,
		moveTimer,
		scatterDur = 7,
		attackDur = 20;

	var moveGhosts = function() {
		moveTimer = setInterval(function() {
			applyToGhosts(function (ghost) {
				ghost.move.call(world, pacman);
			});
		}, 500);
	};

	var runGhosts = function() {
		timer = setInterval(function() {
			console.log("current mode: ", currentMode);
			console.log("counter: ", counter, "rounds: ", rounds);
			counter++;
			if (rounds <= 3) {
				if (counter == scatterDur) {
					setMode('attack');
					console.log(" \n\n\nCHANING MODE TO ATTACK \n\n\n");
				} else if (counter == scatterDur + attackDur) {
					setMode('scatter');
					console.log(" \n\n\nCHANING MODE TO SCATTER \n\n\n");
					counter = 0;
					rounds++;
				}
			} else {
				setMode('attack');
			}
		}, 1000);
	};

	return {

		initialize: function() {
			initCharacters();
			initWorld();
			moveGhosts();
			runGhosts();
		}

	};
};

$(document).ready(function() {
	var game = new Game();
	game.initialize();
});