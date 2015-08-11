var width = 27,
    height = 31;

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
                if (world.level[(pacman.x + pacman.left.x + (pacman.y * width))] != 1) {
                    pacman.x += pacman.left.x;
                    pacman.currentDirection = 'left';
                    pacman.rotation = 180;
                }
                break;
            case 38:
                if (world.level[(pacman.x + ((pacman.y + pacman.up.y) * width))] != 1) {
                    pacman.y = pacman.y + pacman.up.y;
                    pacman.currentDirection = 'up';
                    pacman.rotation = 270;
                }
                break;
            case 39:
                if (world.level[(pacman.x + pacman.right.x + (pacman.y * width))] != 1) {
                    pacman.x = pacman.x + pacman.right.x;
                    pacman.currentDirection = 'right';
                    pacman.rotation = 0;
                }
                break;
            case 40:
                if (world.level[pacman.x + ((pacman.y + pacman.down.y) * width)] != 1) {
                    pacman.y = pacman.y + pacman.down.y;
                    pacman.currentDirection = 'down';
                    pacman.rotation = 90;
                }
                break;
        }
        if (world.level[((pacman.y * width) + (pacman.x))] == 2) {
            world.level[(pacman.x + (pacman.y * width))] = 0;
            world.score += 10;
        }
        if (world.level[((pacman.y * width) + (pacman.x))] == 3) {
            world.level[(pacman.x + (pacman.y * width))] = 0;
            world.score += 100;
        }

        world.setBoxClass(pacman.lastX + pacman.lastY * width);
        world.setBoxClass(pacman.x + pacman.y * width);

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

    ghost.setAttackRoute = function (target, board) {
        var source = this.x + this.y * width;
        var last = this.lastX + this.lastY * width;
        board[source].parent = last;
        board[source].visited = true;
        board[last].visited = true;
        console.log("SOURCE NEIGHBORS: ", board[source].neighbors);
        var queue = new Queue();
        queue.enqueue(board[source]);

        while (queue.isEmpty() === false) {
            var temp = queue.dequeue();
            board[temp.value].visited = true;
            if (temp.value == target) {
                return this.setAttackPath(target, board);
            }
            for (var i = 0; i < temp.neighbors.length; i++) {
                if (board[temp.neighbors[i]].visited == false) {
                    board[temp.neighbors[i]].parent = temp.value;
                    board[temp.value].visited = true;
                    queue.enqueue(board[temp.neighbors[i]]);
                }
            }
        }
    };

    ghost.setAttackPath = function(target, board) {
        var source = this.x + this.y * width;
        var path = [];
        for (var i = target; i != source; i = board[i].parent) {
            path.push(i);
        }
        console.log('PATH: ', path);
        return path;
    };

    ghost.move = function(world, pacman) {

        console.log("\nGHOST: ", ghost);
        var tx, ty, board = world.calcBoard();

        if (this.mode === 'scatter') {
            tx = this.scatterTarget.x;
            ty = this.scatterTarget.y;
        } else {
            tx = pacman.x;
            ty = pacman.y;
        }

        var up = {
                x: this.x,
                y: this.y + this.up.y
            },
            left = {
                x: this.x + this.left.x,
                y: this.y
            },
            down = {
                x: this.x,
                y: this.y + this.down.y
            },
            right = {
                x: this.x + this.right.x,
                y: this.y
            },
            dirs = [up, left, down, right];

        var current = board[this.x + this.y * width],
            last = board[this.lastX + this.lastY * width],
            arr = current.neighbors;

        if (arr.indexOf(last.value) != -1) {
            arr.splice(arr.indexOf(last.value), 1);
        }

        if (arr.length > 1) {
            for (var i = 0; i < arr.length; i++) {

            }
            // var currentPath = this.setAttackRoute((tx + ty * width), board);
            // for (var i = 0; i < dirs.length; i++) {
            //     if (dirs[i].x + dirs[i].y * width == currentPath[currentPath.length - 1]) {
            //         this.lastX = this.x;
            //         this.lastY = this.y;
            //         this.x = dirs[i].x;
            //         this.y = dirs[i].y;
            //         break;
            //     }
            // }
        } else {
            for (var i = 0; i < dirs.length; i++) {
                if (dirs[i].x + dirs[i].y * width == arr[0]) {
                    this.lastX = this.x;
                    this.lastY = this.y;
                    this.x = dirs[i].x;
                    this.y = dirs[i].y;
                    break;
                }
            }
        }
        world.drawCharacter(ghost);
        world.setBoxClass(this.lastX + this.lastY * width);
    };
    return ghost;
};

var World = function() {

    return {

        level: [
            // 27w * 31l
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
            1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1,
            1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1,
            1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1,
            1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
            1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1,
            1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1,
            1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1,
            1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 0, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1,
            1, 0, 0, 0, 0, 1, 2, 2, 2, 0, 1, 1, 1, 0, 1, 1, 1, 0, 2, 2, 2, 1, 0, 0, 0, 0, 1,
            1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1,
            1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
            1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1,
            1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1,
            1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1,
            1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1,
            1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1,
            1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1,
            1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
            1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
            1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
        ],

        calcBoard: function() {
            var board = {};
            for (var i = 0; i < this.level.length; i++) {
                board[i] = {
                    neighbors: [],
                    visited: false,
                    value: i,
                    parent: {}
                };
                if (this.level[i + 1] != 1) {
                    board[i].neighbors.push(i + 1);
                }
                if (this.level[i - 1] != 1) {
                    board[i].neighbors.push(i - 1);
                }
                if (this.level[i + width] != 1) {
                    board[i].neighbors.push(i + width);
                }
                if (this.level[i - width] != 1) {
                    board[i].neighbors.push(i - width);
                }
            }
            return board;
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
            var rowCount = 0;
            var count = 0;
            for (var i = 0; i < this.level.length; i++) {
                $("#world").append("<div id='" + i + "' data-x='"+ count +"' data-y='"+ rowCount +"'></div>");
                this.setBoxClass(i);
                if (count == width - 1) {
                    rowCount++;
                    count = 0;
                } else {
                    count++;
                }
            }
        },

        onWorld: function(position) {
            if ((position.x > 0 && position.x < width - 1) && (position.y > 0 && position.y < height - 1)) {
                return true;
            } else {
                return false;
            }
        },

        drawCharacter: function(character) {
            var location = (character.x + character.y * width);
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

    var pacman, clyde, blinky, pinky, inky, world, ghosts;

    var initCharacters = function() {
        pacman = new Pacman();

        $(document).on('keydown', function(e) {
            pacman.move.call(world, e);
        });

        clyde = new Ghost(13, 15, 13, 15, 26, 29, 'clyde');
        blinky = new Ghost(13, 14, 13, 15, 1, 29, 'blinky');
        inky = new Ghost(13, 13, 13, 14, 26, 1, 'inky');
        pinky = new Ghost(13, 12, 13, 13, 1, 1, 'pinky');
        ghosts = [pinky, inky, blinky, clyde];

        world.drawCharacter(pacman);
        world.drawCharacter(pinky);
        world.drawCharacter(inky);
        world.drawCharacter(blinky);
        world.drawCharacter(clyde);
    };

    var initWorld = function() {
        world = new World();
        world.drawWorld();
        $('#pause').on('click', function () {
            pause();
        });
    };

    var applyToGhosts = function(callback) {
        for (var i = 0; i < ghosts.length; i++) {
            (function (j) {
                callback(ghosts[j]);
            })(i);
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
        ghostSpeed = 2500,
        runSpeed = 5000,
        runTimer,
        moveTimer,
        scatterDur = 7,
        attackDur = 20;

    var moveGhosts = function() {
        moveTimer = setInterval(function() {
            applyToGhosts(function(ghost) {
                ghost.move(world, pacman);
                checkCapture(ghost, pacman);
            });
        }, ghostSpeed);
    };

    var runGhosts = function() {
        runTimer = setInterval(function() {
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
        }, runSpeed);
    };


    var gameState = "start";

    var pause = function () {
        gameState = gameState == 'start' ? 'stop' : 'start';
        if (gameState == 'stop') {
            clearInterval(runTimer);
            clearInterval(moveTimer);
        } else {
            moveGhosts();
            runGhosts();
        }
    };

    var checkCapture = function(ghost, pacman) {

        if (ghost.x == pacman.x && ghost.y == pacman.y) {
            resetGame();
        }
    };

    var resetGame = function() {
    	console.log('resetting game...');
        lives--;
        clearInterval(runTimer);
        clearInterval(moveTimer);
        initialize();
    };

    var score = 0;

    var drawScore = function () {
    	$('#score').text("SCORE: " + score);
    };

    var lives = 3;

    var drawLives = function () {
    	$('#lives').text("LIVES: " + lives);
    };

    var initialize = function() {
        drawScore();
        drawLives();
        initWorld();
        initCharacters();
        runGhosts();
        moveGhosts();
    };

    var game = {};

    game.score = 0;

    game.lives = 3;

    game.initialize = initialize;

    return game;
};

$(document).ready(function() {
    var game = new Game();
    game.initialize();
});