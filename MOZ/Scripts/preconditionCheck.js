const preconditionCheck = (player, cardRestrictionChecked, cardIDPlayed) => {
  if (cardRestrictionChecked === false) {
    return true;
  } else {
    switch (cardIDPlayed) {
      case '114':
        return precondition114(player);
      case '115':
        return precondition115(player);
      case '216':
        return precondition216(findMatArrays(player)[5]);
      case '224':
        return summonerMinLevel(player, 5);
      case '226':
        return precondition226(findMatArrays(player)); 
      case '231':
        return oneSummonerOnly(findMatArrays(player)[5], 'S056');  // 波尤
      case '275':
        return cardOnFieldCheck(player, '137');  // 酒
      case '276':
        return cardOnFieldCheck(player, '297');  //  秘幻之蛋
      case '278':
        return precondition278(player, findMatArrays(player)[5]); 
      case '280':
        return cardOnFieldCheck(player, '297');  //  秘幻之蛋
      case '284':
        return cardOnFieldCheck(player, '297');  //  秘幻之蛋
      case '285':
        return precondition285(findMatArrays(player)[5]);
      case '286':
        return cardOnFieldCheck(player, '138');  // 閃念
      case '300':
        return precondition300(findMatArrays(player)[5]);
      case '307':
        return precondition115(player);
      case '686':
        return precondition686(findMatArrays(player)[5]);
      case '687':
        return summonerMinLevel(player, 7);
      case '688':
        return precondition688(player);
      case '690':
        return summonerMaxLevel(player, 5);
      case '695':
        return precondition695(findMatArrays(player)[5]);
      case '699':
        return oneTeamOnly(player, 'madoushuu');
      default:
        return false;
    }
  }
}

// 呵
const precondition114 = (player) => {
  if (findMatArrays(player)[5][0].cardID === 'S114' && findMatArrays(player)[5][0].effectVoided === false) {
    return true
  } else {
    return summonerMaxLevel(player, 1);
  }
}

// 嗝, 奇蹟帕加
const precondition115 = (player) => {
  if (findMatArrays(player)[5][0].cardID === 'S114' && findMatArrays(player)[5][0].effectVoided === false) {
    return true
  } else {
    return summonerMaxLevel(player, 2);
  }
}

// 甲布凡
const precondition216 = (summonerArray) => {
  if (summonerArray[0].cardID.includes('S073') === true) {  // S073A - S073I 弗
    return true;
  } else {
    return false;
  }
}

// 波哥斯
const precondition226 = (matArrays) => {
  let goldEggFound = false;
  for (let i = 0; i < 3; i++) {
    if (matArrays[i].length >= 2) {
      if (matArrays[i][matArrays[i].length-2].cardID === '201') {
        goldEggFound = true;
      }
    }
  }
  if (goldEggFound === true) {
    return true;
  } else {
    return false;
  }
}

// 機械大巴查
const precondition285 = (summonerArray) => {
  if (summonerArray[0].cardID.includes('S073') === true || summonerArray[0].cardID === 'S090') {  // S073A - S073I 弗, S090 Dr.拉柯奇
    return true;
  } else {
    return false;
  }
}

// 洛多華
const precondition278 = (player, summonerArray) => {
  if (summonerArray[0].cardID === 'S113') {
    return true;
  } else {
    return cardOnFieldCheck(player, '297');  //  秘幻之蛋
  }
}

// 水晶龍
const precondition300 = (summonerArray) => {
  if (summonerArray[0].cardID === 'S066' || summonerArray[0].cardID === 'S111') {  // S066 奇拉拉, S111 古拉拉
    return true;
  } else {
    return false;
  }
}

// 暗黑魔龍
const precondition686 = (summonerArray) => {
  if (summonerArray[0].cardID === 'S072' || summonerArray[0].cardID === 'S109') {  // S072 巴扎治, S109 真巴扎治
    return true;
  } else {
    return false;
  }
}

// 魔食龍
const precondition688 = (player) => {
  if (findMatArrays(player)[5][0].cardID === 'S114' && findMatArrays(player)[5][0].effectVoided === false) {
    return true
  } else {
    return scoreLagging(player);
  }
}

// 魔導劍
const precondition695 = (summonerArray) => {
  if (summonerArray[0].cardName === '巴扎治' || summonerArray[0].cardName === '黑暗雷克斯' || summonerArray[0].cardName === '真巴扎治') {
    return true;
  } else {
    return false;
  }
}

const cardOnFieldCheck = (player, uniqueCardID) => {
  return cardOnFieldCheckStep2(uniqueCardID, findMatArrays(player));
}

const cardOnFieldCheckStep2 = (uniqueCardID, matArrays) => {
  const verAcardID = uniqueCardID;
  const verBcardID = uniqueCardID + 'B';
  let cardFound;
  
  for (let i = 0; i < 5; i++) {
    if (matArrays[i].length > 0) {
      if ((matArrays[i][matArrays[i].length-1].cardID === verAcardID || matArrays[i][matArrays[i].length-1].cardID === verBcardID)
        && matArrays[i][matArrays[i].length-1].upsideDown === false) {
          cardFound = true;
      } 
    }
  }
  if (cardFound === true) {
    return true;
  } else {
    return false;
  }
}

const oneSummonerOnly = (summonerArray, uniqueCardID) => {
  if (summonerArray[0].cardID.includes(uniqueCardID) === true) {
    return true;
  } else {
    return false;
  }
}

const summonerMaxLevel = (player, maxLevel) => {
  if (findMatArrays(player)[5][0].summonerLevel <= maxLevel) {
    return true;
  } else {
    return false;
  }
}

const summonerMinLevel = (player, minLevel) => {
  if (findMatArrays(player)[5][0].summonerLevel >= minLevel) {
    return true;
  } else {
    return false;
  }
}

const cardOnHandCheck = (player, cardUniqueID) => {
  if ((player === 'p1' && p1Hand.filter(card => card.cardID === cardUniqueID).length > 0) 
    || (player === 'p2' && p2Hand.filter(card => card.cardID === cardUniqueID).length > 0)) {
    return true;
  } else {
    return false;
  }
}

const scoreLagging = (player) => {
  if (player === 'p1') {
    if (p1Score < p2Score) {
      return true;
    } else {
      return false;
    }
  } else {
    if (p1Score > p2Score) {
      return true;
    } else {
      return false;
    }
  }
}

const oneTeamOnly = (player, teamName) => {
  if (findMatArrays(player)[5][0].team === teamName) {
    return true;
  } else {
    return false;
  }
}
