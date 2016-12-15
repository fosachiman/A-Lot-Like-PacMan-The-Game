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

//maybe get the gameboard built first?
console.log('hello');

class Character {
  constructor(height, width, speed, canBeEaten, eatsDots){
    this.height = height;
    this.width = width;
    this.speed = speed;
    this.canBeEaten = canBeEaten;
    this.hitBox = width * .9;
    this.eatsDots = eatsDots;
  }
}

let pacMan = new Character('30px', '30px', '5s', true, true);


let pacManDiv = document.querySelector('#pac-man');

let topPos = pacManDiv.offsetTop;
let leftPos = pacManDiv.offSetLeft;
console.log(topPos);

function initiateEventListeners () {
  window.addEventListener('keydown', move);
}
function move(e) {
  if (e.keyCode === 39)
    moveRight();
  else if (e.keyCode === 40)
    moveUp();
  else if (e.keyCode === 37)
    moveLeft();
  else if (e.keyCode === 38)
    moveDown();
}
function moveRight () {
  pacManDiv.style.animation = 'right ' + pacMan.speed + ' linear forwards';
}
function moveUp () {
  pacManDiv.style.animation = 'up ' + pacMan.speed + ' linear forwards';
}
function moveLeft () {
  pacManDiv.style.animation = 'left ' + pacMan.speed + ' linear forwards';
}
function moveDown () {
  pacManDiv.style.animation = 'down ' + pacMan.speed + ' linear forwards';
}

initiateEventListeners();
