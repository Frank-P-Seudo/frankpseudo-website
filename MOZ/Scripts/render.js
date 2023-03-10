// triggered by 311's effect or for UAT purpose
const renderP2Hand = () => {
  for (let i = 9; i > 0; i--) {
    const cardslot = "p2-hand-c" + i;
    if (i > p2Hand.length) {
      emptySlot(cardslot);
    } else {
      let path;
      cardDB.forEach(card => {
        if (card.cardID === p2Hand[i-1].cardID) {
          path = card.cardPic};
      });
      document.getElementById(cardslot).src = path;
      const cardslotButton = cardslot + "-button";
      document.getElementById(cardslotButton).disabled = false;
    }
  }
}

// functions to render handcards
const renderHand = (player) => {
  for (let i = 9; i > 0; i--) {
    const cardslot = player + "-hand-c" + i;
    if (i > findHand(player).length) {
      emptySlot(cardslot);
    } else {
      fillSlot(findHand(player), cardslot, i)
    };
  }
}

const emptySlot = (cardslot) => {
  document.getElementById(cardslot).src = "CardBack/empty-slot.png";
  const cardslotButton = cardslot + "-button";
  document.getElementById(cardslotButton).disabled = true;
};

const fillSlot = (hand, cardslot, i) => {
  const cardIDToCall = hand[i-1].cardID;
  const cardslotButton = cardslot + "-button";
  let path;
  if (hand === p1Hand) {
    cardDB.forEach(card => {
      if (card.cardID === cardIDToCall) {
        path = card.cardPic};
    });
    document.getElementById(cardslotButton).disabled = false;  // by default only p1Hand can trigger handCardDisplay()
  } else {
    path = p2DeckBackImgPath;
  }
  document.getElementById(cardslot).src = path;
};

// add a bubble to indicate # of cards in an array
const bubble = (player, area, i) => {
  const bubbleID = player + '-mat-' + area + '-bubble';
  const bubble = document.getElementById(bubbleID);
  bubble.innerText = i;
  if (i < 2) {
    bubble.style = 'color: transparent; background-color: transparent; border-color:transparent';
  } else if (player === 'p1') {
    bubble.style = 'color: rgb(221, 221, 221); background-color: rgb(44, 102, 71); border-color:rgb(221, 221, 221)';
  } else {
    bubble.style = 'color: rgb(44, 102, 71); background-color: rgb(221, 221, 221); border-color:rgb(44, 102, 71)';
  }
}

// update the card displayed on mat
const renderMat = (player, viewedCard, playedPosition) => {
  let defaultMat;
  let nonDefaultMat;
  let path;
  // determine the default and non-default image for Zone
  if (playedPosition === 'zone') {
    if (player === 'p1') {
      defaultMat = "Mat/Slot-zone-grey.png";
      nonDefaultMat = p1DeckBackImgPath;
    } else {
      defaultMat = "Mat/Slot-zone-green.png";
      nonDefaultMat = p2DeckBackImgPath;
    };
  }
  // determine the default and non-default image for Hole 
  else if (playedPosition === 'hole') {
    if (player === 'p1') {
      defaultMat = "Mat/Slot-hole-grey.png";
      nonDefaultMat = p1DeckBackImgPathH;
    } else {
      defaultMat = "Mat/Slot-hole-green.png";
      nonDefaultMat = p2DeckBackImgPathH;
    };
  }
  // determine the default and non-default image for Custody
  else if (playedPosition === 'custody') {
    if (player === 'p1') {
      defaultMat = "Mat/Slot-custody-grey.png";
    } else {
      defaultMat = "Mat/Slot-custody-green.png";
    };
    if (viewedCard.length > 0) {
      cardDB.forEach(card => {
        if (card.cardID === viewedCard[viewedCard.length-1].cardID) {
          nonDefaultMat = card.cardPic;
        }
      });
    }
  }
  // determine the default and non-default image for Queue
  else if (playedPosition === 'queue') {
    if (player === 'p1') {
      defaultMat = "Mat/Slot-zone-grey.png";
      nonDefaultMat = p1DeckBackImgPath;
    } else {
      defaultMat = "Mat/Slot-zone-green.png";
      nonDefaultMat = p2DeckBackImgPath;
    };
  }
  // determine the default and non-default image for Used
  else if (playedPosition === 'used') {
    if (player === 'p1') {
      defaultMat = "Mat/Slot-used-grey.png";
    } else {
      defaultMat = "Mat/Slot-used-green.png";
    };
    if (viewedCard.length > 0) {
      nonDefaultMat = viewedCard[viewedCard.length-1].cardPic;
      /** 
      sCardDB.forEach(sCard => {
        if (sCard.cardID === viewedCard[viewedCard.length-1].cardID) {
          nonDefaultMat = sCard.cardPic;
        }
      });
      */
    }
  }
  // determine the default and non-default image for summoner slot
  else if (playedPosition === 'summoner') {
    if (player === 'p1') {
      defaultMat = "Mat/Slot-summoner-green.png";
    } else {
      defaultMat = "Mat/Slot-summoner-grey.png";
    };
    if (viewedCard.length > 0) {
      nonDefaultMat = viewedCard[0].cardPic;
    }
  } else {
    // determine the default and non-default image for other slots
    if (playedPosition === 'help') {
      if (player === 'p1') {
        defaultMat = "Mat/Slot-help-green.png";
      } else {
        defaultMat = "Mat/Slot-help-grey.png";
      };
    } else if (playedPosition === 'sp') {
      if (player === 'p1') {
        defaultMat = "Mat/Slot-sp-green.png";
      } else {
        defaultMat = "Mat/Slot-sp-grey.png";
      };
    } else {
      if (player === 'p1') {
        defaultMat = "Mat/Slot-mon-green.png";
      } else {
        defaultMat = "Mat/Slot-mon-grey.png";
      };
    };
    if (viewedCard.length > 0) {
      if (viewedCard[viewedCard.length-1].upsideDown === true) {
        if (player === 'p1') {
          nonDefaultMat = p1DeckBackImgPath;
        } else {
          nonDefaultMat = p2DeckBackImgPath;
        }
      } else {
        nonDefaultMat = viewedCard[viewedCard.length-1].cardPic;
        /** 
        cardDB.forEach(card => {
          if (card.cardID === viewedCard[viewedCard.length-1].cardID) {
            nonDefaultMat = card.cardPic;
          }
        })
        */
      }
    }
  };
  // select the correct image based on whether the slot is empty or not
  if (viewedCard.length === 0) {
    path = defaultMat;
  } else {
    path = nonDefaultMat;
  };
  matImage = player + '-mat-' + playedPosition;
  document.getElementById(matImage).src = path;
  // enable/disable the corresponding button on mat (n/a for zone)
  if (playedPosition !== 'zone') {
    matButton = player + '-mat-' + playedPosition + '-button';
    if (viewedCard.length === 0) {
      document.getElementById(matButton).disabled = true; 
    } else if ((player === 'p2' && playedPosition === 'queue') || playedPosition === 'hole') {
      document.getElementById(matButton).disabled = true;
    } else if (player === 'p2' && viewedCard[viewedCard.length-1].upsideDown === true) {
      document.getElementById(matButton).disabled = false;  // ! change to true before launch
    } else {
      document.getElementById(matButton).disabled = false;
    }
  }
  // trigger bubble
  if (playedPosition === 'zone') {
    area = playedPosition;
  } else {
    area = playedPosition + '-button';
  }
  bubble(player, area, viewedCard.length);
}

// disable arrows (e.g., when a handcard is viewed)
const disableArrow = () => {
  document.getElementById('arrow-to-left').disabled = true;
  document.getElementById('arrow-to-right').disabled = true;
}

// check if arrows are needed on display panel (e.g., when S/L/R has more than one card)
const checkArrow = (viewedCard) => {
  if (viewedCard.length > 1) {
    document.getElementById('arrow-to-left').disabled = false;
    document.getElementById('arrow-to-right').disabled = false;
  } else {
    disableArrow();
  }
  pile = viewedCard; 
}

// update the card shown on display panel, based on which card on mat is selected
const matCardDisplay = (viewedCard) => {
  const path = viewedCard[viewedCard.length-1].cardPic;
  
  document.getElementById('card-displayed').src = path;
  if (turnClass !== 'choiceEffect' && turnClass !== 'pre-prep') {  // don't empty display-panel-button-container when turnClass is choiceEffect (e.g., R cards)
    document.getElementById('display-panel-button-container').innerHTML = '';
  }
  checkArrow(viewedCard);
}

// update the card shown on display panel, based on which handcard is selected
const handCardDisplay = (player, handCardPlace) => {
  if (player === 'p1') {
    cardIDPlayed = p1Hand[handCardPlace].cardID;
    cardDB.forEach(card => {
      if (card.cardID === cardIDPlayed) {
        path = card.cardPic};
      });
      document.getElementById('card-displayed').src = path;
      if (turnClass === 'discard') {
        discardHandMenu(cardIDPlayed);
      } else if (turnClass === 'ChEffect') {
        ChSummonMenu(cardIDPlayed);
      } else if (turnClass === 'choiceEffect') {
        // don't call any menu when turnClass is choiceEffect
      } else if (turnSP === false) {
        callButtonMenu1(cardIDPlayed);
      } else {
        playSPmenu(cardIDPlayed);
      }
  } else {
    cardIDPlayed = p2Hand[handCardPlace].cardID;
    cardDB.forEach(card => {
      if (card.cardID === cardIDPlayed) {
        path = card.cardPic};
      });
      document.getElementById('card-displayed').src = path;
    }
  disableArrow();
};

const renderCleanMat = () => {
  renderMat('p1', p1Summoner, 'summoner');
  renderMat('p1', p1Sky, 'sky');
  renderMat('p1', p1Left, 'left');
  renderMat('p1', p1Right, 'right');
  renderMat('p1', p1Help, 'help');
  renderMat('p1', p1SP, 'sp');
  renderMat('p1', p1Used, 'used');
  renderMat('p1', p1Custody, 'custody');
  renderMat('p1', p1Hole, 'hole');

  renderMat('p2', p2Summoner, 'summoner');
  renderMat('p2', p2Sky, 'sky');
  renderMat('p2', p2Left, 'left');
  renderMat('p2', p2Right, 'right');
  renderMat('p2', p2Help, 'help');
  renderMat('p2', p2SP, 'sp');
  renderMat('p2', p2Used, 'used');
  renderMat('p2', p2Custody, 'custody');
  renderMat('p2', p2Hole, 'hole');
}

// render names, powers and scores
const renderNames = () => {
  document.getElementById('display-p1-name').innerText = p1Name;
  document.getElementById('display-p2-name').innerText = p2Name;
}

const renderPowers = () => {
  document.getElementById('display-p1-power').innerText = p1Power;
  document.getElementById('display-p2-power').innerText = p2Power;
}

const renderScores = () => {
  document.getElementById('display-p1-score').innerText = p1Score;
  document.getElementById('display-p2-score').innerText = p2Score;
}
