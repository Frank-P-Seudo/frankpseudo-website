const forfeit = (player) => {
  if (turnClass === "draw") {
    scoringAbnormal(findVictim(player));  // see calScore.js
    renderScores();
    forfeiter.push(player);
    if (p1Queue.length > 0) {document.getElementById("playSummonersBut").disabled = false;}
    promptResultMsg();  // ! promptResultMsg needs to handle (1) score > 50 and (2) queue.length === 0
  } else if (turnClass === "play") {
    if (player === 'p1') {
      promptCardDiscard();
    } else {
      forfeiter.push(player);
      console.log('need to teach AI to forfeit first');
    }
  } else {alert('the turn is wrong')}
}

// triggered by discardHandMenu() (see p1ButtonMenu.js) or AI (to be developed)
const discardAndForfeit = (player, cardIDPlayed, emptyArray, playedPosition) => {
  disableP1PlayButtons();  // see utility.js 
  forfeiter.push(player);
  turnClass = 'play';
  let cardPlayMode = 'Upsidedown';
  new Promise(function(discardResolve) {
    updateMatSlotUD(player, cardIDPlayed, emptyArray, playedPosition);
    playHandAnimation(player, cardIDPlayed, playedPosition, cardPlayMode);
    setTimeout(() => discardResolve(), playAniDur*1000+aniBuffer);
  }).then(func => {
    new Promise(function(resolve) {
      playHandAnimationReverse(player, playedPosition);
      removeHandCard(player, cardIDPlayed);
      renderHand(player);
      renderMat(player, emptyArray, playedPosition);
      if (player === 'p1') {matCardDisplay(emptyArray)};
      setTimeout(() => resolve(), 1);
    }).then(func => {
      disableP1PlayButtons();  // need to disable p1 handcards again after rendering
      if (p1Queue.length > 0) {document.getElementById("playSummonersBut").disabled = false;}
      scoringAbnormal(findVictim(player));  // see calScore.js
      renderScores();
      promptResultMsg();  // ! promptResultMsg needs to handle (1) score > 50 and (2) queue.length === 0
    })
  })
}

const forfeitabilityCheck = (player) => {
  if (player === 'p1') {
    if (forfeiter.includes(player) === true) {
      document.getElementById("p1ForfeitBut").disabled = true;
    } else {
      let playedCards = [];
      countPlayedCards(playedCards);  // see utility.js
  
      if (turnClass === "draw" && playedCards[0] < 4 && playedCards[1] < 4) {
        document.getElementById("p1ForfeitBut").disabled = false;
      } else if (turnClass === "play" && player === 'p1' && playedCards[0] < 3) {
        document.getElementById("p1ForfeitBut").disabled = false;
      } else {
        document.getElementById("p1ForfeitBut").disabled = true;
      }
    }
  } else {
    // ? AI logic to be enhanced with forfeit; now p2's forfeitability doesn't
  }
}