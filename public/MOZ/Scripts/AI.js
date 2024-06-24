getCardDetails = (hand, i) => {
  if (i > 0) {
    i = i - 1;
    cardDB.forEach(card => {
      if (card.cardID === hand[i].cardID) {
        hand[i].cardType = card.cardType;
        hand[i].monClass = card.monClass;
        hand[i].monType = card.monType;
        hand[i].monType2 = card.monType2;
        hand[i].monPower = card.monPower;
      }
    })
    getCardDetails(hand, i);
  }
}

assignPriority = (hand, i) => {
  if (i > 0) {
    i = i - 1;
    if (hand[i].cardType === 'SP') {
      hand[i].priority = -5000;
    } else if (hand[i].cardType === 'Help/SP' || hand[i].cardType === 'Help') {
      hand[i].priority = -1;
    } else if (hand[i].cardType === 'Ch' || hand[i].cardType === 'R') {
      hand[i].priority = -8;
    } else {
      hand[i].priority = hand[i].monPower;
    }
    assignPriority(hand, i);
  }
}

selectCard = (hand) => {
  let maxPriority = -Infinity;
  hand.forEach(card => {
    if (card.priority > maxPriority) {
      maxPriority = card.priority;
      cardIDtoSelect = card.cardID;
    }
  })
  console.log('p2 wants to play ', cardIDtoSelect);
}

/*
typeOnHandCheck = (cardIDtoSelect) => {
  console.log("Don't put ", cardIDtoSelect, " in p2's deck!!!")
  return typeOnHand = true;
}
*/

playableCheckStep2 = (cardIDtoSelect, playedPosition) => {
  // If the position is occupied, playability = false
  if (confirmFlag('p2', playedPosition, 'occupiedFlag') === true) {
    PlayableN = false;
  } else {
    // Retrieve card's details for checking. 
    cardDB.forEach(card => {
    if (card.cardID === cardIDtoSelect) {
      cardTypeChecked = card.cardType;
      cardOverrideChecked = card.override;
      cardRestrictionChecked = card.playRestriction;
      };
    });
    // If the card type is wrong, PlayableN = false, so SP card will always have PlayableN = false
    if (playedPosition === 'help' && cardTypeChecked !=='Help/SP' && cardTypeChecked !== 'Help') {
      PlayableN = false;
    } else if (playedPosition !== 'help' && cardTypeChecked !== 'Mon' && cardTypeChecked !== 'Ch' && cardTypeChecked !== 'R') {
      PlayableN = false;
    } else {
      // If it is a Ch card, check if relevant type is on hand
      if (cardTypeChecked === 'Ch' && cardOnHandCheckType('p2', cardIDtoSelect) === false) {
        PlayableN = false;
      // If it is a R/mon card, run a mon type check
      } else if ((cardTypeChecked === 'R' || cardTypeChecked === 'Mon') && monTypeChecking('p2', playedPosition, cardIDtoSelect, null) === false) {
          PlayableN = false;
      } else {
      // Check if precondition is met
        if (preconditionCheck('p2', cardRestrictionChecked, cardIDtoSelect) === false) {
          PlayableN = false;
        } else {
          // Check if the playedPosition is attacked
          if (attackCheck('p2', playedPosition, cardIDtoSelect, null, null, null) === false) {
            PlayableN = true;
          } else {
            // Check if override value requires adjustment.
            if (overrideAdjust('p2', playedPosition, cardIDtoSelect, cardOverrideChecked) === true) {
              PlayableN = true;
            } else {
              PlayableN = false;
            }
          }
        }
      }
    }
  }
}

// need to re-write such that the playable flag is updated one by one
playableCheck = (cardIDtoSelect) => {
  let playedPosition;
  playedPosition = 'sky';
  playableCheckStep2(cardIDtoSelect, playedPosition);
  skyPlayableN = PlayableN;

  playedPosition = 'left';
  playableCheckStep2(cardIDtoSelect, playedPosition);
  leftPlayableN = PlayableN;

  playedPosition = 'right';
  playableCheckStep2(cardIDtoSelect, playedPosition);
  rightPlayableN = PlayableN;

  playedPosition = 'help';
  playableCheckStep2(cardIDtoSelect, playedPosition);
  helpPlayableN = PlayableN;
}

/* 
p2 decides how a card is played (2nd round)
Rationale: 
  - Re-assign priority to prioritizing Ch and R cards and giving Help and Help/SP lower priority 
  - Play the card if the slot is not occupied.
*/
p2Decide2ndRound = (cardIDtoSelect) => {
  if (p2SkyOccupied === false) {
    playUDSky('p2', cardIDtoSelect, 0);
  } else if (p2LeftOccupied === false) {
    playUDLeft('p2', cardIDtoSelect, 0);
  } else if (p2RightOccupied === false) {
    playUDRight('p2', cardIDtoSelect, 0);
  } else if (p2HelpOccupied === false) {
    playUDHelp('p2', cardIDtoSelect, 0);
  } else {
    console.log('p2 did something wrong')
  }
} 

reAssignPriority = (hand) => {
  hand.forEach(card => {
    if (card.cardType === 'Help') {
      card.priority = -4000;
    } else if (card.cardType === 'Help/SP') {
      card.priority = -4500;
    } else if (card.cardType === 'Ch') {
      card.priority = 100;
    } else if (card.cardType === 'R') {
      card.priority = 90;
    }
  })
}

p2Decision2 = (hand) => {
  reAssignPriority(hand);
  selectCard(hand);
  p2Decide2ndRound(cardIDtoSelect);
}

/* 
p2 decides how a card is played (1st round)
Rationale: 
  - Select the card with the highest priority to play 
  - Play the card if the slot is available.
  - If the card with the highest priority cannot be played normally at all, re-assign priority according to card type
  - Re-select the card with the highest priority to play
*/
p2Decide1stRound = (hand, cardIDtoSelect) => {
  console.log('skyPlayableN', skyPlayableN, 'leftPlayableN', leftPlayableN, 'rightPlayableN', rightPlayableN, 'helpPlayableN', helpPlayableN)
  if (helpPlayableN === true) {
    playHelp('p2', cardIDtoSelect);
    p2Played = true;
  } else if (skyPlayableN === true) {
    playSky('p2', cardIDtoSelect);
    p2Played = true;
  } else if (leftPlayableN === true) {
    playLeft('p2', cardIDtoSelect);
    p2Played = true;
  } else if (rightPlayableN === true) {
    playRight('p2', cardIDtoSelect);
    p2Played = true;
  } else {
    p2Played = false;
    hand.forEach(card => {
      if (card.cardID === cardIDtoSelect) {
        if (card.cardType === 'Mon') {
          card.priority = card.priority * -1 - 10;
        } else {
          card.priority = card.priority -1;
        }
      }
    })
  }
} 

p2Decision1 = (hand, i) => {
  if (i > 0) {
    selectCard(hand);
    playableCheck(cardIDtoSelect);
    p2Decide1stRound(hand, cardIDtoSelect);
    if (p2Played === false) {  
      i = i - 1;
    } else {
      i = 0;
    }
    p2Decision1(hand, i);
  }
}

p2Play = () => {
  getCardDetails(p2Hand, p2Hand.length);
  assignPriority(p2Hand, p2Hand.length);
  p2Decision1(p2Hand, p2Hand.length);
  if (p2Played === false) {
    p2Decision2(p2Hand, p2Hand.length);
  }
}

// p2 decides if SP should be played
playableCheckSPStep2 = (cardIDtoSelect, playedPosition) => {
  // Retrieve card's details for checking. 
  cardDB.forEach(card => {
    if (card.cardID === cardIDtoSelect) {
      cardTypeChecked = card.cardType;
      cardOverrideChecked = card.override;
      cardRestrictionChecked = card.playRestriction;
      };
    });
  // If the card type is wrong, PlayableN = false, so SP card will always have PlayableN = false
  if (cardTypeChecked !=='Help/SP' && cardTypeChecked !== 'SP') {
      PlayableN = false;
  } else {
    if (preconditionCheck('p2', cardRestrictionChecked, cardIDtoSelect) === false) {
      PlayableN = false;
    } else {
      // Check if the playedPosition is attacked
      if (attackCheck('p2', playedPosition, cardIDtoSelect, null, null, null) === false) {
        PlayableN = true;
      } else {
        // Check if override value requires adjustment.
        if (overrideAdjust('p2', 'sp', cardIDtoSelect, cardOverrideChecked) === true) {
          PlayableN = true;
        } else {
          PlayableN = false;
        }
      }
    }
  }
}

playableCheckSP = (cardIDtoSelect) => {
  playableCheckSPStep2(cardIDtoSelect, 'sp');
  SPPlayableN = PlayableN;
}

reassignPrioritySP = (hand, i) => {
  if (i > 0) {
    i = i - 1;
    if (hand[i].cardType === 'SP') {
      hand[i].priority = 5000;
    } else if (hand[i].cardType === 'Help/SP') {
      hand[i].priority = 4500;
    } else {
      hand[i].priority = hand[i].monPower;
    }
    reassignPrioritySP(hand, i);
  }
}

p2DecideSPRound = (hand, cardIDtoSelect) => {
  if (SPPlayableN === true) {
    p2FoundSP = true;
  } else {
    p2FoundSP = false;
    hand.forEach(card => {
      if (card.cardID === cardIDtoSelect) {
          card.priority = card.priority - 7000;
      }
    })
  }
}

p2DecisionSP = (hand, i) => {
  if (i > 0) {
    selectCard(hand);
    playableCheckSP(cardIDtoSelect);
    p2DecideSPRound(hand, cardIDtoSelect);
    if (p2FoundSP === false) {  
      i = i - 1;
    } else {
      i = 0;
    }
    p2DecisionSP(hand, i);
  }
}

p2PlaySP = () => {
  reassignPrioritySP(p2Hand, p2Hand.length);
  p2DecisionSP(p2Hand, p2Hand.length);
  if (p2FoundSP === true) {
    playSP('p2', cardIDtoSelect);
  } else {
    declareSPdecision('p2');
  }
}