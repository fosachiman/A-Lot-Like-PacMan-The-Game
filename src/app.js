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
  constructor(speed, leftPos, topPos, canBeEaten){

    this.speed = speed; //milliseconds it takes to move one pixel
    this.canBeEaten = canBeEaten;
    this.leftPos = leftPos;
    this.topPos = topPos
    this.movingRight = false;
    this.movingLeft = false;
    this.movingUp = false;
    this.movingDown = false;
    this.direction = 'none';

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
  constructor(speed, leftPos, topPos, canBeEaten) {
    super(speed, leftPos, topPos, canBeEaten)
  }
}

class Ghost extends Character {
  constructor (speed, leftPos, topPos, canBeEaten, ghostDiv) {
    super (speed, leftPos, topPos, canBeEaten)
  this.ghostDiv = ghostDiv;
  }
}

const pacMan = new PacMan(10, 338, 416, true);
const pacManDiv = document.querySelector('#pac-man');

const ghostOne = new Ghost(9, 338, 260, false, $('#ghost1'));
// const ghostOneDiv = $('#ghost1');

const ghostTwo = new Ghost(9, 312, 260, false, $('#ghost2'));
// const ghostTwoDiv = $('#ghost2');

const ghostThree = new Ghost(9, 364, 260, false, $('ghost3'));
// const ghostThreeDiv = $('#ghost3');

const ghostFour = new Ghost(9, 390, 260, false, $('ghost4'));
// const ghostFourDiv = $('#ghost4');

assignPosition();

//LETS MAKE PACMAN MOVE BABY!

function initiateEventListeners () {
  window.addEventListener('keydown', move);
}
function move(e) {
  if (e.keyCode === 39 && pacMan.movingRight !== true) {
    moveRight();
  }
  else if (e.keyCode === 38 && pacMan.movingUp !== true) {
    moveUp();
  }
  else if (e.keyCode === 37 && pacMan.movingLeft !== true) {
    moveLeft();
  }
  else if (e.keyCode === 40 && pacMan.movingDown !== true) {
    moveDown();
  }
}

function moveRight () {
  pacMan.movingRight = true;
  let animate = setInterval(start, pacMan.speed);
  function start () {
    pacManEats();
    if (horizontalGrid() === true && movingRightRowDetection() === false) {
      if (pacMan.movingLeft === true){
        pacMan.movingRight = false;
        clearInterval(animate);
      }
      else {
        pacMan.leftPos++;
        pacManDiv.style.left = pacMan.leftPos + 'px';
        if (movingRightRowDetection() === true) {
          pacMan.movingRight = false;
          clearInterval(animate);
        }
      }
    }
  }
}
function moveDown () {
  pacMan.movingDown = true;
  let animate = setInterval(start, pacMan.speed);
  function start () {
    pacManEats();
    if (verticalGrid() === true && movingDownColumnDetection() === false) {
      if (pacMan.movingUp === true) {
        pacMan.movingDown = false;
        clearInterval(animate);
      }
      else {
        pacMan.topPos++;
        pacManDiv.style.top = pacMan.topPos + 'px';
        if (movingDownColumnDetection() === true) {
          pacMan.movingDown = false;
          clearInterval(animate);
        }
      }
    }
  }
}
function moveLeft () {
  pacMan.movingLeft = true;
  let animate = setInterval(start, pacMan.speed);
  function start () {
    pacManEats();
    if (horizontalGrid() === true && movingLeftRowDetection() === false) {
      if (pacMan.leftPos <= 0 || pacMan.movingRight === true) {
        pacMan.movingLeft = false;
        clearInterval(animate);
      }
      else {
        pacMan.leftPos--;
        pacManDiv.style.left = pacMan.leftPos + 'px';
        if (movingLeftRowDetection() === true) {
          pacMan.movingLeft = false;
          clearInterval(animate);
        }
      }
    }
  }
}
function moveUp () {
  pacMan.movingUp = true;
  let animate = setInterval(start, pacMan.speed);
  function start () {
    pacManEats();
    if (verticalGrid() === true && movingUpColumnDetection() === false) {
      if (pacMan.topPos <= 0 || pacMan.movingDown === true) {
        pacMan.movingUp = false;
        clearInterval(animate);
      }
      else {
        pacMan.topPos--;
        pacManDiv.style.top = pacMan.topPos + 'px';
        if (movingUpColumnDetection() === true) {
          pacMan.movingUp = false;
          clearInterval(animate);
        }
      }
    }
  }
}

function horizontalGrid () {
  if (pacMan.row !== undefined)
    return true;
  else
    return false;
}

function verticalGrid () {
  if (pacMan.column !== undefined)
    return true;
  else
    return false;
}

// function checkHorizontalMovement () {
//   if (pacMan.leftPos === isHorizontal())
//     return false;
//   else
//     return true;
// }

// function checkVerticalMovement () {
//   if (pacMan.topPos === isVertical())
//     return false;
//   else
//     return true;
// }

// function isHorizontal () {
//   let num = setTimeout(function() {
//     return pacMan.leftPos;
//   }, 50);
//   return num;
// }

// function isVertical () {
//   let num = setTimeout(function() {
//     return pacMan.topPos;
//   }, 50);
//   return num;
// }

function pacManEats () {
  let boxElArray = $('.box');
  for (let i = 0; i < boxElArray.length; i++){
    if (parseInt(boxElArray[i].getAttribute('row')) === pacMan.row && parseInt(boxElArray[i].getAttribute('column')) === pacMan.column)
      boxElArray[i].innerHTML = '';
  }
}

function moveGhosts () {
  let animate = setInterval(start, ghostOne.speed);
  function start () {
    for (let i = 0; i < ghostArray; i++){
      let direction = ghostDecideDirection();
      if (direction === 'left') {
        ghostArray[i].leftPos--;
        GhostArray[i].ghostDiv.style.left = ghostArray[i].leftPos + 'px';
        if (movingLeftRowDetection() === true) {
          pacMan.movingLeft = false;
          clearInterval(animate);
      }

      }
    }
    if (horizontalGrid() === true && movingRightRowDetection() === false) {
      if (pacMan.movingLeft === true){
        pacMan.movingRight = false;
        clearInterval(animate);
      }
      else {
        pacMan.leftPos++;
        pacManDiv.style.left = pacMan.leftPos + 'px';
        if (movingRightRowDetection() === true) {
          pacMan.movingRight = false;
          clearInterval(animate);
        }
      }
    }
  }
}

//Ghosts!
  $('#ghost1').css({'left':'338px', 'top':'260px'});
  $('#ghost2').css({'left':'312px', 'top':'260px'});
  $('#ghost3').css({'left':'364px', 'top':'260px'});
  $('#ghost4').css({'left':'390px', 'top':'260px'});


function ghostDecideDirection () {
  let direction = Math.ceil(Math.random()*4);
  if (direction < 2)
    return 'left';
  if (direction < 3)
    return 'up';
  if (direction < 4)
    return 'right';
  if (direction < 5)
    return 'down';
}

initiateEventListeners();


