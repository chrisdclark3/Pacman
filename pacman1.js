var model = {

  world: [
  // 28w * 31l
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,
    1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,0,1,1,1,1,0,1,
    1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,0,1,1,1,1,0,1,
    1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,0,1,1,1,1,0,1,
    1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,
    1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1,
    1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1,
    1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1,
    1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1,
    1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1,
    1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1,
    1,1,1,1,1,1,2,1,1,0,1,1,1,1,0,1,1,1,0,1,1,2,1,1,1,1,1,1,
    1,1,1,1,1,1,2,1,1,0,1,1,1,1,0,1,1,1,0,1,1,2,1,1,1,1,1,1,
    1,0,0,0,0,0,2,2,2,0,1,1,1,1,0,1,1,1,0,2,2,2,0,0,0,0,0,1,
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
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,
    1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,
    1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,
  ],

  pacman: { 
    x: 1, 
    y: 1 
  },

  pinky: { 
    x: 14, 
    y: 12,
    last_x: 0,
    last_y: 0,
    s_target_x: 1,
    s_target_y: 1,
    scatter: controller.scatter_ghost()
  },

  inky: { 
    x: 14, 
    y: 13,
    last_x: 0,
    last_y: 0,
    s_target_x: 27,
    s_target_y: 1
  },

  blinky: { 
    x: 14, 
    y: 14,
    last_x: 0,
    last_y: 0,
    s_target_x: 1,
    s_target_y: 30
  },

  clyde: { 
    x: 14, 
    y: 15,
    last_x: 0,
    last_y: 0,
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
  draw_pacman: function() {
    i = ((model.pacman.x) + (model.pacman.y * 28));
    document.getElementById(i).className = "pacman";
  },
  draw_pinky: function() {
    i = ((model.pinky.x) + (model.pinky.y * 28));
    document.getElementById(i).className = "pinky";
  },
  draw_inky: function() {
    i = ((model.inky.x) + (model.inky.y * 28));
    document.getElementById(i).className = "inky";
  },
  draw_blinky: function() {
    i = ((model.blinky.x) + (model.blinky.y * 28));
    document.getElementById(i).className = "blinky";
  },
  draw_clyde: function() {
    i = ((model.clyde.x) + (model.clyde.y * 28));
    document.getElementById(i).className = "clyde";
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
  },
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
    var old_pos = { 
      x: Number(model.pacman.x),
      y: Number(model.pacman.y)
    }
    var move_left = { 
      x: model.pacman.x - 1,
      y: model.pacman.y
    }
    var move_up = { 
      x: model.pacman.x,
      y: model.pacman.y - 1
    }
    var move_down = { 
      x: model.pacman.x,
      y: model.pacman.y + 1
    }
    var move_right = { 
      x: model.pacman.x + 1,
      y: model.pacman.y
    }

    switch (e.keyCode) {
      case 37:
        if (model.world[(move_left.x + (move_left.y * 28))] != 1) {
          model.pacman.x = move_left.x;
          model.pacman.y = move_left.y;
          rotation = 180;
        }
        break;
      case 38:
        if (model.world[(move_up.x + (move_up.y * 28))] != 1) {
          model.pacman.x = move_up.x;
          model.pacman.y = move_up.y;
          rotation = 270;
        }
        break;
      case 39:
        if (model.world[(move_right.x + (move_right.y * 28))] != 1) {
          model.pacman.x = move_right.x;
          model.pacman.y = move_right.y;
          rotation = 0;
        }
        break;
      case 40:
        if (model.world[(move_down.x + (move_down.y * 28))] != 1) {
          model.pacman.x = move_down.x;
          model.pacman.y = move_down.y;
          rotation = 90;
        }
        break;
      default:
        break;
    }
    if (model.world[((model.pacman.y * 28) + (model.pacman.x))] == 2) {
      model.world[((model.pacman.y * 28) + (model.pacman.x))] = 0;
      model.world[(old_pos.x + (old_pos.y * 28))] = 0;
      model.score += 10;
    }
    if (model.world[((model.pacman.y * 28) + (model.pacman.x))] == 3) {
      model.world[((model.pacman.y * 28) + (model.pacman.x))] = 0;
      model.world[(old_pos.x + (old_pos.y * 28))] = 0;
      model.score += 100;
    }
    view.set_box_class((old_pos.x + (old_pos.y * 28)));
    view.draw_pacman();
  },

  scatter_ghost: function() {
    var move_left = { x: (this.x - 1), y: (this.y) };
    var move_up = { x: (this.x), y: (this.y - 1) };
    var move_down = { x: (this.x), y: (this.y + 1) };
    var move_right = { x: (this.x + 1), y: (this.y) };
    var arr = [move_left, move_up, move_right, move_down];
    var validity = false;

    while (validity == false) {
      validity = true;
      for (i in arr) {
        var next_pos_value = model.world[((arr[i].x) + (arr[i].y * 28))];
        if (next_pos_value === 1) {
          arr.splice(i, 1);
          var validity = false;
        } else if (controller.on_board(arr[i].x, arr[i].y) == false) {
          arr.splice(i, 1);
          validity = false;
        } else if ((arr[i].x == this.last_x && arr[i].y == this.last_y)) {
          arr.splice(i, 1);
          validity = false;
        }
      }
    };

    var ctt = { x: arr[0].x , y: arr[0].y };

    for (i in arr) {
      if ((arr[i].x - this.s_target_x + arr[i].y - this.s_target_y) < (this.last_x - this.s_target_x + this.last_y - this.s_target_y)) {
        ctt.x = arr[i].x;
        ctt.y = arr[i].y;
      }
    };

    if ((this.x ==  this.s_target_x) && (this.y ==  this.s_target_y)) {
      ctt.x = move_down.x;
      ctt.y = move_down.y;
    };

    this.last_x = this.x;
    this.last_y = this.y;

    this.x = ctt.x;
    this.y = ctt.y;

    view.draw_pinky();

    view.set_box_class(((this.last_x) + (this.last_y * 28)));
  }

  // scatter_pinky: function() {
  //   var move_left = { x: (model.pinky.x - 1), y: (model.pinky.y) };
  //   var move_up = { x: (model.pinky.x), y: (model.pinky.y - 1) };
  //   var move_down = { x: (model.pinky.x), y: (model.pinky.y + 1) };
  //   var move_right = { x: (model.pinky.x + 1), y: (model.pinky.y) };
  //   var arr = [move_left, move_up, move_right, move_down];
  //   var validity = false;

  //   while (validity == false) {
  //     validity = true;
  //     for (i in arr) {
  //       var next_pos_value = model.world[((arr[i].x) + (arr[i].y * 28))];
  //       if (next_pos_value === 1) {
  //         arr.splice(i, 1);
  //         var validity = false;
  //       } else if (controller.on_board(arr[i].x, arr[i].y) == false) {
  //         arr.splice(i, 1);
  //         validity = false;
  //       } else if ((arr[i].x == model.pinky.last_x && arr[i].y == model.pinky.last_y)) {
  //         arr.splice(i, 1);
  //         validity = false;
  //       }
  //     }
  //   };

  //   var ctt = { x: arr[0].x , y: arr[0].y };

  //   for (i in arr) {
  //     if ((arr[i].x - model.pinky.s_target_x + arr[i].y - model.pinky.s_target_y) < (model.pinky.last_x - model.pinky.s_target_x + model.pinky.last_y - model.pinky.s_target_y)) {
  //       ctt.x = arr[i].x;
  //       ctt.y = arr[i].y;
  //     }
  //   };

  //   if ((model.pinky.x ==  model.pinky.s_target_x) && (model.pinky.y ==  model.pinky.s_target_y)) {
  //     ctt.x = move_down.x;
  //     ctt.y = move_down.y;
  //   };

  //   model.pinky.last_x = model.pinky.x;
  //   model.pinky.last_y = model.pinky.y;

  //   model.pinky.x = ctt.x;
  //   model.pinky.y = ctt.y;

  //   view.draw_pinky();
  //   view.set_box_class(((model.pinky.last_x) + (model.pinky.last_y * 28)));
  // },

  
}

function init() {
  view.draw_world();
  view.draw_pacman();
  view.draw_pinky();
  view.draw_inky();
  view.draw_blinky();
  view.draw_clyde();
  view.draw_score();
  view.draw_lives();

}

addEventListener('keydown', controller.move_pacman);
window.onload = init;
window.setInterval(model.pinky.scatter(), 200);
// window.setTimeout(window.setInterval(controller.scatter_blinky, 200), 2000);

 



