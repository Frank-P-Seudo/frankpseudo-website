// Decide the image of cardback (not for sCard)
const deckBack = (deck) => {
  let paths = [];
  let deckSeries;
  cardDB.forEach(card => {
    if (card.cardID === deck[0].cardID) {
      deckSeries = card.cardSeries}
  });

  if (deckSeries === 'gurifu') {
    paths.push("CardBack/gurifu.jpg");
    paths.push("CardBack/gurifu-h.jpg");
  } else if (deckSeries === 'mogora') {
    paths.push("CardBack/mogora.jpg");
    paths.push("CardBack/mogora-h.jpg");
  } else if (deckSeries === 'kosumo') {
    paths.push("CardBack/kosumo.jpg");
    paths.push("CardBack/kosumo-h.jpg");
  } else if (deckSeries === 'meiro') {
    paths.push("CardBack/meiro.jpg");
    paths.push("CardBack/meiro-h.jpg");
  } else {
    paths.push("CardBack/neosu.jpg");
    paths.push("CardBack/neosu-h.jpg");
  }
  return paths;
}

const p1DeckBack = () => {
  let paths = deckBack(p1Deck);
  p1DeckBackImgPath = paths[0];
  p1DeckBackImgPathH = paths[1];
}

const p2DeckBack = () => {
  let paths = deckBack(p2Deck);
  p2DeckBackImgPath = paths[0];
  p2DeckBackImgPathH = paths[1];
}

const pushDeck = (zone, deck) => {
  for (let i = 0; i < deck.length; i++) {
    zone.splice(i,i, deck[i]); 
  }
}

const pushQueue = (queueArray, sDeck) => {
  for (let i = 0; i < sDeck.length; ++i) {
    sCardDB.forEach(sCard => {
      if (sCard.cardID === sDeck[i].cardID) {
        queueArray.push({
          cardName: sCard.cardName,
          summonerLevel: sCard.summonerLevel,
          cardID: sCard.cardID,
          cardType: sCard.cardType,
          cardSeries: sCard.cardSeries,
          cardPic: sCard.cardPic
        })
      }
    })
  }
}

const initializeGameStep2 = () => {
  p1DeckBack();
  p2DeckBack();

  renderNames();
  renderPowers();
  renderScores();

  renderMat('p1', p1Deck, 'zone');
  renderMat('p2', p2Deck, 'zone');
  renderMat('p1', p1Hole, 'hole');
  renderMat('p2', p2Hole, 'hole');
  renderMat('p1', p1Custody, 'custody');
  renderMat('p2', p2Custody, 'custody');
  renderMat('p1', p1Queue, 'queue');
  renderMat('p2', p2Queue, 'queue');
  renderMat('p1', p1Used, 'used');
  renderMat('p2', p2Used, 'used');

  document.getElementById("drawCardp1But").disabled = true;
  document.getElementById("playSummonersBut").disabled = true;

  arrangeSummoners();
}

const initializeGame = () => {
  if (Array.isArray(p1Profile) && Array.isArray(p2Profile)) {
    p1Name = p1Profile[0].playerName + '（'+ returnTitle(p1Profile[0].exp)[1] + '）';
    p1Exp = p1Profile[0].exp;
    pushDeck(p1Deck, p1Profile[p1Profile[0].activeSlot].deck.slice(5,55));
    pushQueue(p1Queue, p1Profile[p1Profile[0].activeSlot].deck.slice(0,5));

    p2Name = p2Profile[0].playerName;
    pushDeck(p2Deck, p2Profile[0].deck.slice(5,55));
    pushQueue(p2Queue, p2Profile[0].deck.slice(0,5));
    initializeGameStep2();
  } else {
    new Promise(function(promptResolve) {
      promptIllegalEntry(promptResolve);
    }).then(func => {
      window.location.replace("Deckbuilder.html");
    })
    /** keeping the codes below for sake of testing
    p1Name = 'Player 1';
    p2Name = 'Player 2';
    pushDeck(p1Deck, p1DeckFixed);
    pushDeck(p2Deck, p2DeckFixed);
    pushQueue(p1Queue, p1sDeckFixed);
    pushQueue(p2Queue, p2sDeckFixed);
    initializeGameStep2();
    */
  }
}