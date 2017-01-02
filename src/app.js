
//Class constructor for all characters on screen

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

//PacMan class constructor
class PacMan extends Character {
  constructor(speed, leftPos, topPos, canBeEaten) {
    super(speed, leftPos, topPos, canBeEaten)
    this.lastKey = 'none';
  }
}

//Ghost class constructor
class Ghost extends Character {
  constructor (speed, leftPos, topPos, canBeEaten, ghostDiv) {
    super (speed, leftPos, topPos, canBeEaten)
  this.ghostDiv = ghostDiv;
  }
}

//Creating instances of PacMan and ghosts and giving them HTML elements
const pacMan = new PacMan(10, 338, 416, true);
const pacManDiv = document.querySelector('#pac-man');

const ghostOneDiv = document.getElementById('ghost1');
const ghostTwoDiv = document.getElementById('ghost2');
const ghostThreeDiv = document.getElementById('ghost3');
const ghostFourDiv = document.getElementById('ghost4');

const ghostOne = new Ghost(8, 338, 260, false, ghostOneDiv);
const ghostTwo = new Ghost(8, 312, 260, false, ghostTwoDiv);
const ghostThree = new Ghost(8, 364, 260, false, ghostThreeDiv);
const ghostFour = new Ghost(8, 390, 260, false, ghostFourDiv);

//An array of the ghost objects
ghostArray = [ghostOne, ghostTwo, ghostThree, ghostFour];
ghostArrayDivs = [ghostOneDiv, ghostTwoDiv, ghostThreeDiv, ghostFourDiv];

//Puts the ghosts on the board
$('#ghost1').css({'left':'338px', 'top':'260px'});
$('#ghost2').css({'left':'312px', 'top':'260px'});
$('#ghost3').css({'left':'364px', 'top':'260px'});
$('#ghost4').css({'left':'390px', 'top':'260px'});

//Assigns x and y position of PacMan and ghosts on the board
assignPosition();

//Event listener for keydowns

function initiateEventListeners () {
  window.addEventListener('keydown', move);
}
function move(e) {
  if (e.keyCode === 39 && pacMan.movingRight !== true) {
    pacMan.lastKey = 'right';
    moveRight();
  }
  else if (e.keyCode === 38 && pacMan.movingUp !== true) {
    pacMan.lastKey = 'up';
    moveUp();
  }
  else if (e.keyCode === 37 && pacMan.movingLeft !== true) {
    pacMan.lastKey = 'left';
    moveLeft();
  }
  else if (e.keyCode === 40 && pacMan.movingDown !== true) {
    pacMan.lastKey = 'down';
    moveDown();
  }
}

//Function for movement in each direction.  I'm SO CLOSE to getting this right, but I can't figure
//out how to clear an interval's movement when PacMan makes a turn without hitting a wall first

function moveRight () {
  pacMan.movingRight = true;
  let animate = setInterval(start, pacMan.speed);
  function start () {
    pacManEats();
    if (isPacManAWinner() === true)
      clearInterval(animate);
    // else if (pacManHit() === true)
    //   clearInterval(animate);
    else if (changeDirectionUp() === true || changeDirectionDown() === true) {
      pacMan.movingRight = false;
      clearInterval(animate);
    }
    else if (horizontalGrid(pacMan) === true && movingRightRowDetection(pacMan) === false) {
      if (pacMan.movingLeft === true){
        pacMan.movingRight = false;
        clearInterval(animate);
      }
      else {
        pacMan.leftPos++;
        pacManDiv.style.left = pacMan.leftPos + 'px';
        if (movingRightRowDetection(pacMan) === true) {
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
    if (isPacManAWinner() === true)
      clearInterval(animate);
    // else if (pacManHit() === true)
    //   clearInterval(animate);
    else if (changeDirectionRight() === true || changeDirectionLeft() === true) {
      pacMan.movingDown = false;
      clearInterval(animate);
    }
    else if (verticalGrid(pacMan) === true && movingDownColumnDetection(pacMan) === false) {
      if (pacMan.movingUp === true) {
        pacMan.movingDown = false;
        clearInterval(animate);
      }
      else {
        pacMan.topPos++;
        pacManDiv.style.top = pacMan.topPos + 'px';
        if (movingDownColumnDetection(pacMan) === true) {
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
    if (isPacManAWinner() === true)
      clearInterval(animate);
    // else if (pacManHit() === true)
    //   clearInterval(animate);
    else if (changeDirectionUp() === true || changeDirectionDown() === true) {
      pacMan.movingLeft = false;
      clearInterval(animate);
    }
    else if (horizontalGrid(pacMan) === true && movingLeftRowDetection(pacMan) === false) {
      if (pacMan.leftPos <= 0 || pacMan.movingRight === true) {
        pacMan.movingLeft = false;
        clearInterval(animate);
      }
      else {
        pacMan.leftPos--;
        pacManDiv.style.left = pacMan.leftPos + 'px';
        if (movingLeftRowDetection(pacMan) === true) {
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
    if (isPacManAWinner() === true)
      clearInterval(animate);
    // else if (pacManHit() === true)
    //   clearInterval(animate);
    else if (changeDirectionRight() === true || changeDirectionLeft() === true) {
      pacMan.movingUp = false;
      clearInterval(animate);
    }
    else if (verticalGrid(pacMan) === true && movingUpColumnDetection(pacMan) === false) {
      if (pacMan.topPos <= 0 || pacMan.movingDown === true) {
        pacMan.movingUp = false;
        clearInterval(animate);
      }
      else {
        pacMan.topPos--;
        pacManDiv.style.top = pacMan.topPos + 'px';
        if (movingUpColumnDetection(pacMan) === true) {
          pacMan.movingUp = false;
          clearInterval(animate);
        }
      }
    }
  }
}
//These change direction functions will halt an animation interval from continuing once pacMan
//is no longer moving in that direction
function changeDirectionUp() {
  if (pacMan.lastKey === 'up' && horizontalGrid(pacMan) === true && verticalGrid(pacMan) === true
      && movingUpColumnDetection(pacMan) === false) {
    return true;
  }
}
function changeDirectionDown() {
  if (pacMan.lastKey === 'down' && horizontalGrid(pacMan) === true && verticalGrid(pacMan) === true
      && movingDownColumnDetection(pacMan) === false) {
    return true;
  }
}
function changeDirectionLeft() {
  if (pacMan.lastKey === 'left' && horizontalGrid(pacMan) === true && verticalGrid(pacMan) === true
      && movingLeftRowDetection(pacMan) === false) {
    return true;
  }
}
function changeDirectionRight() {
  if (pacMan.lastKey === 'right' && horizontalGrid(pacMan) === true && verticalGrid(pacMan) === true
      && movingRightRowDetection(pacMan) === false) {
    return true;
  }
}
//PacMan can only turn when he is on the grid

function horizontalGrid (char) {
  if (char.row !== undefined)
    return true;
  else
    return false;
}

function verticalGrid (char) {
  if (char.column !== undefined)
    return true;
  else
    return false;
}

//Function that allows PacMan to eat dots

function pacManEats () {
  let boxElArray = $('.box');
  for (let i = 0; i < boxElArray.length; i++){
    if (parseInt(boxElArray[i].getAttribute('row')) === pacMan.row && parseInt(boxElArray[i].getAttribute('column')) === pacMan.column)
      boxElArray[i].innerHTML = '';
  }
}

//Ghost movement functionality that needs some work...

function moveGhost (ghost) {
  let animate = setInterval(start, ghost.speed);
  let direction = ghostDecideDirection();
  function start () {
    pacManHit(ghost);
    if (direction === 'left') {
      if (horizontalGrid(ghost) === true && movingLeftRowDetection(ghost) === false) {
        ghost.leftPos--;
        ghost.ghostDiv.style.left = ghost.leftPos + 'px';
        if (movingLeftRowDetection(ghost) === true) {
          ghost.movingLeft = false;
          direction = ghostDecideDirection();
        }
      }
      else
        direction = ghostDecideDirection();
    }
    else if (direction === 'right') {
      if (horizontalGrid(ghost) === true && movingRightRowDetection(ghost) === false) {
        ghost.leftPos++;
        ghost.ghostDiv.style.left = ghost.leftPos + 'px';
        if (movingRightRowDetection(ghost) === true) {
          ghost.movingRight = false;
          direction = ghostDecideDirection();
        }
      }
      else
        direction = ghostDecideDirection();
    }
    else if (direction === 'up') {
      if (verticalGrid(ghost) === true && movingUpColumnDetection(ghost) === false) {
        ghost.topPos--;
        ghost.ghostDiv.style.top = ghost.topPos + 'px';
        if (movingUpColumnDetection(ghost) === true) {
          ghost.movingUp = false;
          direction = ghostDecideDirection();
        }
      }
      else
        direction = ghostDecideDirection();
    }
    else {
      if (verticalGrid(ghost) === true && movingDownColumnDetection(ghost) === false) {
        ghost.topPos++;
        ghost.ghostDiv.style.top = ghost.topPos + 'px';
        if (movingDownColumnDetection(ghost) === true) {
          ghost.movingDown = false;
          direction = ghostDecideDirection();
        }
      }
      else
        direction = ghostDecideDirection();
    }
  }
}

//Randomizes the direction in which the ghosts will travel

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

function isPacManAWinner () {
  let boxElArray = $('.box');
  for (let i = 0; i < boxElArray.length; i++){
    if (boxElArray[i].innerHTML === '.')
    return false;
  }
  alert('PacMan wins!');
  return true;
}

function pacManHit (ghost) {
    if (Math.abs(ghost.topPos - parseInt(pacManDiv.style.top)) < 19 && pacMan.column === ghost.column && pacMan.column !== undefined){
      console.log(ghost.leftPos);
      console.log(parseInt(pacManDiv.style.left));
      console.log(pacMan.column);
      console.log(ghost.column);
      return true;
    }
    else if (Math.abs(ghost.leftPos - parseInt(pacManDiv.style.left)) < 19 && pacMan.row === ghost.row && pacMan.row !== undefined){
      console.log(ghost.leftPos);
      console.log(parseInt(pacManDiv.style.left));
      console.log(pacMan.row);
      console.log(ghost.row);
      return true;
    }
}

//Calls the event listener and ghost movement

initiateEventListeners();
moveGhost(ghostOne);
moveGhost(ghostTwo);
moveGhost(ghostThree);
moveGhost(ghostFour);
