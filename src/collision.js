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

function movingRightRowDetection () {
  assignPosition();
  let x = pacMan.row;
  let y = pacMan.column;
  for (let i = 0; i < boxArray.length; i++) {
    if (boxArray[i].row === x && boxArray[i].column === y && boxArray[i].hasRightWall === true){
      return true;
    }
  }
  return false;
}
function movingLeftRowDetection () {
  assignPosition ();
  let x = pacMan.row;
  let y = pacMan.column;
  for (let i = 0; i < boxArray.length; i++) {
    if (boxArray[i].row === x && boxArray[i].column === y){
      if (boxArray[i-1].hasRightWall === true)
        return true;
    }
  }
  return false;
}

function movingDownColumnDetection () {
  assignPosition ();
  let x = pacMan.row;
  let y = pacMan.column;
  for (let i = 0; i < boxArray.length; i++) {
    if (boxArray[i].row === x && boxArray[i].column === y && boxArray[i].hasBottomWall === true)
      return true;
  }
  return false;
}

function movingUpColumnDetection () {
  assignPosition ();
  let x = pacMan.row;
  let y = pacMan.column;
  for (let i = 0; i < boxArray.length; i++) {
    let boxBefore = boxArray[i - 27];
    if (boxArray[i].row === x && boxArray[i].column === y && boxBefore.hasBottomWall === true)
      return true;
  }
  return false;
}
