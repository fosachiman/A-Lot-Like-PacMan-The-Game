function assignPosition () {
  pacMan.assignRow();
  pacMan.assignColumn();
}

// function movingRightRowDetection () {
//   assignPosition();
//   let x = pacMan.row;
//   let y = pacMan.column;
//   // console.log(pacMan.row);
//   // console.log(pacMan.column);
//   for (let i = 0; i < boxArray.length; i++) {
//     if (boxArray[i].row === x && boxArray[i].column === y && boxArray[i].hasRightWall === true){
//       console.log('collision')
//       return true;
//     }
//   }
// }
// function movingLeftRowDetection () {
//   assignPosition ();
//   let x = pacMan.row;
//   let y = pacMan.column;
//   for (let i = 0; i < boxArray.length; i++) {
//     if (boxArray[i].row === x && boxArray[i].column === y)
//       if (boxArray[i-1].hasRightWall === true)
//         return true;
//   }
// }

// function movingDownColumnDetection () {
//   assignPosition ();
//   let x = pacMan.row;
//   let y = pacMan.column;
//   for (let i = 0; i < boxArray.length; i++) {
//     if (boxArray[i].row === x && boxArray[i].column === y && boxArray[i].hasBottomWall === true)
//       return true;
//   }
// }

// function movingUpColumnDetection () {
//   assignPosition ();
//   let x = pacMan.row;
//   let y = pacMan.column;
//   for (let i = 0; i < boxArray.length; i++) {
//     let boxBefore = boxArray[i - 27];
//     if (boxArray[i].row === x && boxArray[i].column === y && boxBefore.hasBottomWall === true)
//       return true;
//   }
// }



