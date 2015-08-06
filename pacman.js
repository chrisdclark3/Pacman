var Queue = function() {
	this.items = [];
};

Queue.prototype.enqueue = function(obj) {
	this.items.push(obj);
};

Queue.prototype.dequeue = function() {
	return this.items.shift();
};

Queue.prototype.isEmpty = function() {
	return this.items.length === 0;
};

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

var Ghost = function(x, y, lastX, lastY, sx, sy, name) {

	var ghost = new Character(x, y, name);

	ghost.scatterTarget = {
		x: sx,
		y: sy
	};

	ghost.lastX = lastX;

	ghost.lastY = lastY;

	ghost.mode = 'scatter';

	ghost.attackRoute = function(target, world) {
		console.log('in attack route', ghost.name);
		var source = ghost.x + ghost.y * 28;
		var last = ghost.lastX + ghost.lastY * 28;
		world.calcBoard();
		world.board[source].parent = last;
		world.board[source].visited = true;
		world.board[last].visited = true;
		var queue = new Queue();
		queue.enqueue(world.board[source]);

		while (queue.isEmpty() === false) {
			var temp = queue.dequeue();
			if (ghost.name != 'pinky') {
				console.log("TEMP", temp.value);
				console.log("target", target);
			}
			world.board[temp.value].visited = true;
			if (temp.value == target) {
				return ghost.pathTo(target, world.board);
			}
			for (var i = 0; i < temp.neighbors.length; i++) {
				if (world.board[temp.neighbors[i]].visited == false) {
					world.board[temp.neighbors[i]].parent = temp.value;
					world.board[temp.value].visited = true;
					queue.enqueue(world.board[temp.neighbors[i]]);
				}
			}
		}
	};

	ghost.pathTo = function(target, board) {
		var source = ghost.x + ghost.y * 28;
		var path = [];
		for (var i = target; i != source; i = board[i].parent) {
			path.push(i);
		}
		return path;
	};

	ghost.move = function(pacman) {
		var world = this,
			tx, ty;

		if (ghost.mode === 'scatter') {
			tx = ghost.scatterTarget.x;
			ty = ghost.scatterTarget.y;
		}

		if (ghost.mode === 'attack') {
			tx = pacman.x;
			ty = pacman.y;
		}

		var up = {
			x: ghost.x,
			y: ghost.y + ghost.up.y
		};
		var left = {
			x: ghost.x + ghost.left.x,
			y: ghost.y
		};
		var down = {
			x: ghost.x,
			y: ghost.y + ghost.down.y
		};
		var right = {
			x: ghost.x + ghost.right.x,
			y: ghost.y
		};

		var dirs = [up, left, down, right];

		var current = world.board[ghost.x + ghost.y * 28],
			last = world.board[ghost.lastX + ghost.lastY * 28];

		var arr = current.neighbors;
		if (arr.indexOf(last.value) != -1) {
			arr.splice(arr.indexOf(last.value), 1);
		}

		if (arr.length > 1) {

			var currentPath = ghost.attackRoute((tx + ty * 28), world);
			console.log('\n\nghost', ghost);
			console.log("currentPath", currentPath);
			console.log("arr", arr);
			for (var i = 0; i < dirs.length; i++) {

				if (dirs[i].x + dirs[i].y * 28 == currentPath[currentPath.length - 1]) {
					ghost.lastX = ghost.x;
					ghost.lastY = ghost.y;
					ghost.x = dirs[i].x;
					ghost.y = dirs[i].y;
					break;
				}
			}
		} else {
			for (var i = 0; i < dirs.length; i++) {

				if (dirs[i].x + dirs[i].y * 28 == arr[0]) {
					ghost.lastX = ghost.x;
					ghost.lastY = ghost.y;
					ghost.x = dirs[i].x;
					ghost.y = dirs[i].y;
					break;
				}
			}
		}

		world.drawCharacter(ghost);
		world.setBoxClass(ghost.lastX + ghost.lastY * 28);

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

		board: {},

		calcBoard: function() {
			for (var i = 0; i < this.level.length; i++) {
				this.board[i] = {
					neighbors: [],
					visited: false,
					value: i,
					parent: {}
				};
				if (this.level[i + 1] != 1) {
					this.board[i].neighbors.push(i + 1);
				}
				if (this.level[i - 1] != 1) {
					this.board[i].neighbors.push(i - 1);
				}
				if (this.level[i + 28] != 1) {
					this.board[i].neighbors.push(i + 28);
				}
				if (this.level[i - 28] != 1) {
					this.board[i].neighbors.push(i - 28);
				}
			}
		},

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
			this.calcBoard();
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

		clyde = new Ghost(14, 15, 14, 15, 26, 29, 'clyde');
		blinky = new Ghost(14, 14, 14, 15, 1, 29, 'blinky');
		inky = new Ghost(14, 13, 14, 14, 26, 1, 'inky');
		pinky = new Ghost(14, 12, 14, 13, 1, 1, 'pinky');
		ghosts.push(pinky, inky, blinky, clyde);
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
		// moveTimer = setInterval(function() {
		// 	applyToGhosts(function(ghost) {
		// 		ghost.move.call(world, pacman);
		// 	});
		// }, 500);

		$('#move').on('click', function (e){
			applyToGhosts(function(ghost) {
				ghost.move.call(world, pacman);
			});
		});
	};

	var runGhosts = function() {
		timer = setInterval(function() {
			counter++;
			if (rounds <= 3) {
				if (counter == scatterDur) {
					setMode('attack');
				} else if (counter == scatterDur + attackDur) {
					setMode('scatter');
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
			// runGhosts();
			moveGhosts();
		}

	};
};

$(document).ready(function() {
	var game = new Game();
	game.initialize();
});