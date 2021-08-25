let levels = [];

levels[0] = {
  map:[
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,1,0,1,0,1,0,0,0,0,0,1],
  [1,0,1,0,0,0,1,0,1,1,1,0,1],
  [1,0,0,0,1,1,1,0,0,0,0,0,1],
  [1,0,1,0,0,0,0,0,1,1,1,0,1],
  [1,0,1,0,1,1,1,0,1,0,0,0,1],
  [1,0,1,0,1,0,0,0,1,1,1,0,1],
  [1,0,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,1,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1]

  ],
  player: {
     x:1,
     y:4
  },
  goal:{
    x:11,
    y:6
  },
  theme:'default'
};
function Game(id, level) {
  
  this.el = document.getElementById(id);
  
  this.tileTypes = ['floor','wall'];
  
  this.tileDim = 50;
 
  this.map = level.map;
  this.theme = level.theme
  this.player = {...level.player};
  this.goal = {...level.goal};
}

Game.prototype.populateMap = function() {
  
  this.el.className = 'game-container ' + this.theme;
  
  let tiles = document.getElementById('tiles');
  
  for (var y = 0; y < this.map.length; ++y) {
    
    for (var x = 0; x < this.map[y].length; ++x) {
              
           let tileCode = this.map[y][x];
		
       
           let tileType = this.tileTypes[tileCode];

      // console.log("dsfa"+tileType)
           let tile = this.createEl(x, y, tileType);
      // console.log(tile)
          tiles.appendChild(tile); // add to tile layer
	//console.log(tiles.appendChild(tile))
     }
  }
}
Game.prototype.createEl = function(x,y,type) {
   // create one tile.
  let el = document.createElement('div');
       
  // two class names: one for tile, one or the tile type.
  el.className = type;
  
  // set width and height of tile based on the passed-in dimensions.
  el.style.width = el.style.height = this.tileDim + 'px';
  
  // set left positions based on x coordinate.
  el.style.left = x*this.tileDim + 'px';
  
  // set top position based on y coordinate.
  el.style.top = y*this.tileDim + 'px';
      
  return el;
}
Game.prototype.placeSprite = function(type) {
  

  let x = this[type].x
  let y = this[type].y;
  
  // reuse the createTile function
  let sprite  = this.createEl(x,y,type);
  
  sprite.id = type;
  
  let layer = this.el.querySelector('#sprites');
  
  layer.appendChild(sprite);
  
  return sprite;
}
 Game.prototype.sizeUp = function() {
  
  // inner container so that text can be below it
  let map  = this.el.querySelector('.game-map');
  
  // inner container, height. Need this.map
  map.style.height = this.map.length * this.tileDim + 'px';
   
  map.style.width = this.map[0].length * this.tileDim + 'px';
 }
Game.prototype.movePlayer = function(event) {
  
  
  if (event.keyCode < 37 || event.keyCode > 40) {
      return;
  }
   switch (event.keyCode) {
   
        case 37:
        this.moveLeft();
        break;
        
        case 38:
        this.moveUp();
        break;
        
        case 39:
        this.moveRight();
        break;
       
        case 40:
        this.moveDown();
        break;
    }
}
Game.prototype.checkGoal = function() {
  console.log(this.player.y+this.goal.y)
    if (this.player.y == this.goal.y && 
        this.player.x == this.goal.x) {
	window.alert("You Won! game over")
	setTimeout(function(){
   	window.location.reload(1);
	}, 3000);
     }
     else {
        className = '';
     }
  
}
Game.prototype.keyboardListener = function() {
  
  document.addEventListener('keydown', event => {
      
      this.movePlayer(event);
    
      this.checkGoal();
  });
}

/* movement helpers */

Game.prototype.moveLeft = function() {   
  
   
  
   let nextTile = this.map[this.player.y][this.player.x - 1];
 // console.log(nextTile)
   if (nextTile == 1) {
       return;
   }
    
   this.player.x -=1;
   
   this.updateHoriz();
}
Game.prototype.moveUp = function() {    
  
   let nextTile = this.map[this.player.y-1][this.player.x];
   if (nextTile ==1) {
        return;
   }
    
   this.player.y -=1;
   
   this.updateVert();
}
Game.prototype.moveRight = function() {   
   
   let nextTile = this.map[this.player.y][this.player.x + 1];
        
   if (nextTile == 1) {
        return;
   }
    
   this.player.x +=1;
   
   this.updateHoriz();
}
Game.prototype.moveDown = function() {   
  
   
   let nextTile = this.map[this.player.y+1][this.player.x];
  
   if(nextTile == 1) {
        return;
   }
    
   this.player.y +=1;
   
   this.updateVert();
}

/* dom update helpers */

Game.prototype.updateHoriz = function() {      
   this.player.el.style.left = this.player.x * this.tileDim+ 'px'; 
	console.log(this.player.el.style.left)   
};

Game.prototype.updateVert = function() {
   this.player.el.style.top = this.player.y * this.tileDim+ 'px'; };


function init() {
   let myGame = new Game('game-container-1',levels[0]);
    
   myGame.populateMap();
  
   myGame.sizeUp();
  
   myGame.placeSprite('goal');
  
   let playerSprite = myGame.placeSprite('player');
  
   myGame.player.el = playerSprite;
  
   myGame.keyboardListener();
}

init();

