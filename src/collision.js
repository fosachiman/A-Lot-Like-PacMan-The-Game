//Calls object functions that assign rows and columns to each character

function assignPosition () {
  pacMan.assignRow();
  pacMan.assignColumn();
  ghostOne.assignRow();
  ghostOne.assignColumn();
  ghostTwo.assignRow();
  ghostTwo.assignColumn();
  ghostThree.assignRow();
  ghostThree.assignColumn();
  ghostFour.assignRow();
  ghostFour.assignColumn();
}

//Detects walls when moving right

function movingRightRowDetection (char) {
  assignPosition();
  let x = char.row;
  let y = char.column;
  for (let i = 0; i < boxArray.length; i++) {
    if (boxArray[i].row === x && boxArray[i].column === y && boxArray[i].hasRightWall === true){
      return true;
    }
  }
  return false;
}

//Detects walls when moving left

function movingLeftRowDetection (char) {
  assignPosition ();
  let x = char.row;
  let y = char.column;
  for (let i = 0; i < boxArray.length; i++) {
    if (boxArray[i].row === x && boxArray[i].column === y){
      if (boxArray[i-1].hasRightWall === true)
        return true;
    }
  }
  return false;
}

//Detects walls when moving down

function movingDownColumnDetection (char) {
  assignPosition ();
  let x = char.row;
  let y = char.column;
  for (let i = 0; i < boxArray.length; i++) {
    if (boxArray[i].row === x && boxArray[i].column === y && boxArray[i].hasBottomWall === true)
      return true;
  }
  return false;
}

//Detects walls when moving up

function movingUpColumnDetection (char) {
  assignPosition ();
  let x = char.row;
  let y = char.column;
  for (let i = 0; i < boxArray.length; i++) {
    let boxBefore = boxArray[i - 27];
    if (boxArray[i].row === x && boxArray[i].column === y && boxBefore.hasBottomWall === true)
      return true;
  }
  return false;
}
