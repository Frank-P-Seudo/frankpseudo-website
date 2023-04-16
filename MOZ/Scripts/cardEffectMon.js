const summonerFactorEffect = (matArrays, powerBracket, viewedArray, summonerCardID, powerupFactor, myResolve) => {
  const verBcardID = summonerCardID + 'B';
  const verCcardID = summonerCardID + 'C';
  if (matArrays[5][0].cardID !== summonerCardID && matArrays[5][0].cardID !== verBcardID && matArrays[5][0].cardID !== verCcardID) {
    myResolve();
  } else {
    let playedPosition = arrayToPosition(viewedArray);
    if (playedPosition === 'sky') {
      powerBracket[0].allyPos0mPU = powerupFactor;
    } else if (playedPosition === 'left') {
      powerBracket[1].allyPos1mPU = powerupFactor;
    } else {
      powerBracket[2].allyPos2mPU = powerupFactor;
    }
    myResolve();
  }
}

const cardEffect003 = (player, myCardID, allyCardID, levelupValue, matArray, levelUpBracket, myResolve) => {
  new Promise(function(effectResolve) {
    mutualLevelUp(player, allyCardID, levelupValue, matArray, levelUpBracket, effectResolve);
  }).then(func => {
    blockEffect(player, myCardID, 'monType', 'GG', true, myResolve);
  })
}

const mutualLevelUp = (player, allyCardID, levelupValue, matArray, levelUpBracket, myResolve) => {
  if (cardOnFieldCheck(player, allyCardID) === false) {
    myResolve();
  } else {
    let playedPosition = arrayToPosition(matArray);
    if (playedPosition === 'sky') {
      // updateLevelUpBracket(matArray, player, viewedLevelUpBracket, newMonType, newMonClass, newMonPower, newCardPic, uniqueCardID, recoverability)
      updateLevelUpBracket(matArray, player, levelUpBracket[0], '', '', levelupValue, '', allyCardID, true);  // allyCardID is used to prevent self-healing (e.g., from 116's blocking)
    } else if (playedPosition === 'left') {
      updateLevelUpBracket(matArray, player, levelUpBracket[1], '', '', levelupValue, '', allyCardID, true);
    } else {
      updateLevelUpBracket(matArray, player, levelUpBracket[2], '', '', levelupValue, '', allyCardID, true);
    }
    myResolve();
  }
}

const helpTransformEffect = (player, uniqueCardID, newCardID, sourceCardID, matArray, myResolve) => {
  if (cardOnFieldCheck(player, sourceCardID) === false) {
    // if '140' doesn't exist but the card has already transformed, the transformation needs to be reversed
    if (matArray[matArray.length-1].monPower !== 30) {
      reverseLevelUpEffect(player, uniqueCardID, player, findLevelUpBracket(player));
      myResolve();
    } else {
      myResolve();
    }
  } else {
    if (matArray[matArray.length-1].monPower !== 30) {
      myResolve();
    } else {
      cardTransform(player, matArray, findLevelUpBracket(player), findPowerBracket(player), newCardID, sourceCardID, myResolve);
    }
  }
}

const cardTransform = (player, matArray, levelUpBracket, powerBracket, newCardID, sourceCardID, myResolve) => {
  let playedPosition = arrayToPosition(matArray);
  let newMonType = '';
  let newMonClass = '';
  let newMonPower = 0;
  let newCardPic = '';
  cardDB.forEach(card => {
    if (card.cardID === newCardID) {
      newMonType = card.monType;
      newMonClass = card.monClass;
      newMonPower = card.monPower;
      newCardPic = card.cardPic;
    }
  })
  new Promise(function(transformResolve) {
    transformAnimation(player, playedPosition, newCardPic);
    if (playedPosition === 'sky') {
      updateLevelUpBracket(matArray, player, levelUpBracket[0], newMonType, newMonClass, newMonPower, newCardPic, sourceCardID, true);
      powerBracket[0].allyPosSumflatPU = 0;  // ? To revisit whether other power-up values need to be reverted
      findMatArrays(player)[5][0].skyType += newMonType;  // ? To revisit whether this change needs to be reversed when the transformed is flushed
    } else if (playedPosition === 'left') {
      updateLevelUpBracket(matArray, player, levelUpBracket[1], newMonType, newMonClass, newMonPower, newCardPic, sourceCardID, true);
      powerBracket[1].allyPosSumflatPU = 0;  // ? To revisit whether other power-up values need to be reverted
      findMatArrays(player)[5][0].leftType += newMonType;
    } else {
      updateLevelUpBracket(matArray, player, levelUpBracket[2], newMonType, newMonClass, newMonPower, newCardPic, sourceCardID, true);
      powerBracket[2].allyPosSumflatPU = 0;  // ? To revisit whether other power-up values need to be reverted
      findMatArrays(player)[5][0].rightType += newMonType;
    }
    setTimeout(() => transformResolve(), transAniDur*1000);
  }).then(func => {
    transformAnimationReverse(player, playedPosition);
    renderMat(player, matArray, playedPosition);
    setTimeout(() => inflictDmgStep1(player, myResolve), 10);
  })
}

const cardEffect007 = (player, viewedArray, matArrays, uniqueCardID, bannedEffectInTurn, myResolve) => {
  let conditionMet = false;
  const playedPosition = arrayToPosition(viewedArray);
  for (let i = 0; i < 3; i++) {
    if (matArrays[i].length > 0) {
      if (matArrays[i][matArrays[i].length-1].upsideDown === false && matArrays[i][matArrays[i].length-1].monType === 'FF' && matArrays[i][matArrays[i].length-1].monClass === 'DR') {
        conditionMet = true;
      }
    }
  }
  if (conditionMet === false) {
    // if the FF DR mon is turned UD, the effect needs to be reversed
    if (player === 'p1') {
      p2BlockedCardID1 = p2BlockedCardID1.filter(item => {if (item.source === uniqueCardID && item.sourcePlayer === player){
        return false;
      } else {
        return true;
      }}); 
    } else {
      p1BlockedCardID1 = p1BlockedCardID1.filter(item => {if (item.source === uniqueCardID && item.sourcePlayer === player){
        return false;
      } else {
        return true;
      }}); 
    }
    reverseBannedEffect(findBannedInTurn(player), playedPosition, uniqueCardID);
    inflictDmgStep1(player, myResolve);
  } else if (bannedEffectInTurn.filter(banned => banned.cardID === uniqueCardID && banned.sourcePos === playedPosition).length > 0) {
    myResolve();
  } else {
    // see cardEffectMon.js, which include pushing uniqueCardID to bannedEffectInTurn
    autoVoidEffect(player, viewedArray, findVictim(player), uniqueCardID, findMatArrays(findVictim(player)), myResolve);
  }
}

// theoritically 024/176 can be powered up twice by 025/175, so this function is applied to them
const mutualPowerUpStackable = (allyCardID1, allyCardID2, powerupFlat, powerupValue, matArray, powerBracket, matArrays, myResolve) => {
  const playedPosition = arrayToPosition(matArray);
  let allyBracket = [];
  // count the number of cards with allyCardID, which can be more than one due to exchange
  for (let i = 0; i < 3; i++) {
    if (matArrays[i].length > 0) {
      if (matArrays[i][matArrays[i].length-1].upsideDown === false && (matArrays[i][matArrays[i].length-1].cardID === allyCardID1 
        || matArrays[i][matArrays[i].length-1].cardID === allyCardID2)) {
        allyBracket.push(playedPositions[i]);
      }
    }
  }
  if (allyBracket.length === 0) {
    if (powerupFlat === true) {
      selfPowerUp(powerBracket, playedPosition, powerupFlat, 0, myResolve);
    } else {
      selfPowerUp(powerBracket, playedPosition, powerupFlat, 1, myResolve);
    }
  } else if (allyBracket.length === 1) {
    selfPowerUp(powerBracket, playedPosition, powerupFlat, powerupValue, myResolve);
  } else {
    selfPowerUp(powerBracket, playedPosition, powerupFlat, powerupValue*powerupValue, myResolve);
  }
}

// even if there is more than one allyCardID on the field, the power-up is only applied once
const mutualPowerUp = (player, allyCardID, powerupFlat, powerupValue, matArray, powerBracket, myResolve) => {
  const playedPosition = arrayToPosition(matArray);
  // if the ally card doesn't exist, the power-up needs to be reversed
  if (cardOnFieldCheck(player, allyCardID) === false) {
    if (powerupFlat === true) {
      selfPowerUp(powerBracket, playedPosition, powerupFlat, 0, myResolve);
    } else {
      selfPowerUp(powerBracket, playedPosition, powerupFlat, 1, myResolve);
    }
  } else {
    selfPowerUp(powerBracket, playedPosition, powerupFlat, powerupValue, myResolve);
  }
}

const excitingClassEffect = (uniqueCardID, matArray, powerupFlat, powerupValue, powerBracket, matArrays, excitingClass, myResolve) => {
  const playedPosition = arrayToPosition(matArray);
  let conditionMet = false;
  for (let i = 0; i < 3; i++) {
    if (matArrays[i].length > 0) {
      if (matArrays[i][matArrays[i].length-1].upsideDown === false && matArrays[i][matArrays[i].length-1].monClass === excitingClass 
        && matArrays[i][matArrays[i].length-1].cardID !== uniqueCardID) {
        conditionMet = true;
      }
    }
  }
  if (conditionMet === false) {
    // if the mon with excitingClass is turned UD, the effect needs to be reversed
    if (powerupFlat === true) {
      selfPowerUp(powerBracket, playedPosition, powerupFlat, 0, myResolve);
    } else {
      selfPowerUp(powerBracket, playedPosition, powerupFlat, 1, myResolve);
    }
  } else {
    selfPowerUp(powerBracket, playedPosition, powerupFlat, powerupValue, myResolve);
  }
}

const selfPowerUp = (powerBracket, playedPosition, powerupFlat, powerupValue, myResolve) => {
  if (playedPosition === 'sky' && powerupFlat === true) {
    powerBracket[0].allyPos0flatPU = powerupValue;
  } else if (playedPosition === 'sky' && powerupFlat === false) {
    powerBracket[0].allyPos0mPU = powerupValue;
  } else if (playedPosition === 'left' && powerupFlat === true) {
    powerBracket[1].allyPos1flatPU = powerupValue;
  } else if (playedPosition === 'left' && powerupFlat === false) {
    powerBracket[1].allyPos1mPU = powerupValue;
  } else if (playedPosition === 'right' && powerupFlat === true) {
    powerBracket[2].allyPos2flatPU = powerupValue;
  } else if (playedPosition === 'right' && powerupFlat === false) {
    powerBracket[2].allyPos2mPU = powerupValue;
  }
  myResolve();
}

// 赤色巨鳥
const cardEffect012 = (player, victim, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    pushBlockItem(victim, uniqueCardID, 'cardID', '062', player, true);  // 終極角神
    pushBlockItem(victim, uniqueCardID, 'cardID', '068', player, true);  // 巨蛾蟲
    setTimeout(() => effectResolve(), 10);
  }).then(func => {
    inflictDmgStep1(player, myResolve);
  })
}

// 大水母
const cardEffect016 = (player, victim, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    pushBlockItem(victim, uniqueCardID, 'cardID', '097', player, true);  // 銅巨人
    pushBlockItem(victim, uniqueCardID, 'cardID', '099', player, true);  // 鐵巨人
    setTimeout(() => effectResolve(), 10);
  }).then(func => {
    inflictDmgStep1(player, myResolve);
  })
}

// 滑翔鯨
const cardEffect020 = (player, uniqueCardID, matArray, myMatArrays, foeMatArrays, myResolve) => {
  const playedPosition = arrayToPosition(matArray);
  if (findBannedInTurnNR(player).filter(banned => banned.cardID === uniqueCardID && banned.sourcePos === playedPosition).length > 0) {
    myResolve();
  } else {
    let baitFound = [];
    // separate the foe's loop and mine to ensure the foe's bait always goes into the bracket first
    for (let i = 0; i < 3; i++) {
      if (foeMatArrays[i].length > 0) {
        if (foeMatArrays[i][foeMatArrays[i].length-1].cardID === '021' && foeMatArrays[i][foeMatArrays[i].length-1].upsideDown === false) {
          baitFound.push({
            owner: findVictim(player),
            pos: playedPositions[i]
          })
        }
      }
    }
    for (let i = 0; i < 3; i++) {
      if (myMatArrays[i].length > 0) {
        if (myMatArrays[i][myMatArrays[i].length-1].cardID === '021' && myMatArrays[i][myMatArrays[i].length-1].upsideDown === false) {
          baitFound.push({
            owner: player,
            pos: playedPositions[i]
          })
        }
      }
    }
    if (baitFound.length === 0) {
      myResolve();
    } else if (baitFound.length === 1 && baitFound[0].owner === findVictim(player)) {
      findBannedInTurnNR(player).push({cardID: uniqueCardID, sourcePos: playedPosition});
      new Promise(function(effectResolve) {
        pushBlockItem(findVictim(player), uniqueCardID, 'cardID', '021', player, false);
        selfPowerUp(findPowerBracket(player), arrayToPosition(matArray), false, 10, effectResolve);
      }).then(func => {
        inflictDmgStep1(player, myResolve);
      })
    } else if (baitFound.length === 1 && baitFound[0].owner === player) {
      findBannedInTurnNR(player).push({cardID: uniqueCardID, sourcePos: playedPosition});
      new Promise(function(effectResolve) {
        pushBlockItem(player, uniqueCardID, 'cardID', '021', player, false);
        selfPowerUp(findPowerBracket(player), arrayToPosition(matArray), false, 10, effectResolve);
      }).then(func => {
        inflictDmgStep1(player, myResolve);
      })
    } else {
      findBannedInTurnNR(player).push({cardID: uniqueCardID, sourcePos: playedPosition});
      if (player === 'p2') {
        // AI logic: prioritize attacking p1's 021 over its own
        let victim;
        if (baitFound.findIndex(bait => bait.owner === 'p1') >= 0) {
          victim = findVictim(player);
        } else {
          victim = player;
        }
        new Promise(function(effectResolve) {
          pushBlockItem(victim, uniqueCardID, 'cardID', '021', player, false);
          selfPowerUp(findPowerBracket(player), arrayToPosition(matArray), false, 10, effectResolve);
        }).then(func => {
          inflictDmgStep1(player, myResolve);
        })
      } else {
        // p1: if the baits are all in one player's field, auto attack
        let victim = null;
        if (baitFound.findIndex(bait => bait.owner === 'p1') < 0) {
          victim = findVictim(player);
        } else if (baitFound.findIndex(bait => bait.owner === 'p2') < 0) {
          victim = player;
        }
        if (victim !== null) {
          new Promise(function(effectResolve) {
            pushBlockItem(victim, uniqueCardID, 'cardID', '021', player, false);
            selfPowerUp(findPowerBracket(player), arrayToPosition(matArray), false, 10, effectResolve);
          }).then(func => {
            inflictDmgStep1(player, myResolve);
          })
        } else {
          selectBaitMenu(player, uniqueCardID, matArray, myResolve);
        }
      }
    }
  }
}

// 針龜
const cardEffect022 = (player, victim, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    pushBlockItem(victim, uniqueCardID, 'cardID', '020', player, true);  // 滑翔鯨
    pushBlockItem(victim, uniqueCardID, 'monClass', 'FH', player, true);
    setTimeout(() => effectResolve(), 10);
  }).then(func => {
    inflictDmgStep1(player, myResolve);
  })
}

// 沙人
const cardEffect037 = (player, victim, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    pushBlockItem(victim, uniqueCardID, 'cardID', '117', player, true);  // 勁力狙擊手
    pushBlockItem(victim, uniqueCardID, 'cardID', '118', player, true);  // 超力吸食獸
    pushBlockItem(victim, uniqueCardID, 'cardID', '234', player, true);  // 勁力狙擊手
    setTimeout(() => effectResolve(), 10);
  }).then(func => {
    inflictDmgStep1(player, myResolve);
  })
}

// 天使蝸牛
const cardEffect050 = (player, uniqueCardID, matArray, levelUpBracket, myResolve) => {
  if (cardOnFieldCheck(player, '140') === false) {
    // if '140' doesn't exist but the card has already transformed, the level-up & blocking need to be reversed
    if (matArray[matArray.length-1].monPower !== 60) {reverseLevelUpEffect(player, uniqueCardID, player, findLevelUpBracket(player));}
      posBlockEffectFail(player, uniqueCardID, 'left');
      posBlockEffectFail(player, uniqueCardID, 'right');
      setTimeout(() => inflictDmgStep1(player, myResolve), 10);
  } else if (matArray[matArray.length-1].monPower !== 60) {
    // nothing needs to be done if 050 has leveled up
    myResolve();
  } else {
    new Promise(function(effectResolve) {
      let playedPosition = arrayToPosition(matArray);
      if (playedPosition === 'sky') {
        // updateLevelUpBracket(matArray, player, viewedLevelUpBracket, newMonType, newMonClass, newMonPower, newCardPic, uniqueCardID, recoverability)
        updateLevelUpBracket(matArray, player, levelUpBracket[0], '', '', 100, '', '140', true);
      } else if (playedPosition === 'left') {
        updateLevelUpBracket(matArray, player, levelUpBracket[1], '', '', 100, '', '140', true);
      } else {
        updateLevelUpBracket(matArray, player, levelUpBracket[2], '', '', 100, '', '140', true);
      }
      pushBlockItem(findVictim(player), uniqueCardID, 'pos', 'left', player, true);
      pushBlockItem(findVictim(player), uniqueCardID, 'pos', 'right', player, true);
      setTimeout(() => effectResolve(), 10);
    }).then(func => {
      inflictDmgStep1(player, myResolve);
    })
  }
}

// 殺手蜂
const cardEffect058 = (player, victim, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    pushBlockItem(victim, uniqueCardID, 'cardID', '041', player, true);  // 泰坦
    pushBlockItem(victim, uniqueCardID, 'cardID', '027', player, true);  // 海神普西頓
    setTimeout(() => effectResolve(), 10);
  }).then(func => {
    inflictDmgStep1(player, myResolve);
  })
}

// 食肉樹
const cardEffect059 = (player, victim, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    pushBlockItem(victim, uniqueCardID, 'cardID', '051', player, true);  // 寂寞龍
    pushBlockItem(victim, uniqueCardID, 'cardID', '055', player, true);  // 地獄翼妖
    setTimeout(() => effectResolve(), 10);
  }).then(func => {
    inflictDmgStep1(player, myResolve);
  })
}

// 巨蛾蟲
const cardEffect068 = (player, victim, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    pushBlockItem(victim, uniqueCardID, 'cardID', '070', player, true);  // 三頭犬
    pushBlockItem(victim, uniqueCardID, 'cardID', '054', player, true);  // 空中蟲
    pushBlockItem(victim, uniqueCardID, 'cardID', '049', player, true);  // 空壓怪
    setTimeout(() => effectResolve(), 10);
  }).then(func => {
    inflictDmgStep1(player, myResolve);
  })
}

// 哈維亞
const cardEffect075 = (player, uniqueCardID, foeSummonerArray, myResolve) => {
  if (foeSummonerArray[0].cardID.includes('058')) {
    blockEffect(player, uniqueCardID, 'pos', 'sky', true, myResolve);
  } else {
    myResolve();
  }
}

// 獨眼蟲
const cardEffect076 = (matArray, matArrays, powerBracket, myResolve) => {
  const playedPosition = arrayToPosition(matArray);
  for (let i = 0; i < 3; i++) {
    if (matArrays[i] === matArray) {continue;}
    if (matArrays[i].length > 0) {
      if (matArrays[i][matArrays[i].length-1].upsideDown === false && matArrays[i][matArrays[i].length-1].monClass === 'BU') {
        if (playedPosition === 'sky') {
          powerBracket[i].allyPos0mPU = 2;
        } else if (playedPosition === 'left') {
          powerBracket[i].allyPos1mPU = 2;
        } else {
          powerBracket[i].allyPos2mPU = 2;
        }
      } else {
        // in case a bug can transform into a non-bug, reverse the power-up
        if (playedPosition === 'sky') {
          powerBracket[i].allyPos0mPU = 1;
        } else if (playedPosition === 'left') {
          powerBracket[i].allyPos1mPU = 1;
        } else {
          powerBracket[i].allyPos2mPU = 1;
        }
      }
    }
  }
  setTimeout(() => myResolve(), 10);
}

// 真實之鏡
const cardEffect081 = (player, victim, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    pushBlockItem(victim, uniqueCardID, 'cardID', '078', player, true);  // 吸血童
    pushBlockItem(victim, uniqueCardID, 'cardID', '079', player, true);  // 黑亞當
    setTimeout(() => effectResolve(), 10);
  }).then(func => {
    inflictDmgStep1(player, myResolve);
  })
}

// 查姆
const cardEffect085 = (player, victim, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    pushBlockItem(victim, uniqueCardID, 'cardID', '106', player, true);  // 寶物庫看更
    pushBlockItem(victim, uniqueCardID, 'cardID', '077', player, true);  // 食人老魔
    setTimeout(() => effectResolve(), 10);
  }).then(func => {
    inflictDmgStep1(player, myResolve);
  })
}

// 光天使
const cardEffect088 = (matArray, matArrays, powerBracket, myResolve) => {
  let classBracket = [];
  const playedPosition = arrayToPosition(matArray);
  for (let i = 0; i < 3; i++) {
    if (matArrays[i] === matArray) {continue;}
    if (matArrays[i].length > 0) {
      if (matArrays[i][matArrays[i].length-1].upsideDown === false && matArrays[i][matArrays[i].length-1].monClass !== '') {
       classBracket.push(matArrays[i][matArrays[i].length-1].monClass);
      }
    } else {classBracket.push('');}
  }
  if ((classBracket[0] === 'ML' && classBracket[1] === 'FL') || (classBracket[0] === 'FL' && classBracket[1] === 'ML')) {
    for (let i = 0; i < 3; i++) {
      if (matArrays[i] === matArray) {continue;}
      if (playedPosition === 'sky') {
        powerBracket[i].allyPos0flatPU = 30;
      } else if (playedPosition === 'left') {
        powerBracket[i].allyPos1flatPU = 30;
      } else {
        powerBracket[i].allyPos2flatPU = 30;
      }
    }
  } else {
    for (let i = 0; i < 3; i++) {
      if (matArrays[i] === matArray) {continue;}
      if (playedPosition === 'sky') {
        powerBracket[i].allyPos0flatPU = 0;
      } else if (playedPosition === 'left') {
        powerBracket[i].allyPos1flatPU = 0;
      } else {
        powerBracket[i].allyPos2flatPU = 0;
      }
    }
  }
  setTimeout(() => myResolve(), 10);
}

// 水棲羊
const cardEffect174 = (player, victim, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    pushBlockItem(victim, uniqueCardID, 'cardID', '199', player, true);  // 機械殺手
    pushBlockItem(victim, uniqueCardID, 'cardID', '200', player, true);  // 機器惡魔
    setTimeout(() => effectResolve(), 10);
  }).then(func => {
    inflictDmgStep1(player, myResolve);
  })
}

// 毛松松
const cardEffect192 = (player, victim, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    pushBlockItem(victim, uniqueCardID, 'cardID', '185', player, true);  // 加羅
    pushBlockItem(victim, uniqueCardID, 'cardID', '178', player, true);  // 殺手海蛇
    setTimeout(() => effectResolve(), 10);
  }).then(func => {
    inflictDmgStep1(player, myResolve);
  })
}

// 術士剋星
const cardEffect214 = (player, uniqueCardID,foeSummonerArray, myResolve) => {
  if (foeSummonerArray[0].summonerType === 'LL') {
    pushPowerUpHist(player, findVictim(player), uniqueCardID, 'XX000', true);  // see summonerPowerUp.js
    myResolve();
  } else {
    myResolve();
  }
}

// 甲布凡
const cardEffect216 = (player, victim, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    pushBlockItem(victim, uniqueCardID, 'cardID', '116', player, true);  // 封截人
    pushBlockItem(victim, uniqueCardID, 'cardID', '235', player, true);  // 小封截人
    setTimeout(() => effectResolve(), 10);
  }).then(func => {
    inflictDmgStep1(player, myResolve);
  })
}

// 布奧
const cardEffect274 = (player, myMatArrays, foeMatArrays, myResolve) => {
  if (myMatArrays[5][0].cardID === 'S052' && myMatArrays[0].length > 0 && myMatArrays[1].length > 0 
    && myMatArrays[2].length > 0 && myMatArrays[3].length > 0
    && ((foeMatArrays[0].length > 0 && foeMatArrays[1].length > 0 && foeMatArrays[2].length > 0 
    && foeMatArrays[3].length > 0) || turnSP === true)) {
    if (cardOnFieldCheck(player, '277') === true && cardOnFieldCheck(player, '281') === true && myMatArrays[3][myMatArrays[3].length-1].upsideDown === false) {
      if (player === 'p1') {
        p1Score = 50;
      } else {
        p2Score = 50;
      }
      renderScores();
      let msg = '佐敦馬戲團結集！！！\n' + findPlayerName(player) + ' 得到50點積分勝出。';
      prompt50scoreMsg(msg);
    } else {
      myResolve();
    }
  } else {
    myResolve();
  }
}

// 紅普斯靼
const cardEffect275 = (player, uniqueCardID, matArrays, myResolve) => {
  if (matArrays[5][0].summonerType !== 'FF') {
    myResolve();
  } else {
    new Promise(function(effectResolve) {
      pushBlockItem(findVictim(player), uniqueCardID, 'pos', 'left', player, true);
      pushBlockItem(findVictim(player), uniqueCardID, 'pos', 'right', player, true);
      setTimeout(() => effectResolve(), 10);
    }).then(func => {
      inflictDmgStep1(player, myResolve);
    })
  }
}

// 坦丁士
const cardEffect282 = (player, uniqueCardID, matArrays, myResolve) => {
  if (matArrays[0].length > 0 && matArrays[1].length > 0 && matArrays[2].length > 0 && matArrays[3].length > 0) {
    if (matArrays[3][matArrays[3].length-1].cardID === '292' && matArrays[3][matArrays[3].length-1].upsideDown === false) {
      let GOWfound = [];
      for (i = 0; i < 3; i++) {
        if (matArrays[i][matArrays[i].length-1].upsideDown === false && matArrays[i][matArrays[i].length-1].monClass === 'GW') {
          GOWfound.push(playedPositions[i]);
        }
      }
      if (GOWfound.length === 3) {
        new Promise(function(effectResolve) {
          pushBlockItem(findVictim(player), uniqueCardID, 'pos', 'help', player, false);
          pushBlockItem(findVictim(player), uniqueCardID, 'pos', 'sp', player, true);
          setTimeout(effectResolve(), 10);
        }).then(func => {
          inflictDmgStep1(player, myResolve);
        })
      } else {
        posBlockEffectFail(player, uniqueCardID, 'sp');
        setTimeout(() => inflictDmgStep1(player, myResolve), 10);
      }
    } else {
      posBlockEffectFail(player, uniqueCardID, 'sp');
      setTimeout(() => inflictDmgStep1(player, myResolve), 10);
    }
  } else {
    posBlockEffectFail(player, uniqueCardID, 'sp');
    setTimeout(() => inflictDmgStep1(player, myResolve), 10);
  }
}

const posBlockEffectFail = (player, uniqueCardID, blockedPos) => {
  if (player === 'p1') {
    p2BlockedPos1 = p2BlockedPos1.filter(blocked => {
      if (blocked.pos === blockedPos && blocked.source === uniqueCardID && blocked.sourcePlayer === player && blocked.recoverable === true) {
        return false;
      } else {
        return true;
      }
    });
  } else {
    p1BlockedPos1 = p1BlockedPos1.filter(blocked => {
      if (blocked.pos === blockedPos && blocked.source === uniqueCardID && blocked.sourcePlayer === player && blocked.recoverable === true) {
        return false;
      } else {
        return true;
      }
    });
  }
}

// 黃金小矮人
const cardEffect287 = (summonerArray, viewedArray, myResolve) => {
  const playedPosition = arrayToPosition(viewedArray);
  if (playedPosition === 'sky') {
    summonerArray[0].leftType += 'KK';
    summonerArray[0].rightType += 'KK';
  } else if (playedPosition === 'left') {
    summonerArray[0].skyType += 'KK';
    summonerArray[0].rightType += 'KK';
  } else {
    summonerArray[0].skyType += 'KK';
    summonerArray[0].leftType += 'KK';
  }
  myResolve();
}

// 聖象
const cardEffect288 = (player, uniqueCardID, foeSummonerArray, myResolve) => {
  if (foeSummonerArray[0].cardID === '054' || foeSummonerArray[0].cardID === '072' || foeSummonerArray[0].team === 'madoushuu') {
    blockEffect(player, uniqueCardID, 'pos', 'sky', false, myResolve);
  } else {
    myResolve();
  }
}

// 闇帕加：帕加戰隊4號
const cardEffect304 = (player, uniqueCardID, matArray, matArrays, myResolve) => {
  const playedPosition = arrayToPosition(matArray);
  if (findBannedInGame(player).filter(banned => banned.cardID === uniqueCardID && banned.sourcePos === playedPosition).length > 0) {
    myResolve();
  } else if (matArrays[0].length > 0 && matArrays[1].length > 0 && matArrays[2].length > 0 && matArrays[3].length > 0) {
    if (matArrays[3][matArrays[3].length-1].upsideDown === false && matArrays[3][matArrays[3].length-1].cardID === '313' 
      && cardOnFieldCheck(player, '301') === true && cardOnFieldCheck(player, '302') === true) {  // 301 赤帕加 302 藍帕加 313 帕加仙人
      findBannedInGame(player).push({cardID: uniqueCardID, sourcePos: playedPosition});
      if (player === 'p2') {
        myResolve();
      } else if (player === 'p1' && p2Queue.length < 1) {
        prompt304EffectFail(myResolve);
      } else {
        new Promise(function(effectResolve) {
          turnClass = 'choiceEffect';  // turnClass may impact forfeitabilityCheck(), handCardDisplay() and matCardDisplay()
          forfeitabilityCheck('p1');
          prompt304Effect(effectResolve);
        }).then(func => {
          arrangeP2Summoners(myResolve);
        })
      }
    } else {
      myResolve();
    }
  } else {
    myResolve();
  }
}

// 赤術師
const cardEffect311 = (player, uniqueCardID, matArray, matArrays, myResolve) => {
  const playedPosition = arrayToPosition(matArray);
  if (player === 'p2' || matArrays[0].length === 0 || matArrays[1].length === 0 || matArrays[2].length === 0
    || findBannedInGame(player).filter(banned => banned.cardID === uniqueCardID && banned.sourcePos === playedPosition).length > 0) {
    myResolve();
  } else if (matArrays[0][matArrays[0].length-1].monClass === 'DM' 
    && matArrays[1][matArrays[1].length-1].monClass === 'DM'
    && matArrays[2][matArrays[2].length-1].monClass === 'DM') {
    findBannedInGame(player).push({cardID: uniqueCardID, sourcePos: playedPosition});
    turnClass = 'choiceEffect';
    forfeitabilityCheck('p1');
    renderP2Hand();
    // enableP2PlayButtons();
    viewP2HandMenu(myResolve);
  } else {
    myResolve();
  }
}

const enableP2PlayButtons = () => {
  for (let i = p2Hand.length; i > 0; i--) {
    cardslot = "p2-hand-c" + i + '-button';
    document.getElementById(cardslot).disabled = false;
  }
}

const disableP2PlayButtons = () => {
  for (let i = p2Hand.length; i > 0; i--) {
    cardslot = "p2-hand-c" + i + '-button';
    document.getElementById(cardslot).disabled = true;
  }
}

// 暗黑魔龍
const cardEffect686 = (player, uniqueCardID, viewedArray, matArrays, levelUpBracket, myResolve) => {
  let posOf204 = [];
  let posOfTarget = [];
  for (let i = 0; i < 3; i++) {
    if (matArrays[i] === viewedArray) {continue;}
    if (matArrays[i].length > 0) {
      if (matArrays[i][matArrays[i].length-1].upsideDown === false && matArrays[i][matArrays[i].length-1].cardID.includes('204') === true) {
        posOf204.push(playedPositions[i]);
      } else if (matArrays[i][matArrays[i].length-1].upsideDown === false) {
        posOfTarget.push(playedPositions[i]);
      }
    }
  }
  if (posOf204.length > 0 && posOfTarget.length > 0) {
    if (posOfTarget[0] === 'sky') {
      updateLevelUpBracket(matArrays[0], player, levelUpBracket[0], '', '', 100, '', uniqueCardID, true);  // see levelUp.js
    } else if (posOfTarget[0] === 'left') {
      updateLevelUpBracket(matArrays[1], player, levelUpBracket[1], '', '', 100, '', uniqueCardID, true);
    } else {
      updateLevelUpBracket(matArrays[2], player, levelUpBracket[2], '', '', 100, '', uniqueCardID, true);
    }
    inflictDmgStep1(player, myResolve);
  } else {
    reverseLevelUpEffect(player, uniqueCardID, player, levelUpBracket);
    setTimeout(() => inflictDmgStep1(player, myResolve), 10);
  }
}

const contVoidEffect = (player, uniqueCardID, viewedArray, myResolve) => {
  const playedPosition = arrayToPosition(viewedArray);
  if (findBannedInTurn(player).filter(banned => banned.cardID === uniqueCardID && banned.sourcePos === playedPosition).length > 0) {
    myResolve();
  } else {
    autoVoidEffect(player, viewedArray, findVictim(player), uniqueCardID, findMatArrays(findVictim(player)), myResolve);
  }
}

// if only one of the foe's cards passes the voidableCheck, then the card will attack automatically
const autoVoidEffect = (player, viewedArray, player2, uniqueCardID, targetMatArrays, myResolve) => {
  let validTarget = [];
  new Promise(function(effectResolve) {
    for (let i = 0; i < 3; i++) {
      // Reminder: expand voidEffectCondition() in conditionCheck.js as more auto void effects are created
      voidableCheck(uniqueCardID, viewedArray, player2, playedPositions[i], targetMatArrays[i], myResolve, validTarget);  
    }
    setTimeout(() => effectResolve(), 10);
  }).then(func => {
    if (validTarget.length === 0) {
      myResolve();
    } else if (validTarget.length === 1) {
      autoVoidEffectStep3(player, viewedArray, uniqueCardID, targetMatArrays, myResolve, validTarget);
    } else {
      if (player === 'p1') {
        voidEffectP1(uniqueCardID, viewedArray, myResolve);
      } else {
        // ? AI logic to be further enhanced
        autoVoidEffectStep3(player, viewedArray, uniqueCardID, targetMatArrays, myResolve, validTarget);
      }
    } 
  })
}

const autoVoidEffectStep3 = (player, viewedArray, uniqueCardID, targetMatArrays, myResolve, validTarget) => {
  if (validTarget[0] === 'sky') {
    voidPowerEffect(player, viewedArray, uniqueCardID, targetMatArrays[0], myResolve);
  } else if (validTarget[0] === 'left') {
    voidPowerEffect(player, viewedArray, uniqueCardID, targetMatArrays[1], myResolve);
  } else if (validTarget[0] === 'right') {
    voidPowerEffect(player, viewedArray, uniqueCardID, targetMatArrays[2], myResolve);
  } else {
    console.log('autoAttack went wrong');
  }
}

const voidEffectP1 = (uniqueCardID, viewedArray, myResolve) => {
  new Promise(function(promptResolve) {
    turnClass = 'choiceEffect';  // turnClass may impact forfeitabilityCheck(), handCardDisplay() and matCardDisplay()
    matCardDisplay(viewedArray);
    promptVoidEffect(promptResolve);
  }).then(func => {
    selectTargetMenu(uniqueCardID, viewedArray, myResolve);
  })
}

const voidPowerEffect = (player, viewedArray, uniqueCardID, attackedArray, myResolve) => {
  const playedPosition = arrayToPosition(viewedArray);
  new Promise(function(effectResolve) {
    if (uniqueCardID === '215') {
      // irrecoverable
      pushBlockItem(findVictim(player), uniqueCardID, 'cardID', attackedArray[attackedArray.length-1].cardID, player, false);
    } else {
      // recoverable
      pushBlockItem(findVictim(player), uniqueCardID, 'cardID', attackedArray[attackedArray.length-1].cardID, player, true);
    }
    
    // banning once-per-turn Cont effects
    let checkedCardFunc;
    cardDB.forEach(card => {
      if (card.cardID === uniqueCardID) {
        checkedCardFunc = card.cardFunc;
      }
    })
    if (checkedCardFunc === 'Cont') {findBannedInTurn(player).push({cardID: uniqueCardID, sourcePos: playedPosition});}
    
    voidPowerSecondaryEffect(viewedArray, uniqueCardID, attackedArray, findPowerBracket(player));
    setTimeout(() => effectResolve(), 10);
  }).then(func => {
    inflictDmgStep1(player, myResolve);
  })
}

const voidPowerSecondaryEffect = (viewedArray, uniqueCardID, attackedArray, powerBracket) => {
  // power-absorbing effects (e.g., 317 古比古比之咒語)
  if (uniqueCardID === '118' || uniqueCardID === '211' || uniqueCardID === '317' || uniqueCardID === '478' || uniqueCardID === '874' || uniqueCardID === 'N152') {
    let powerUpValue;
    cardDB.forEach(card => {
      if (card.cardID === attackedArray[attackedArray.length-1].cardID) {
        powerUpValue = card.monPower  // take the original power from cardDB rather than from the mat slot (i.e., ignoring power-up)
      }
    });
    suckPower(powerBracket, powerUpValue, arrayToPosition(viewedArray));
  } 
}

const suckPower = (powerBracket, powerUpValue, playedPosition) => {
  if (playedPosition === 'sky') {
    powerBracket[0].absorbedPU = powerUpValue;
  } else if (playedPosition === 'left') {
    powerBracket[1].absorbedPU = powerUpValue;
  } else if (playedPosition === 'right') {
    powerBracket[2].absorbedPU = powerUpValue;
  } else if (playedPosition === 'help') {
    powerBracket[3].absorbedPU = powerUpValue;
  } else if (playedPosition === 'sp') {
    powerBracket[4].absorbedPU = powerUpValue;
  }

}

const cardEffect116 = (player, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    comboBlockEffect(player, uniqueCardID, 'min', 'left', 40, true, true); // player, uniqueCardID, blockMode, blockedPos, blockedPower, includeZero, recoverability
    comboBlockEffect(player, uniqueCardID, 'min', 'right', 40, true, true);
    setTimeout(() => effectResolve(), 10);
  }).then(func => {
    inflictDmgStep1(player, myResolve);
  })
}

const cardEffect235 = (player, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    comboBlockEffect(player, uniqueCardID, 'max', 'left', 30, false, true); // player, uniqueCardID, blockMode, blockedPos, blockedPower, includeZero, recoverability
    comboBlockEffect(player, uniqueCardID, 'max', 'right', 30, false, true);
    setTimeout(() => effectResolve(), 10);
  }).then(func => {
    inflictDmgStep1(player, myResolve);
  })
}

const bombEffect = (player, uniqueCardID, viewedArray, myResolve) => {
  if (player === 'p1') {
    autoBomb(player, uniqueCardID, viewedArray, p1Hole, 'p2', p2MatArrays, p2Hole, myResolve);
  } else {
    autoBomb(player, uniqueCardID, viewedArray, p2Hole, 'p1', p1MatArrays, p1Hole, myResolve);
  }
}

const autoBomb = (player, uniqueCardID, viewedArray, holeArray, player2, targetMatArrays, p2HoleArray, myResolve) => {
  let validTarget = [];
  new Promise(function(effectResolve) {
    for (let i = 0; i < 3; i++) {
      attackableCheck(uniqueCardID, viewedArray, player2, playedPositions[i], targetMatArrays[i], myResolve, validTarget);
    }
    setTimeout(() => effectResolve(), 10);
  }).then(func => {
    if (validTarget.length === 0) {
      myResolve();
    } else if (validTarget.length === 1) {
      autoBombStep2(player, viewedArray, holeArray, player2, targetMatArrays, p2HoleArray, myResolve, validTarget);
    } else {
      if (player === 'p1') {
        bombEffectP1(uniqueCardID, viewedArray, myResolve);
      } else {
        // ? AI logic to be further enhanced
        autoBombStep2(player, viewedArray, holeArray, player2, targetMatArrays, p2HoleArray, myResolve, validTarget);
      }
    }
  })
}

const autoBombStep2 = (player, viewedArray, holeArray, player2, targetMatArrays, p2HoleArray, myResolve, validTarget) => {
  if (validTarget[0] === 'sky') {
    bombEffectStep2(player, viewedArray, holeArray, player2, validTarget[0], targetMatArrays[0], p2HoleArray, myResolve);
  } else if (validTarget[0] === 'left') {
    bombEffectStep2(player, viewedArray, holeArray, player2, validTarget[0], targetMatArrays[1], p2HoleArray, myResolve);
  } else if (validTarget[0] === 'right') {
    bombEffectStep2(player, viewedArray, holeArray, player2, validTarget[0], targetMatArrays[2], p2HoleArray, myResolve);
  } else {
    console.log('autoBomb went wrong');
  }
}

const bombEffectP1 = (uniqueCardID, viewedArray, myResolve) => {
  new Promise(function(promptResolve) {
    turnClass = 'choiceEffect';  // turnClass may impact forfeitabilityCheck(), handCardDisplay() and matCardDisplay()
    matCardDisplay(viewedArray);
    promptGraveEffect(promptResolve);
  }).then(func => {
    selectTargetMenu(uniqueCardID, viewedArray, myResolve);
  })
}

const bombEffectStep2 = (player, bomberArray, p1HoleArray, player2, attackedPosition, attackedArray, p2HoleArray, myResolve) => {
  const attackedCardID = attackedArray[attackedArray.length-1].cardID;
  const playedPosition = arrayToPosition(bomberArray);
  // look for any Ch card beneath the attacked card
  let attackedChCardID = '';
  if (attackedArray.length > 1) {
    for (let i = 0; i < attackedArray.length-1; i++) {
      if (attackedArray[i].cardType === 'Ch') {
        attackedChCardID = attackedArray[i].cardID; 
      }
    }
  }
  
  new Promise(function(effectResolve) {
    flushAnimation(player, playedPosition); 
    flushAnimation(player2, attackedPosition); 

    for (let i = bomberArray.length; i > 0; i--) {
      p1HoleArray.push({
        cardID: bomberArray[i-1].cardIDOG,
        cardPic: bomberArray[i-1].cardPicOG
      });
    }
    departureToDo(player, bomberArray[bomberArray.length-1].cardID, playedPosition, true);  // fullReverse = false; see applyDmg.js

    for (let i = attackedArray.length; i > 0; i--) {
      p2HoleArray.push({
        cardID: attackedArray[i-1].cardIDOG,
        cardPic: attackedArray[i-1].cardPicOG
      });
    }
    departureToDo(player2, attackedCardID, attackedPosition, true);  // fullReverse = false; see applyDmg.js
    
    setTimeout(() => effectResolve(), flushAniDur*1000);
  }).then(func => {
    new Promise(function(effectResolve2) {  // use a promise to ensure pop doesn't precede the above functions
      updateOccupiedFlag(player, playedPosition, false);
      updateOccupiedFlag(player2, attackedPosition, false);
      bomberArray.length = 0;
      attackedArray.length = 0;
      turnClass = 'play';  // change it back to 'play' in case it impacts the effects triggered by inflictDmgStep1();
      setTimeout(() => effectResolve2(), 10);
    }).then(func => {
      new Promise(function(effectResolve3) {
        flushAnimationReverse(player, playedPosition);
        flushAnimationReverse(player2, attackedPosition);
        renderMat(player, p1HoleArray, 'hole');
        renderMat(player, bomberArray, playedPosition);
        renderMat(player2, p2HoleArray, 'hole');
        renderMat(player2, attackedArray, attackedPosition);
        if (attackedChCardID === '') {
          effectResolve3();
        } else {
          triggerSideEffects(player2, attackedChCardID, attackedArray, effectResolve3);  // trigger side effect of attacked Ch card, if any
        }
      }).then(func => {
        new Promise(function(effectResolve4) {
          triggerSideEffects(player2, attackedCardID, attackedArray, effectResolve4);  // trigger side effect of attacked card
        }).then(func => {
          new Promise(function(effectResolve5) {
            inflictDmgStep1(player, effectResolve5);
          }).then(func => {
            triggerEffects(player, '000', bomberArray, myResolve, 'upsideDown');  // '000' is a dummy cardID, just to give Cont cards a chance to trigger their effects
          })
        })
      })
    })
  })
}

const cardEffect201 = (player, uniqueCardID, myResolve) => {
  new Promise(function(eggResolve) {
    blockEffect(player, uniqueCardID, 'monClass', 'FH', true, eggResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
  }).then(func => {
    // quick fix: no prompt is triggered for p2
    if (player === 'p1' && currentTurn === player && turnSP === false && cardOnHandCheck(player, '226') === true) {
      disableP1PlayButtons();
      turnClass = 'effect';  // turnClass may impact forfeitabilityCheck() and matCardDisplay()
      forfeitabilityCheck('p1');
      prompt201effect(myResolve);
    } else {
      myResolve();
    }
  }) 
}

// no resolve is given when the card is played normally so that the player can continue the turn
const cardEffect226 = (player, myResolve, cardPlayMode) => {
  new Promise(function(bossResolve) {
    if (player === 'p1') {
      if (p2BlockedClass1.filter(blockedItem => blockedItem.source === '201').length > 0) {
        new Promise(function(bossResolve2) {
          p2BlockedClass1 = p2BlockedClass1.filter(blockedItem => blockedItem.source !== '201');
          bossResolve2();
        }).then(func => {
          inflictDmgStep1(player, bossResolve);
        })
      } else {
        bossResolve();
      }
    } else {
      if (p1BlockedClass1.filter(blockedItem => blockedItem.source === '201').length > 0) {
        new Promise(function(bossResolve2) {
          p1BlockedClass1 = p1BlockedClass1.filter(blockedItem => blockedItem.source !== '201');
          bossResolve2();
        }).then(func => {
          inflictDmgStep1(player, bossResolve);
        })
      } else {
        bossResolve();
      }
    }
  }).then(func => {
    if (cardPlayMode === 'Normal') {  
    } else {
      myResolve();
    }
  })
}

const cardEffect289 = (player, myResolve) => {
  if (findMatArrays(findVictim(player))[5][0].cardName === '古比古比') {
    blockEffect(player, '289', 'pos', 'sp', false, myResolve);
  } else {
    myResolve();
  }
}

const cardEffect307 = (player, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    pushBlockItem(findVictim(player), uniqueCardID, 'cardID', '101', false);
    pushBlockItem(findVictim(player), uniqueCardID, 'cardID', '219', false);
    pushBlockItem(findVictim(player), uniqueCardID, 'cardID', '386', false);
    pushBlockItem(findVictim(player), uniqueCardID, 'cardID', '418', false);
    setTimeout(() => effectResolve(), 10);
  }).then(func => {
    inflictDmgStep1(player, myResolve);
  })
}