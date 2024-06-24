const identifyComboStep2 = (skyArray, leftArray, rightArray, helpArray, summonerArray) => {
  let comboRank;
  let comboName;
  // check if all areas contain cards
  if (skyArray.length === 0 || leftArray.length === 0 || rightArray.length === 0 || helpArray.length === 0) {
    comboRank = 22;
    comboName = '無組合';
  } else {
    // check if all four cards are face up
    if (skyArray[skyArray.length-1].upsideDown === false && leftArray[leftArray.length-1].upsideDown === false && 
      rightArray[rightArray.length-1].upsideDown === false && helpArray[0].upsideDown === false) {
      // check if it is shell dragon combo [comboRank 11 is reserved for 邪龍/聖龍]
      if (skyArray[skyArray.length-1].monType === 'SS' && skyArray[skyArray.length-1].monClass === 'DR' &&
        leftArray[leftArray.length-1].monType === 'SS' && leftArray[leftArray.length-1].monClass === 'DR' &&
        rightArray[rightArray.length-1].monType === 'SS' && rightArray[rightArray.length-1].monClass === 'DR') {
        comboRank = 12;
        comboName = '貝龍組合';

      // check if it is -100 combo
      } else if (skyArray[skyArray.length-1].monPower < 0 && 
        skyArray[skyArray.length-1].monPower === leftArray[leftArray.length-1].monPower &&
        leftArray[leftArray.length-1].monPower === rightArray[rightArray.length-1].monPower) {
        comboRank = 13;
        comboName = '負颱風組合';

      // check if it is 100 DR combo
      } else if (skyArray[skyArray.length-1].monPower === 100 && skyArray[skyArray.length-1].monClass === 'DR' &&
        leftArray[leftArray.length-1].monPower === 100 && leftArray[leftArray.length-1].monClass === 'DR' &&
        rightArray[rightArray.length-1].monPower === 100 && rightArray[rightArray.length-1].monClass === 'DR') {
        comboRank = 14; 
        comboName = '100龍組合';

      // check if it is flash typhoon
      } else if (skyArray[skyArray.length-1].monPower > 0 &&
        skyArray[skyArray.length-1].monPower === leftArray[leftArray.length-1].monPower &&
        leftArray[leftArray.length-1].monPower === rightArray[rightArray.length-1].monPower &&
        skyArray[skyArray.length-1].monType === leftArray[leftArray.length-1].monType &&
        leftArray[leftArray.length-1].monType === rightArray[rightArray.length-1].monType) {
        comboRank = 15;
        comboName = '閃光颱風組合';

      // check if it is DR combo
      } else if (skyArray[skyArray.length-1].monClass === 'DR' &&
        leftArray[leftArray.length-1].monClass === 'DR' &&
        rightArray[rightArray.length-1].monClass === 'DR') {
        comboRank = 16;
        comboName = '龍組合';

      // check if it is all-male combo
      } else if (skyArray[skyArray.length-1].monClass === 'ML' &&
        leftArray[leftArray.length-1].monClass === 'ML' &&
        rightArray[rightArray.length-1].monClass === 'ML' &&
        ((summonerArray[0].cardID === 'S066' && summonerArray[0].effectVoided === false) || helpArray[0].cardID === '586')) {
        comboRank = 16;
        comboName = '群雄組合';

      // check if it is SH combo
      } else if ((skyArray[skyArray.length-1].monType === 'SS' || skyArray[skyArray.length-1].monClass === 'SH') &&
        (leftArray[leftArray.length-1].monType === 'SS' || leftArray[leftArray.length-1].monClass === 'SH') &&
        (rightArray[rightArray.length-1].monType === 'SS' || rightArray[rightArray.length-1].monClass === 'SH')) {
        comboRank = 17;
        comboName = '貝獸組合';

      // check if it is all-female combo
      } else if (skyArray[skyArray.length-1].monClass === 'FL' &&
        leftArray[leftArray.length-1].monClass === 'FL' &&
        rightArray[rightArray.length-1].monClass === 'FL') {
        comboRank = 18;
        comboName = '美艷組合';

      // check if it is typhoon
      } else if (skyArray[skyArray.length-1].monPower > 0 && 
        skyArray[skyArray.length-1].monPower === leftArray[leftArray.length-1].monPower &&
        leftArray[leftArray.length-1].monPower === rightArray[rightArray.length-1].monPower) {
        comboRank = 19;
        comboName = '颱風組合';

      // check if it is animal combo
      } else if ((skyArray[skyArray.length-1].monClass === 'BE' || skyArray[skyArray.length-1].monClass === 'BI' || 
        skyArray[skyArray.length-1].monClass === 'BU' || skyArray[skyArray.length-1].monClass === 'FH') && 
        skyArray[skyArray.length-1].monClass === leftArray[leftArray.length-1].monClass &&
        leftArray[leftArray.length-1].monClass === rightArray[rightArray.length-1].monClass) {
        comboRank = 20;
        comboName = '動物組合';

      // check if it is flash combo
      } else if (skyArray[skyArray.length-1].monType === leftArray[leftArray.length-1].monType &&
        leftArray[leftArray.length-1].monType === rightArray[rightArray.length-1].monType) {
        comboRank = 21;
        comboName = '閃光組合';

      // no combo
      } else {
        comboRank = 22;
        comboName = '無組合';
      }
    } else {
      comboRank = 22;
      comboName = '無組合';
    }
  }
  return comboRank + comboName;
}

const identifyCombo = (player) => {
  if (player === 'p1') {
    skyArray = p1Sky;
    leftArray = p1Left;
    rightArray = p1Right;
    helpArray = p1Help;
    summonerArray = p1Summoner;
  } else {
    skyArray = p2Sky;
    leftArray = p2Left;
    rightArray = p2Right;
    helpArray = p2Help;
    summonerArray = p2Summoner;
  } 
  return identifyComboStep2(skyArray, leftArray, rightArray, helpArray, summonerArray);
}

/* 
Modify multiplier for the following summoners (Done for gurifu):
- S075
- S082
- S083
*/
const multiplierModify = (matArrays, comboRank) => {
  if (matArrays[5][0].cardID === 'S075' && comboRank !== 22) {
    return 6;
  } else if (matArrays[5][0].cardID === 'S082' && (comboRank === 15 || comboRank === 19)) {
    return 6;
  } else if (matArrays[5][0].cardID === 'S083' && comboRank === 21) {
    return 6;
  } else {
    return null;
  }
}

const scoringAbnormal = (player) => {
  let additionalScore = p1Sky.length + p1Left.length + p1Right.length + p1Help.length + p1SP.length + p1Custody.length +
    p2Sky.length + p2Left.length + p2Right.length + p2Help.length + p2SP.length + p2Custody.length;
  if (player === 'p1') {
    resultMsg = p1Name + ' 勝出，積分加 ' + additionalScore + '。';
    p1Score += additionalScore;
  } else {
    resultMsg = p2Name + ' 勝出，積分加 ' + additionalScore + '。';
    p2Score += additionalScore;
  }
}

const scoringNormal = (player, comboRank) => {
  let bonusMultiplier;
  if (multiplierModify(findMatArrays(player), comboRank) !== null) {
    bonusMultiplier = multiplierModify(findMatArrays(player), comboRank);
  } else {
    if (comboRank === 22) {
      bonusMultiplier = 1;
    } else if (comboRank === 21) {
      bonusMultiplier = 2;
    } else if (comboRank === 20) {
      bonusMultiplier = 3;
    } else if (comboRank > 15) {
      bonusMultiplier = 4;
    } else if (comboRank > 13) {
      bonusMultiplier = 5;
    } else {
      bonusMultiplier = 6;
    }
  }
  let score = (p1Sky.length + p1Left.length + p1Right.length + p1Help.length + p1SP.length 
    + p2Sky.length + p2Left.length + p2Right.length + p2Help.length + p2SP.length) 
    * bonusMultiplier + p1Custody.length + p2Custody.length;
  return score;
}

// determine outcome (i.e, draw or now), winner, score and resultMsg
const rankCombo = () => {
  const p1ComboStr = identifyCombo('p1');
  const p1ComboRank = parseInt(p1ComboStr.substring(0,2));
  const p1ComboName = p1ComboStr.substring(2);

  const p2ComboStr = identifyCombo('p2');
  const p2ComboRank = parseInt(p2ComboStr.substring(0,2));
  const p2ComboName = p2ComboStr.substring(2);

  if (p1ComboRank < p2ComboRank) {
    const additionalScore = scoringNormal('p1', p1ComboRank);
    p1Score += additionalScore;
    drawGame = false;
    winner = 'p1';
    resultMsg = p1Name + '以' + p1ComboName + '勝出，積分加 ' + additionalScore + '。';
  } else if (p1ComboRank > p2ComboRank) {
    const additionalScore = scoringNormal('p2', p2ComboRank);
    p2Score += additionalScore;
    drawGame = false;
    winner = 'p2';
    resultMsg = p2Name + '以' + p2ComboName + '勝出，積分加 ' + additionalScore + '。';
  } else if (p1Power > p2Power) {
    const additionalScore = scoringNormal('p1', p1ComboRank);
    p1Score += additionalScore;
    drawGame = false;
    winner = 'p1';
    if (p1ComboRank < 22) {
      resultMsg = p1Name + '以' + p1ComboName + '勝出，積分加 ' + additionalScore + '。';
    } else {
      resultMsg = p1Name +  ' 勝出，積分加' + additionalScore + '。';
    }
  } else if (p1Power < p2Power) {
    const additionalScore = scoringNormal('p2', p2ComboRank);
    p2Score += additionalScore;
    drawGame = false;
    winner = 'p2';
    if (p2ComboRank < 22) {
      resultMsg = p2Name + '以' + p2ComboName + '勝出，積分加 ' + additionalScore + '。';
    } else {
      resultMsg = p2Name + ' 勝出，積分加 ' + additionalScore + '。';
    }
  } else {
    drawGame = true;
    winner = null;
    resultMsg = '本回合打和，場上的咭會送到保留區。';
  }
}
