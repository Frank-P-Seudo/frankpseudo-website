/*
Switch turn
From p1 to p2:
  1. disable handcard buttons
  2. update recoverableTier
  3. disable p1's card drawing
  4. let p2 draw a card [for pvp, it should re-enable p2's card drawing]
  5. let p2 play [for pvp, it should re-enable p2's buttons on display panel]

From p2 to p1:
  1. update occupiedFlag for the playedPosition
  2. re-enable p1's card drawing
*/

const turnSwitch = (player) => {
  if (turnSP === false) {
    if (player === 'p1') {
      if (p2BannedEffectInTurnNR.filter(banned => banned.cardID === '139').length > 0 && p2ChangedSpeed === false) {
        let playedCards = [];
        countPlayedCards(playedCards);  // see utility.js
        if (playedCards[0] < 4) {
          p2ChangedSpeed = true;
          turnSwitchToP1();
        } else {
          turnSwitchToP2();
        }
      } else {
        turnSwitchToP2();
      }
    } else {
      if (p1BannedEffectInTurnNR.filter(banned => banned.cardID === '139').length > 0 && p1ChangedSpeed === false) {
        let playedCards = [];
        countPlayedCards(playedCards);  // see utility.js
        if (playedCards[1] < 4) {
          p1ChangedSpeed = true;
          turnSwitchToP2();
        } else {
          turnSwitchToP1();
        }
      } else {
        turnSwitchToP1();
      }
    }
  } else {
    // players enter SP turn
    document.querySelector('#drawCardp1But').disabled = true;
    promptSPturnMsg();
    if (p1Hand.length === 0) {
      declareSPdecision('p1');
    } else {
      renderHand('p1');
      handCardDisplay('p1', 0);
      p2PlaySP();
    }
  }
}

const turnSwitchToP2 = () => {
  disableP1PlayButtons();  // see utility.js 
  document.querySelector('#drawCardp1But').disabled = true;
  document.getElementById("p1ForfeitBut").disabled = true;
  turnClass = 'draw';
  currentTurn = 'p2';
  console.log('currentTurn:', currentTurn);
  forfeitabilityCheck('p2');
  if (p2Deck.length === 0) {
    drawCard('p2', 1);  // drawStep1() will provide promptDeckEndMsg and not proceed
  } else {
    new Promise(function(drawResolve) {
      drawCard('p2', 1);    
      setTimeout(() => drawResolve(), drawAniDur*1000+aniBuffer);
    }).then(func => {p2Play()});
  }
}

const turnSwitchToP1 = () => {
  document.querySelector('#drawCardp1But').disabled = false;
  turnClass = 'draw';
  currentTurn = 'p1';
  console.log('currentTurn:', currentTurn);
  forfeitabilityCheck('p1');
}

// Determine if it is SP turn yet.
const turnSPcheck = () => {
  if (p1Sky.length > 0 && p1Left.length > 0 && p1Right.length > 0 && p1Help.length > 0
  && p2Sky.length > 0 && p2Left.length > 0 && p2Right.length > 0 && p2Help.length > 0) {
    turnSP = true;
  } else {turnSP = false;}
};

// flush cards to Used and Custody/Hole, triggered by playSummoners.js
const clearMat = () => {
  summonerToUsed(p1Summoner, p1Used);
  summonerToUsed(p2Summoner, p2Used);

  cardsToCustody(p1MatArrays);
  cardsToCustody(p2MatArrays);

  if (drawGame === false) {
    arrayToHole(p1Custody, p1Hole);
    arrayToHole(p2Custody, p2Hole);
  };  
}

// Sending summoners to Used
const summonerToUsed = (summonerArray, usedArray) => {
  // need to check the array's length first because the summoner may have been out-gamed
  if (summonerArray.length > 0) {
    sCardDB.forEach(sCard => {
      if (sCard.cardID === summonerArray[0].cardID) {
        usedArray.push({
          cardName: sCard.cardName,
          cardID: sCard.cardID,
          cardType: sCard.cardType,
          summonerLevel: sCard.summonerLevel,
          cardSeries: sCard.cardSeries,
          cardPic: sCard.cardPic,
        })
      }
    });
    summonerArray.pop();
  }
}

// Sending non-summoner cards to Custody/Hole
const cardsToCustody = (matArrays) => {
  for (let j = 0; j < 5; j++) {
    for (let i = matArrays[j].length - 1; i >= 0; --i) {
      matArrays[7].push({
        cardID: matArrays[j][i].cardIDOG,
        cardPic: matArrays[j][i].cardPicOG
      });
      matArrays[j].pop();
    };
  }
}

const arrayToHole = (cardArray, holeArray) => {
  for (let i = cardArray.length - 1; i >= 0; --i) {
    holeArray.push({
      cardID: cardArray[i].cardID,
      cardPic: cardArray[i].cardPic
    });
    cardArray.pop();
  };
}

// reset flags and power brackets, triggered by playSummoners.js
const greatReset = () => {
  drawGame = false;
  winner = null;
  resultMsg = null;
  hitByHammer.length = 0;

  // reset parameters for p1
  p1Power = 0;
  p1PowerAdj = 0;

  p1SkyOccupied = false;
  p1LeftOccupied = false;
  p1RightOccupied = false;
  p1HelpOccupied = false;

  // ? to revisit whether we still need attacked flags and how Tier2 can be updated //
  if (p1SkyRecoverableTier2 === false) {
    p1SkyRecoverableTier1 = false;
    p1SkyAttacked = true;
  } else {
    p1SkyRecoverableTier1 = true;
    p1SkyAttacked = false;
  }

  if (p1LeftRecoverableTier2 === false) {
    p1LeftRecoverableTier1 = false;
    p1LeftAttacked = true;
  } else {
    p1LeftRecoverableTier1 = true;
    p1leftAttacked = false;
  }

  if (p1RightRecoverableTier2 === false) {
    p1RightRecoverableTier1 = false;
    p1RightAttacked = true;
  } else {
    p1RightRecoverableTier1 = true;
    p1RightAttacked = false;
  }

  if (p1HelpRecoverableTier2 === false) {
    p1HelpRecoverableTier1 = false;
    p1HelpAttacked = true;
  } else {
    p1HelpRecoverableTier1 = true;
    p1HelpAttacked = false;
  }

  if (p1SPRecoverableTier2 === false) {
    p1SPRecoverableTier1 = false;
    p1SPAttacked = true;
  } else {
    p1SPRecoverableTier1 = true;
    p1SPAttacked = false;
  }

  p1BannedEffectInTurn.length = 0;
  p1BannedEffectInTurnNR.length = 0;
  p1SafeHouse.length = 0;
  // remove all the TEMPORARILY blocked IDs/types/powers/classes/positions, and put the permanet ones inside
  p1BlockedPos1.length = 0;
  p1BlockedType1.length = 0;
  p1BlockedPower1.length = 0;
  p1BlockedClass1.length = 0;
  p1BlockedCardID1.length = 0;
  p1SkyBlockedPower1.length = 0;
  p1LeftBlockedPower1.length = 0;
  p1RightBlockedPower1.length = 0;
  
  for (let i = 0; i < p1BlockedPos2.length; i++) {
    p1BlockedPos1.splice(i,i, p1BlockedPos2[i]); 
  }
  for (let i = 0; i < p1BlockedType2.length; i++) {
    p1BlockedType1.splice(i,i, p1BlockedType2[i]); 
  }
  for (let i = 0; i < p1BlockedPower2.length; i++) {
    p1BlockedPower1.splice(i,i, p1BlockedPower2[i]); 
  }
  for (let i = 0; i < p1BlockedClass2.length; i++) {
    p1BlockedClass1.splice(i,i, p1BlockedClass2[i]); 
  }
  for (let i = 0; i < p1BlockedCardID2.length; i++) {
    p1BlockedCardID1.splice(i,i, p1BlockedCardID2[i]); 
  }

  p1ChangedSpeed = false;
  p1SPdecision = false;
  p1SummonerReady = false;
  resetBracket(p1PowerBracket, p1LevelUpBracket);
  p1PowerupHist.length = 0;
  
  // reset parameters for p2
  p2Power = 0;
  p2PowerAdj = 0;

  p2SkyOccupied = false;
  p2LeftOccupied = false;
  p2RightOccupied = false;
  p2HelpOccupied = false;

  // to revisit whether we still need attacked flags and how Tier2 can be updated //
  if (p2SkyRecoverableTier2 === false) {
    p2SkyRecoverableTier1 = false;
    p2SkyAttacked = true;
  } else {
    p2SkyRecoverableTier1 = true;
    p2SkyAttacked = false;
  }

  if (p2LeftRecoverableTier2 === false) {
    p2LeftRecoverableTier1 = false;
    p2LeftAttacked = true;
  } else {
    p2LeftRecoverableTier1 = true;
    p2leftAttacked = false;
  }

  if (p2RightRecoverableTier2 === false) {
    p2RightRecoverableTier1 = false;
    p2RightAttacked = true;
  } else {
    p2RightRecoverableTier1 = true;
    p2RightAttacked = false;
  }

  if (p2HelpRecoverableTier2 === false) {
    p2HelpRecoverableTier1 = false;
    p2HelpAttacked = true;
  } else {
    p2HelpRecoverableTier1 = true;
    p2HelpAttacked = false;
  }

  if (p2SPRecoverableTier2 === false) {
    p2SPRecoverableTier1 = false;
    p2SPAttacked = true;
  } else {
    p2SPRecoverableTier1 = true;
    p2SPAttacked = false;
  }

  p2BannedEffectInTurn.length = 0;
  p2BannedEffectInTurnNR.length = 0;
  p2SafeHouse.length = 0;
  // remove all the TEMPORARILY blocked IDs/types/powers/classes/positions
  p2BlockedPos1.length = 0;
  p2BlockedType1.length = 0;
  p2BlockedPower1.length = 0;
  p2BlockedClass1.length = 0;
  p2BlockedCardID1.length = 0;
  p2SkyBlockedPower1.length = 0;
  p2LeftBlockedPower1.length = 0;
  p2RightBlockedPower1.length = 0;
  
  for (let i = 0; i < p2BlockedPos2.length; i++) {
    p2BlockedPos1.splice(i,i, p2BlockedPos2[i]); 
  }
  for (let i = 0; i < p2BlockedType2.length; i++) {
    p2BlockedType1.splice(i,i, p2BlockedType2[i]); 
  }
  for (let i = 0; i < p2BlockedPower2.length; i++) {
    p2BlockedPower1.splice(i,i, p2BlockedPower2[i]); 
  }
  for (let i = 0; i < p2BlockedClass2.length; i++) {
    p2BlockedClass1.splice(i,i, p2BlockedClass2[i]); 
  }
  for (let i = 0; i < p2BlockedCardID2.length; i++) {
    p2BlockedCardID1.splice(i,i, p2BlockedCardID2[i]); 
  }

  p2ChangedSpeed = false;
  p2SPdecision = false;
  p2SummonerReady = false;
  resetBracket(p2PowerBracket, p2LevelUpBracket);
  p2PowerupHist.length = 0;
}

const resetBracket = (powerBracket, levelUpBracket) => {
  for (let i = 0; i < 3; i++) {
    powerBracket[i].OGP = 0;
    powerBracket[i].allyPosSumflatPU = 0;
    powerBracket[i].allyPosSummPU = 1;
    powerBracket[i].allyPos0flatPU = 0;
    powerBracket[i].allyPos0mPU = 1;
    powerBracket[i].allyPos1flatPU = 0;
    powerBracket[i].allyPos1mPU = 1;
    powerBracket[i].allyPos2flatPU = 0;
    powerBracket[i].allyPos2mPU = 1;
    powerBracket[i].allyPosHflatPU = 0;
    powerBracket[i].allyPosHmPU = 1;
    powerBracket[i].allyPosSPflatPU = 0;
    powerBracket[i].allyPosSPmPU = 1;
    powerBracket[i].foePosSumflatPU = 0;
    powerBracket[i].foePosSummPU = 1;
    powerBracket[i].foePos0flatPU = 0;
    powerBracket[i].foePos0mPU = 1;
    powerBracket[i].foePos1flatPU = 0;
    powerBracket[i].foePos1mPU = 1;
    powerBracket[i].foePos2flatPU = 0;
    powerBracket[i].foePos2mPU = 1;
    powerBracket[i].foePosHflatPU = 0;
    powerBracket[i].foePosHmPU = 1;
    powerBracket[i].foePosSPflatPU = 0;
    powerBracket[i].foePosSPmPU = 1;
    powerBracket[i].absorbedPU = 0;

    levelUpBracket[i].monPower = 0;
    levelUpBracket[i].monType = '';
    levelUpBracket[i].source = '';
    levelUpBracket[i].sourcePlayer = '';
    levelUpBracket[i].recoverable = true;
  }

  for (i = 3; i < 5; i++) {
    powerBracket[i].allyFlatPU = 0;
    powerBracket[i].foeFlatPU = 0;
    powerBracket[i].absorbedPU = 0
  }
  
  powerBracket[5].allyFlatPU = 0;
  powerBracket[5].foeFlatPU = 0;
}