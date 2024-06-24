const triggerSideEffects = (player, uniqueCardID, viewedArray, myResolve) => {
  console.log(uniqueCardID, 'side effect is triggered');
  switch (uniqueCardID) {
    case '019':
      reverseChangedSumType(findMatArrays(player)[5], viewedArray, myResolve);
      break;
    case '119':
      reverseChangedSumType(findMatArrays(player)[5], viewedArray, myResolve);
      break;
    case '120':
      reverseChangedSumType(findMatArrays(player)[5], viewedArray, myResolve);
      break;
    case '121':
      reverseChangedSumType(findMatArrays(player)[5], viewedArray, myResolve);
      break;
    case '123':
      reverseChangedSumType(findMatArrays(player)[5], viewedArray, myResolve);
      break;
    case '124':
      reverseChangedSumType(findMatArrays(player)[5], viewedArray, myResolve);
      break;
    case '126':
      reverseChangedSumType(findMatArrays(player)[5], viewedArray, myResolve);
      break;
    case '127':
      reverseChangedSumType(findMatArrays(player)[5], viewedArray, myResolve);
      break;
    case '137':
      preconditionGone(player, uniqueCardID, '275', myResolve);  // 275 紅普斯靼
      break;
    case '137B':
      preconditionGone(player, uniqueCardID, '275', myResolve);  // 275 紅普斯靼
      break;
    case '138':
      preconditionGone(player, uniqueCardID, '286', myResolve);  // 286 魯哥拉
      break;
    /** 
    case '214':
      reversePowerupVoiding(findMatArrays(findVictim(player)[5]), myResolve);
      break;
    */
    case '238':
      reverseChangedSumType(findMatArrays(player)[5], viewedArray, myResolve);
      break;
    case '239':
      reverseChangedSumType(findMatArrays(player)[5], viewedArray, myResolve);
      break;
    case '240':
      reverseChangedSumType(findMatArrays(player)[5], viewedArray, myResolve);
      break;
    case '241':
      reverseChangedSumType(findMatArrays(player)[5], viewedArray, myResolve);
      break;
    case '248':
      reverseAllStarsEffect(player, uniqueCardID, findMatArrays(player), myResolve);  
      // cardSideEffect248(player, uniqueCardID, findMatArrays(player), myResolve);
      break;
    case '287':
      cardSideEffect287(findMatArrays(player)[5], viewedArray, myResolve);
      break;
    /** 
    case '294':
      reversePowerupUpgrade(findMatArrays(player), myResolve);
      break;
    case '295':
      reversePowerupUpgrade(findMatArrays(player), myResolve);
      break;
    */
    case '297':
      cardSideEffect297(player, uniqueCardID, myResolve);
      break;
    case '314':
      reverseAllStarsEffect(player, uniqueCardID, findMatArrays(player), myResolve);
      break;
    case '319':
      reverseAllStarsEffect(player, uniqueCardID, findMatArrays(player), myResolve);
      break;
    case '691':
      reverseAllStarsEffect(player, uniqueCardID, findMatArrays(player), myResolve);
      break;
    case '692':
      reverseAllStarsEffect(player, uniqueCardID, findMatArrays(player), myResolve);
      break;
    case '693':
      reverseAllStarsEffect(player, uniqueCardID, findMatArrays(player), myResolve);
      break;
    default:
      myResolve();
  }
}

const cardSideEffect287 = (summonerArray, viewedArray, myResolve) => {
  const playedPosition = arrayToPosition(viewedArray);
  if (playedPosition === 'sky') {
    summonerArray[0].leftType = summonerArray[0].leftType.replace('KK', ''); 
    summonerArray[0].rightType = summonerArray[0].rightType.replace('KK', '');
  } else if (playedPosition === 'left') {
    summonerArray[0].skyType = summonerArray[0].skyType.replace('KK', '');
    summonerArray[0].rightType = summonerArray[0].rightType.replace('KK', '');
  } else {
    summonerArray[0].skyType = summonerArray[0].skyType.replace('KK', '');
    summonerArray[0].leftType = summonerArray[0].leftType.replace('KK', '');
  }
  myResolve();
}

// 秘幻之蛋
const cardSideEffect297 = (player, uniqueCardID, myResolve) => {
  let twoHundreds = ['276', '280', '284'];  // 	276 赤毛牛, 278 洛多華 (a bit different), 280 樹獅, 284 光之大精靈
  let twoHundredFound = false;
  if (findMatArrays(player)[5][0].cardID !== 'S113') {  // 	S113 戴度‧加, which can summon 278 without 297
    twoHundreds.push('278');
  }
  for (let i = 0; i < twoHundreds.length; i++) {
    if (cardOnFieldCheck(player, twoHundreds[i]) === true) {
      pushBlockItem(player, uniqueCardID, 'cardID', twoHundreds[i], player, false);
      twoHundredFound = true;
    }
    if (i === twoHundreds.length-1) {
      if (twoHundredFound === true) {
        inflictDmgStep1(player, myResolve);
      } else {
        myResolve();
      }
    }
  }
}

const reverseChangedSumType = (summonerArray, viewedArray, myResolve) => {
  const playedPosition = arrayToPosition(viewedArray);
  if (playedPosition === 'sky') {
    summonerArray[0].skyType = summonerArray[0].skyTypeOG;
  } else if (playedPosition === 'left') {
    summonerArray[0].leftType = summonerArray[0].leftTypeOG;
  } else {
    summonerArray[0].rightType = summonerArray[0].rightTypeOG;
  }
  myResolve();
}

/** 
The functions below should be obsolete now because reversePowerUpHist() under dmgCheck will take care of this
const reversePowerupVoiding = (foeSummonerArray, myResolve) => {
  foeSummonerArray[0].powerupVoided = false;
  myResolve();
}

const reversePowerupUpgrade = (matArrays, myResolve) => {
  matArrays[5][0].powerUp = matArrays[5][0].powerUpOG;
  myResolve();
}

// when 248 is turned UD, the powerUp and sky/left/rightType need to be corrected
const cardSideEffect248 = (player, uniqueCardID, matArrays, myResolve) => {
  matArrays[5][0].powerUp = 'XX010';
  reverseAllStarsEffect(player, uniqueCardID, matArrays, myResolve);
}
*/

// applicable to 酒, 閃念
const preconditionGone = (player, uniqueCardID, supportedCardID, myResolve) => {
  if (cardOnFieldCheck(player, supportedCardID) === true) {
    new Promise(function(effectResolve) {  
      pushBlockItem(player, uniqueCardID, 'cardID', supportedCardID, player, false);
      setTimeout(() => effectResolve(), 10);
    }).then(func => {
      inflictDmgStep1(player, myResolve);
    })
  } else {
    myResolve();
  }
}

const reverseAllStarsEffect = (player, uniqueCardID, matArrays, myResolve) => {
  matArrays[5][0].skyType = matArrays[5][0].skyTypeOG;
  matArrays[5][0].leftType = matArrays[5][0].leftTypeOG;
  matArrays[5][0].rightType = matArrays[5][0].rightTypeOG;

  // if the mon card doesn't pass monTypeChecking after the summoner's types are reversed, that cardID is irrecoverably blocked
  for (let i = 0; i < 3; i++) {
    if (matArrays[i].length > 0) {
      if (monTypeChecking(player, playedPositions[i], matArrays[i][matArrays[i].length-1].cardID, matArrays[i][matArrays[i].length-1].monType) === false) {
        pushBlockItem(player, uniqueCardID, 'cardID', matArrays[i][matArrays[i].length-1].cardID, player, false);
      }
    }
    if (i === 2) {inflictDmgStep1(player, myResolve);}
  }
}