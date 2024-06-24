// R card effect, applicable to most (but not all!!!) R cards
const RcardEffect = (player, uniqueCardID, viewedArray, myResolve) => {
  let playedPosition = arrayToPosition(viewedArray);
  if (player === 'p1') {
    if (p1Hole.length === 0) {
      new Promise(function(flipResolve) {
        promptHoleEmpty();
        flipCard('p1', playedPosition, 0);  // tempoUD = 0, i.e., NOT temporarilly upside-down
        setTimeout(() => flipResolve(), flipAniDur*1000);
      }).then(
        func=> {myResolve()}
      )
    } else {
      turnClass = 'choiceEffect';  // turnClass may impact forfeitabilityCheck(), handCardDisplay() and matCardDisplay()
      forfeitabilityCheck('p1');
      document.getElementById("p1-mat-hole-button").disabled = false;
      renderHand('p1');
      matCardDisplay(p1Hole);
      RSummonMenu(player, playedPosition, uniqueCardID);
    }
  } else {
    // AI logic to be enhanced; tentatively the AI flips the R card immediately
    flipCard('p2', playedPosition, 0);  // tempoUD = 0, i.e., NOT temporarilly upside-down
    myResolve();
  }
}

// 696 effect can only be used once per game
const cardEffect696 = (player, uniqueCardID, viewedArray, myResolve) => {
  let playedPosition = arrayToPosition(viewedArray);
  if (player === 'p1') {
    if (p1BannedEffectInGame.filter(banned => banned.cardID === uniqueCardID).length > 0) {
      cardDB.forEach(card => {
        if (card.cardID === uniqueCardID) {
          displayedCardName = card.cardName;
        }
      })
      promptEffectUsed(displayedCardName);
      flipCard(player, playedPosition, 0);
      setTimeout(() => myResolve(), flipAniDur*1000);
    } else {
      p1BannedEffectInGame.push({cardID: uniqueCardID, sourcePos: playedPosition});
      RcardEffect(player, uniqueCardID, myResolve);
    }
  } else {
    if (p2BannedEffectInGame.filter(banned => banned.cardID === uniqueCardID).length > 0) {
      flipCard(player, playedPosition, 0);
      myResolve();
    } else {
      p2BannedEffectInGame.push({cardID: uniqueCardID, sourcePos: playedPosition});
      RcardEffect(player, uniqueCardID, myResolve);
    }
  }
}