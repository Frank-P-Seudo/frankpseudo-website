const playSummoners = () => {
  document.getElementById("playSummonersBut").disabled = true;
  if (turnClass === "pre-prep") {
    new Promise(function(resolve) {
      shuffleDeck('p1', p1Deck);
      shuffleDeck('p2', p2Deck);
      setTimeout(() => resolve(), (shuffleAniDur+0.125*7)*1000+aniBuffer);
    }).then(func => {
      new Promise(function(resolve) {
        drawCard('p1', 7);
        drawCard('p2', 7);
        setTimeout(() => resolve(), (drawAniDur+6*0.05)*1000+aniBuffer);
      }).then(func => {
        disableP1PlayButtons();  // see utility.js
        playSummoner('p1', p1Queue[p1Queue.length-1].cardID);
        playSummoner('p2', p2Queue[p2Queue.length-1].cardID);
      })
    })
  } else {
    turnClass = "prep";
    clearMat();  // see turnControl.js
    greatReset();  // see turnControl.js
    new Promise(function(cleanResolve) {
      rotateMatAnimation();
      setTimeout(() => cleanResolve(), rotateMatAniDur*250);
    }).then(func => {
      new Promise(function(readyResolve) {
        renderCleanMat();
        setTimeout(() => readyResolve(), rotateMatAniDur*750);
      }).then(func => {
        rotateMatAnimationReverse();
        if (p1Used.length > 0) {
          matCardDisplay(p1Used);  // p1Used's length could be 0 if the summoner was out-gamed
        } else {
          matCardDisplay(p1Queue);
        }
        renderPowers();
        playSummoner('p1', p1Queue[p1Queue.length-1].cardID);
        playSummoner('p2', p2Queue[p2Queue.length-1].cardID);
      })
    })
  }
}

const shuffleDeck = (player, deck) => {
  new Promise(function(shuffleResolve) {
    shuffleAnimation(player, 'zone', 8);
    setTimeout(() => shuffleResolve(), (shuffleAniDur+shuffleDelay*7)*1000+aniBuffer); 
  }).then(func => {
    removeAnimatedContainer(player, 'zone', 8);
    deck.forEach(card => {card.deckSeq = Math.random(9)});
    deck.sort(function(a, b){return a.deckSeq - b.deckSeq});
    for (let i = 0; i < deck.length; i++) {delete deck[i].deckSeq;}
  })
}

/* 
Step 1 of playing a summoner:
  1. identify relevant array
  2. trigger step 2, which ends with turn update
*/
const playSummoner = (player, cardIDPlayed) => {
  let playedPosition = 'summoner';
  if (player === 'p1') {
    viewedCard = p1Summoner;
  } else {
    viewedCard = p2Summoner;
  }
  playSCardStep2(player, cardIDPlayed, viewedCard, playedPosition);
}

/* 
Step 2 of playing a summoner:
  1. remove summoner from Queue array
  2. render queue
  3. update Summoner array
  4. render card on mat 
  5. render display panel

  7. trigger card effect
  8. render power
  9. SP turn check (to reset turnSP = false)
  10. declare Summoner's speed
*/
const playSCardStep2 = (player, cardIDPlayed, viewedCard, playedPosition) => {
  let cardPlayMode = 'Normal-Summoner';
  new Promise(function(playResolve) {
    removeQueueCard(player, cardIDPlayed);
    updateMatSlotSummoner(cardIDPlayed, viewedCard); 
    playHandAnimation(player, cardIDPlayed, playedPosition, cardPlayMode);
    setTimeout(() => playResolve(), playAniDur*1000+aniBuffer);
  }).then(func => {
    playHandAnimationReverse(player, playedPosition);
    if (player === 'p1') {
      renderMat(player, p1Queue, 'queue');  
    } else {
      renderMat(player, p2Queue, 'queue');  
    }
    renderMat(player, viewedCard, playedPosition);
    matCardDisplay(viewedCard);
    renderPowers();
    turnSPcheck();
    declareSpeed(player);
  })
}

const updateMatSlotSummoner = (cardIDPlayed, viewedCard) => {
  sCardDB.forEach(sCard => {
    if (sCard.cardID === cardIDPlayed) {
      viewedCard.push({
      cardID: sCard.cardID,
      cardName: sCard.cardName,
      cardType: sCard.cardType,
      summonerType: sCard.summonerType,
      summonerLevel: sCard.summonerLevel,
      gender: sCard.gender,
      ageKnown: sCard.ageKnown,
      age: sCard.age,
      team: sCard.team,
      speed: sCard.speed,
      skyType: sCard.skyType,
      leftType: sCard.leftType,
      rightType: sCard.rightType,
      powerUp: sCard.powerUp,
      cardFunc: sCard.cardFunc,
      cardPic: sCard.cardPic,
      cardSeries: sCard.cardSeries,
      upsideDown: false,
      effectVoided: false,  // if this is true, then the summoner's ability won't be triggered by cardEffect()
      powerupVoided: false,  // if this is true, then the summoner's powerup values won't be pushed to powerBrackets
      // [...]OG is used to restore summoner type and powerup
      skyTypeOG: sCard.skyType,
      leftTypeOG: sCard.leftType,
      rightTypeOG: sCard.rightType,
      powerUpOG: sCard.powerUp
      });
    }
  });
}

const declareSpeed = (player) => {
  if (player === 'p1') {
    p1SummonerReady = true;
  } else {
    p2SummonerReady = true;
  };
  // compare the speed of p1 and p2's summoners
  if (p1SummonerReady === true && p2SummonerReady === true) {
    turnClass = "draw";
    // to revisit if effectVoided needs to be checked
    new Promise(function(sumResolve) {
      if (p1Summoner[0].speed > p2Summoner[0].speed) {
        currentTurn = 'p1';
        new Promise(function(sumResolve2) {
          cardEffect('p1', p1Summoner[0].cardID, p1Summoner, sumResolve2); 
        }).then(func => {
          cardEffect('p2', p2Summoner[0].cardID, p2Summoner, sumResolve); 
        })
      } else if (p1Summoner[0].speed < p2Summoner[0].speed) {
        currentTurn = 'p2';
        new Promise(function(sumResolve2) {
          cardEffect('p2', p2Summoner[0].cardID, p2Summoner, sumResolve2); 
        }).then(func => {
          cardEffect('p1', p1Summoner[0].cardID, p1Summoner, sumResolve); 
        })
      } else {
        if (coinFlip() === true) {
          currentTurn = 'p1';
          p1Summoner[0].speed += 1;  // add one to the first player's speed for determining SP priority
          new Promise(function(sumResolve2) {
            cardEffect('p1', p1Summoner[0].cardID, p1Summoner, sumResolve2); 
          }).then(func => {
            cardEffect('p2', p2Summoner[0].cardID, p2Summoner, sumResolve); 
          })
        } else {
          currentTurn = 'p2';
          p2Summoner[0].speed += 1;
          new Promise(function(sumResolve2) {
            cardEffect('p2', p2Summoner[0].cardID, p2Summoner, sumResolve2); 
          }).then(func => {
            cardEffect('p1', p1Summoner[0].cardID, p1Summoner, sumResolve); 
          })
        }
      }
    }).then(func => {
      applyPowerUpHist(p1PowerupHist, p1Summoner);
      applyPowerUpHist(p2PowerupHist, p2Summoner);
      renderPowers();
      if (currentTurn === 'p1') {
        forfeitabilityCheck('p1');
        document.getElementById("drawCardp1But").disabled = false;
      } else {
        new Promise(function(drawResolve) {
          if (p2Deck.length === 0) {
            drawCard('p2', 1);
            console.log('p2 is defeated.');
          } else {
            drawCard('p2', 1);
            setTimeout(() => drawResolve(), drawAniDur*1000+aniBuffer);
          }
        }).then(func => {p2Play();})
      }
    })
  }
}

const removeQueueCard = (player, cardIDPlayed) => {
  if (player === 'p1') {
    p1Queue = p1Queue.filter(card => {
      if (card.cardID === cardIDPlayed) {
        return false
      } else {return true}
    });
  } else {
    p2Queue = p2Queue.filter(card => {
      if (card.cardID === cardIDPlayed) {
        return false
      } else {return true}
    });
  }
}