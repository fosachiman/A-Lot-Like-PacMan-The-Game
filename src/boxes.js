class Box {
  constructor (hasDot, hasRightWall, hasBottomWall) {
    this.hasDot = hasDot;
    this.hasRightWall = hasRightWall;
    this.hasBottomWall = hasBottomWall;
  }
  push (arr) {
    arr.push(this);
  }
}

//We are going to map every dot and wall into a grid and add them all into an array
//This seems like the best way to go?

boxArray = [];

let box1 = new Box (false, true, true);
box1.push(boxArray);

for (let i = 0; i < 25; i++){
  let box = new Box (false, false, true);
  box.push(boxArray);
}

let box27 = new Box (false, true, true);
box27.push(boxArray);

let box28 = new Box (false, true, false);
box28.push(boxArray);

let box29 = new Box (true, false, false);
box29.push(boxArray);

for (let i = 0; i < 4; i++){
  let box = new Box (true, false, true);
  box.push(boxArray)
}
let box34 = new Box (true, true, false);
box34.push(boxArray);

let box35 = new Box (false, false, false);
box35.push(boxArray);

let box36 = new Box (false, true, false);
box36.push(boxArray);

let box37 = new Box (true, false, false);
box37.push(boxArray);

for (let i = 0; i < 8; i++){
  let box = new Box (true, false, true);
  box.push(boxArray);
}

let box46 = new Box (true, true, false);
box46.push(boxArray);

let box47 = new Box (false, false, false);
box47.push(boxArray);

let box48 = new Box (false, true, false);
box48.push(boxArray);

let box49 = new Box (true, false, false);
box49.push(boxArray);

for (let i = 0; i < 4; i++){
  let box = new Box (true, false, true);
  box.push(boxArray);
}
let box54 = new Box (true, true, false);
box54.push(boxArray);

let box55 = new Box (false, true, false);
box55.push(boxArray);

let box56 = new Box (true, true, false);
box56.push(boxArray);

for (let i = 0; i < 3; i++){
  let box = new Box (false, false, false);
  box.push(boxArray)
}

let box60 = new Box (false, true, false);
box60.push(boxArray);

let box61 = new Box (true, true, false);
box61.push(boxArray);

let box62 = new Box (false, false, false);
box62.push(boxArray);

let box63 = new Box (false, true, false);
box63.push(boxArray);

let box64 = new Box (true, true, false);
box64.push(boxArray);

for (let i = 0; i < 8; i++){
  let box = new Box (false, false, false);
  box.push(boxArray);
}

let box73 = new Box (true, true, false);
box73.push(boxArray);

let box74 = new Box (false, false, false);
box74.push(boxArray);

let box75 = new Box (false, true, false);
box75.push(boxArray);

let box76 = new Box (true, true, false);
box76.push(boxArray);

for (let i = 0; i < 3; i++){
  let box = new Box (false, false, false);
  box.push(boxArray);
}

let box80 = new Box (false, true, false);
box80.push(boxArray);

let box81 = new Box (true, true, false);
box81.push(boxArray);

let box82 = new Box (false, true, false);
box82.push(boxArray);

let box83 = new Box ()

console.log(boxArray);

function createMap () {
  let gameBoard = document.querySelector('#game-board');
  for (let i = 0; i < boxArray.length; i++){
    let boxEl = document.createElement('div');
    boxEl.className = 'box';
    gameBoard.appendChild(boxEl);
    boxEl.style.height = '20px';
    boxEl.style.width = '26px';
    if (boxArray[i].hasDot === true)
      boxEl.innerHTML = '.';
    if (boxArray[i].hasRightWall === true)
      boxEl.style.borderRight = '1px solid white'
    if (boxArray[i].hasBottomWall === true)
      boxEl.style.borderBottom = '1px solid white'
  }
}

createMap();


