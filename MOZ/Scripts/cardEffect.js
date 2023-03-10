// most commonly used effect - blockMode = 'cardID' or 'monClass' or 'monType' or 'monPower' or 'pos'
const blockEffect = (player, uniqueCardID, blockMode, blockedItem, recoverability, myResolve) => {
  pushBlockItem(findVictim(player), uniqueCardID, blockMode, blockedItem, player, recoverability);  // see blockListUpdate.js
  setTimeout(() => inflictDmgStep1(player, myResolve), 10);
}

const selfBlockEffect = (player, uniqueCardID, blockMode, blockedItem, recoverability, myResolve) => {
  pushBlockItem(player, uniqueCardID, blockMode, blockedItem, player, recoverability);  // see blockListUpdate.js
  setTimeout(() => inflictDmgStep1(player, myResolve), 10);
}

// block effect applicable to a few cards, NOT ending with inflictDmgStep1()
const comboBlockEffect = (player, uniqueCardID, blockMode, blockedPos, blockedPower, includeZero, recoverability) => {
  if (player === 'p1') {
    // 	小封截人, 嘉達（男）, 停止之小魔人
    if (blockedPos === 'sky' && blockMode === 'max') {
      fillBlockedPower(player, p2SkyBlockedPower1, -200, uniqueCardID, recoverability);
      fillBlockedPower(player, p2SkyBlockedPower1, -100, uniqueCardID, recoverability);
      for (let i = 1; i < 10; i++) {fillBlockedPower(player, p2SkyBlockedPower1, i, uniqueCardID, recoverability)};
      for (let i = 10; i <= blockedPower; i = i + 10) {fillBlockedPower(player, p2SkyBlockedPower1, i, uniqueCardID, recoverability)};
    } else if (blockedPos === 'left' && blockMode === 'max') {
      fillBlockedPower(player, p2LeftBlockedPower1, -200, uniqueCardID, recoverability);
      fillBlockedPower(player, p2LeftBlockedPower1, -100, uniqueCardID, recoverability);
      for (let i = 1; i < 10; i++) {fillBlockedPower(player, p2LeftBlockedPower1, i, uniqueCardID, recoverability)};
      for (let i = 10; i <= blockedPower; i = i + 10) {fillBlockedPower(player, p2LeftBlockedPower1, i, uniqueCardID, recoverability)};
    } else if (blockedPos === 'right' && blockMode === 'max') {
      fillBlockedPower(player, p2RightBlockedPower1, -200, uniqueCardID, recoverability);
      fillBlockedPower(player, p2RightBlockedPower1, -100, uniqueCardID, recoverability);
      for (let i = 1; i < 10; i++) {fillBlockedPower(player, p2RightBlockedPower1, i, uniqueCardID, recoverability)};
      for (let i = 10; i <= blockedPower; i = i + 10) {fillBlockedPower(player, p2RightBlockedPower1, i, uniqueCardID, recoverability)};
    // 	封截人, 嘉達（女）, 銀河之障壁（2）, 停止之魔人
    } else if (blockedPos === 'sky' && blockMode === 'min') {
      for (let i = blockedPower; i <= 110; i = i + 10) {fillBlockedPower(player, p2SkyBlockedPower1, i, uniqueCardID, recoverability)};
      fillBlockedPower(player, p2SkyBlockedPower1, 200, uniqueCardID, recoverability);
      if (includeZero === true) {fillBlockedPower(player, p2SkyBlockedPower1, 0, uniqueCardID, recoverability)};
    } else if (blockedPos === 'left' && blockMode === 'min') {
      for (let i = blockedPower; i <= 110; i = i + 10) {fillBlockedPower(player, p2LeftBlockedPower1, i, uniqueCardID, recoverability)};
      fillBlockedPower(player, p2LeftBlockedPower1, 200, uniqueCardID, recoverability);
      if (includeZero === true) {fillBlockedPower(player, p2LeftBlockedPower1, 0, uniqueCardID, recoverability)};
    } else if (blockedPos === 'right' && blockMode === 'min') {
      for (let i = blockedPower; i <= 110; i = i + 10) {fillBlockedPower(player, p2RightBlockedPower1, i, uniqueCardID, recoverability)};
      fillBlockedPower(player, p2RightBlockedPower1, 200, uniqueCardID, recoverability);
      if (includeZero === true) {fillBlockedPower(player, p2RightBlockedPower1, 0, uniqueCardID, recoverability)};
    }
  } else {
    // 	小封截人, 嘉達（男）, 停止之小魔人
    if (blockedPos === 'sky' && blockMode === 'max') {
      fillBlockedPower(player, p1SkyBlockedPower1, -200, uniqueCardID, recoverability);
      fillBlockedPower(player, p1SkyBlockedPower1, -100, uniqueCardID, recoverability);
      for (let i = 1; i < 10; i++) {fillBlockedPower(player, p1SkyBlockedPower1, i, uniqueCardID, recoverability)};
      for (let i = 10; i <= blockedPower; i = i + 10) {fillBlockedPower(player, p1SkyBlockedPower1, i, uniqueCardID, recoverability)};
    } else if (blockedPos === 'left' && blockMode === 'max') {
      fillBlockedPower(player, p1LeftBlockedPower1, -200, uniqueCardID, recoverability);
      fillBlockedPower(player, p1LeftBlockedPower1, -100, uniqueCardID, recoverability);
      for (let i = 1; i < 10; i++) {fillBlockedPower(player, p1LeftBlockedPower1, i, uniqueCardID, recoverability)};
      for (let i = 10; i <= blockedPower; i = i + 10) {fillBlockedPower(player, p1LeftBlockedPower1, i, uniqueCardID, recoverability)};
    } else if (blockedPos === 'right' && blockMode === 'max') {
      fillBlockedPower(player, p1RightBlockedPower1, -200, uniqueCardID, recoverability);
      fillBlockedPower(player, p1RightBlockedPower1, -100, uniqueCardID, recoverability);
      for (let i = 1; i < 10; i++) {fillBlockedPower(player, p1RightBlockedPower1, i, uniqueCardID, recoverability)};
      for (let i = 10; i <= blockedPower; i = i + 10) {fillBlockedPower(player, p1RightBlockedPower1, i, uniqueCardID, recoverability)};
    // 	封截人, 嘉達（女）, 銀河之障壁（2）, 停止之魔人
    } else if (blockedPos === 'sky' && blockMode === 'min') {
      for (let i = blockedPower; i <= 110; i = i + 10) {fillBlockedPower(player, p1SkyBlockedPower1, i, uniqueCardID, recoverability)};
      fillBlockedPower(player, p1SkyBlockedPower1, 200, uniqueCardID, recoverability);
      if (includeZero === true) {fillBlockedPower(player, p1SkyBlockedPower1, 0, uniqueCardID, recoverability)};
    } else if (blockedPos === 'left' && blockMode === 'min') {
      for (let i = blockedPower; i <= 110; i = i + 10) {fillBlockedPower(player, p1LeftBlockedPower1, i, uniqueCardID, recoverability)};
      fillBlockedPower(player, p1LeftBlockedPower1, 200, uniqueCardID, recoverability);
      if (includeZero === true) {fillBlockedPower(player, p1LeftBlockedPower1, 0, uniqueCardID, recoverability)};
    } else if (blockedPos === 'right' && blockMode === 'min') {
      for (let i = blockedPower; i <= 110; i = i + 10) {fillBlockedPower(player, p1RightBlockedPower1, i, uniqueCardID, recoverability)};
      fillBlockedPower(player, p1RightBlockedPower1, 200, uniqueCardID, recoverability);
      if (includeZero === true) {fillBlockedPower(player, p1RightBlockedPower1, 0, uniqueCardID, recoverability)};
    }
  }
}

const fillBlockedPower = (player, blockList, blockedPower, uniqueCardID, recoverability) => {
  blockList.push({
    monPower: blockedPower, 
    source: uniqueCardID, 
    sourcePlayer: player,
    recoverable: recoverability
  });
}

// 對手的[...]全部0化。（不能還原）(e.g., 封印之壺, 焰角獸); the condition is controlled through voidableCheck in conditionCheck.js
const irrecoverableBlockEffect = (player, uniqueCardID, victim, matArrays, myResolve) => {
  let validTarget = [];
  new Promise(function(effectResolve) {
    for (let i = 0; i < 3; i++) {
      voidableCheck(uniqueCardID, '', victim, playedPositions[i], matArrays[i], myResolve, validTarget);  // no need to input viewedArray
      if (i === 2) {effectResolve();}
    }
  }).then(func => {
      new Promise(function(effectResolve2) {
        for (let i = 0; i < 3; i++) {
          if (validTarget.includes(playedPositions[i]) === true) {
            pushBlockItem(victim, uniqueCardID, 'cardID', matArrays[i][matArrays[i].length-1].cardID, player, false);
            if (i === 2) {effectResolve2();}
          }
        }
      })
  }).then(func => {
    inflictDmgStep1(player, myResolve);
  })
}

// check if the mon's effect is voided because of exchange, applicable to lots of All mon
const voidedByExchange = (cardIDPlayed, viewedCard) => {
  let voidabilityFlag;
  cardDB.forEach(card => {
    if (card.cardID === cardIDPlayed) {
      voidabilityFlag = card.cardFunc
    }
  });
  if (voidabilityFlag === 'VoidedByEx') {
    if (viewedCard[viewedCard.length-1].cardID !== viewedCard[viewedCard.length-1].cardIDOG) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

const cardEffect = (player, uniqueCardID, viewedArray, myResolve, cardPlayMode) => {
  if (cardPlayMode === 'Upsidedown') {
    // side effects are not always written on the cards and are triggered when certain cards are turned UD
    triggerSideEffects(player, uniqueCardID, viewedArray, myResolve);
  } else if (uniqueCardID.substring(0,1) === 'S' || uniqueCardID.substring(0,2) === 'MS' || uniqueCardID.substring(0,2) === 'NS') {
      // summoner cards
      triggerSummonerEffecs(player, uniqueCardID, myResolve);
  } else {
    triggerCardEffects(player, uniqueCardID, viewedArray, myResolve, cardPlayMode);
  }
}    

const sumPromiseCheck = (player, checkedArray, myResolve) => {
  if (checkedArray[0].cardFunc === 'Cont' && checkedArray[0].effectVoided === false) {
    cardEffect(player, checkedArray[0].cardID, checkedArray, myResolve);
  } else {console.log('summoner either has no Cont effect or their effect voided'); myResolve()}
}

const promiseCheck = (player, viewedCard, checkedArray, myResolve) => {
  if (viewedCard !== checkedArray && checkedArray.length > 0) {
    if (checkedArray[checkedArray.length-1].upsideDown === false && checkedArray[checkedArray.length-1].cardFunc === 'Cont' 
      && checkedArray[checkedArray.length-1].effectVoided === false) {
      cardEffect(player, checkedArray[checkedArray.length-1].cardID, checkedArray, myResolve);
    } else {console.log('resolve 2'); myResolve()}
  } else {console.log('resolve 1'); myResolve()}
}

/* 
triggerEffectsStep2() starts with summoners because their effect take precedence. 
It then checks the foe's cards, because existing cards' cont effect (e.g., 205's auto-attack) should take precedence
*/
const triggerEffectsStep2 = (player, player2, viewedCard, myMatArrys, foeMatArrays, cardIDPlayed, myResolve, cardPlayMode) => {
  let p2SummonerPromise = new Promise(function(myResolve) {
    sumPromiseCheck(player2, foeMatArrays[5], myResolve);})
  p2SummonerPromise.then(func => {
    console.log(cardIDPlayed, ': p2SummonerPromise resolved');
    let p1SummonerPromise = new Promise(function(myResolve) {
      sumPromiseCheck(player, myMatArrys[5], myResolve);})
    p1SummonerPromise.then(func => {
      console.log(cardIDPlayed, ': p1SummonerPromise resolved');
      let p2SkyPromise = new Promise(function(myResolve) {
        promiseCheck(player2, viewedCard, foeMatArrays[0], myResolve);}) // don't include cardPlayMode, because 'upsidedown' would provide myResolve immediately at cardEffect()
      p2SkyPromise.then(func => {
        console.log(cardIDPlayed, ': p2SkyPromise resolved');
        let p2LeftPromise = new Promise(function(myResolve) {
          promiseCheck(player2, viewedCard, foeMatArrays[1], myResolve);})
        p2LeftPromise.then(func => {
          console.log(cardIDPlayed, ': p2LeftPromise resolved');
          let p2RightPromise = new Promise(function(myResolve) {
            promiseCheck(player2, viewedCard, foeMatArrays[2], myResolve);})
          p2RightPromise.then(func => {
            console.log(cardIDPlayed, ': p2RightPromise resolved');
            let p2HelpPromise = new Promise(function(myResolve) {
              promiseCheck(player2, viewedCard, foeMatArrays[3], myResolve);})
            p2HelpPromise.then(func => {
              console.log(cardIDPlayed, ': p2HelpPromise resolved');
              let p1SkyPromise = new Promise(function(myResolve) {
                promiseCheck(player, viewedCard, myMatArrys[0], myResolve);})  
              p1SkyPromise.then(func => {
                console.log(cardIDPlayed, ': p1SkyPromise resolved');
                let p1LeftPromise = new Promise(function(myResolve) {
                  promiseCheck(player, viewedCard, myMatArrys[1], myResolve);})
                p1LeftPromise.then(func => {
                  console.log(cardIDPlayed, ': p1LeftPromise resolved');
                  let p1RightPromise = new Promise(function(myResolve) {
                    promiseCheck(player, viewedCard, myMatArrys[2], myResolve);})
                  p1RightPromise.then(func => {
                    console.log(cardIDPlayed, ': p1RightPromise resolved');
                    let p1HelpPromise = new Promise(function(myResolve) {
                      promiseCheck(player, viewedCard, myMatArrys[3], myResolve);})
                    p1HelpPromise.then(func => {
                      console.log(cardIDPlayed, ': p1HelpPromise resolved');
                      let p2SPPromise = new Promise(function(myResolve) {
                        promiseCheck(player2, viewedCard, foeMatArrays[4], myResolve);})
                      p2SPPromise.then(func => {
                        console.log(cardIDPlayed, ': p2SPPromise resolved');
                        let p1SPPromise = new Promise(function(myResolve) {
                          promiseCheck(player, viewedCard, myMatArrys[4], myResolve);})
                        p1SPPromise.then(func => {
                          console.log(cardIDPlayed, ': p1SPPromise resolved');
                          if (voidedByExchange(cardIDPlayed, viewedCard) === true) {
                            myResolve();
                          } else {
                            if (viewedCard.length > 0) {  // viewedCard.length is 0 if triggerEffects() is called by 爆 or 送還
                              if (viewedCard[viewedCard.length-1].upsideDown === true) {cardPlayMode = 'Upsidedown';}  // need to do this because viewedCard may have been attacked before it can trigger its effect
                            }
                            cardEffect(player, cardIDPlayed, viewedCard, myResolve, cardPlayMode);  // need to include cardPlayMode for this, though
                          }
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
}

const triggerEffects = (player, cardIDPlayed, viewedCard, myResolve, cardPlayMode) => {
  if (player === 'p1') {
    triggerEffectsStep2(player, 'p2', viewedCard, p1MatArrays, p2MatArrays, cardIDPlayed, myResolve, cardPlayMode);
  } else {
    triggerEffectsStep2(player, 'p1', viewedCard, p2MatArrays, p1MatArrays, cardIDPlayed, myResolve, cardPlayMode);
  }
}