//revivalAnimation('p1', 'sky');
//revivalAnimation('p1', 'left');
//revivalAnimation('p1', 'right');
//revivalAnimation('p2', 'sky');
//revivalAnimation('p2', 'left');
//revivalAnimation('p2', 'right');

//rotateMatAnimation();

/* Testing of using less codes to remove cards from hand/queue/hole 
removeCardStep2 = (arrayToUpdate, cardIDPlayed) => {
  arrayToUpdate = arrayToUpdate.filter(card => {
    if (card.cardID === cardIDPlayed) {
      return false
    } else {return true}
  });
  console.log(cardIDPlayed, " was removed:", arrayToUpdate);
}

removeCard = (player, cardIDPlayed, playedPosition) => {
  if (player == 'p1') {
    if (playedPosition == 'hand') {
      arrayToUpdate = p1Hand;
      removeCardStep2(arrayToUpdate, cardIDPlayed);
    } else if (playedPosition == 'queue') {
      arrayToUpdate = p1Queue;
      removeCardStep2(arrayToUpdate, cardIDPlayed);
    } else if (playedPosition == 'hole') {
      arrayToUpdate = p1Hole;
      removeCardStep2(arrayToUpdate, cardIDPlayed);
    } else {
      console.log(playedPosition, ' is not a valid playedPosition.')
    }
  } else {
    if (playedPosition == 'hand') {
      arrayToUpdate = p2Hand;
      removeCardStep2(arrayToUpdate, cardIDPlayed);
    } else if (playedPosition == 'queue') {
      arrayToUpdate = p2Queue;
      removeCardStep2(arrayToUpdate, cardIDPlayed);
    } else if (playedPosition == 'hole') {
      arrayToUpdate = p2Hole;
      removeCardStep2(arrayToUpdate, cardIDPlayed);
    } else {
      console.log(playedPosition, ' is not a valid playedPosition.')
    }
  }
}
*/

/*testing of new shuffle functions
shuffleStep1 = (player) => {
  new Promise(function(shuffleResolve) {
    shuffleAnimation(player, 'zone', 8);
    setTimeout(() => shuffleResolve(), (0.5+0.125*7)*1000+50);  // reminder: sync this with Animation.css
  }).then(func => {
    removeAnimatedContainer(player, 'zone', 8);
    let tempDeck = [];
    if (player === 'p1') {
      shuffleStep2(p1Deck, tempDeck);
      p1Deck.length = 0;
      p1Deck = slice(tempDeck, 0);
      console.log(tempDeck);
    } else {
      shuffleStep2(p2Deck);
    }
  })
};

shuffleStep2 = (deck) => {
  deck.forEach(card => {card.deckSeq = Math.random(9)});
  let tempDeck = [];
  for (i = deck.length; i > 0; i--) {
    let minSeq = 1.1;
    deck.forEach(card => {
      if (card.deckSeq < minSeq) {
        minSeq = card.deckSeq}
      });
    deck.forEach(card => {
      if (card.deckSeq === minSeq) {
        tempDeck.push({
          cardID: card.cardID,
          deckSeq: card.deckSeq
        })
      }
    })
    deck = deck.filter(card => {
      if (card.deckSeq !== minSeq) {
        return true;
      } else {
        return false;
      }
    });
}
  console.log(deck);
  console.log(tempDeck);
  return tempDeck;
}

card injection:
p1Hand[7].cardID = '159';
overrideAdjust('p1', 'right', '101', true);
FU -> UD
flipCard('p1', 'right', 1);

flushAnimation('p1', 'sky');
flushAnimation('p1', 'left');
flushAnimation('p1', 'right');
flushAnimation('p1', 'help');
flushAnimation('p2', 'sky');
flushAnimation('p2', 'left');
flushAnimation('p2', 'right');
flushAnimation('p2', 'help');


flushAnimationReverse('p1', 'sky');
flushAnimationReverse('p1', 'left');
flushAnimationReverse('p1', 'right');
flushAnimationReverse('p1', 'help');
flushAnimationReverse('p2', 'sky');
flushAnimationReverse('p2', 'left');
flushAnimationReverse('p2', 'right');
flushAnimationReverse('p2', 'help');

document.getElementById('p1-animated-back-right').className = 'p1-flipped-card-back';
document.getElementById('p1-mat-right-button').className = 'p1-flipped-card-face';

selectTargetMenu('161', func=> {console.log('')});
selectOfferMenu('161', 'sky', p1Sky, func=> {console.log('')})
exchangeEffectStep2('p1', 'p2', 'sky', p1Sky, 'left', p2Left, func=> {console.log('')});
exchangeEffectStep2('p1', 'p2', 'sky', p1Sky, 'sky', p2Sky, func=> {console.log('')});
exchangeEffectStep2('p1', 'p2', 'sky', p1Sky, 'right', p2Right, func=> {console.log('')});

UD -> FU
flipCardFU('p1', 'right', '042');

// check for incorrect cardFunc
cardDB.forEach(card => {
  if (card.cardFunc !== '' && card.cardFunc !== 'Auto' && card.cardFunc !== 'Cont') {console.log(card.cardID)}
});

voidableCheck('234', 'p2', 'sky', p2Sky, func=> {console.log('')}, false);
voidableCheck('234', 'p2', 'left', p2Left, func=> {console.log('')}, false);
voidableCheck('234', 'p2', 'right', p2Right, func=> {console.log('')}, false);

document.getElementById('p1-mat-sky-button').className = 'p1-flushed-card-face';
document.getElementById('p1-mat-sky-button').className = 'p1-mat-card-button';
document.getElementById('p2-mat-sky-button').className = 'p2-flushed-card-face';

//const p1ComboBlockLists = [p1SkyBlockedPower1, p1LeftBlockedPower1, p1RightBlockedPower1];
//const p1BlockLists1 = [p1BlockedPos1, p1BlockedType1, p1BlockedPower1, p1BlockedClass1, p1BlockedCardID1, p1SkyBlockedPower1, p1LeftBlockedPower1, p1RightBlockedPower1];
//const p1BlockLists2 = [p1BlockedPos2, p1BlockedType2, p1BlockedPower2, p1BlockedClass2, p1BlockedCardID2];
//const p2ComboBlockLists = [p2SkyBlockedPower1, p2LeftBlockedPower1, p2RightBlockedPower1];
//const p2BlockLists1 = [p2BlockedPos1, p2BlockedType1, p2BlockedPower1, p2BlockedClass1, p2BlockedCardID1, p2SkyBlockedPower1, p2LeftBlockedPower1, p2RightBlockedPower1];
//const p2BlockLists2 = [p2BlockedPos2, p2BlockedType2, p2BlockedPower2, p2BlockedClass2, p2BlockedCardID2];

pushBlockItem = (player, uniqueCardID, blockMode, blockedItem, recoverability) => {
  if (player === 'p1') {
    pushBlockItemStep2(player, uniqueCardID, blockMode, blockedItem, recoverability, p2BlockLists1);
  } else {
    pushBlockItemStep2(player, uniqueCardID, blockMode, blockedItem, recoverability, p1BlockLists1);
  }
}

pushBlockItemStep2 = (player, uniqueCardID, blockMode, blockedItem, recoverability, blockLists) => {
  if (blockMode === 'pos') {
    blockLists[0].push({
      pos: blockedItem, 
      source: uniqueCardID, 
      sourcePlayer: player,
      recoverable: recoverability
    });
  } else if (blockMode === 'monType') {
    blockLists[1].push({
      monType: blockedItem, 
      source: uniqueCardID,
      sourcePlayer: player,
      recoverable: recoverability
    });
  } else if (blockMode === 'monPower') {
    blockLists[2].push({
      monPower: blockedItem, 
      source: uniqueCardID,
      sourcePlayer: player,
      recoverable: recoverability
    });
  } else if (blockMode === 'monClass') {
    blockLists[3].push({
      monClass: blockedItem, 
      source: uniqueCardID,
      sourcePlayer: player,
      recoverable: recoverability
    });
  } else if (blockMode === 'cardID') {
    blockLists[4].push({
      cardID: blockedItem, 
      source: uniqueCardID,
      sourcePlayer: player,
      recoverable: recoverability
    });
  } else {
    console.log('incorrect blockMode')
  }
}

comboBlockEffectStep2 = (player, uniqueCardID, blockMode, blockedPos, blockedPower, includeZero, recoverability, comboBlockList) => {
  for (i = 0; i < 3; i++) {
    // 	小封截人, 嘉達（男）, 停止之小魔人
    if (blockedPos == playedPositions[i] && blockMode == 'max') {
      fillBlockedPower(player, comboBlockList[i], -200, uniqueCardID, recoverability);  // see blockListUpdate.js
      fillBlockedPower(player, comboBlockList[i], -100, uniqueCardID, recoverability);
      for (j = 1; j < 10; j++) {fillBlockedPower(player, comboBlockList[i], j, uniqueCardID, recoverability)};
      for (j = 10; j <= blockedPower; j = j + 10) {fillBlockedPower(player, comboBlockList[i], j, uniqueCardID, recoverability)};
    }
    // 	封截人, 嘉達（女）, 銀河之障壁（2）, 停止之魔人
    if (blockedPos == playedPositions[i] && blockMode == 'min') {
        for (j = blockedPower; j <= 110; j = j + 10) {fillBlockedPower(player, comboBlockList[i], j, uniqueCardID, recoverability)};
        fillBlockedPower(player, comboBlockList[i], 200, uniqueCardID, recoverability);
        if (includeZero === true) {player, fillBlockedPower(player, comboBlockList[i], 0, uniqueCardID, recoverability)};
    }
  }
}

// push block item for comboBlock lists
fillBlockedPower = (player, blockList, blockedPower, uniqueCardID, recoverability) => {
  blockList.push({
    monPower: blockedPower, 
    source: uniqueCardID, 
    sourcePlayer: player,
    recoverable: recoverability
  });
}
discardHandToHole('p1', p1Hand, 0, p1Hole);
discardHandToHole('p2', p2Hand, 0, p2Hole);

transformAnimation('p1', 'left', "MonCardFolder/015.jpg");
restoreTransform('p2', 'sky', p2Sky;
renderMat('p2', p2Sky, 'sky');
let idx = findMatArrays('p1')[6].find(card => card.cardID === '004');
findMatArrays('p1')[6].splice(idx,1);

let allyBracket = [];
  // count the number of cards with allyCardID, which can be more than one due to exchange
for (let i = 0; i < 3; i++) {
  if (p1MatArrays[i].length > 0) {
    if (p1MatArrays[i][p1MatArrays[i].length-1].upsideDown === false && p1MatArrays[i][p1MatArrays[i].length-1].cardID === '025') {
      allyBracket.push(playedPositions[i]);
    }
  }
}
console.log(allyBracket);
*/