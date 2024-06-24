const removeHandCard = (player, cardIDPlayed) => {
  if (player === 'p1') {
    p1Hand = p1Hand.filter(card => {
      if (card.cardID === cardIDPlayed) {
        return false
      } else {return true}
    });
  } else {
    p2Hand = p2Hand.filter(card => {
      if (card.cardID === cardIDPlayed) {
        return false
      } else {return true}
    });
  }
}

const removeHoleCard = (cardIDPlayed, holeArray) => {
  let idx = holeArray.findIndex(card => card.cardID === cardIDPlayed);
  holeArray.splice(idx,1);
}

// update the Summoner array or Sky/Left/Right/Help/SP array when a card is played normally
const updateMatSlot = (player, cardIDPlayed, viewedCard, playedPosition) => {
  cardDB.forEach(card => {
    if (card.cardID === cardIDPlayed) {
      viewedCard.push({
        cardID: card.cardID,
        // cardIDOG is used in discarding cards to custody (and hole), useful for cards that can transform; see turnControl.js
        cardIDOG: card.cardID, 
        cardType: card.cardType,
        monPower: card.monPower,  // monPower is used in calPower.js
        monType: card.monType,
        monClass: card.monClass,
        override: card.override,
        cardFunc: card.cardFunc,
        cardPic: card.cardPic,
        playRestriction: card.playRestriction,
        // the OG values are used in restoring monPower, etc. when levelUp effect is voided
        monPowerOG: card.monPower,
        monTypeOG: card.monType,
        monClassOG: card.monClass,
        cardPicOG: card.cardPic,
        upsideDown: false,
        effectVoided: false
      });
      cardType = card.cardType;
    }
  })
  if (cardType === 'Ch' || cardType === 'R') {
    updateOccupiedFlag(player, playedPosition, false);
  } else {
    updateOccupiedFlag(player, playedPosition, true);
  }
}

// update the Sky/Left/Right/Help/SP array when a card is played upside-down
const updateMatSlotUD = (player, cardIDPlayed, viewedCard, playedPosition) => {
  cardDB.forEach(card => {
    if (card.cardID === cardIDPlayed) {
      viewedCard.push({
        cardID: card.cardID,
        cardIDOG: card.cardID, 
        cardType: card.cardType,
        monPower: card.monPower,
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
        upsideDown: true,
        effectVoided: false
      });
    }
  })
  updateOccupiedFlag(player, playedPosition, true);
}

// Update the relevant occupiedFlag; nothing happens if the playedPosition is SP
const updateOccupiedFlag = (player, playedPosition, occupiedStatus) => {
  if (player === 'p1' && playedPosition === 'sky') {
    p1SkyOccupied = occupiedStatus;
  } else if (player === 'p1' && playedPosition === 'left') {
    p1LeftOccupied = occupiedStatus;
  } else if (player === 'p1' && playedPosition === 'right') {
    p1RightOccupied = occupiedStatus;
  } else if (player === 'p1' && playedPosition === 'help') {
    p1HelpOccupied = occupiedStatus;
  } else if (player === 'p2' && playedPosition === 'sky') {
    p2SkyOccupied = occupiedStatus;
  } else if (player === 'p2' && playedPosition === 'left') {
    p2LeftOccupied = occupiedStatus;
  } else if (player === 'p2' && playedPosition === 'right') {
    p2RightOccupied = occupiedStatus;
  } else if (player === 'p2' && playedPosition === 'help') {
    p2HelpOccupied = occupiedStatus;
  }
}

/* 
Step 2 of playing a card normally:
  1. remove a card from hand
  2. render handcards
  3. update Sky/Left/Right/Help array
  4. update occupiedFlag
  5. render card on mat 
  6. render display panel

  8. add summoner's power-up to power bracket
  9. trigger card's effects
  10. compute total power

  12. render power
  13. SP turn check
  14. check if the turn is over
  15. switch turn if needed
*/
const playCardStep2 = (player, cardIDPlayed, viewedCard, playedPosition) => {
  new Promise(function(myResolve) {
    let animationType;
    let cardPlayMode = 'Normal';
    new Promise(function(playResolve) {
      if (viewedCard.length > 0) {if (viewedCard[viewedCard.length-1].cardType === 'R') {animationType = 'Revival'}};
      if (animationType === 'Revival') {
        revivalAnimation(player, cardIDPlayed, playedPosition);
        removeHoleCard(cardIDPlayed, findMatArrays(player)[6]);
      } else {
        playHandAnimation(player, cardIDPlayed, playedPosition, cardPlayMode);
      } 
      removeHandCard(player, cardIDPlayed);
      renderHand(player);
      updateMatSlot(player, cardIDPlayed, viewedCard, playedPosition);
      setTimeout(() => playResolve(), playAniDur*1000+aniBuffer);
    }).then(
      func => {
        if (animationType === 'Revival') {
          revivalAnimationReverse(player, playedPosition);
          renderMat(player, findMatArrays(player)[6], 'hole');
        } else {
          playHandAnimationReverse(player, playedPosition);
        }
        renderMat(player, viewedCard, playedPosition);
        matCardDisplay(viewedCard);
        new Promise(function(computeResolve) {
          computeTotalPower(computeResolve);
        }).then(func => {
          renderPowers();
          triggerEffects(player, cardIDPlayed, viewedCard, myResolve, cardPlayMode);
        })
      })
  }).then(func => {
    console.log('effect chain is revolved!!!')
    preTurnSwitch(player);
  })
}

const preTurnSwitch = (player) => {
  new Promise(function(computeResolve) {
    computeTotalPower(computeResolve);
  }).then(func => {
    renderPowers();
    turnSPcheck();
    turnSwitch(player);
  })
}

/* 
Step 1 of playing a card normally (not including SP):
  1. identify relevant array
  2. trigger step 2, which ends with turn switch
*/
const playSky = (player, cardIDPlayed) => {
  let playedPosition = 'sky';
  if (player === 'p1') {
    viewedCard = p1Sky;
  } else {viewedCard = p2Sky;}

  playCardStep2(player, cardIDPlayed, viewedCard, playedPosition);
}

const playLeft = (player, cardIDPlayed) => {
  let playedPosition = 'left';
  if (player === 'p1') {
    viewedCard = p1Left;
  } else {viewedCard = p2Left;}

  playCardStep2(player, cardIDPlayed, viewedCard, playedPosition);
}

const playRight = (player, cardIDPlayed) => {
  let playedPosition = 'right';
  if (player === 'p1') {
    viewedCard = p1Right;
  } else {viewedCard = p2Right;}

  playCardStep2(player, cardIDPlayed, viewedCard, playedPosition);
}

const playHelp = (player, cardIDPlayed) => {
  let playedPosition = 'help';
  if (player === 'p1') {
    viewedCard = p1Help;
  } else {
    viewedCard = p2Help;
  }

  playCardStep2(player, cardIDPlayed, viewedCard, playedPosition);
}

/*
Step 2 of playing a card upside-down.
  1. remove a card from hand
  2. render handcards
  3. update Sky/Left/Right/Help array
  4. update occupiedFlag
  5. render card on mat
  6. render display panel
  7. SP turn check
  8. check if the turn is over
  9. switch turn if needed
 */
const playCardUDStep2 = (player, cardIDPlayed, viewedCard, playedPosition, tempoUD) => {
  new Promise(function(myResolve) {
    let cardPlayMode = 'Upsidedown';
    updateRecoverableTier1(player, playedPosition, tempoUD);
    new Promise(function(playResolve) {
      playHandAnimation(player, cardIDPlayed, playedPosition, cardPlayMode);
      removeHandCard(player, cardIDPlayed);
      renderHand(player);
      updateMatSlotUD(player, cardIDPlayed, viewedCard, playedPosition);
      setTimeout(() => playResolve(), playAniDur*1000+aniBuffer);
    }).then(func => {
      playHandAnimationReverse(player, playedPosition);
      renderMat(player, viewedCard, playedPosition);
      if (player === 'p1') {matCardDisplay(viewedCard);}
      triggerEffects(player, cardIDPlayed, viewedCard, myResolve, cardPlayMode);
    })
  }).then(func => {
    console.log('effect chain is revolved!!')
      turnSPcheck();
      turnSwitch(player);
    })
}

/* 
Step 1 of playing a card upside-down: identify the card's position and the position's array.
  1. identify relevant array
  2. trigger step 2, which ends with turn switch

  Note: 
  tempoUD = 0 => permanently upside-down
  tempoUD = 1 => temporarily upside-down
*/ 
const playUDSky = (player, cardIDPlayed, tempoUD) => {
  let playedPosition = 'sky';
  if (player === 'p1') {
    viewedCard = p1Sky;
  } else {viewedCard = p2Sky;}

  playCardUDStep2(player, cardIDPlayed, viewedCard, playedPosition, tempoUD);
}

const playUDLeft = (player, cardIDPlayed, tempoUD) => {
  let playedPosition = 'left';
  if (player === 'p1') {
    viewedCard = p1Left;
  } else {viewedCard = p2Left;}

  playCardUDStep2(player, cardIDPlayed, viewedCard, playedPosition, tempoUD);
}

const playUDRight = (player, cardIDPlayed, tempoUD) => {
  let playedPosition = 'right';
  if (player === 'p1') {
    viewedCard = p1Right;
  } else {viewedCard = p2Right;}
  
  playCardUDStep2(player, cardIDPlayed, viewedCard, playedPosition, tempoUD);
}

const playUDHelp = (player, cardIDPlayed, tempoUD) => {
  let playedPosition = 'help';
  if (player === 'p1') {
    viewedCard = p1Help;
  } else {viewedCard = p2Help;}

  playCardUDStep2(player, cardIDPlayed, viewedCard, playedPosition, tempoUD);
}


/* 
Step 2 of playing SP card
  1. remove a card from hand
  2. render handcards
  3. update Sky/Left/Right/Help array
*/
const playSPCardStep2 = (player, cardIDPlayed, viewedCard, playedPosition) => {
  removeHandCard(player, cardIDPlayed);
  updateMatSlot(player, cardIDPlayed, viewedCard, playedPosition);
  declareSPdecision(player);
}

const playSP = (player, cardIDPlayed) => {
  let playedPosition = 'sp';
  if (player === 'p1') {
    viewedCard = p1SP;
  } else {viewedCard = p2SP;}

  playSPCardStep2(player, cardIDPlayed, viewedCard, playedPosition);
}

// A card is played as part of another card's effect, with no promise for turnover
const effectPlayCard = (player, cardIDPlayed, viewedCard, playedPosition, myResolve) => {
  let cardPlayMode = 'Special';  // inform certain card effect (e.g., 226) whether the effect can be triggered
  new Promise(function(playResolve) {
    playHandAnimation(player, cardIDPlayed, playedPosition, cardPlayMode);
    removeHandCard(player, cardIDPlayed);
    renderHand(player);
    updateMatSlot(player, cardIDPlayed, viewedCard, playedPosition);
    setTimeout(() => playResolve(), playAniDur*1000+aniBuffer);
  }).then(func => {
    playHandAnimationReverse(player, playedPosition);
    renderMat(player, viewedCard, playedPosition);
    matCardDisplay(viewedCard);
    // pushPowerUp(player, viewedCard, playedPosition);
    new Promise(function(computeResolve) {
      computeTotalPower(computeResolve);
    }).then(func => {
      renderPowers();
      triggerEffects(player, cardIDPlayed, viewedCard, myResolve, cardPlayMode);
    })
  })
}

const flipCardFU = (player, playedPosition, uniqueCardID) => {
  new Promise(function(flipResolve) {
    flipFUAnimation(player, playedPosition, uniqueCardID); 
    setTimeout(() => flipResolve(), flipAniDur*1000);
  }).then(func => {
    flipAnimationReverse(player, playedPosition);
    if (player === 'p1') {
      if (playedPosition === 'sky') {
        p1Sky[p1Sky.length-1].upsideDown = false; 
        renderMat(player, p1Sky, 'sky');
      } else if (playedPosition === 'left') {
        p1Left[p1Left.length-1].upsideDown = false; 
        renderMat(player, p1Left, 'left');
      } else if (playedPosition === 'right') {
        p1Right[p1Right.length-1].upsideDown = false; 
        renderMat(player, p1Right, 'right');
      } else if (playedPosition === 'help') {
        p1Help[p1Help.length-1].upsideDown = false; 
        renderMat(player, p1Help, 'help');
      } else {
        p1SP[p1SP.length-1].upsideDown = false; 
        renderMat(player, p1SP, 'sp');
      }
    } else {
      if (playedPosition === 'sky') {
        p2Sky[p2Sky.length-1].upsideDown = false; 
        renderMat(player, p2Sky, 'sky');
      } else if (playedPosition === 'left') {
        p2Left[p2Left.length-1].upsideDown = false; 
        renderMat(player, p2Left, 'left');
      } else if (playedPosition === 'right') {
        p2Right[p2Right.length-1].upsideDown = false; 
        renderMat(player, p2Right, 'right');
      } else if (playedPosition === 'help') {
        p2Help[p2Help.length-1].upsideDown = false; 
        renderMat(player, p2Help, 'help');
      } else {
        p2SP[p2SP.length-1].upsideDown = false; 
        renderMat(player, p2SP, 'sp');
      }
    }
  })
}

const flipCard = (player, playedPosition, tempoUD) => {
  new Promise(function(flipResolve) {
    flipAnimation(player, playedPosition); 
    setTimeout(() => flipResolve(), flipAniDur*1000);
  }).then(func => {
    flipAnimationReverse(player, playedPosition);
    if (player === 'p1') {
      if (playedPosition === 'sky') {
        p1Sky[p1Sky.length-1].upsideDown = true; 
        p1SkyOccupied = true;
        if (tempoUD === 0) {p1SkyRecoverableTier1 = false;}
        renderMat(player, p1Sky, 'sky');
      } else if (playedPosition === 'left') {
        p1Left[p1Left.length-1].upsideDown = true; 
        p1LeftOccupied = true;
        if (tempoUD === 0) {p1LeftRecoverableTier1 = false;}
        renderMat(player, p1Left, 'left');
      } else if (playedPosition === 'right') {
        p1Right[p1Right.length-1].upsideDown = true; 
        p1RightOccupied = true;
        if (tempoUD === 0) {p1RightRecoverableTier1 = false;}
        renderMat(player, p1Right, 'right');
      } else if (playedPosition === 'help') {
        p1Help[p1Help.length-1].upsideDown = true; 
        p1HelpOccupied = true;
        if (tempoUD === 0) {p1HelpRecoverableTier1 = false;}
        renderMat(player, p1Help, 'help');
      } else {
        p1SP[p1SP.length-1].upsideDown = true; 
        renderMat(player, p1SP, 'sp');
      }
    } else {
      if (playedPosition === 'sky') {
        p2Sky[p2Sky.length-1].upsideDown = true; 
        p2SkyOccupied = true;
        if (tempoUD === 0) {p2SkyRecoverableTier1 = false;}
        renderMat(player, p2Sky, 'sky');
      } else if (playedPosition === 'left') {
        p2Left[p2Left.length-1].upsideDown = true; 
        p2LeftOccupied = true;
        if (tempoUD === 0) {p2LeftRecoverableTier1 = false;}
        renderMat(player, p2Left, 'left');
      } else if (playedPosition === 'right') {
        p2Right[p2Right.length-1].upsideDown = true; 
        p2RightOccupied = true;
        if (tempoUD === 0) {p2RightRecoverableTier1 = false;}
        renderMat(player, p2Right, 'right');
      } else if (playedPosition === 'help') {
        p2Help[p2Help.length-1].upsideDown = true; 
        p2HelpOccupied = true;
        if (tempoUD === 0) {p2HelpRecoverableTier1 = false;}
        renderMat(player, p2Help, 'help');
      } else {
        p2SP[p2SP.length-1].upsideDown = true; 
        renderMat(player, p2SP, 'sp');
      }
    }
  })
}

const discardHandToHole = (player, hand, handCardIndexNum, holeArray) => {
  new Promise(function(resolve) {
    playHandAnimation(player, '000', 'hole', 'Upsidedown');  // '000' is a dummy cardID, which doesn't matter here
    let discardCardPic;
    cardDB.forEach(card => {
      if (card.cardID === hand[handCardIndexNum].cardID) {
        discardCardPic = card.cardPic;
      }
    })
    holeArray.push({
      cardID: hand[handCardIndexNum].cardID,
      cardPic: discardCardPic
    });
    hand.splice(handCardIndexNum, 1);
    renderHand(player);
    setTimeout(() => resolve(), playAniDur*1000);
  }).then(func => {
    playHandAnimationReverse(player, 'hole');
    renderMat(player, holeArray, 'hole');
  })
}