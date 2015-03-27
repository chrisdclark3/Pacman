
var model = {
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

  world: [
  // 28w * 31l
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,
    1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1,
    1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1,
    1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1,
    1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,
    1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1,
    1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1,
    1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1,
    1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1,
    1,1,1,1,1,1,2,1,1,1,1,1,2,0,0,2,1,1,1,1,1,2,1,1,1,1,1,1,
    1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1,
    1,1,1,1,1,1,2,1,1,0,1,1,1,1,0,1,1,1,0,1,1,2,1,1,1,1,1,1,
    1,1,1,1,1,1,2,1,1,0,1,1,1,1,0,1,1,1,0,1,1,2,1,1,1,1,1,1,
    1,0,0,0,0,1,2,2,2,0,1,1,1,1,0,1,1,1,0,2,2,2,1,0,0,0,0,1,
    1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1,
    1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1,
    1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1,
    1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1,
    1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1,
    1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,
    1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1,
    1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1,
    1,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,1,
    1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1,
    1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1,
    1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1,
    1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,
    1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,
    1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ],
  pacman: {
    name: "pacman",
    x: 1, 
    y: 7,
    last_x: 2,
    last_y: 7
  },

  pinky: {
    name: "pinky",
    x: 14, 
    y: 12,
    last_x: 14,
    last_y: 13,
    s_target_x: 1,
    s_target_y: 1,
    a_target_x: 2,
    a_target_y: 1,
  },

  inky: {
    name: "inky",
    x: 14, 
    y: 13,
    last_x: 14,
    last_y: 14,
    s_target_x: 27,
    s_target_y: 1,
    a_target_x: 2,
    a_target_y: 1
  },

  blinky: {
    name: "blinky",
    x: 14, 
    y: 14,
    last_x: 14,
    last_y: 15,
    s_target_x: 1,
    s_target_y: 30,
    a_target_x: 2,
    a_target_y: 1
  },

  clyde: {
    name: "clyde",
    x: 14, 
    y: 15,
    last_x: 14,
    last_y: 16,
    s_target_x: 27,
    s_target_y: 30,
    a_target_x: 2,
    a_target_y: 1
  },

  score: 0,
  lives: 3
};

var view = {
  set_box_class: function() {
    var that = this;
    switch (model.world[that]) {
      case 0:
        document.getElementById(that).className = 'blank';
        break;
      case 1:
        document.getElementById(that).className = 'brick';
        break;
      case 2:
        document.getElementById(that).className = 'coin';
        break;
      case 3:
        document.getElementById(that).className = 'cherry';
        break;
      default:
        break;
    }
  },

  draw_world: function() {
    document.getElementById('world').innerHTML = "";
    var count = 0;
    var row_count = 0;
    for (var i = 0; i < model.world.length; i++) {
      count += 1;
      if (count === 1) {
        document.getElementById('world').innerHTML += "<tr id= 'r"+row_count+"'>";
        document.getElementById("r"+row_count).innerHTML += "<td id='"+i+"'></td>";
      } else if (count === 28) {
        document.getElementById("r"+row_count).innerHTML += "<td id='"+i+"'></td>";
        document.getElementById('world').innerHTML += "</tr>";
        count = 0;
        row_count += 1;
      } else {
        document.getElementById("r"+row_count).innerHTML += "<td id='"+i+"'></td>";
      }
      view.set_box_class.call(i);
    }
  },

  draw_character: function() {
    var that = this;
    var charid = (that.x + that.y * 28);
    document.getElementById(charid).className = that.name;
  },

  draw_score: function() {
    document.getElementById('score').innerHTML = "";
    document.getElementById('score').innerHTML =
      "<div class='score' style='top: 75px'>" + "SCORE: " + model.score + "</div>";
  },
  draw_lives: function() {
    document.getElementById('lives').innerHTML = "";
    document.getElementById('lives').innerHTML =
      "<div class='lives' style='top: 75px; left: 200px'>" + "LIVES: " + model.lives + "</div>";
  }
};

var controller = {

  on_board: function(a, b) {
    if ((a > 0 && a < 27) && (b > 0 && b < 31)) {
      return true;
    } else {
      return false;
    }
  },

  move_pacman: function(e) {
    var that = model.pacman;
    that.last_x = that.x;
    that.last_y = that.y;

    switch (e.keyCode) {
      case 37:
        if ( model.world[(that.x + model.left.x) + (that.y * 28)] != 1 ) {
          that.x += model.left.x;
        }
        break;

      case 38:
        if (model.world[(that.x + ((that.y + model.up.y) * 28))] != 1) {
          that.y = that.y + model.up.y;
        }
        break;

      case 39:
        if (model.world[(that.x + model.right.x + (that.y * 28))] != 1) {
          that.x = that.x + model.right.x;
        }
        break;

      case 40:
        if (model.world[(that.x + ((that.y + model.down.y) * 28))] != 1) {
          that.y = that.y + model.down.y;
        }
        break;

      default:
        break;
    };

    if (model.world[((that.y * 28) + (that.x))] == 2) {
      model.world[(that.last_x + (that.last_y * 28))] = 0;
      model.score += 10;
    };

    if (model.world[((that.y * 28) + (that.x))] == 3) {
      model.world[(that.last_x + (that.last_y * 28))] = 0;
      model.score += 100;
    };
    
    view.set_box_class((that.last_x + that.last_y * 28));
    view.draw_character.call(that);
    
  },

  ghost_scatter: function() {
    var that = this;
    var move_left = { x: that.x + model.left.x, y: that.y };
    var move_up = { x: that.x, y: that.y + model.up.y };
    var move_right = { x: that.x + model.right.x, y: that.y };
    var move_down = { x: that.x, y: that.y + model.down.y };
    var arr = [move_left, move_up, move_right, move_down];
    

    var validity = false;
 
    while (validity == false) {
      validity = true;
      for (i in arr) {
        var next_move = model.world[arr[i].x + arr[i].y * 28];
        if (next_move == 1) {
          arr.splice(i, 1);
          validity = false;
        } else if (controller.on_board(arr[i].x, arr[i].y) == false) {
          arr.splice(i, 1);
          validity = false;
        } else if ((arr[i].x == that.last_x && arr[i].y == that.last_y)) {
          arr.splice(i, 1);
          validity = false;
        }
      }
    };

    var ctt = { 
      x: arr[0].x, 
      y: arr[0].y 
    };

    
    for (i in arr) {
      if ( (Math.abs(arr[i].x - that.s_target_x) + Math.abs(arr[i].y - that.s_target_y)) <= (Math.abs(ctt.x - that.s_target_x) + Math.abs(ctt.y - that.s_target_y)) ) {
        ctt.x = arr[i].x;
        ctt.y = arr[i].y;
      }
    };

    that.last_x = that.x;
    that.last_y = that.y;

    that.x = ctt.x;
    that.y = ctt.y;

  },

//   ghost_attack: function(charObj) {

//     var move_left = { x: charObj.x + model.left.x, y: charObj.y };
//     var move_up = { x: charObj.x, y: charObj.y + model.up.y };
//     var move_right = { x: charObj.x + model.right.x, y: charObj.y };
//     var move_down = { x: charObj.x, y: charObj.y + model.down.y };

//     var arr = [move_left, move_up, move_right, move_down];

//     var ctt = { 
//       x: arr[0].x, 
//       y: arr[0].y 
//     };

//     var validity = false;

//     while (validity == false) {
//       validity = true;
//       for (i in arr) {
//         var next_move = model.world[((arr[i].x) + (arr[i].y * 28))];
//         if (next_move == 1) {
//           arr.splice(i, 1);
//           var validity = false;
//         } else if (controller.on_board(arr[i].x, arr[i].y) == false) {
//           arr.splice(i, 1);
//           validity = false;
//         } else if ((arr[i].x == charObj.last_x && arr[i].y == charObj.last_y)) {
//           arr.splice(i, 1);
//           validity = false;
//         }
//       }
//     };

//     console.log()

//     for (i in arr) {
//       if ( (Math.abs(arr[i].x - charObj.a_target_x) + Math.abs(arr[i].y - charObj.a_target_y)) <= (Math.abs(ctt.x - charObj.a_target_x) + Math.abs(ctt.y - charObj.a_target_y)) ) {
//         ctt.x = arr[i].x;
//         ctt.y = arr[i].y;
//       }
//     };

//     charObj.last_x = charObj.x;
//     charObj.last_y = charObj.y;

//     charObj.x = ctt.x;
//     charObj.y = ctt.y;

   
//     view.draw_character(charObj);
//     view.set_box_class(((charObj.last_x) + (charObj.last_y * 28)));
  
//   }
};


function init() {
  view.draw_world();
  view.draw_character.call(model.pacman);
  view.draw_character.call(model.pinky);
  view.draw_character.call(model.inky);
  view.draw_character.call(model.blinky);
  view.draw_character.call(model.clyde);
  view.draw_score();
  view.draw_lives();
}

function ghost_interval() {
  controller.ghost_scatter.call(model.pinky);
  view.draw_character.call(model.pinky);
  view.set_box_class.call(model.pinky.last_x + model.pinky.last_y * 28);

  controller.ghost_scatter.call(model.inky);
  view.draw_character.call(model.inky);
  view.set_box_class.call(model.inky.last_x + model.inky.last_y * 28);

  controller.ghost_scatter.call(model.blinky);
  view.draw_character.call(model.blinky);
  view.set_box_class.call(model.blinky.last_x + model.blinky.last_y * 28);
  
  controller.ghost_scatter.call(model.clyde);
  view.draw_character.call(model.clyde);
  view.set_box_class.call(model.clyde.last_x + model.clyde.last_y * 28);
}

window.onload = init;
document.onkeydown = controller.move_pacman;
window.setInterval((ghost_interval), 200);
document.onkeydown;

// window.setTimeout(window.clearInterval(pinky_scatter), 10000);
// window.setTimeout(window.clearInterval(blinky_scatter), 10000);
// window.setTimeout(window.clearInterval(inky_scatter), 10000);
// window.setTimeout(window.clearInterval(clyde_scatter), 10000);

// var pinky_attack = window.setInterval(controller.ghost_attack(model.pinky), 400);
// var blinky_attack = window.setInterval(controller.ghost_attack(model.blinky), 400);
// var inky_attack = window.setInterval(controller.ghost_attack(model.inky), 400);
// var clyde_attack = window.setInterval(controller.ghost_attack(model.clyde), 400);

 


