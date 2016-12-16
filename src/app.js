//top object has speed, eats dots, can be eaten, hit box, can move up down left right
//pac man is an object
// pac man can eat dots and eat big dots that change his state - so hitting ghost is good, not bad
//ghosts are objects, both probably inherit from some object - when pacman changes state, hitting pacman is bad, not good
  //...for them
//pac man can move up down left right
// the move mechanic is that he moves on key down and changes direction on key down
//pac man cannot go through walls

//both ghosts and pacman need to have a trackable x,y location, that can serve as a hitbox

//each box on the grid is a div AND an object
//the properties of this object are -
  //has dot, has BIG dot, has border: up,down,left,right
  //has pacman, has ghost, dot position, dot type

//make dot disappear when pacman runs through it.


//how to we tie pacman's position within the box, and how do we tie ghost position hitting pacman
//solve ghosts banging into each other

//how does pacman's invincibility state run out?
//store the keypress so pacman knows the next opportunity to go through the box
//figure out animation of pacman going through tunnel

//COLLISION DETECTION
//let's say pacman is on row 2,  that means he'd be between y30 and y60 hypothetically
//Pacman can't move down unless he is perfectly in a column and he can't move left/right unless he is perfectly in a row
//Grid is 27 width x 22 height


class Character {
  constructor(speed, canBeEaten, eatsDots, leftPos, topPos){

    this.speed = speed; //milliseconds it takes to move on pixel
    this.canBeEaten = canBeEaten;
    this.eatsDots = eatsDots;
    this.leftPos = leftPos;
    this.topPos = topPos
  }
  assignRow () {
    if (this.topPos % 26 !== 0)
      this.row = undefined;
    else
      this.row = (this.topPos / 26) + 1;
    return this.row;
  };
  assignColumn () {
    if (this.leftPos % 26 !== 0)
      this.column = undefined;
    else
      this.column = (this.leftPos / 26) + 1;
    return this.column;
  };
}

class PacMan extends Character {
  constructor(height, width, speed, canBeEaten, eatsDots) {
    super(height, width, speed, canBeEaten, eatsDots)
  }
}

const pacMan = new PacMan(5, true, true, 338, 416);
const pacManDiv = document.querySelector('#pac-man');
assignPosition();

//LETS MAKE PACMAN MOVE BABY!

function initiateEventListeners () {
  window.addEventListener('keydown', move);
}
function move(e) {
  if (e.keyCode === 39 && pacMan.movingRight !== true && pacMan.row !== undefined && movingRightRowDetection() !== true) {
    console.log(pacMan.row);
    moveRight();
  }
  else if (e.keyCode === 38 && pacMan.movingUp !== true && pacMan.column !== undefined && movingUpColumnDetection() !== true) {
    moveUp();
  }
  else if (e.keyCode === 37 && pacMan.movingLeft !== true && pacMan.row !== undefined && movingLeftRowDetection() !== true) {
    moveLeft();
  }
  else if (e.keyCode === 40 && pacMan.movingDown !== true && pacMan.column !== undefined && movingDownColumnDetection() !== true) {
    console.log(pacMan.column);
    moveDown();
  }
}
function moveRight () {
  pacMan.movingRight = true;
  let animate = setInterval(start, pacMan.speed);
  function start () {
    if (pacMan.movingLeft === true){
      pacMan.movingRight = false;
      clearInterval(animate);
      return null;
    }
    else if (movingRightRowDetection() === true) {
      pacMan.movingRight = false;
      clearInterval(animate);
      return null;
    }
    else {
      pacMan.leftPos++;
      pacManDiv.style.left = pacMan.leftPos + 'px';
      pacMan.movingLeft = false;
      pacMan.movingUp = false;
      pacMan.movingDown = false;
    }
  }
}
function moveDown () {
  pacMan.movingDown = true;
  let animate = setInterval(start, pacMan.speed);
  function start () {
    if (pacMan.movingUp === true) {
      pacMan.movingDown = false;
      clearInterval(animate);
      return null;
    }
    else if (movingDownColumnDetection() === true) {
      pacMan.movingDown = false;
      clearInterval(animate);
      return null;
    }
    else {
      pacMan.topPos++;
      pacManDiv.style.top = pacMan.topPos + 'px';
      pacMan.movingLeft = false;
      pacMan.movingUp = false;
      pacMan.movingRight = false;
    }
  }
}
function moveLeft () {
  pacMan.movingLeft = true;
  let animate = setInterval(start, pacMan.speed);
  function start () {
    if (pacMan.leftPos <= 0 || pacMan.movingRight === true) {
      pacMan.movingLeft = false;
      clearInterval(animate);
      return null;
    }
    else if (movingLeftRowDetection() === true) {
      pacMan.movingLeft = false;
      clearInterval(animate);
      return null;
    }
    else {
      pacMan.leftPos--;
      pacManDiv.style.left = pacMan.leftPos + 'px';
      pacMan.movingRight = false;
      pacMan.movingUp = false;
      pacMan.movingDown = false;
    }
  }
}
function moveUp () {
  pacMan.movingUp = true;
  let animate = setInterval(start, pacMan.speed);
  function start () {
    if (pacMan.topPos <= 0 || pacMan.movingDown === true) {
      pacMan.movingUp = false;
      clearInterval(animate);
      return null;
    }
    else if (movingUpColumnDetection() === true) {
      pacMan.movingUp = false;
      clearInterval(animate);
      return null;
    }
    else {
      pacMan.topPos--;
      pacManDiv.style.top = pacMan.topPos + 'px';
      pacMan.movingRight = false;
      pacMan.movingLeft = false;
      pacMan.movingDown = false;
    }
  }
}

//assign row and column to pac man

initiateEventListeners();


