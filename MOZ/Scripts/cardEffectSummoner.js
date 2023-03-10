// 露露‧芭比
const cardEffectS007 = (player, myResolve) => {
  if (fuCardIDs.slice(0,11).includes(findMatArrays(findVictim(player))[5][0].cardID) === false) {
    myResolve();
  } else {
    // no resolve is given when the foe's summoner is Fu
    new Promise(function(effectResolve) {
      if (player === 'p1') {
        p1Score += 8;
      } else {
        p2Score += 8;
      }
      resultMsg = findPlayerName(player) + ' 勝出，積分加 8 。';
      let msgtext = "露露‧芭比不理任何解釋地摧毀奇蹟大師弗。";
      promptAddScoreMsg(msgtext, effectResolve);
    }).then(func => {
      promptResultMsg();  // ! promptResultMsg needs to handle (1) score > 50 and (2) queue.length === 0
      if (p1Score < 50 && p2Score < 50) {document.getElementById("playSummonersBut").disabled = false;}
    })
  }
}

// 林露
const cardEffectS011 = (player, uniqueCardID, myResolve) => {
  if (findMatArrays(findVictim(player))[5][0].cardID === 'S002') {  // 拉瑪‧雅芙
    pushPowerUpHist(player, player, uniqueCardID, 'XX000', true);
  }
  ageistBlock(false, player, uniqueCardID, 'pos', 'sky', false, findMatArrays(findVictim(player))[5], 'M', 35, '', myResolve);
}

// 哥羅‧加
const cardEffectS012 = (player, uniqueCardID, myResolve) => {
  if (findMatArrays(findVictim(player))[5][0].cardID === 'S003' || findMatArrays(findVictim(player))[5][0].cardID === 'S415') {  // note: there are multiple cards with the same name
    pushPowerUpHist(player, player, uniqueCardID, 'XX000', true);
    myResolve();
  } else {
    helpPowerup(player, uniqueCardID, findMatArrays(player), '137', 'EE100', myResolve);  // 137 酒
  }
}

// 柏高‧費利
const cardEffectS021 = (player, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    helpPowerup(player, uniqueCardID, findMatArrays(player), '137', 'FF100', effectResolve);  // 137 酒
  }).then(func => {
    ageistBlock(false, player, uniqueCardID, 'pos', 'sky', false, findMatArrays(findVictim(player))[5], 'M', 50, '', myResolve);
  })
}

// 古迪拉
const cardEffectS039 = (player, uniqueCardID, myResolve) => {
  if (findMatArrays(findVictim(player))[5][0].cardID === 'S041') {  // 古寶坦
    pushPowerUpHist(player, player, uniqueCardID, 'XX000', true);
  }
  mojoLost(findMatArrays(findVictim(player))[5], 'F', false, '', 35, player, uniqueCardID, 'monClass', 'DR', true, myResolve);
}

// 德格拉斯
const cardEffectS040 = (player, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    ageistBlock(true, player, uniqueCardID, '', '', true, findMatArrays(findVictim(player))[5], 'F', 15, '', effectResolve);
  }).then(func => {
    blockEffect(player, uniqueCardID, 'monType', 'LL', true, myResolve);
  })
}

// 古寶坦
const cardEffectS041 = (player, uniqueCardID, foeSummonerArray, myResolve) => {
  if (foeSummonerArray[0].cardID === 'S039' || foeSummonerArray[0].cardID === 'S049') {  // S039 古迪拉, S049 哥斯達
    pushPowerUpHist(player, player, uniqueCardID, 'FF100', true);
  } else if (foeSummonerArray[0].gender === 'M' && foeSummonerArray[0].ageKnown === true && foeSummonerArray[0].age >= 25) {
    pushPowerUpHist(player, player, uniqueCardID, 'FF100', true);
  }
  myResolve();
}

// 拉絲芙
const cardEffectS042 = (player, uniqueCardID, myResolve) => {
  if (findMatArrays(findVictim(player))[5][0].summonerLevel <= 4) {
    pushBlockItem(player, uniqueCardID, 'monClass', 'DR', player, true);
    blockEffect(player, uniqueCardID, 'monType', 'FF', true, myResolve);
  } else {
    myResolve();
  }
}

// Mr.佐佐木
const cardEffectS046 = (player, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    helpPowerup(player, uniqueCardID, findMatArrays(player), '137', 'WW100FH150', effectResolve);  // 137 酒
  }).then(func => {
    ageistBlock(true, player, uniqueCardID, '', '', true, findMatArrays(findVictim(player))[5], 'F', '', '', myResolve);
  })
}

// 壺特
const cardEffectS047 = (player, uniqueCardID, myResolve) => {
  if (cardOnFieldCheck(findVictim(player), '166') === true) {
    pushBlockItem(player, uniqueCardID, 'pos', 'sky', player, true);
    pushBlockItem(player, uniqueCardID, 'pos', 'left', player, true);
    pushBlockItem(player, uniqueCardID, 'pos', 'right', player, true);
    setTimeout(() => inflictDmgStep1(player, myResolve), 10);
  } else {
    // if 166 is no longer on the foe's field, the block items need to be removed
    if (player === 'p1') {
      p1BlockedPos1 = p1BlockedPos1.filter(blocked => {
        if ((blocked.pos === 'sky' || blocked.pos === 'left' || blocked.pos === 'right') 
          && blocked.source === uniqueCardID && blocked.sourcePlayer === player && blocked.recoverable === true) {
          return false;
        } else {
          return true;
        }
      });
    } else {
      p2BlockedPos1 = p2BlockedPos1.filter(blocked => {
        if ((blocked.pos === 'sky' || blocked.pos === 'left' || blocked.pos === 'right') 
          && blocked.source === uniqueCardID && blocked.sourcePlayer === player && blocked.recoverable === true) {
          return false;
        } else {
          return true;
        }
      });
    }
    setTimeout(() => inflictDmgStep1(player, myResolve), 10);
  }
}

const cardEffectS048 = (player, uniqueCardID, myResolve) => {
  pushPowerUpHist(player, findVictim(player), uniqueCardID, 'XX000', true);
  shuffleBe4Draw.push(player);
  myResolve();
}

// 哥斯達
const cardEffectS049 = (player, uniqueCardID, foeSummonerArray, myResolve) => {
  new Promise(function(effectResolve) {
    if (foeSummonerArray[0].cardID !== 'S041') {
      blockEffect(player, uniqueCardID, 'pos', 'sky', true, effectResolve);
    } else {
      effectResolve();
    }
  }).then(func => {
    mojoLost(foeSummonerArray, 'F', true, '', '', player, uniqueCardID, 'monType', 'DR', true, myResolve);
  })
}

// 絲萊德
const cardEffectS050 = (player, uniqueCardID, foeSummonerArray, myResolve) => {
  if (foeSummonerArray[0].cardID === 'S034' || foeSummonerArray[0].cardID === 'S036') {  // S034 古龍, S036 摩袓魯
    pushPowerUpHist(player, player, uniqueCardID, 'XX000', true);
  } 
  myResolve();
}

// 小美麗
const cardEffectS053 = (player, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    ageistBlock(true, player, uniqueCardID, '', '', true, findMatArrays(findVictim(player))[5], 'M', '', '', effectResolve);
  }).then(func => {
    blockEffect(player, uniqueCardID, 'monClass', 'ML', true, myResolve);
  })
}

// 寶加袋
const cardEffectS055 = (player, uniqueCardID, myResolve) => {
  if (cardOnFieldCheck(player, '100') === true) {
    blockEffect(player, uniqueCardID, 'monType', 'SS', true, myResolve);
  } else {
    // if 100 is no longer on the foe's field, the block items need to be removed
    if (player === 'p1') {
      p2BlockedType1 = p2BlockedType1.filter(blocked => {
        if (blocked.monType === 'SS' && blocked.source === uniqueCardID && blocked.sourcePlayer === player && blocked.recoverable === true) {
          return false;
        } else {
          return true;
        }
      });
      p2BlockedClass1 = p2BlockedClass1.filter(blocked => {
        if (blocked.monClass === 'SH' && blocked.source === uniqueCardID && blocked.sourcePlayer === player && blocked.recoverable === true) {
          return false;
        } else {
          return true;
        }
      });
    } else {
      p1BlockedType1 = p1BlockedType1.filter(blocked => {
        if (blocked.monType === 'SS' && blocked.source === uniqueCardID && blocked.sourcePlayer === player && blocked.recoverable === true) {
          return false;
        } else {
          return true;
        }
      });
      p1BlockedClass1 = p1BlockedClass1.filter(blocked => {
        if (blocked.monClass === 'SH' && blocked.source === uniqueCardID && blocked.sourcePlayer === player && blocked.recoverable === true) {
          return false;
        } else {
          return true;
        }
      });
    }
    setTimeout(() => inflictDmgStep1(player, myResolve), 10);
  }
}

// 波尤
const cardEffectS056 = (matArrays, powerBracket, myResolve) => {
  // if the card at Help is UD or flushed away, then restore the power-up to OG
  if (matArrays[3].length === 0) {
    for (let i = 0; i < 3; i++) {powerBracket[i].allyPosHmPU = 1;}
    myResolve();
  } else if (matArrays[3][matArrays[3].length-1].upsideDown === true) {
    for (let i = 0; i < 3; i++) {powerBracket[i].allyPosHmPU = 1;}
    myResolve();
  } else if (matArrays[3][matArrays[3].length-1].upsideDown === false && matArrays[3][matArrays[3].length-1].cardID.includes('143') === true) {
    for (let i = 0; i < 3; i++) {powerBracket[i].allyPosHmPU = 10;}
    myResolve();
  } else {
    // if the card at Help is FU but not the allyCardID, nothing needs to be done, becoz that Help card may have other effects
    myResolve();
  }
}

// 哈基米基
const cardEffectS061 = (player, myResolve) => {
  if (findDeck(player).length === 0 || findHand(player).length > 6) {
    myResolve();
  } else {
    if (player === 'p1') {
      promptS061Effect(player, myResolve);
    } else {
      // ? AI wouldn't draw that card if the deck is thinner than 5
      if (findDeck(player).length < 5) {
        myResolve();
      } else {
        drawCard(player, 1);
        setTimeout(() => myResolve(), drawAniDur*1000+aniBuffer);
      }
    }
  }
}

// 保圖
const cardEffectS064 = (player, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    monFactorEffect('071', 10, findMatArrays(player), findPowerBracket(player), effectResolve);
  }).then(func => {
    blockEffect(player, uniqueCardID, 'monType', 'LL', true, myResolve);
  })
}

// 加菲爾
const cardEffectS071 = (player, uniqueCardID, myResolve) => {
  if (findMatArrays(findVictim(player))[5][0].summonerLevel >= 5) {
    pushBlockItem(findVictim(player), uniqueCardID, 'cardID', '170', player, true);
    pushBlockItem(findVictim(player), uniqueCardID, 'cardID', '171', player, true);
    pushPowerUpHist(player, player, uniqueCardID, 'XX000', true);
    pushBlockItem(player, uniqueCardID, 'monClass', 'DR', player, true);
    setTimeout(() => inflictDmgStep1(player, myResolve), 10);
  } else {
    myResolve();
  }
}

// 巴扎治
const cardEffectS072 = (player, uniqueCardID, myResolve) => {
  if (findMatArrays(findVictim(player))[5][0].summonerLevel >= 5) {
    pushPowerUpHist(player, findVictim(player), uniqueCardID, 'XX000', false);
    selfBlockEffect(player, uniqueCardID, 'cardID', '163', true, myResolve);
  } else {
    myResolve();
  }
}

// 弗：光之面具
const cardEffectS073G = (player, uniqueCardID, myResolve) => {
  if (findMatArrays(findVictim(player))[5][0].cardSeries !== 'gurifu') {
    pushBlockItem(findVictim(player), uniqueCardID, 'cardID', '418', player, true);  // 418 巴保露 is the only SP Lock of LL type
    blockEffect(player, uniqueCardID, 'monType', 'LL', true, myResolve);
  } else {
    myResolve();
  }
}

// 弗：黃金之面具
const cardEffectS073I = (player, uniqueCardID, myResolve) => {
  if (findMatArrays(findVictim(player))[5][0].cardSeries === 'kosumo') {
    pushBlockItem(findVictim(player), uniqueCardID, 'pos', 'sp', player, true);
  }
  if (findMatArrays(findVictim(player))[5][0].summonerType === 'KK') {
    pushBlockItem(player, uniqueCardID, 'monClass', 'DR', player, true);
  }
  setTimeout(() => inflictDmgStep1(player, myResolve), 10);
}

// 貝獸仙人
const cardEffectS074 = (player, uniqueCardID, myResolve) => {
  if (fuCardIDs.includes(findMatArrays(findVictim(player))[5][0].cardID) === false) {
    myResolve();
  } else {
    selfBlockEffect(player, uniqueCardID, 'monType', 'SS', true, myResolve);
  }
}

// 柏圖
const cardEffectS085 = (player, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    monFactorEffect('072', 10, findMatArrays(player), findPowerBracket(player), effectResolve);
  }).then(func => {
    personalAttack('雅圖', findMatArrays(findVictim(player))[5], false, player, uniqueCardID, 'pos', 'sky', false, myResolve);
  })
}

// 基拉達
const cardEffectS086 = (player, myResolve) => {
  new Promise(function(effectResolve) {
    monFactorEffect('038', 10, findMatArrays(player), findPowerBracket(player), effectResolve);  // 岩妖
  }).then(func => {
    monFactorEffect('041', 10, findMatArrays(player), findPowerBracket(player), myResolve);  // 泰坦
  })
}

// 嘉娜莉
const cardEffectS088 = (player, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    monFactorEffect('052', 10, findMatArrays(player), findPowerBracket(player), effectResolve);  // 鳥形蛇
  }).then(func => {
    ageistBlock(false, player, uniqueCardID, 'pos', 'sky', false, findMatArrays(findVictim(player))[5], 'M', 40, '', myResolve);
  })
}

// 古吉露
const cardEffectS091 = (foeSummonerArray, player, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    monFactorEffect('013', 10, findMatArrays(player), findPowerBracket(player), effectResolve);  // 爆炎王
  }).then(func => {
    if (foeSummonerArray[0].cardID === 'S039' || foeSummonerArray[0].cardID === 'S041') {  // S039 古迪拉 S041 古寶坦
      pushPowerUpHist(player, player, uniqueCardID, 'XX000', true);
    } 
    myResolve();
  })
}

// 柯斯特羅
const cardEffectS092 = (player, uniqueCardID, myResolve) => {
  if (findMatArrays(findVictim(player))[5][0].summonerType !== 'FF') {
    myResolve();
  } else {
    pushBlockItem(player, uniqueCardID, 'monPower', 200, player, true);
    for (let i = 40; i <= 110; i = i + 10) {pushBlockItem(player, uniqueCardID, 'monPower', i, player, true);}
    setTimeout(() => inflictDmgStep1(player, myResolve), 10);
  }
}

// 古列特拉圖
const cardEffectS095 = (player, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    personalAttack('巴扎治', findMatArrays(findVictim(player))[5], false, player, uniqueCardID, 'pos', 'sky', true, effectResolve);
  }).then(func => {
    mojoLost4Lv(findMatArrays(findVictim(player))[5], false, '', 4, player, uniqueCardID, 'monClass', 'DR', true, myResolve);
  })
}

// 洛磯思三世
const cardEffectS096 = (player, uniqueCardID, myResolve) => {
  if (findMatArrays(findVictim(player))[5][0].gender !== 'F') {
    myResolve();
  } else {
    allButOneTypeBlock('MM', player, uniqueCardID, player, true, myResolve);
  }
}

// 葛茲
const cardEffectS098 = (player, uniqueCardID, myResolve) => {
  if (findMatArrays(findVictim(player))[5][0].cardID !== 'S091') {  // 古吉露
    if (findMatArrays(findVictim(player))[5][0].gender !== 'F') {
      myResolve();
    } else {
      allButOneTypeBlock('FF', player, uniqueCardID, player, true, myResolve);
    }
  } else {
    new Promise(function(effectResolve) {
      if (player === 'p1') {
        p2Score += 8;
      } else {
        p1Score += 8;
      }
      resultMsg = findPlayerName(findVictim(player)) + ' 勝出，積分加 8 。'
      let msgtext = "對手是古吉露，葛茲即敗！";
      promptAddScoreMsg(msgtext, effectResolve);
    }).then(func => {
      promptResultMsg();  // ! promptResultMsg needs to handle (1) score > 50 and (2) queue.length === 0
      if (p1Score < 50 && p2Score < 50) {document.getElementById("playSummonersBut").disabled = false;}
    })
  }  
}

// 拉查洛
const cardEffectS099 = (player, uniqueCardID, myResolve) => {
  if (findMatArrays(findVictim(player))[5][0].cardName !== '美露迪') {
    if (findMatArrays(findVictim(player))[5][0].summonerType !== 'SS') {
      myResolve();
    } else {
      selfBlockEffect(player, uniqueCardID, 'monClass', 'DR', true, myResolve);
    }
  } else {
    new Promise(function(effectResolve) {
      if (player === 'p1') {
        p2Score += 8;
      } else {
        p1Score += 8;
      }
      resultMsg = findPlayerName(findVictim(player)) + ' 勝出，積分加 8 。'
      let msgtext = "對手是美露迪，拉查洛即敗！";
      promptAddScoreMsg(msgtext, effectResolve);
    }).then(func => {
      promptResultMsg();  // ! promptResultMsg needs to handle (1) score > 50 and (2) queue.length === 0
      if (p1Score < 50 && p2Score < 50) {document.getElementById("playSummonersBut").disabled = false;}
    })
  }  
}

// 布力奧
const cardEffectS105 = (player, uniqueCardID, myResolve) => {
  if (findMatArrays(findVictim(player))[5][0].summonerType !== 'SS') {
    myResolve();
  } else {
    selfBlockEffect(player, uniqueCardID, 'pos', 'sky', false, myResolve);
  }
}

// 布鈴鈴
const cardEffectS115 = (player, uniqueCardID, myResolve) => {
  if (findMatArrays(findVictim(player))[5][0].cardName !== '波尤') {
    myResolve();
  } else {
    pushBlockItem(player, uniqueCardID, 'monType', 'SS', player, false);
    pushBlockItem(player, uniqueCardID, 'cardID', '143', player, false);
    pushBlockItem(player, uniqueCardID, 'cardID', '924', player, false);
    pushBlockItem(player, uniqueCardID, 'cardID', 'M211', player, false);
    setTimeout(() => inflictDmgStep1(player, myResolve), 10);
  }
}

// 阿杜魯夫
const cardEffectS106 = (player, uniqueCardID, foeSummonerArray, myResolve) => {
  if (foeSummonerArray[0].cardName === '波尤' || foeSummonerArray[0].cardName === '巴布' || foeSummonerArray[0].cardName === '古比古比') {
    blockEffect(player, uniqueCardID, 'pos', 'help', false, myResolve);
  } else {
    myResolve();
  }
}

// 黑暗雷克斯
const cardEffectS108 = (player, uniqueCardID, foeSummonerArray, myResolve) => {
  if (foeSummonerArray[0].team !== 'madoushuu' && foeSummonerArray[0].cardID !== 'S072' && 
    foeSummonerArray[0].cardID !== 'S109' && foeSummonerArray[0].cardID !== 'MS109') {
    blockEffect(player, uniqueCardID, 'monClass', 'DR', true, myResolve);
  } else {
    myResolve();
  }
}

// 真巴扎治
const cardEffectS109 = (player, uniqueCardID, foeSummonerArray, myResolve) => {
  new Promise(function(effectResolve) {
    if (foeSummonerArray[0].summonerLevel >= 7) {pushBlockItem(player, uniqueCardID, 'monClass', 'SL', player, false);}
    effectResolve();
  }).then(func => {
    if (foeSummonerArray[0].cardName !== '古列特羅姆') {
      blockEffect(player, uniqueCardID, 'pos', 'sky', true, myResolve);
    } else {
      myResolve();
    }
  })
}

// 阿斯蒂娜
const cardEffectS500 = (foeSummonerArray, player, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    if (foeSummonerArray[0].ageKnown === true && foeSummonerArray[0].age <= 17) {
      allButOneTypeBlock('EE', player, uniqueCardID, player, true, effectResolve);
    } else {
      effectResolve();
    }
  }).then(func => {
    xenophobic('madoushuu', false, player, uniqueCardID, 'pos', 'help', false, foeSummonerArray, myResolve);
  })
  
}

const summonerAdjPU = (summonerAdjHist, i, adjValue, recoverability, myResolve) => {  // i = 0: allyFlatPU; i = 1: foeFlatPU
  summonerAdjHist[i].adjValue = adjValue;
  summonerAdjHist[i].recoverable = recoverability;
  myResolve();
}

const monLevelupEffect = (allyCardID, player, uniqueCardID, matArrays, myResolve) => {
  for (let i = 0; i < 3; i++) {
    if (matArrays[i].length > 0) {
      if (matArrays[i][matArrays[i].length-1].upsideDown === false && matArrays[i][matArrays[i].length-1].cardID === allyCardID) {
        updateLevelUpBracket(matArrays[i], player, findLevelUpBracket(player)[i], '', '', 100, '', uniqueCardID, true);
      }
    }
  }
  // run inflictDmgStep1() in case the level-up triggers effects
  setTimeout(() => inflictDmgStep1(player, myResolve), 10);
}

const allButOneTypeBlock = (thatType, victim, uniqueCardID, player, recoverability, myResolve) => {
  for (let i = 0; i < monTypes.length; i++) {
    if (monTypes[i] === thatType) {continue;}
    pushBlockItem(victim, uniqueCardID, 'monType', monTypes[i], player, recoverability);
  }
  setTimeout(() => inflictDmgStep1(player, myResolve), 10);
}

const monFactorEffect = (allyCardID, powerUpFactor, matArrays, powerBracket, myResolve) => {
  for (let i = 0; i < 3; i++) {
    if (matArrays[i].length > 0) {
      if (matArrays[i][matArrays[i].length-1].upsideDown === false && matArrays[i][matArrays[i].length-1].cardID === allyCardID) {
        powerBracket[i].allyPosSummPU = powerUpFactor;
      }
    }
  }
  setTimeout(() => myResolve(), 10);
}

const shellEffect = (allyCardID, player, uniqueCardID, myResolve) => {
  if (cardOnFieldCheck(player, allyCardID) === true) {
    pushBlockItem(findVictim(player), uniqueCardID, 'pos', 'help', player, true);
    pushBlockItem(findVictim(player), uniqueCardID, 'pos', 'sp', player, true);
    findPowerBracket(player)[3].allyFlatPU = 100;
    setTimeout(() => inflictDmgStep1(player, myResolve), 10);
  } else {
    findPowerBracket(player)[3].allyFlatPU = 0;
    if (player === 'p1') {
      p2BlockedPos1 = p2BlockedPos1.filter(blocked => {
        if ((blocked.pos === 'help' || blocked.pos === 'sp') 
          && blocked.source === uniqueCardID && blocked.sourcePlayer === player && blocked.recoverable === true) {
          return false;
        } else {
          return true;
        }
      });
    } else {
      p1BlockedPos1 = p1BlockedPos1.filter(blocked => {
        if ((blocked.pos === 'help' || blocked.pos === 'sp')
          && blocked.source === uniqueCardID && blocked.sourcePlayer === player && blocked.recoverable === true) {
          return false;
        } else {
          return true;
        }
      });
    }
    setTimeout(() => inflictDmgStep1(player, myResolve), 10);
  }
}

const typistBlock = (thatType, powerUpVoid, player, uniqueCardID, blockMode, blockedItem, recoverability, myResolve) => {
  if (findMatArrays(findVictim(player))[5][0].summonerType === thatType) {
    if (powerUpVoid === true) {pushPowerUpHist(player, findVictim(player), uniqueCardID, 'XX000', true);}
    blockEffect(player, uniqueCardID, blockMode, blockedItem, recoverability, myResolve);
  } else {
    myResolve();
  }
}

const gettingExcited = (thatGender, thatType, thatTeam, thatSeries, player, uniqueCardID, powerUpString, myResolve) => {
  if (thatGender !== '' && findMatArrays(findVictim(player))[5][0].gender === thatGender) {
    pushPowerUpHist(player, player, uniqueCardID, powerUpString, true);
  } else if (thatType !== '' && findMatArrays(findVictim(player))[5][0].summonerType === thatType) {
    pushPowerUpHist(player, player, uniqueCardID, powerUpString, true);
  } else if (thatTeam !== '' && findMatArrays(findVictim(player))[5][0].team === thatTeam) {
    pushPowerUpHist(player, player, uniqueCardID, powerUpString, true);
  } else if (thatSeries !== '' && findMatArrays(findVictim(player))[5][0].cardSeries === thatSeries) {
    pushPowerUpHist(player, player, uniqueCardID, powerUpString, true);
  }
  myResolve();
}

const fuEffect = (player, uniqueCardID, myType, thatType, myResolve) => {
  pushBlockItem(findVictim(player), uniqueCardID, 'monType', myType, player, true);
  if (findMatArrays(findVictim(player))[5][0].summonerType === thatType) {
    pushPowerUpHist(player, player, uniqueCardID, 'XX000', true);  // see summonerPowerUp.js
    selfBlockEffect(player, uniqueCardID, 'monClass', 'DR', true, myResolve);
  } else {
    myResolve();
  }
}

const xenophobic = (hatedTeam, powerUpVoid, player, uniqueCardID, blockMode, blockedItem, recoverability, foeSummonerArray, myResolve) => {
  if (foeSummonerArray[0].team === hatedTeam) {
    if (powerUpVoid === true) {pushPowerUpHist(player, findVictim(player), uniqueCardID, 'XX000', true);}
    blockEffect(player, uniqueCardID, blockMode, blockedItem, recoverability, myResolve);
  } else {
    myResolve();
  }
}

const ageistBlock = (powerUpVoid, player, uniqueCardID, blockMode, blockedItem, recoverability, foeSummonerArray, attackedGender, minAge, maxAge, myResolve) => {
  if ((attackedGender !== '' && minAge !== '' && foeSummonerArray[0].gender === attackedGender && foeSummonerArray[0].ageKnown === true && foeSummonerArray[0].age >= minAge)
   || (attackedGender !== '' && maxAge !== '' && foeSummonerArray[0].gender === attackedGender && foeSummonerArray[0].ageKnown === true && foeSummonerArray[0].age <= maxAge)
   || (attackedGender !== '' && minAge === '' && maxAge === '' && foeSummonerArray[0].gender === attackedGender)
   || (attackedGender === '' && minAge !== '' && foeSummonerArray[0].ageKnown === true && foeSummonerArray[0].age >= minAge)
   || (attackedGender === '' && maxAge !== '' && foeSummonerArray[0].ageKnown === true && foeSummonerArray[0].age <= maxAge)) {
    if (powerUpVoid === true) {pushPowerUpHist(player, findVictim(player), uniqueCardID, 'XX000', true);}
    if (blockMode === '') {
      myResolve();  
    } else {
      blockEffect(player, uniqueCardID, blockMode, blockedItem, recoverability, myResolve);
    }
  } else {
    myResolve();
  }
}

// voiding power-up and/or blocking according to the foe's card name, which may appear in multiple series
const personalAttack = (thatCardName, foeSummonerArray, powerUpVoid, player, uniqueCardID, blockMode, blockedItem, recoverability, myResolve) => {
  if (foeSummonerArray[0].cardName === thatCardName) {
    if (powerUpVoid === true) {pushPowerUpHist(player, findVictim(player), uniqueCardID, 'XX000', true);}
    if (blockMode === '') {
      myResolve();  
    } else {
      blockEffect(player, uniqueCardID, blockMode, blockedItem, recoverability, myResolve);
    }
  } else {
    myResolve();
  }
}

const helpPowerup = (player, uniqueCardID, matArrays, allyCardID, powerUpString, myResolve) => {
  // if the card at Help is UD or flushed away, then restore the power-up to OG
  if (matArrays[3].length === 0) {
    removePowerUpHist(player, uniqueCardID, findPUHist(player));  // see summonerPowerUp.js
    myResolve();
  } else if (matArrays[3][matArrays[3].length-1].upsideDown === true) {
    removePowerUpHist(player, uniqueCardID, findPUHist(player));  // see summonerPowerUp.js
    myResolve();
  } else if (matArrays[3][matArrays[3].length-1].upsideDown === false && matArrays[3][matArrays[3].length-1].cardID.includes(allyCardID) === true) {
    pushPowerUpHist(player, player, uniqueCardID, powerUpString, true);  // see summonerPowerUp.js
    myResolve();
  } else {
    // if the card at Help is FU but not the allyCardID, nothing needs to be done, becoz that Help card may have other effects
    myResolve();
  }
}

// MY summoner's power-up is changed and/or gets blocked if the foe summoner has a particular cardID
const tooPersonal = (thatID, powerUpString, player, uniqueCardID, blockMode, blockedItem, recoverability, myResolve) => {
  if (findMatArrays(findVictim(player))[5][0].cardID.includes(thatID) === true) {
    if (powerUpString !== '') {pushPowerUpHist(player, player, uniqueCardID, powerUpString, true);}
    if (blockMode !== '') {
      selfBlockEffect(player, uniqueCardID, blockMode, blockedItem, recoverability, myResolve);
    } else {
      myResolve();
    }
  } else {
    myResolve();
  }
}

// MY summoner's power-up is voided and/or gets blocked if the foe summoner is of particular gender and/or age
const mojoLost = (foeSummonerArray, thatGender, powerUpVoid, minAge, maxAge, player, uniqueCardID, blockMode, blockedItem, recoverability, myResolve) => {
  if ((thatGender !== '' && minAge !== '' && foeSummonerArray[0].gender === thatGender && foeSummonerArray[0].ageKnown === true && foeSummonerArray[0].age >= minAge)
   || (thatGender !== '' && maxAge !== '' && foeSummonerArray[0].gender === thatGender && foeSummonerArray[0].ageKnown === true && foeSummonerArray[0].age <= maxAge)
   || (thatGender !== '' && minAge === '' && maxAge === '' && foeSummonerArray[0].gender === thatGender)
   || (thatGender === '' && minAge !== '' && foeSummonerArray[0].ageKnown === true && foeSummonerArray[0].age >= minAge)
   || (thatGender === '' && maxAge !== '' && foeSummonerArray[0].ageKnown === true && foeSummonerArray[0].age <= maxAge)) {
    if (powerUpVoid === true) {pushPowerUpHist(player, player, uniqueCardID, 'XX000', true);}
    if (blockMode !== '') {
      selfBlockEffect(player, uniqueCardID, blockMode, blockedItem, recoverability, myResolve);
    } else {
      myResolve();
    }
  } else {
    myResolve();
  }
}

// MY summoner's power-up is voided and/or gets blocked if the foe summoner is of certain level
const mojoLost4Lv = (foeSummonerArray, powerUpVoid, minLevel, maxLevel, player, uniqueCardID, blockMode, blockedItem, recoverability, myResolve) => {
  if ((minLevel !== '' && foeSummonerArray.summonerLevel >= minLevel) 
    || (maxLevel !== '' && foeSummonerArray.summonerLevel <= maxLevel)) {
    if (powerUpVoid === true) {pushPowerUpHist(player, player, uniqueCardID, 'XX000', true);}
    if (blockMode !== '') {
      selfBlockEffect(player, uniqueCardID, blockMode, blockedItem, recoverability, myResolve);
    } else {
      myResolve();
    }
  } else {
    myResolve();
  }
}