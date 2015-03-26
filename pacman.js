var model = {
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
    1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1,
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
    name: 'pacman',
    x: 1, 
    y: 7,
    last_x: 1,
    last_y: 7,
    move: function(e) {
      var self = model.pacman;
      var move_left = {
        x: self.x - 1,
        y: self.y
      };
      var move_up = {
        x: self.x,
        y: self.y - 1
      };
      var move_right = {
        x: self.x + 1,
        y: self.y
      };
      var move_down = {
        x: self.x,
        y: self.y + 1
      };

      self.last_y = self.y;
      self.last_x = self.x;

      switch (e.keyCode) {
        case 37:
          if (model.world[(move_left.x + (move_left.y * 28))] != 1) {
            self.x = move_left.x;
            self.y = move_left.y;
            rotation = 180;
          }
          break;
        case 38:
          if (model.world[(move_up.x + (move_up.y * 28))] != 1) {
            self.x = move_up.x;
            self.y = move_up.y;
            rotation = 270;
          }
          break;
        case 39:
          if (model.world[(move_right.x + (move_right.y * 28))] != 1) {
            self.x = move_right.x;
            self.y = move_right.y;
            rotation = 0;
          }
          break;
        case 40:
          if (model.world[(move_down.x + (move_down.y * 28))] != 1) {
            self.x = move_down.x;
            self.y = move_down.y;
            rotation = 90;
          }
          break;
        default:
          break;
      };
      if (model.world[((self.y * 28) + (self.x))] == 2) {
        model.world[((self.y * 28) + (self.x))] = 0;
        model.world[(self.last_x + (self.last_y * 28))] = 0;
        model.score += 10;
      };
      if (model.world[((self.y * 28) + (self.x))] == 3) {
        model.world[((self.y * 28) + (self.x))] = 0;
        model.world[(self.last_x + (self.last_y * 28))] = 0;
        model.score += 100;
      }
      view.set_box_class((self.last_x + (self.last_y * 28)));
      view.draw_character(self);
    }
  },

  pinky: {
    name: 'pinky',
    x: 14, 
    y: 12,
    scatter: function() { 
      return function() { return controller.scatter_ghost(model.pinky);}
    },
    // attack: function() {
    //   return function() { return controller.attack_ghost(model.pinky);}
    // },
    last_x: 14,
    last_y: 13,
    s_target_x: 1,
    s_target_y: 1,
    // a_target_x: model.pacman.x,
    // a_target_y: model.pacman.y,
  },

  inky: {
    name: 'inky',
    x: 14, 
    y: 13,
    scatter: function() { 
      return function() { return controller.scatter_ghost(model.inky);}
    },
    last_x: 14,
    last_y: 14,
    s_target_x: 27,
    s_target_y: 1
  },

  blinky: {
    name: 'blinky',
    x: 14, 
    y: 14,
    scatter: function() {
      return function() { return controller.scatter_ghost(model.blinky);}
    },
    last_x: 14,
    last_y: 15,
    s_target_x: 1,
    s_target_y: 30

  },

  clyde: {
    name: 'clyde',
    x: 14, 
    y: 15,
    scatter: function() { 
      return function() { return controller.scatter_ghost(model.clyde);}
    },
    last_x: 14,
    last_y: 16,
    s_target_x: 27,
    s_target_y: 30
  },

  score: 0,

  lives: 3,

  rotation: 0

};

var view = {
  set_box_class: function(i) {
    switch (model.world[i]) {
      case 0:
        document.getElementById(i).className = 'blank';
        break;
      case 1:
        document.getElementById(i).className = 'brick';
        break;
      case 2:
        document.getElementById(i).className = 'coin';
        break;
      case 3:
        document.getElementById(i).className = 'cherry';
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
      view.set_box_class(i);
    }
  },

  draw_character: function(input) {
    var self = input;
    var charid = ((self.x) + (self.y * 28));
    document.getElementById(charid).className = self.name;
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

  scatter_ghost: function(self) {

    var move_left = {
        x: self.x - 1,
        y: self.y
    };

    var move_up = {
      x: self.x,
      y: self.y - 1
    };

    var move_right = {
      x: self.x + 1,
      y: self.y
    };

    var move_down = {
      x: self.x,
      y: self.y + 1
    };

    var arr = [move_left, move_up, move_right, move_down];
    var validity = false;


    while (validity == false) {
      validity = true;
      for (i in arr) {
        var next_pos_value = model.world[((arr[i].x) + (arr[i].y * 28))];
        if (next_pos_value == 1) {
          arr.splice(i, 1);
          var validity = false;
        } else if (controller.on_board(arr[i].x, arr[i].y) == false) {
          arr.splice(i, 1);
          validity = false;
        } else if ((arr[i].x == self.last_x && arr[i].y == self.last_y)) {
          arr.splice(i, 1);
          validity = false;
        }
      }
    }

    var ctt = { 
      x: arr[0].x, 
      y: arr[0].y 
    };

    for (i in arr) {
      if ( (Math.abs(arr[i].x - self.s_target_x) + Math.abs(arr[i].y - self.s_target_y)) <= (Math.abs(ctt.x - self.s_target_x) + Math.abs(ctt.y - self.s_target_y)) ) {
        ctt.x = arr[i].x;
        ctt.y = arr[i].y;
      }
    };

    self.last_x = self.x;
    self.last_y = self.y;

    self.x = ctt.x;
    self.y = ctt.y;
    view.draw_character(self);
    view.set_box_class(((self.last_x) + (self.last_y * 28)));
  },
};

//   attack_ghost: function(self) {
//     var self = self;
//     var move_left = {
//         x: self.x - 1,
//         y: self.y
//     };
//     var move_up = {
//       x: self.x,
//       y: self.y - 1
//     };
//     var move_right = {
//       x: self.x + 1,
//       y: self.y
//     };
//     var move_down = {
//       x: self.x,
//       y: self.y + 1
//     };
//     var old_pos = { 
//       x: self.x,
//       y: self.y
//     }
//     var arr = [move_left, move_up, move_right, move_down];
//     var validity = false;

//     while (validity == false) {
//       validity = true;
//       for (i in arr) {
//         var next_pos_value = model.world[((arr[i].x) + (arr[i].y * 28))];
//         if (next_pos_value == 1) {
//           arr.splice(i, 1);
//           var validity = false;
//         } else if (controller.on_board(arr[i].x, arr[i].y) == false) {
//           arr.splice(i, 1);
//           validity = false;
//         } else if ((arr[i].x == self.last_x && arr[i].y == self.last_y)) {
//           arr.splice(i, 1);
//           validity = false;
//         }
//       }
//     }
//     var ctt = { 
//       x: arr[0].x, 
//       y: arr[0].y 
//     };

//     for (i in arr) {
//       if ( (Math.abs(arr[i].x - self.a_target_x) + Math.abs(arr[i].y - self.a_target_y)) <= (Math.abs(ctt.x - self.a_target_x) + Math.abs(ctt.y - self.a_target_y)) ) {
//         ctt.x = arr[i].x;
//         ctt.y = arr[i].y;
//       }
//     };

//     self.last_x = self.x;
//     self.last_y = self.y;

//     self.x = ctt.x;
//     self.y = ctt.y;
//     view.draw_character(self);
//     view.set_box_class(((self.last_x) + (self.last_y * 28)));
//   },
// };

function init() {
  view.draw_world();
  view.draw_character(model.pacman);
  view.draw_character(model.pinky);
  view.draw_character(model.blinky);
  view.draw_character(model.inky);
  view.draw_character(model.clyde);
  view.draw_score();
  view.draw_lives();
}

document.onkeydown = model.pacman.move;
window.onload = init;
window.setInterval(model.pinky.scatter(), 400);
window.setTimeout(window.setInterval(model.inky.scatter(), 400), 1000);
window.setTimeout(window.setInterval(model.blinky.scatter(), 400), 1500);
window.setTimeout(window.setInterval(model.clyde.scatter(), 400), 2000);

 



