/** 
// Push the card with min. Seq to new deck and remove it from old deck
replaceMinSeqP1 = (minSeq) => {
    p1Deck.forEach(card => {
      if (card.deckSeq === minSeq) {
        newp1Deck.push({
          cardID: card.cardID,
          deckSeq: card.deckSeq
        })
      }
    })
    p1Deck = p1Deck.filter(card => {
      if (card.deckSeq !== minSeq) {
        return true;
      } else {
        return false;
      }
    });
    cardCount = cardCount - 1;
    shuffleP1step2(cardCount);      
}

replaceMinSeqP2 = (minSeq) => {
  p2Deck.forEach(card => {
    if (card.deckSeq === minSeq) {
      newp2Deck.push({
        cardID: card.cardID,
        deckSeq: card.deckSeq
      })
    }
  })
  p2Deck = p2Deck.filter(card => {
    if (card.deckSeq !== minSeq) {
      return true;
    } else {
      return false;
    }
  });
  cardCount = cardCount - 1;
  shuffleP2step2(cardCount);      
}

// P1 deck shuffle - step 2: find the card with min. Seq and trigger replaceMinSeq()
shuffleP1step2 = (cardCount) => {
  if (cardCount > 0) {    
    let minSeq = 1.1;
    p1Deck.forEach(card => {
      if (card.deckSeq < minSeq) {
        minSeq = card.deckSeq}
      });
    replaceMinSeqP1(minSeq);
  } else {
    p1Deck = newp1Deck.slice(0);
    newp1Deck.length = 0;
    console.log('p1Deck after shuffle', p1Deck);
  };
};

shuffleP2step2 = (cardCount) => {
  if (cardCount > 0) {    
    let minSeq = 1.1;
    p2Deck.forEach(card => {
      if (card.deckSeq < minSeq) {
        minSeq = card.deckSeq}
      });
    replaceMinSeqP2(minSeq);
  } else {
    p2Deck = newp2Deck.slice(0);
    newp2Deck.length = 0;
    console.log('p2Deck after shuffle', p2Deck);
  };
};

// Deck shuffle - step 1: assign random sequence numbers
shuffleP1step1 = () => {
  new Promise(function(shuffleResolve) {
    shuffleAnimation('p1', 'zone', 8);
    setTimeout(() => shuffleResolve(), (shuffleAniDur+shuffleDelay*7)*1000+aniBuffer); 
  }).then(func => {
    removeAnimatedContainer('p1', 'zone', 8);
    let cardCount = p1Deck.length;
    p1Deck.forEach(card => {card.deckSeq = Math.random(9)});
    shuffleP1step2(cardCount);
  })
};

shuffleP2step1 = () => {
  new Promise(function(shuffleResolve) {
    shuffleAnimation('p2', 'zone', 8);
    setTimeout(() => shuffleResolve(), (shuffleAniDur+shuffleDelay*7)*1000+aniBuffer); 
  }).then(func => {
    removeAnimatedContainer('p2', 'zone', 8);
    let cardCount = p2Deck.length;
    p2Deck.forEach(card => {card.deckSeq = Math.random(9)});
    shuffleP2step2(cardCount);
  })
};
*/


