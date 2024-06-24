const dmgCheck = (player, playedPosition, checkedArray, dmgResolve) => {
  if (checkedArray.length > 0 && confirmFlag(player, playedPosition, 'RecoverableTier1') === true) {  // see utility.js for confirmFlag()
    const cardTypeChecked = checkedArray[checkedArray.length-1].cardType;
    // check if the card type is right
    if (((playedPosition === 'sky' || playedPosition === 'left' || playedPosition === 'right') && cardTypeChecked !== 'Mon') || 
      (playedPosition === 'help' && cardTypeChecked !== 'Help' && cardTypeChecked !== 'Help/SP') ||
      (playedPosition === 'sp' && cardTypeChecked !== 'SP' && cardTypeChecked !== 'Help/SP')) {
        console.log('something is wrong with RecoverableTier1')
        dmgResolve();
    } else {
      // use the monType/monClass/monPower from mat slot rather than from cardDB
      const cardIDChecked = checkedArray[checkedArray.length-1].cardID;
      const monTypeChecked = checkedArray[checkedArray.length-1].monType;
      const monClassChecked = checkedArray[checkedArray.length-1].monClass;
      const monPowerChecked = checkedArray[checkedArray.length-1].monPower;
      const cardOverrideChecked = checkedArray[checkedArray.length-1].override;
      const cardRestrictionChecked = checkedArray[checkedArray.length-1].playRestriction;
      // check if the card matches summoner's type (for S/L/R only) and meets play restriction
      if (((playedPosition === 'sky' || playedPosition === 'left' || playedPosition === 'right') && monTypeChecking(player, playedPosition, cardIDChecked, monTypeChecked) === true 
        && preconditionCheck(player, cardRestrictionChecked, cardIDChecked) === true) 
        || ((playedPosition === 'help' || playedPosition === 'sp') && preconditionCheck(player, cardRestrictionChecked, cardIDChecked) === true)) {
        // check if the card is under attack now and, if yes, protected by override/safehouse
        if (attackCheck(player, playedPosition, cardIDChecked, monClassChecked, monTypeChecked, monPowerChecked) === false 
          || (attackCheck(player, playedPosition, cardIDChecked, monClassChecked, monTypeChecked, monPowerChecked) === true && 
          (overrideAdjust(player, playedPosition, cardIDChecked, cardOverrideChecked) === true || armourCheck(player, cardIDChecked) === true))) {
          if (checkedArray[checkedArray.length-1].upsideDown === false) {
            // face-up => face-up
            console.log(cardIDChecked, ' remains FU');
            dmgResolve();
          } else {
            // upside-down => face-up
            UDtoFUprocedure(player, playedPosition, checkedArray, cardIDChecked, dmgResolve);
          }
        } else {
          if (checkedArray[checkedArray.length-1].upsideDown === false) {
            // face-up => upside-down (because of attack)
            FUtoUDprocedure(player, playedPosition, checkedArray, cardIDChecked, dmgResolve);
          } else {
            // upside-down => upside-down
            console.log(cardIDChecked, ' remains UD');
            dmgResolve();
          }
        }
      } else {
        if (checkedArray[checkedArray.length-1].upsideDown === false) {
          // face-up => upside-down (because type/precondition is no longer met)
          FUtoUDprocedure(player, playedPosition, checkedArray, cardIDChecked, dmgResolve);
        } else {
          // upside-down => upside-down
          console.log(cardIDChecked, ' remains UD');
          dmgResolve();
        }
      }
    }
  } else {
    console.log('The slot is empty or permanently UD');
    dmgResolve();
  }
}

const UDtoFUprocedure = (player, playedPosition, checkedArray, cardIDChecked, dmgResolve) => {
  console.log(cardIDChecked, ' changed from UD to FU');
  new Promise(function(checkResolve) {
    checkedArray[checkedArray.length-1].upsideDown = false;
    flipCardFU(player, playedPosition, cardIDChecked);
    setTimeout(() => checkResolve(), flipAniDur*1000);
  }).then(func => {
    renderMat(player, checkedArray, playedPosition);
    // pushPowerUp(player, checkedArray, playedPosition);
    new Promise(function(computeResolve) {
      computeTotalPower(computeResolve);
    }).then(func => {
      renderPowers();
      triggerEffects(player, cardIDChecked, checkedArray, dmgResolve, 'Special');  // cardPlayMode = 'Special' to avoid triggering 226's effect
    })            
  });
}

const FUtoUDprocedure = (player, playedPosition, checkedArray, cardIDChecked, dmgResolve) => {
  console.log(cardIDChecked, 'changes from FU to UD');
  new Promise(function(checkResolve) {
    flipCard(player, playedPosition, 1);  // tempoUD = 1, i.e., only temporarilly upside-down
    setTimeout(() => checkResolve(), flipAniDur*1000);
  }).then(func => {
    departureToDo(player, cardIDChecked, playedPosition, false);  // fullReverse = false
    new Promise(function(computeResolve) {
      computeTotalPower(computeResolve);
    }).then(func => {
      renderPowers();
      new Promise(function(sideResolve) {
        triggerSideEffects(player, cardIDChecked, checkedArray, sideResolve);
      }).then(func => {
        triggerEffects(player, cardIDChecked, checkedArray, dmgResolve, 'Upsidedown');  // added this here for Cont effect cards to check if their conditions remain fulfiled
      })
    })
  })
}

// check if a card is in safehouse
const armourCheck = (player, uniqueCardID) => {
  if (player === 'p1') {
    if (p1SafeHouse.includes(uniqueCardID)) {
      return true;
    } else {
      return false;
    }
  } else {
    if (p2SafeHouse.includes(uniqueCardID)) {
      return true;
    } else {
      return false;
    }
  }
}

const departureToDo = (player, cardIDChecked, playedPosition, fullReverse) => {
  reversePowerUpHist(player, cardIDChecked);  // see summonerPowerUp.js
  reverseLevelUpEffect(player, cardIDChecked, 'p1', p1LevelUpBracket);  // see levelUp.js
  reverseLevelUpEffect(player, cardIDChecked, 'p2', p2LevelUpBracket);
  reversePowerBracket(player, playedPosition, fullReverse);  // see calPower.js
  reverseBannedEffect(findBannedInTurn(player), playedPosition, cardIDChecked);  // once-per-turn Cont effect (e.g., 205's) should be un-banned
  reverseBlockLists(player, cardIDChecked);  // see blockListUpdate.js;
}

const reverseBannedEffect = (bannedEffectInTurn, playedPosition, cardIDChecked) => {
  if (bannedEffectInTurn === p1BannedEffectInTurn) {
    p1BannedEffectInTurn = p1BannedEffectInTurn.filter(banned => {
      if (banned.cardID === cardIDChecked && banned.sourcePos === playedPosition) {
        return false;
      } else {
        return true;
      }
    })
  } else {
    p2BannedEffectInTurn = p2BannedEffectInTurn.filter(banned => {
      if (banned.cardID === cardIDChecked && banned.sourcePos === playedPosition) {
        return false;
      } else {
        return true;
      }
    })
  }
}

const inflictDmgStep1 = (player, myResolve) => {
  applyPowerUpHist(p1PowerupHist, p1Summoner);  // see summonerPowerUp.js
  applyPowerUpHist(p2PowerupHist, p2Summoner);
  if (player === 'p1') {
    inflictDmgStep2(player, 'p2', p1MatArrays, p2MatArrays, myResolve);
  } else {
    inflictDmgStep2(player, 'p1', p2MatArrays, p1MatArrays, myResolve);
  }
}

const inflictDmgStep2 = (player, player2, myMatArrays, foeMatArrays, myResolve) => {
  let p2SkyPromise = new Promise(function(dmgResolve) {  // start with the foe's arrays because the dmg is most likely applied to them
    dmgCheck(player2, 'sky', foeMatArrays[0], dmgResolve);})
  p2SkyPromise.then(func => {
    let p2LeftPromise = new Promise(function(dmgResolve) {
      dmgCheck(player2, 'left', foeMatArrays[1], dmgResolve);})
    p2LeftPromise.then(func => {
      let p2RightPromise = new Promise(function(dmgResolve) {
        dmgCheck(player2, 'right', foeMatArrays[2], dmgResolve);})
      p2RightPromise.then(func => {
        let p2HelpPromise = new Promise(function(dmgResolve) {
          dmgCheck(player2, 'help', foeMatArrays[3], dmgResolve);})
        p2HelpPromise.then(func => {
          let p2SPPromise = new Promise(function(dmgResolve) {
            dmgCheck(player2, 'sp', foeMatArrays[4], dmgResolve);})
          p2SPPromise.then(func => {
            let p1SkyPromise = new Promise(function(dmgResolve) {
              dmgCheck(player, 'sky', myMatArrays[0], dmgResolve);})
            p1SkyPromise.then(func => {
              let p1LeftPromise = new Promise(function(dmgResolve) {
                dmgCheck(player, 'left', myMatArrays[1], dmgResolve);})
              p1LeftPromise.then(func => {
                let p1RightPromise = new Promise(function(dmgResolve) {
                  dmgCheck(player, 'right', myMatArrays[2], dmgResolve);})
                p1RightPromise.then(func => {
                  let p1HelpPromise = new Promise(function(dmgResolve) {
                    dmgCheck(player, 'help', myMatArrays[3], dmgResolve);})
                  p1HelpPromise.then(func => {
                    let p1SPPromise = new Promise(function(dmgResolve) {
                      dmgCheck(player, 'sp', myMatArrays[4], dmgResolve);})
                    p1SPPromise.then(func => {
                      myResolve();
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

/** 
applyLevelUp = (matArrays, levelUpBracket) => {
  for (let i = 0; i < 3; i++) {
    if (matArrays[i].length > 0) {
      if (levelUpBracket[i].source !== '') {
        matArrays[i][matArrays[i].length-1].monPower = levelUpBracket[i].monPower;
        if (levelUpBracket[i].monType !== '') {matArrays[i][matArrays[i].length-1].monType = levelUpBracket[i].monType;}
        if (levelUpBracket[i].monClass !== '') {matArrays[i][matArrays[i].length-1].monClass = levelUpBracket[i].monClass;}
        if (levelUpBracket[i].cardPic !== '') {matArrays[i][matArrays[i].length-1].cardPic = levelUpBracket[i].cardPic;}
      } else {
        matArrays[i][matArrays[i].length-1].monPower = matArrays[i][matArrays[i].length-1].monPowerOG;
        matArrays[i][matArrays[i].length-1].monType = matArrays[i][matArrays[i].length-1].monTypeOG;
        matArrays[i][matArrays[i].length-1].monClass = matArrays[i][matArrays[i].length-1].monClassOG;
        matArrays[i][matArrays[i].length-1].cardPic = matArrays[i][matArrays[i].length-1].cardPicOG;
      }
    }
  }
}
*/