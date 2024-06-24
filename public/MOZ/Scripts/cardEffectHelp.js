// 手鐐 (the codes in /* */ were disabled after reinterpretation of the card effect)
const handChainEffect = (player, uniqueCardID, myResolve) => {
  // the card effect shouldn't be triggered again when it turns from UD to FU
  if (findBannedInTurnNR(player).filter(banned => banned.cardID === uniqueCardID).length > 0) {
    myResolve();
  } else {
    if (player === 'p1') {
      p1BannedEffectInTurnNR.push({cardID: uniqueCardID, sourcePos: 'help'});
      if (p1Summoner[0].speed > p2Summoner[0].speed) {
        p1Summoner[0].speed = p2Summoner[0].speed - 1;
        myResolve();
      } else {
        myResolve();
        /* the following code is applicable IF handChain is also effective when the player is slower
        p1Speed = p2Speed - 1;
        p1ChangedSpeed = true;
        let playedCards = [];
        countPlayedCards(playedCards);  // see utility.js
        if (playedCards[0] < 4) {
          turnSwitchToP1();  // see turnControl.js
        } else {
          myResolve();
        }
        */
      }
    } else {
      p2BannedEffectInTurnNR.push({cardID: uniqueCardID, sourcePos: 'help'});
      if (p2Summoner[0].speed > p1Summoner[0].speed) {
        p2Summoner[0].speed = p1Summoner[0].speed - 1;
        myResolve();
      } else {
        myResolve();
        /* the following code is applicable IF handChain is also effective when the player is slower
        p2Speed = p1Speed - 1;
        p2ChangedSpeed = true;
        let playedCards = [];
        countPlayedCards(playedCards);  // see utility.js
        if (playedCards[1] < 4) {
          turnSwitchToP2();  // see turnControl.js
        } else {
          myResolve();
        }
        */
      }
    }
  }
}

// 補牌咭
const drawTillSevenEffect = (player, uniqueCardID, drawLimit, myResolve) => {
  // the card effect shouldn't be triggered again when it turns from UD to FU
  if (findBannedInTurnNR(player).filter(banned => banned.cardID === uniqueCardID).length > 0) {
    myResolve();
  } else {
    if (player === 'p1') {
      p1BannedEffectInTurnNR.push({cardID: uniqueCardID, sourcePos: 'help'});
      if (p1Hand.length >= 7) {
        myResolve();
      } else {
        turnClass = 'choiceEffect';  // turnClass may impact forfeitabilityCheck(), handCardDisplay() and matCardDisplay()
        forfeitabilityCheck('p1');
        promptDrawTillSeven(player, drawLimit, myResolve);
      }
    } else {
      if (p2Hand.length >=7) {
        myResolve();
      } else {
        // ? AI logic
        p2BannedEffectInTurnNR.push({cardID: uniqueCardID, sourcePos: 'help'});
        let handCardShortage;
        handCardShortage = 7 - p2Hand.length;
  
        if (p2Deck.length >= Math.min(drawLimit, handCardShortage) + 3) {
          drawCard(player, Math.min(drawLimit, handCardShortage));
        } else {
          let playedCards = [];
          countPlayedCards(playedCards);
          let safeDrawNumber = p2Deck.length - (4 - playedCards[1]);
          drawCard(player, Math.min(drawLimit, handCardShortage, safeDrawNumber));
        }
        setTimeout(() => myResolve(), (drawAniDur+(drawLimit-1)*0.05)*1000+aniBuffer);
      }
    }
  }
}

// 召喚師移動
const summonersShuffleEffect = (player, uniqueCardID, myResolve) => {
  // the card effect shouldn't be triggered again when it turns from UD to FU
  if (findBannedInTurnNR(player).filter(banned => banned.cardID === uniqueCardID).length > 0) {
  myResolve();
  } else {
    if (player === 'p1') {
      p1BannedEffectInTurnNR.push({cardID: uniqueCardID, sourcePos: 'help'});
      if (p1Queue.length < 2) {
        myResolve();
      } else {
        new Promise(function(effectResolve) {
          turnClass = 'choiceEffect';  // turnClass may impact forfeitabilityCheck(), handCardDisplay() and matCardDisplay()
          forfeitabilityCheck('p1');
          promptSummonersShuffle(effectResolve);
        }).then(func => {
          arrangeSummoners(uniqueCardID, myResolve);
        })
      }
    } else {
      p2BannedEffectInTurnNR.push({cardID: uniqueCardID, sourcePos: 'help'});
      if (p2Queue.length < 2) {
        myResolve();  
      } else {
        // AI logic to be further enhanced
        new Promise(function(shuffleResolve) {
          shuffleAnimation('p2', 'queue-button', p2Queue.length);
          setTimeout(() => shuffleResolve(), (shuffleAniDur+shuffleDelay*p2Queue.length)*1000+aniBuffer)
        }).then(func => {
          removeAnimatedContainer('p2', 'queue-button', p2Queue.length);
          myResolve();
        })
      }
    }
  }
}

// 回力刀
const cardEffect144 = (player, uniqueCardID, myResolve) => {
  if (findMatArrays(player)[5][0].cardID.includes('S057') === false) {
    myResolve();
  } else {
    blockEffect(player, uniqueCardID, 'monClass', 'Disaster', true, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
  }
}

// 援助軍團
const cardEffect145 = (player, uniqueCardID, myResolve) => {
  if (findMatArrays(player)[5][0].cardID.includes('S058') === false) {
    myResolve();
  } else {
    new Promise(function(effectResolve) {
      pushBlockItem(findVictim(player), uniqueCardID, 'cardID', '075', player, true);  // 075 = 哈維亞
      pushBlockItem(findVictim(player), uniqueCardID, 'monClass', 'Disaster', player, true);
      setTimeout(() => effectResolve(), 10);
    }).then(func => {
      inflictDmgStep1(player, myResolve);
    })
  }
}

// 魔導之眼
const cardEffect243 = (player, uniqueCardID, myResolve) => {
  // the card effect shouldn't be triggered again when it turns from UD to FU
  if (findBannedInTurnNR(player).filter(banned => banned.cardID === uniqueCardID).length > 0) {
    myResolve();
  } else {
    if (player === 'p1') {
      p1BannedEffectInTurnNR.push({cardID: uniqueCardID, sourcePos: 'help'});
      if (p1Hole.length === 0) {
        promptHoleEmpty();
        myResolve();
      } else {
        turnClass = 'choiceEffect';  // turnClass may impact forfeitabilityCheck(), handCardDisplay() and matCardDisplay()
        forfeitabilityCheck('p1');
        document.getElementById("p1-mat-hole-button").disabled = false;
        matCardDisplay(p1Hole);
        viewHoleMenu(myResolve);
      }
    } else {
      p2BannedEffectInTurnNR.push({cardID: uniqueCardID, sourcePos: 'help'});
      myResolve();
    }
  }
}

// 火藥球
const cardEffect244 = (player, viewedArray, matArrays, uniqueCardID, bannedEffectInTurn, myResolve) => {
  let conditionMet = false;
  for (let i = 0; i < 3; i++) {
    if (matArrays[i].length > 0) {
      if (matArrays[i][matArrays[i].length-1].upsideDown === false && matArrays[i][matArrays[i].length-1].monType === 'FF' 
        && matArrays[i][matArrays[i].length-1].monPower <= 60 && matArrays[i][matArrays[i].length-1].monPower !== 0) {
        conditionMet = true;
      }
    }
  }
  if (conditionMet === false) {
    // if the FF mon is turned UD, the effect needs to be reversed
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
    reverseBannedEffect(findBannedInTurn(player), 'help', uniqueCardID);
    inflictDmgStep1(player, myResolve);
  } else if (bannedEffectInTurn.filter(banned => banned.cardID === uniqueCardID).length > 0) {
    myResolve();
  } else {
    // see cardEffectMon.js, which includes pushing uniqueCardID to bannedEffectInTurn
    autoVoidEffect(player, viewedArray, findVictim(player), uniqueCardID, findMatArrays(findVictim(player)), myResolve);
  }
}

// 吠月獸
const cardEffect245 = (player, uniqueCardID, myResolve) => {
  // if 115 is turned UD, the effect needs to be reversed
  if (cardOnFieldCheck(player, '115') === false) {  // 115 嗝
    if (player === 'p1') {
      p2BlockedPos1 = p2BlockedPos1.filter(item => {if (item.source === uniqueCardID && item.sourcePlayer === player){
        return false;
      } else {
        return true;
      }});
    } else {
      p1BlockedPos1 = p1BlockedPos1.filter(item => {if (item.source === uniqueCardID && item.sourcePlayer === player){
        return false;
      } else {
        return true;
      }}); 
    }
    reverseBannedEffect(findBannedInTurn(player), 'help', uniqueCardID);
    inflictDmgStep1(player, myResolve);
  } else if (findBannedInTurn(player).filter(banned => banned.cardID === uniqueCardID).length > 0) {
      myResolve();
  } else {
    findBannedInTurn(player).push({cardID: uniqueCardID, sourcePos: 'help'});
    blockEffect(player, uniqueCardID, 'pos', 'help', true, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
  }
}

// 維納斯之屁
const cardEffect246 = (player, uniqueCardID, myResolve) => {
  if (cardOnFieldCheck('p1', '114') === false && cardOnFieldCheck('p2', '114') === false) {  // 114 呵
    myResolve();
  } else {
    new Promise(function(effectResolve) {
      cardEffect246Step2(player, uniqueCardID, findMatArrays(player), findLevelUpBracket(player), findMatArrays(findVictim(player)), findLevelUpBracket(findVictim(player)));
      setTimeout(() => effectResolve(), 10);
    }).then(func => {
      inflictDmgStep1(player, myResolve);
    })
  }
}

const cardEffect246Step2 = (player, uniqueCardID, myMatArrays, myLevelUpBracket, foeMatArrays, foeLevelUpBracket) => {
  for (let i = 0; i < 3; i++) {
    if (myMatArrays[i].length > 0) {
      if (myMatArrays[i][myMatArrays[i].length-1].upsideDown === false && myMatArrays[i][myMatArrays[i].length-1].cardID === '114'
        && myLevelUpBracket[i][0].recoverable === true) {
        // if both sides play '246', the first player's effect trumps
        if (foeMatArrays[3].length === 0) {
          updateLevelUpBracket(myMatArrays[i], player, myLevelUpBracket[i], '', '', 100, '', uniqueCardID, true);  // see levelUp.js
        } else if (foeMatArrays[3][0].upsideDown === true || (foeMatArrays[3][0].upsideDown === false && foeMatArrays[3][0].cardID !== '114')) {
          updateLevelUpBracket(myMatArrays[i], player, myLevelUpBracket[i], '', '', 100, '', uniqueCardID, true);
        }
      }
    }
  }
  for (let i = 0; i < 3; i++) {
    if (foeMatArrays[i].length > 0) {
      if (foeMatArrays[i][foeMatArrays[i].length-1].upsideDown === false && foeMatArrays[i][foeMatArrays[i].length-1].cardID === '114'
        && foeLevelUpBracket[i][0].recoverable === true) {
        // if both sides play '246', the first player's effect trumps
        if (foeMatArrays[3].length === 0) {
          updateLevelUpBracket(foeMatArrays[i], player, foeLevelUpBracket[i], '', '', -100, '', uniqueCardID, true);  // see levelUp.js
        } else if (foeMatArrays[3][0].upsideDown === true || (foeMatArrays[3][0].upsideDown === false && foeMatArrays[3][0].cardID !== '114')) {
          updateLevelUpBracket(foeMatArrays[i], player, foeLevelUpBracket[i], '', '', -100, '', uniqueCardID, true);
        }
      }
    }
  }
}

// 火貝
const cardEffect248 = (player, uniqueCardID, matArrays, myResolve) => {
  if (matArrays[5][0].cardID !== 'S070') {
    myResolve();
  } else {
    pushPowerUpHist(player, player, uniqueCardID, 'XX100', true);
    allStarsEffect(matArrays, myResolve);
  }
}

allStarsEffect = (matArrays, myResolve) => {
  matArrays[5][0].skyType = 'AACCDDEEFFGGHHKKLLMMNNOOSSWWYYZZ';
  matArrays[5][0].leftType = 'AACCDDEEFFGGHHKKLLMMNNOOSSWWYYZZ';
  matArrays[5][0].rightType = 'AACCDDEEFFGGHHKKLLMMNNOOSSWWYYZZ';
  myResolve();
}

// 紀念照
const cardEffect271 = (player, matArrays, uniqueCardID, bannedEffectInTurn, myResolve) => {
  let conditionMet = false;
  for (let i = 0; i < 3; i++) {
    if (matArrays[i].length > 0) {
      if (matArrays[i][matArrays[i].length-1].upsideDown === false && matArrays[i][matArrays[i].length-1].cardID === '221') {
        conditionMet = true;
      }
    }
  }
  if (conditionMet === false) {
    // if 221 寂羅 is turned UD, the effect needs to be reversed
    if (player === 'p1') {
      p2BlockedPos1 = p2BlockedPos1.filter(item => {if (item.source === uniqueCardID && item.sourcePlayer === player){
        return false;
      } else {
        return true;
      }}); 
    } else {
      p1BlockedPos1 = p1BlockedPos1.filter(item => {if (item.source === uniqueCardID && item.sourcePlayer === player){
        return false;
      } else {
        return true;
      }}); 
    }
    reverseBannedEffect(findBannedInTurn(player), 'help', uniqueCardID);
    inflictDmgStep1(player, myResolve);
  } else if (bannedEffectInTurn.filter(banned => banned.cardID === uniqueCardID).length > 0) {
    myResolve();
  } else {
    bannedEffectInTurn.push({cardID: uniqueCardID, sourcePos: 'help'});
    blockEffect(player, uniqueCardID, 'pos', 'sp', true, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
  }
}

// 迷惑香水
const cardEffect272 = (player, uniqueCardID, viewedArray, myResolve) => {
  new Promise(function(effectResolve) {
    allPowerup(uniqueCardID, 50, findMatArrays(player), findPowerBracket(player), effectResolve);
  }).then(func => {
    if (findBannedInTurn(player).filter(banned => banned.cardID === uniqueCardID).length > 0) {
      myResolve();
    } else {
      autoVoidEffect(player, viewedArray, findVictim(player), uniqueCardID, findMatArrays(findVictim(player)), myResolve);
    }
  })
}

// 森林朋友
const cardEffect290 = (player, uniqueCardID, matArrays, myResolve) => {
  if (matArrays[5][0].cardID === 'S087') {
    blockEffect(player, uniqueCardID, 'monClass', 'DR', true, myResolve);
  } else {
    myResolve();
  }
}

// 洛磯思超力電子槍
const cardEffect291 = (player, uniqueCardID, matArrays, myResolve) => {
  if (matArrays[5][0].cardID === 'S096') {
    blockEffect(player, uniqueCardID, 'pos', 'sky', true, myResolve);
  } else {
    myResolve();
  }
}

// 斷魂刀
const cardEffect293 = (player, uniqueCardID, matArrays, myResolve) => {
  // S006 古圖, S064 保圖, S085 柏圖, S095 古列特拉圖
  if (matArrays[5][0].cardID === 'S006' || matArrays[5][0].cardID === 'S064' 
    || matArrays[5][0].cardID === 'S085' || matArrays[5][0].cardID === 'S095') {
    new Promise(function(effectResolve) {
      pushBlockItem(findVictim(player), uniqueCardID, 'pos', 'left', player, true);
      pushBlockItem(findVictim(player), uniqueCardID, 'pos', 'right', player, true);
      setTimeout(() => effectResolve(), 10);
    }).then(func => {
      inflictDmgStep1(player, myResolve);
    })
  } else {
    myResolve();
  }
}

// 闇影水晶
const cardEffect294 = (player, uniqueCardID, matArrays, myResolve) => {
  if (matArrays[5][0].cardID !== 'S072' && matArrays[5][0].team !== 'madoushuu') {
    myResolve();
  } else {
    // Reminder: a summoner may have power-up values for multiple types/classes
    let newStr = matArrays[5][0].powerUp;
    for (let i = 0; i < newStr.length; i += 5) {
      newStr = newStr.replace(newStr.substring(i+2, i+5), '100');
    }
    pushPowerUpHist(player, player, uniqueCardID, newStr, true);
    myResolve();
  }
}

// 儲蓄存摺
const cardEffect295 = (player, uniqueCardID, matArrays, myResolve) => {
  // S015 珍妮女士, S089 柏奇
  if (matArrays[5][0].cardID === 'S015' && matArrays[5][0].cardID === 'S089') {
    pushPowerUpHist(player, player, uniqueCardID, 'KK100', true);
    myResolve();
  } else if (matArrays[5][0].summonerType === 'KK') {
    // Reminder: a summoner may have power-up values for multiple types/classes
    let newStr = matArrays[5][0].powerUp;
    for (let i = 0; i < newStr.length; i += 5) {
      newStr = newStr.replace(newStr.substring(i+2, i+5), '070');
    }
    pushPowerUpHist(player, player, uniqueCardID, newStr, true);
    myResolve();
  } else {
    myResolve();
  }
}

// 魔導之規條
const cardEffect314 = (matArrays, myResolve) => {
  if (matArrays[5][0].team === 'madoushuu') {
    allStarsEffect(matArrays, myResolve);
  } else {
    myResolve();
  }
}

// 露露‧芭比的照片
const cardEffect315 = (player, uniqueCardID, foeSummonerArray, myResolve) => {
  if (foeSummonerArray[0].gender === 'M' && foeSummonerArray[0].ageKnown === true && foeSummonerArray[0].age >= 50) {
    blockEffect(player, uniqueCardID, 'pos', 'help', true, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
  } else {
    myResolve();
  }
}

// 天之翼
const cardEffect316 = (player, matArrays, safeHouse, myResolve) => {
  safeHouse.length = 0;  // need to clear it because the effect may be valid before SP turn but invalid during SP turn (e.g., a bird is exchanged)
  if (matArrays[0].length > 0 && matArrays[1].length > 0 && matArrays[2].length > 0) {
    if (matArrays[0][matArrays[0].length-1].upsideDown === false && matArrays[0][matArrays[0].length-1].monClass === 'BI'
      && matArrays[1][matArrays[1].length-1].upsideDown === false && matArrays[1][matArrays[1].length-1].monClass === 'BI'
      && matArrays[2][matArrays[2].length-1].upsideDown === false && matArrays[2][matArrays[2].length-1].monClass === 'BI') {
      safeHouse.push(matArrays[0][matArrays[0].length-1].cardID, matArrays[1][matArrays[1].length-1].cardID, 
        matArrays[2][matArrays[2].length-1].cardID, matArrays[3][matArrays[3].length-1].cardID);
      setTimeout(() => myResolve(), 10);
    } else {
      inflictDmgStep1(player, myResolve);  // if nothing is pushed into safeHouse, run inflictDmgStep1() to see if any card can be attacked now
    }
  } else {
    myResolve();
  }
}

// 飯團
const cardEffect318 = (player, uniqueCardID, myResolve) => {
  if (findMatArrays(player)[5][0].cardID.includes('S056') === false) {
    myResolve();
  } else {
    new Promise(function(effectResolve) {
      pushBlockItem(findVictim(player), uniqueCardID, 'pos', 'help', player, true);
      pushBlockItem(findVictim(player), uniqueCardID, 'pos', 'sp', player, true);
      setTimeout(() => effectResolve(), 10);
    }).then(func => {
      inflictDmgStep1(player, myResolve);
    })
  }
}

// 老男老婦隊
const cardEffect319 = (matArrays, myResolve) => {
  if (matArrays[5][0].ageKnown === true && matArrays[5][0].age >= 80) {
    allStarsEffect(matArrays, myResolve);
  } else {
    myResolve();
  }
}

// 佐敦馬戲團之劇本
const cardEffect691 = (matArrays, myResolve) => {
  if (matArrays[5][0].cardID === 'S052') {  // 佐敦
    allStarsEffect(matArrays, myResolve);
  } else {
    myResolve();
  }
}

// Dr.拉柯奇的秘密基地
const cardEffect692 = (matArrays, myResolve) => {
  if (matArrays[5][0].cardName.includes('拉柯奇') === true) {  
    allStarsEffect(matArrays, myResolve);
  } else {
    myResolve();
  }
}

// 保圖的搖籃
const cardEffect693 = (matArrays, myResolve) => {
  if (matArrays[5][0].cardID === 'S006' || matArrays[5][0].cardID === 'S064' 
    || matArrays[5][0].cardID === 'S085' || matArrays[5][0].cardID === 'S103') {  
    allStarsEffect(matArrays, myResolve);
  } else {
    myResolve();
  }
}

// 咭之調換
const cardEffect312 = (player, uniqueCardID, myResolve) => {
  if (findBannedInTurnNR(player).filter(banned => banned.cardID === uniqueCardID).length > 0 
    || findBannedInGame(player).filter(banned => banned.cardID === uniqueCardID).length > 0) {
    myResolve();
  } else if (findDeck(player).length < 2) {
    findBannedInTurnNR(player).push({cardID: uniqueCardID, sourcePos: 'help'});  // the card effect shouldn't be triggered again when it turns from UD to FU
    myResolve();
  } else {
    findBannedInGame(player).push({cardID: uniqueCardID, sourcePos: 'help'});
    let drawNum;
    if (findDeck(player).length === 2) {
      drawNum = 1;
    } else {
      drawNum = 2;
    }
    new Promise(function(drawResolve) {
      drawCard(player, drawNum);
      setTimeout(() => drawResolve(), drawAniDur*drawNum*1000+aniBuffer);
    }).then(func => {
      // ? To be enhanced to allow p1 to choose which p2's handcards to discard
      for (let i = 1; i <= drawNum; i++) {
        discardHandToHole(player, findHand(player), getRandomInt(0, findHand(player).length-1), findMatArrays(player)[6]);
        if (i === drawNum) {
          setTimeout(() => myResolve(), playAniDur*1000+aniBuffer);
        }
      }
    })
  }
}

// 召喚師替換
const summonersSwapEffect = (player, uniqueCardID, myResolve) => {
  if (findBannedInTurnNR(player).filter(banned => banned.cardID === uniqueCardID).length > 0 
    || findBannedInGame(player).filter(banned => banned.cardID === uniqueCardID).length > 0) {
    myResolve();
  } else {
    if (player === 'p1') {
      if (uniqueCardID === 'M205' && p1Summoner[0].summonerLevel < 6) {
        myResolve();
      } else {
        p1BannedEffectInTurnNR.push({cardID: uniqueCardID, sourcePos: 'help'});  // the card effect shouldn't be triggered again when it turns from UD to FU
        if (p1Used.length === 0 || p1Queue.length === 0) {
          myResolve();
        } else {
          new Promise(function(effectResolve) {
            p1BannedEffectInGame.push({cardID: uniqueCardID, sourcePos: 'help'});
            turnClass = 'choiceEffect';  // turnClass may impact forfeitabilityCheck(), handCardDisplay() and matCardDisplay()
            forfeitabilityCheck('p1');
            promptSummonersSwap(effectResolve);
          }).then(func => {
            selectUsedSummonerMenu(myResolve);
          })
        }
      }
    } else {
      if (uniqueCardID === 'M205' && p2Summoner[0].summonerLevel < 6) {
        myResolve();
      } else {
        // ? AI logic
        p2BannedEffectInTurnNR.push({cardID: uniqueCardID, sourcePos: 'help'});
        if (p2Used.length === 0 || p2Queue.length === 0) {
          myResolve();
        } else {
          p2BannedEffectInGame.push({cardID: uniqueCardID, sourcePos: 'help'});
          let usedMaxLv = -1;
          let usedMaxLvCardID;
          p2Used.forEach(sCard => {
            if (sCard.summonerLevel > usedMaxLv && sCard.cardID !== 'S367') {
              usedMaxLv = sCard.summonerLevel;
              usedMaxLvCardID = sCard.cardID;
            }
          })
          let queuedMinLv = 9;
          let queuedMinLvCardID;
          p2Queue.forEach(sCard => {
            if (sCard.summonerLevel < queuedMinLv) {
              queuedMinLv = sCard.summonerLevel;
              queuedMinLvCardID = sCard.cardID;
            }
          })
          if (usedMaxLv < queuedMinLv) {
            myResolve();
          }
          summonersSwapEffectStep2(player, p2Used, p2Queue, usedMaxLvCardID, queuedMinLvCardID, myResolve);
        }
      }
    }
  }
}

const summonersSwapEffectStep2 = (player, usedArray, queueArray, usedSummonerCardID, queuedSummonerCardID, myResolve) => {
  let tempArray = [];
  new Promise(function(effectResolve) {
    usedArray.forEach(sCard => {
      if (sCard.cardID === usedSummonerCardID) {
        tempArray.push({
          cardName: sCard.cardName,
          summonerLevel: sCard.summonerLevel,
          cardID: sCard.cardID,
          cardType: sCard.cardType,
          cardSeries: sCard.cardSeries,
          cardPic: sCard.cardPic
        })
      }
    });
    queueArray.forEach(sCard => {
      if (sCard.cardID === queuedSummonerCardID) {
        tempArray.push({
          cardName: sCard.cardName,
          summonerLevel: sCard.summonerLevel,
          cardID: sCard.cardID,
          cardType: sCard.cardType,
          cardSeries: sCard.cardSeries,
          cardPic: sCard.cardPic
        })
      }
    });
    summonersSwapAnimation(player);
    setTimeout(() => effectResolve(), sumSwapAniDur*1000);
  }).then(func => {
    new Promise(function(effectResolve2) {
      summonersSwapAnimationReverse(player);
      usedArray.forEach(sCard => {
        if (sCard.cardID === usedSummonerCardID) {
          sCard.cardID = tempArray[1].cardID;
          sCard.cardName = tempArray[1].cardName
          sCard.summonerLevel = tempArray[1].summonerLevel
          sCard.cardType = tempArray[1].cardType
          sCard.cardSeries = tempArray[1].cardSeries
          sCard.cardPic = tempArray[1].cardPic
        }
      });
  
      queueArray.forEach(sCard => {
        if (sCard.cardID === queuedSummonerCardID) {
          sCard.cardID = tempArray[0].cardID;
          sCard.cardName = tempArray[0].cardName
          sCard.summonerLevel = tempArray[0].summonerLevel
          sCard.cardType = tempArray[0].cardType
          sCard.cardSeries = tempArray[0].cardSeries
          sCard.cardPic = tempArray[0].cardPic
        }
      });
      setTimeout(() => effectResolve2(), 10);
    }).then(func => {
      turnClass = 'play';  // if the turnClass remains 'choiceEffect', handCardDisplay() doesn't call any menu
      renderMat(player, usedArray, 'used');
      matCardDisplay(queueArray);
      myResolve();
    })
  })
}

// 亞古喀普
const cardEffect689 = (player, uniqueCardID, matArrays, myResolve) => {
  if (matArrays[5][0].cardID !== 'S099' || findBannedInTurn(player).filter(banned => banned.cardID === uniqueCardID).length > 0) {
    myResolve();
  } else {
    autoLevelUp(player, uniqueCardID, matArrays, findLevelUpBracket(player), findBannedInTurn(player), 100, myResolve);
  }
}

const autoLevelUp = (player, uniqueCardID, matArrays, levelUpBracket, bannedEffectInTurn, levelupValue, myResolve) => {
  let validTarget = [];
  new Promise(function(effectResolve) {
    for (let i = 0; i < 3; i++) {
      buffableCheck(uniqueCardID, playedPositions[i], matArrays[i], bannedEffectInTurn, null, levelupValue, myResolve, validTarget);  // see conditionCheck.js
    }
    setTimeout(() => effectResolve(), 10);
  }).then(func => {
    if (validTarget.length === 0) {
      myResolve();
    } else if (validTarget.length === 1) {
      autoLevelUpStep2(player, uniqueCardID, levelUpBracket, validTarget, bannedEffectInTurn, levelupValue, myResolve);
    } else {
      if (player === 'p1') {
        turnClass = 'choiceEffect';  // turnClass may impact forfeitabilityCheck(), handCardDisplay() and matCardDisplay()
        forfeitabilityCheck('p1');
        promptPowerupSelect(uniqueCardID, bannedEffectInTurn, null, levelupValue, myResolve);
      } else {
        autoLevelUpStep2(player, uniqueCardID, levelUpBracket, validTarget, bannedEffectInTurn, levelupValue, myResolve);
      }
    }
  })
}

const autoLevelUpStep2 = (player, uniqueCardID, levelUpBracket, validTarget, bannedEffectInTurn, levelupValue, myResolve) => {
  bannedEffectInTurn.push({cardID: uniqueCardID, sourcePos: 'help'});
  if (validTarget[0] === 'sky') {
    updateLevelUpBracket(findMatArrays(player), player, levelUpBracket[0], '', '', levelupValue, '', uniqueCardID, true);  // see levelUp.js
  } else if (validTarget[0] === 'left') {
    updateLevelUpBracket(findMatArrays(player), player, levelUpBracket[1], '', '', levelupValue, '', uniqueCardID, true);
  } else {
    updateLevelUpBracket(findMatArrays(player), player, levelUpBracket[2], '', '', levelupValue, '', uniqueCardID, true);
  }
  inflictDmgStep1(player, myResolve);
}

// vanilla power-up help card effects
const targetPowerup = (player, uniqueCardID, powerupFlat, powerupValue, myResolve) => {
  if (findBannedInTurn(player).filter(banned => banned.cardID === uniqueCardID).length > 0) {
    myResolve();
  } else {
    autoPowerUp(player, uniqueCardID, findMatArrays(player), findPowerBracket(player), findBannedInTurn(player), powerupFlat, powerupValue, myResolve);
  }
}

const autoPowerUp = (player, uniqueCardID, matArrays, powerBracket, bannedEffectInTurn, powerupFlat, powerupValue, myResolve) => {
  let validTarget = [];
  new Promise(function(effectResolve) {
    for (let i = 0; i < 3; i++) {
      buffableCheck(uniqueCardID, playedPositions[i], matArrays[i], bannedEffectInTurn, powerupFlat, powerupValue, myResolve, validTarget);  // see conditionCheck.js  
    }
    setTimeout(() => effectResolve(), 10);
  }).then(func => {
    if (validTarget.length === 0) {
      myResolve();
    } else if (validTarget.length === 1) {
      autoPowerUpStep2(uniqueCardID, powerBracket, validTarget, bannedEffectInTurn, powerupFlat, powerupValue, myResolve);
    } else {
      if (player === 'p1') {
        turnClass = 'choiceEffect';  // turnClass may impact forfeitabilityCheck(), handCardDisplay() and matCardDisplay()
        forfeitabilityCheck('p1');
        promptPowerupSelect(uniqueCardID, bannedEffectInTurn, powerupFlat, powerupValue, myResolve);
      } else {
        autoPowerUpStep2(uniqueCardID, powerBracket, validTarget, bannedEffectInTurn, powerupFlat, powerupValue, myResolve);
      }
    }
  })
}

const autoPowerUpStep2 = (uniqueCardID, powerBracket, validTarget, bannedEffectInTurn, powerupFlat, powerupValue, myResolve) => {
  bannedEffectInTurn.push({cardID: uniqueCardID, sourcePos: 'help'});
  if (validTarget[0] === 'sky') {
    targetPowerupStep2(powerupFlat, powerBracket[0], powerupValue, myResolve);
  } else if (validTarget[0] === 'left') {
    targetPowerupStep2(powerupFlat, powerBracket[1], powerupValue, myResolve);
  } else {
    targetPowerupStep2(powerupFlat, powerBracket[2], powerupValue, myResolve);
  }
}

const targetPowerupStep2 = (powerupFlat, powerBracketSub, powerupValue, myResolve) => {
  if (powerupFlat === true) {
    powerBracketSub.allyPosHflatPU = powerupValue;
  } else {
    powerBracketSub.allyPosHmPU = powerupValue;
  }
  myResolve();
}

const allPowerup = (uniqueCardID, powerupValue, matArrays, powerBracket, myResolve) => {
  let helpedType;
  let helpedClass;
  cardDB.forEach(card => {
    if (card.cardID === uniqueCardID) {
      helpedType = card.monType.slice(1, card.monType.length);
      helpedClass = card.monClass.slice(1, card.monClass.length);
    }
  });
  for (let i = 0; i < 3; i++) {
    if (matArrays[i].length > 0) {
      if ((helpedType.length > 0 && (matArrays[i][matArrays[i].length-1].monType === helpedType || (matArrays[i][matArrays[i].length-1].monClass === 'SH' && helpedType === 'SS')))
        || (helpedClass.length > 0 && (matArrays[i][matArrays[i].length-1].monClass === helpedClass || (matArrays[i][matArrays[i].length-1].monType === 'SS' && helpedClass === 'SH')))
        && matArrays[i][matArrays[i].length-1].upsideDown === false) {
        powerBracket[i].allyPosHflatPU = powerupValue;
      }
    }
    if (i === 2) {myResolve();}
  }
}