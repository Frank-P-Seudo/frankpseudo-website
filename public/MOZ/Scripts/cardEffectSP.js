// 天之奇蹟
const miracleEffect = (player, myResolve) => {
  new Promise(function(miracleResolve) {
    if (player === 'p1') {
      miraclePurge(p1BlockedPos1);  // see blockListUpdate.js
      miraclePurge(p1BlockedType1);
      miraclePurge(p1BlockedPower1);
      miraclePurge(p1BlockedClass1);
      miraclePurge(p1BlockedCardID1);
      miraclePurge(p1SkyBlockedPower1);
      miraclePurge(p1LeftBlockedPower1);
      miraclePurge(p1RightBlockedPower1);
      miraclePurgePowerUpHist(p1PowerupHist);  // see summonerPowerUp.js
      for (let i = 0; i < 5; i++) {
        p2PowerBracket[i].absorbedPU = 0;
        if (i === 4) {miracleResolve();}
      }
    } else {
      miraclePurge(p2BlockedPos1);
      miraclePurge(p2BlockedType1);
      miraclePurge(p2BlockedPower1);
      miraclePurge(p2BlockedClass1);
      miraclePurge(p2BlockedCardID1);
      miraclePurge(p2SkyBlockedPower1);
      miraclePurge(p2LeftBlockedPower1);
      miraclePurge(p2RightBlockedPower1);
      miraclePurgePowerUpHist(p2PowerupHist);
      for (let i = 0; i < 5; i++) {
        p1PowerBracket[i].absorbedPU = 0;
        if (i === 4) {miracleResolve();}
      }
    }
  }).then(func => {
    inflictDmgStep1(player, myResolve);
  })
}

// 惡魔的劣行/鬼的劣行/銀河的侵略, i.e., voiding foe's summoner's ability, purging blocklists, nullifying power-ups and blocking help & sp
const nullEffect = (player, uniqueCardID, myResolve) => {
  new Promise(function(nullResolve) {
    reverseLevelUpEffect(player, null, 'p1', p1LevelUpBracket);  // see levelUp.js
    reverseLevelUpEffect(player, null, 'p2', p2LevelUpBracket);
    pushPowerUpHist(player, findVictim(player), uniqueCardID, 'XX000', true);  // see summonerPowerUp.js
    reverseSummonerAdj(findSummonerAdjHist(player), findSummonerAdjHist(findVictim(player)));
    nullPurge(findVictim(player));  // see blockListUpdate.js
    nullPurgePowerUpHist(findVictim(player));  // see summonerPowerUp.js
    pushBlockItem(findVictim(player), uniqueCardID, 'pos', 'help', player, true);
    pushBlockItem(findVictim(player), uniqueCardID, 'pos', 'sp', player, true);
    for (let i = 0; i < 6; i++) {
      if (findMatArrays(findVictim(player))[i].length > 0) {
        findMatArrays(findVictim(player))[i][findMatArrays(findVictim(player))[i].length-1].effectVoided = true;
      }
    }
    for (let i = 0; i < 5; i++) {
      nullPowerup(findPowerBracket(findVictim(player)), findPowerBracket(player), i); 
      if (i === 4) {nullResolve();} 
    }
  }).then(func => {
    inflictDmgStep1(player, myResolve);
  })
}

// reverse power adjustment made by summoner's effects
const reverseSummonerAdj = (mySummonerAdjHist, foeSummonerAdjHist) => {
  if (mySummonerAdjHist[1].recoverable === true) {
    mySummonerAdjHist[1].adjValue = 0;
  }
  if (foeSummonerAdjHist[0].recoverable === true) {
    foeSummonerAdjHist[0].adjValue = 0;
  }
}

// check if the foe plays a SP that voids exchange/grave effect, applicable to 交換 and 送還
const voidCheck = (player) => {
  if (findMatArrays(findVictim(player))[4].length === 0) {
    return false;
  } else if (findMatArrays(findVictim(player))[4][0].cardID === 'M222' || findMatArrays(findVictim(player))[4][0].cardID === 'M228') {
    return true;
  } else {
    return false;
  }
}

// 交換
const exchangeEffect = (player, uniqueCardID, myResolve) => {
  if (voidCheck(player) === true) {
    myResolve();
  } else {
    if (player === 'p1') {
      exchangeEffectP1(uniqueCardID, myResolve);
    } else {
      exchangeEffectP2(uniqueCardID, myResolve);
    }
  }
}

// p1 has a choice
const exchangeEffectP1 = (uniqueCardID, myResolve) => {
  new Promise(function(promptResolve) {
    turnClass = 'choiceEffect';  // turnClass may impact forfeitabilityCheck(), handCardDisplay() and matCardDisplay()
    matCardDisplay(p1SP);
    promptExchangeStep1(promptResolve);
  }).then(func => {
    selectTargetMenu(uniqueCardID, '', myResolve);  // no need to input viewedArray
  })
}

// ! AI logic to be enhanced; for now, don't put exchange cards into p2's deck
const exchangeEffectP2 = (uniqueCardID, myResolve) => {
  myResolve();
  /*
  let validTarget = [];
  if (uniqueCardID === '161' || uniqueCardID === '989' || uniqueCardID === 'M227' || uniqueCardID === 'N204') {
    for (let i = 0; i < 3; i++) {
      typeExchangeableCheck(uniqueCardID, playedPositions[i], p2MatArrays[i], myResolve);  // see conditionCheck.js
    }
  } else if (uniqueCardID === '162' || uniqueCardID === '524' || uniqueCardID === '958' || uniqueCardID === 'M230' || uniqueCardID === 'N205') {
    for (let i = 0; i < 3; i++) {
      blindExchangeableCheck(uniqueCardID, playedPositions[i], p2MatArrays[i], myResolve);  // see conditionCheck.js
    }
  }
  */
}

// exchanging cards between players, triggered by the player's choice
const exchangeEffectStep2 = (thief, victim, offeredPosition, offeredArray, obtainedPosition, obtainedArray, myResolve) => {
  let offeredCardID = offeredArray[offeredArray.length-1].cardID;
  let offeredCardUpsideDown = offeredArray[offeredArray.length-1].upsideDown;
  let obtainedCardID = obtainedArray[obtainedArray.length-1].cardID;
  let obtainedCardUpsideDown = obtainedArray[obtainedArray.length-1].upsideDown;
  // empty the arrays engaged in exchange
  new Promise(function(effectResolve) {
    exchangeAnimation(thief, victim, offeredPosition, obtainedPosition, offeredCardID, obtainedCardID, offeredCardUpsideDown, obtainedCardUpsideDown);
    departureToDo(thief, offeredCardID, offeredPosition, true);  // fullReverse = false; see applyDmg.js
    offeredArray.pop();
    departureToDo(victim, obtainedCardID, obtainedPosition, true);  // fullReverse = false; see applyDmg.js
    obtainedArray.pop();
    setTimeout(() => effectResolve(), exchangeAniDur*1000);
  }).then(func => {
    // push the exchanged cards into their new homes, re-compute the powers, NOT triggering effects yet, update the summoners' sides
    new Promise(function(effectResolve2) {
      exchangeAnimationReverse(thief, victim, offeredPosition, obtainedPosition);
      
      pushNewCard(offeredArray, offeredCardID, obtainedCardID, obtainedCardUpsideDown);
      if (obtainedCardUpsideDown === true) {
        updateRecoverableTier1(thief, offeredPosition, 0);
      } else {
        updateRecoverableTier1(thief, offeredPosition, 1);
        updateSummonerSide(thief, offeredPosition, obtainedCardID);
      }
      renderMat(thief, offeredArray, offeredPosition);

      pushNewCard(obtainedArray, obtainedCardID, offeredCardID, offeredCardUpsideDown);
      if (offeredCardUpsideDown === true) {
        updateRecoverableTier1(victim, obtainedPosition, 0);
      } else {
        updateRecoverableTier1(victim, obtainedPosition, 1);
        updateSummonerSide(victim, obtainedPosition, offeredCardID);
      }
      renderMat(victim, obtainedArray, obtainedPosition);

      computeTotalPower(effectResolve2);
    }).then(func => {
      renderPowers();
      // inflict dmg before triggering the exchanged cards' effects; preconditonCheck() is included there
      new Promise(function(effectResolve3) {
        triggerSideEffects(thief, offeredCardID, offeredArray, effectResolve3);  // trigger side effect of offered card
      }).then(func => {
        new Promise(function(effectResolve4) {
          triggerSideEffects(victim, obtainedCardID, obtainedArray, effectResolve4);  // trigger side effect of obtained card
        }).then(func => {
          new Promise(function(effectResolve5) {
            inflictDmgStep1(thief, effectResolve5);  
          }).then(func => {
            // the exchanged cards trigger effects; the order is based on player's speed
            if (p1Summoner[0].speed > p2Summoner[0].speed) {
              new Promise(function(effectResolve6) {          
                if (obtainedCardUpsideDown === true) {
                  cardPlayMode = 'Upsidedown';
                } else {
                  cardPlayMode = 'Special';
                }
                triggerEffects(thief, obtainedCardID, offeredArray, effectResolve6, cardPlayMode);
              }).then(func => {
                if (offeredCardUpsideDown === true) {
                  cardPlayMode = 'Upsidedown';
                } else {
                  cardPlayMode = 'Special';
                }
                triggerEffects(victim, offeredCardID, obtainedArray, myResolve, cardPlayMode);
              })
            } else {
              new Promise(function(effectResolve6) {          
                if (offeredCardUpsideDown === true) {
                  cardPlayMode = 'Upsidedown';
                } else {
                  cardPlayMode = 'Special';
                }
                triggerEffects(victim, offeredCardID, obtainedArray, effectResolve6, cardPlayMode);
              }).then(func => {
                if (obtainedCardUpsideDown === true) {
                  cardPlayMode = 'Upsidedown';
                } else {
                  cardPlayMode = 'Special';
                }
                triggerEffects(thief, obtainedCardID, offeredArray, myResolve, cardPlayMode);
              })
            } 
          })
        })         
      })
    })
  })
}

const updateSummonerSide = (player, playedPosition, monCardID) => {
  let newType;
  let newType2;
  cardDB.forEach(card => {
    if (card.cardID === monCardID) {
      newType = card.monType;
      newType2 = card.monType2;
    }
  })
  if (player === 'p1' && playedPosition === 'sky') {
    p1Summoner[0].skyType += newType + newType2;
  } else if (player === 'p1' && playedPosition === 'left') {
    p1Summoner[0].leftType += newType + newType2;
  } else if (player === 'p1' && playedPosition === 'right') {
    p1Summoner[0].rightType += newType + newType2;
  } else if (player === 'p2' && playedPosition === 'sky') {
    p2Summoner[0].skyType += newType + newType2;
  } else if (player === 'p2' && playedPosition === 'left') {
    p2Summoner[0].leftType += newType + newType2;
  } else if (player === 'p2' && playedPosition === 'right') {
    p2Summoner[0].rightType += newType + newType2;
  } 
}

const pushNewCard = (viewedCard, oldCardID, newCardID, newCardUD) => {
  cardDB.forEach(card => {
    if (card.cardID === newCardID) {
      viewedCard.push({
        cardID: card.cardID,
        cardIDOG: oldCardID,  // cardIDOG is used in discarding cards to custody (and hole), useful for cards that can transform; see turnControl.js
        cardType: card.cardType,
        monPower: card.monPower,  // monPower is used in calPower.js
        monType: card.monType,
        monClass: card.monClass,
        override: card.override,
        cardFunc: card.cardFunc,
        cardPic: card.cardPic,
        playRestriction: card.playRestriction,
        monPowerOG: card.monPower,
        monTypeOG: card.monType,
        monClassOG: card.monClass,
        cardPicOG: card.cardPic,
        upsideDown: newCardUD,  // inherit the foe's upsideDown
        effectVoided: false
      });
    }
  })
}

// 送還（押送墓地）
const monGraveEffect = (player, uniqueCardID, myResolve) => {
  if (voidCheck(player) === true) {
    myResolve();
  } else {
    if (player === 'p1') {
      monGraveEffectP1(uniqueCardID, myResolve);
    } else {
      monGraveEffectP2(uniqueCardID, myResolve);
    }
  }
}

// p1 has a choice
const monGraveEffectP1 = (uniqueCardID, myResolve) => {
  new Promise(function(promptResolve) {
    turnClass = 'choiceEffect';  // turnClass may impact forfeitabilityCheck(), handCardDisplay() and matCardDisplay()
    matCardDisplay(p1SP);
    promptGraveEffect(promptResolve);
  }).then(func => {
    selectTargetMenu(uniqueCardID, '', myResolve);  // no need to input viewedArray
  })
}

// ? AI logic to be enhanced; now p2 auto-selects the first valid target
const monGraveEffectP2 = (uniqueCardID, myResolve) => {
  let validTarget = [];
  new Promise(function(effectResolve) {
    for (let i = 0; i < 3; i++) {
      attackableCheck(uniqueCardID, '', 'p1', playedPositions[i], p1MatArrays[i], myResolve, validTarget);  // see conditionCheck.js
      if (i === 2) {effectResolve();}
    }
  }).then(func => {
    if (validTarget.length === 0) {
      myResolve();
    } else {
      if (validTarget[0] === 'sky') {
        graveEffectStep2('p1', validTarget[0], p1Sky, p1Hole, myResolve);
      } else if (validTarget[0] === 'left') {
        graveEffectStep2('p1', validTarget[0], p1Left, p1Hole, myResolve);
      } else {
        graveEffectStep2('p1', validTarget[0], p1Right, p1Hole, myResolve);
      }
    }
  })
}

// sending card straight to hole, triggered by the player's choice or directly by a card
const graveEffectStep2 = (player2, attackedPosition, attackedArray, p2HoleArray, myResolve) => {  
  const attackedCardID = attackedArray[attackedArray.length-1].cardID;
  new Promise(function(effectResolve) {
    flushAnimation(player2, attackedPosition); 
    p2HoleArray.push({  // this push can be done anytime before renderMat(player2, p2HoleArray, 'hole');
      cardID: attackedCardID,
      cardPic: attackedArray[attackedArray.length-1].cardPicOG
    });
    setTimeout(() => effectResolve(), flushAniDur*1000);
  }).then(func => {
    new Promise(function(effectResolve2) {  // use a promise to ensure pop doesn't precede the above functions
      attackedArray.pop();
      setTimeout(() =>  effectResolve2(), 1);
    }).then(func => {
      new Promise(function(effectResolve3) {  // use a promise to ensure this step is done before rendering
        if (attackedArray.length > 0) {  // if the attacked card has Ch/R cards beneath it, they are turned UD
          attackedArray[attackedArray.length-1].upsideDown = true;
          updateRecoverableTier1(player2, attackedPosition, 0);
        } else {
          updateOccupiedFlag(player2, attackedPosition, false);
        }
        setTimeout(() =>  effectResolve3(), 1);
      }).then(func => {
        new Promise(function(effectResolve4) {
          flushAnimationReverse(player2, attackedPosition);
          renderMat(player2, p2HoleArray, 'hole');
          renderMat(player2, attackedArray, attackedPosition);
          departureToDo(player2, attackedCardID, attackedPosition, true);  // fullReverse = false; see applyDmg.js
          setTimeout(() => effectResolve4(), transAniDur*1000);  // reminder: departureToDo may trigger animation, so it must be AFTER flushAnimationReverse() and renderMat()
        }).then(func => {
          new Promise(function(effectResolve5) {
            triggerSideEffects(player2, attackedCardID, attackedArray, effectResolve5);  // trigger side effect of attacked card
          }).then(func => {
            new Promise(function(effectResolve6) {
              inflictDmgStep1(findVictim(player2), effectResolve6);  // let player trigger inflictDmgStep1()
            }).then(func => {
              // '000' is a dummy cardID, just to give Cont cards a chance to trigger their effects
              triggerEffects(player2, '000', attackedArray, myResolve, 'upsideDown');
            })
          })
        })
      })
    })
  })
}

// 送還（help押送墓地）
const helpGraveEffect = (player, myResolve) => {
  if (voidCheck(player) === true) {
    myResolve();
  } else {
    const cardIDChecked = findMatArrays(findVictim(player))[3][findMatArrays(findVictim(player))[3].length-1].cardID;
    const cardOverrideChecked = findMatArrays(findVictim(player))[3][findMatArrays(findVictim(player))[3].length-1].override;
    if (overrideAdjust(findVictim(player), 'help', cardIDChecked, cardOverrideChecked, true) === true 
      || armourCheck(findVictim(player), cardIDChecked) === true) {
      myResolve();
    } else {
      graveEffectStep2(findVictim(player), 'help', findMatArrays(findVictim(player))[3], findMatArrays(findVictim(player))[6], myResolve); 
    }
  }
}

// 惡魔的天秤
const balanceEffect = (player, flatAdj, myResolve) => {
  if (player === 'p1') {
    p2PowerAdj = flatAdj;
  } else {
    p1PowerAdj = flatAdj;
  }
  new Promise(function(effectResolve) {
    computeTotalPower(effectResolve);
  }).then(func => {
    renderPowers();
    myResolve();
  })
}

// 大打擊
const hammerEffect = (player, myResolve) => {
  hitByHammer.push(findVictim(player));
  myResolve();
}

// 擊破颱風咒語 and	旋風卷軸
const typhoonBreakerEffect = (player, uniqueCardID, myResolve) => {
  let comboRank;
  if (player === 'p1') {
    comboRank = parseInt(identifyCombo('p2').substring(0,2));
    if (comboRank === 12 || comboRank === 19) {
      blockEffect(player, uniqueCardID, 'pos', 'help', true, myResolve)  // player, uniqueCardID, blockMode, blockedItem, recoverability
    } else {
      myResolve();
    }
  } else {
    comboRank = parseInt(identifyCombo('p1').substring(0,2));
    if (comboRank === 12 || comboRank === 19) {
      blockEffect(player, uniqueCardID, 'pos', 'help', true, myResolve)  // player, uniqueCardID, blockMode, blockedItem, recoverability
    } else {
      myResolve();
    }
  }
}