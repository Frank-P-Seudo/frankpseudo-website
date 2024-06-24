/* functions for p1 and p2 to draw cards */
const drawStep2 = (drawNum, player, deck, hand) => {
  new Promise(function(drawResolve) {
    shuffleAnimation(player, 'draw', drawNum);  // the function name is misleading, but it works
    for (let i = drawNum; i > 0; i--) {
      hand.push({cardID: deck[deck.length-1].cardID});
      deck.pop();
    }
    setTimeout(() => drawResolve(), (drawAniDur+(drawNum-1)*0.05)*1000+aniBuffer);
  }).then(func => {
    removeAnimatedContainer(player, 'draw', drawNum);
    renderHand(player);
    renderMat(player, deck, 'zone');
  })
}

const drawStep1 = (drawNum, player, deck, hand) => {
  if (drawNum > deck.length) {
    finalWinner = findVictim(player);
    promptDeckEndMsg(player);
  } else {
    drawStep2(drawNum, player, deck, hand);
  }
}

const drawCard = (player, drawNum) => {
  if (player === 'p1') {document.getElementById("drawCardp1But").disabled = true;}
  turnClass = "play";
  forfeitabilityCheck(player);
  // if S048 has triggered its effect, then player gets to shuffle their deck before drawing
  new Promise(function(effectResolve) {
    if (shuffleBe4Draw.includes(player) === true && findMatArrays(player)[5][0].effectVoided === false) {
      shuffleBe4Draw = shuffleBe4Draw.filter(item => item !== player);
      shuffleDeck(player, findDeck(player));
      setTimeout(() => effectResolve(), (shuffleAniDur+0.125*7)*1000+aniBuffer);
    } else {
      effectResolve();
    }
  }).then(func => {
    drawStep1(drawNum, player, findDeck(player), findHand(player));
  })
};