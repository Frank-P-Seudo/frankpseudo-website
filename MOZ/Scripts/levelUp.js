const updateLevelUpBracket = (matArray, player, viewedLevelUpBracket, newMonType, newMonClass, newMonPower, newCardPic, uniqueCardID, recoverability) => {
  viewedLevelUpBracket.monType = newMonType;
  viewedLevelUpBracket.monClass = newMonClass;
  viewedLevelUpBracket.monPower = newMonPower;
  viewedLevelUpBracket.cardPic = newCardPic;
  viewedLevelUpBracket.source = uniqueCardID;
  viewedLevelUpBracket.sourcePlayer = player;
  viewedLevelUpBracket.recoverable = recoverability;

  pushLevelUp(matArray, viewedLevelUpBracket);
}

const pushLevelUp = (matArray, viewedLevelUpBracket) => {
  matArray[matArray.length-1].monPower = viewedLevelUpBracket.monPower;
  if (viewedLevelUpBracket.monType !== '') {matArray[matArray.length-1].monType = viewedLevelUpBracket.monType;}
  if (viewedLevelUpBracket.monClass !== '') {matArray[matArray.length-1].monClass = viewedLevelUpBracket.monClass;}
  if (viewedLevelUpBracket.cardPic !== '') {matArray[matArray.length-1].cardPic = viewedLevelUpBracket.cardPic;}
}

const reverseLevelUpEffect = (player, cardIDChecked, bracketOwner, levelUpBracket) => {
  let positionToRender = [];
  for (let i = 0; i < 3; i++) {
    if ((cardIDChecked !== null && levelUpBracket[i].source === cardIDChecked && levelUpBracket[i].sourcePlayer === player && levelUpBracket[i].recoverable === true) 
      || (cardIDChecked === null && levelUpBracket[i].sourcePlayer === player && levelUpBracket[i].recoverable === true)) {
      positionToRender.push({
        pos: playedPositions[i],
        cardPic: levelUpBracket[i].cardPic
      });
      levelUpBracket[i].monPower = 0;
      levelUpBracket[i].monType = '';
      levelUpBracket[i].monClass = '';
      levelUpBracket[i].cardPic = '';
      levelUpBracket[i].source = '';
      levelUpBracket[i].sourcePlayer = '';
      levelUpBracket[i].recoverable = true;
      restoreOG(findMatArrays(bracketOwner)[i]);
    }
    if (i === 2) {
      for (let j = 0; j < positionToRender.length; j++) {
        if (positionToRender[j].pos === 'sky') {
          restoreMatSlot(bracketOwner, positionToRender[j], findMatArrays(bracketOwner)[0]);
        } else if (positionToRender[j].pos === 'left') {
          restoreMatSlot(bracketOwner, positionToRender[j], findMatArrays(bracketOwner)[1]);
        } else if (positionToRender[j].pos === 'right') {
          restoreMatSlot(bracketOwner, positionToRender[j], findMatArrays(bracketOwner)[2]);
        }
      }
    }
  }
}

const restoreOG = (matArray) => {
  matArray[matArray.length-1].monPower = matArray[matArray.length-1].monPowerOG;
  matArray[matArray.length-1].monType = matArray[matArray.length-1].monTypeOG;
  matArray[matArray.length-1].monClass = matArray[matArray.length-1].monClassOG;
  matArray[matArray.length-1].cardPic = matArray[matArray.length-1].cardPicOG;
}

const restoreMatSlot = (player, positionToRender, viewedArray) => {
  if (positionToRender.cardPic === '' || viewedArray.length === 0) {
    renderMat(player, viewedArray, positionToRender.pos);
  } else {
    if (viewedArray[viewedArray.length-1].upsideDown === false) {
      restoreMatSlot2(player, positionToRender.pos, viewedArray);  // include animation when there is cardPic change for FU card
    } else {
      renderMat(player, viewedArray, positionToRender.pos);
    }
  }
}

const restoreMatSlot2 = (player, playedPosition, matArray) => {
  new Promise(function(restoreResolve) {
    transformAnimation(player, playedPosition, matArray[matArray.length-1].cardPicOG);
    setTimeout(() => restoreResolve(), transAniDur*1000);
  }).then(func => {
    transformAnimationReverse(player, playedPosition);
    renderMat(player, matArray, playedPosition);
  })
}