// reminder: sync these with Animation.css
// in terms of millisecond
const aniBuffer = 50;
// in terms of seconds
const shuffleAniDur = 0.5;
const shuffleDelay = 0.125;
const drawAniDur = 0.3;
const playAniDur = 0.3;
const flipAniDur = 0.5;
const flushAniDur = 0.5;
const rotateMatAniDur = 1;
const exchangeAniDur = 1;
const sumSwapAniDur = 0.5;
const transAniDur = 0.5;

// animation for shuffling Zone/Queue + drawing cards
const shuffleAnimation = (player, area, cut) => {
  let containerID; 
  if (area === 'draw') {
    containerID = player + '-mat-zone-container';  
  } else {
    containerID = player + '-mat-' + area + '-container';
  }
  const mainContainer = document.getElementById(containerID);

  for (let i = 1; i <= cut; i++) {
    const animatedContainer = document.createElement('div');
    const animatedPic = document.createElement('img');
    if (player === 'p1') {
      animatedPic.setAttribute("src", p1DeckBackImgPath);
    } else {
      animatedPic.setAttribute("src", p2DeckBackImgPath);
    }
    animatedPic.style = "height: 61px; width: 41px; position: absolute; left: -1.5px; top: -1.5px";
    animatedContainer.appendChild(animatedPic);
    animatedContainer.className = player + '-animated-card';
    animatedContainer.id = player + '-animated-card-' + area + '-' + i;
    mainContainer.appendChild(animatedContainer);
  }
}

const removeAnimatedContainer = (player, area, cut) => {
  for (let i = 1; i <= cut; i++) {
    const animatedContainerID = player + '-animated-card-' + area + '-' + i;
    document.getElementById(animatedContainerID).remove();
  }
}

// animation for playing/discarding a card
const playHandAnimation = (player, cardIDPlayed, playedPosition, cardPlayMode) => {
  const mainContainerID = player + '-mat-' + playedPosition + '-button-container';
  const mainContainer = document.getElementById(mainContainerID);
  const animatedContainer = document.createElement('div');
  const animatedPic = document.createElement('img');

  if (cardPlayMode === 'Upsidedown') {
    if (player === 'p1') {
      animatedPic.setAttribute("src", p1DeckBackImgPath);
    } else {
      animatedPic.setAttribute("src", p2DeckBackImgPath);
    }
    
  } else if (cardPlayMode === 'Normal-Summoner') {
    sCardDB.forEach(sCard => {
      if (sCard.cardID === cardIDPlayed) {
        ImgPath = sCard.cardPic;
      }
    });
    animatedPic.setAttribute("src", ImgPath);
  } else {
    cardDB.forEach(card => {
      if (card.cardID === cardIDPlayed) {
        ImgPath = card.cardPic;
      }
    });
    animatedPic.setAttribute("src", ImgPath);
  }
  animatedPic.style = "height: 61px; width: 41px; position: absolute; left: -1.5px; top: -1.5px";
  animatedContainer.appendChild(animatedPic);
  animatedContainer.id = player + '-animated-card-' + playedPosition;
  animatedContainer.className = player + '-animated-card';
  mainContainer.appendChild(animatedContainer);
}

const playHandAnimationReverse = (player, playedPosition) => {
  const containerID = player + '-animated-card-' + playedPosition;
  document.getElementById(containerID).remove();
}

// animation for playing a card from Hole
const revivalAnimation = (player, cardIDPlayed, playedPosition) => {
  const mainContainerID = player + '-mat-' + playedPosition + '-button-container';
  const mainContainer = document.getElementById(mainContainerID);

  const animatedContainer = document.createElement('div');
  const animatedPic = document.createElement('img');
  cardDB.forEach(card => {
    if (card.cardID === cardIDPlayed) {
      ImgPath = card.cardPic;
    }
  });
  animatedPic.setAttribute("src", ImgPath);
  animatedPic.style = "height: 61px; width: 41px; position: absolute; left: -1.5px; top: -1.5px";
  animatedContainer.appendChild(animatedPic);
  animatedContainer.id = player + '-re-animated-card-' + playedPosition;
  animatedContainer.className = player + '-animated-card';
  mainContainer.appendChild(animatedContainer);
}

const revivalAnimationReverse = (player, playedPosition) => {
  const containerID = player + '-re-animated-card-' + playedPosition;
  document.getElementById(containerID).remove();
}

// animation for flipping cards face up
const flipFUAnimation = (player, playedPosition, uniqueCardID) => {
  const mainContainerID = player + '-mat-' + playedPosition + '-button-container';
  const mainContainer = document.getElementById(mainContainerID);

  const animatedContainer1 = document.createElement('div');
  const animatedPic = document.createElement('img');
  cardDB.forEach(card => {
    if (card.cardID === uniqueCardID) {
      ImgPath = card.cardPic;
    }
  });
  animatedPic.setAttribute("src", ImgPath);
  animatedPic.style = "height: 61px; width: 41px; position: absolute; left: -1.5px; top: -1.5px";
  animatedContainer1.appendChild(animatedPic);
  animatedContainer1.id = player + '-animated-back-' + playedPosition;
  animatedContainer1.className = player + '-flipped-card-back';
  mainContainer.appendChild(animatedContainer1);
  
  // change the button's className to trigger animation
  const containerID = player + '-mat-' + playedPosition + '-button';
  const animatedContainer2 = document.getElementById(containerID);
  animatedContainer2.className = player + '-flipped-card-face';
}

// animation for flipping cards upside down
const flipAnimation = (player, playedPosition) => {
  const mainContainerID = player + '-mat-' + playedPosition + '-button-container';
  const mainContainer = document.getElementById(mainContainerID);

  const animatedContainer1 = document.createElement('div');
  const animatedPic = document.createElement('img');
  if (player === 'p1') {
    animatedPic.setAttribute("src", p1DeckBackImgPath);
  } else {
    animatedPic.setAttribute("src", p2DeckBackImgPath);
  }
  animatedPic.style = "height: 61px; width: 41px; position: absolute; left: -1.5px; top: -1.5px";
  animatedContainer1.appendChild(animatedPic);
  animatedContainer1.id = player + '-animated-back-' + playedPosition;
  animatedContainer1.className = player + '-flipped-card-back';
  mainContainer.appendChild(animatedContainer1);
  
  // change the button's className to trigger animation
  const containerID = player + '-mat-' + playedPosition + '-button';
  const animatedContainer2 = document.getElementById(containerID);
  animatedContainer2.className = player + '-flipped-card-face';
}

const flipAnimationReverse = (player, playedPosition) => {
  const containerID1 = player + '-animated-back-' + playedPosition;
  document.getElementById(containerID1).remove();
  
  const containerID2 = player + '-mat-' + playedPosition + '-button';
  document.getElementById(containerID2).className = player + '-mat-card-button';
}

// animation for rotating the playmats
const rotateMatAnimation = () => {
  document.getElementById('mat-p1').className = 'rotated-mat';
  document.getElementById('mat-p2').className = 'rotated-mat';
}

const rotateMatAnimationReverse = () => {
  document.getElementById('mat-p1').className = '';
  document.getElementById('mat-p2').className = '';
}

// animation for sending a card straight to hole
const flushAnimation = (player, playedPosition) => {
  const picContainerID = player + '-mat-' + playedPosition;
  const animatedContainer = document.getElementById(picContainerID);
  animatedContainer.className = player + '-flushed-card-face';

  const buttonID = player + '-mat-' + playedPosition + '-button';
  const borderlessContainer = document.getElementById(buttonID);
  borderlessContainer.style.border = 'none';
}

const flushAnimationReverse = (player, playedPosition) => {
  const picContainerID = player + '-mat-' + playedPosition;
  document.getElementById(picContainerID).className = 'mat-icon-vertical';

  const buttonID = player + '-mat-' + playedPosition + '-button'
  if (player === 'p1') {
    document.getElementById(buttonID).style.border = "1px solid var(--p1-border-color)";
  } else {
    document.getElementById(buttonID).style.border = "1px solid var(--p2-border-color)";
  }
}

// animation for exchanging cards
const exchangeAnimation = (thief, victim, offeredPosition, obtainedPosition, offeredCardID, obtainedCardID, offeredCardUpsideDown, obtainedCardUpsideDown) => {
  const thiefContainerID = thief + '-mat-' + offeredPosition + '-button-container';
  const thiefContainer = document.getElementById(thiefContainerID);
  const thiefAnimatedContainer = document.createElement('div');
  const thiefAnimatedPic = document.createElement('img');
  if (obtainedCardUpsideDown === true) {
    thiefAnimatedPic.setAttribute("src", p2DeckBackImgPath);  
  } else {
    cardDB.forEach(card => {
      if (card.cardID === obtainedCardID) {
        imgPath = card.cardPic;
      }
    });
    thiefAnimatedPic.setAttribute("src", imgPath);
  }
  thiefAnimatedPic.style = "height: 61px; width: 41px; position: absolute; left: -1.5px; top: -1.5px";
  thiefAnimatedContainer.appendChild(thiefAnimatedPic);
  thiefAnimatedContainer.id = thief + '-obtained-face-' + offeredPosition;
  thiefAnimatedContainer.className = thief + '-new-face';
  thiefContainer.appendChild(thiefAnimatedContainer);

  const victimContainerID = victim + '-mat-' + obtainedPosition + '-button-container';
  const victimContainer = document.getElementById(victimContainerID);
  const victimAnimatedContainer = document.createElement('div');
  const victimAnimatedPic = document.createElement('img');
  if (offeredCardUpsideDown === true) {
    victimAnimatedPic.setAttribute("src", p1DeckBackImgPath);  
  } else {
    cardDB.forEach(card => {
      if (card.cardID === offeredCardID) {
        imgPath = card.cardPic;
      }
    });
    victimAnimatedPic.setAttribute("src", imgPath);
  }
  victimAnimatedPic.style = "height: 61px; width: 41px; position: absolute; left: -1.5px; top: -1.5px";
  victimAnimatedContainer.appendChild(victimAnimatedPic);
  victimAnimatedContainer.id = victim + '-offered-face-' + obtainedPosition;
  victimAnimatedContainer.className = victim + '-new-face';
  victimContainer.appendChild(victimAnimatedContainer);
    
  // change the button's className to trigger animation
  const thiefButtonID = thief + '-mat-' + offeredPosition + '-button';
  document.getElementById(thiefButtonID).className = thief + '-old-face';

  const victimButtonID = victim + '-mat-' + obtainedPosition + '-button';
  document.getElementById(victimButtonID).className = victim + '-old-face';
}

const exchangeAnimationReverse = (thief, victim, offeredPosition, obtainedPosition) => {
  const thiefButtonID = thief + '-mat-' + offeredPosition + '-button';
  document.getElementById(thiefButtonID).className = thief + '-mat-card-button';

  const thiefAnimatedContainerID = thief + '-obtained-face-' + offeredPosition;
  document.getElementById(thiefAnimatedContainerID).remove();

  const victimButtonID = victim + '-mat-' + obtainedPosition + '-button';
  document.getElementById(victimButtonID).className = victim + '-mat-card-button';

  const victimAnimatedContainerID = victim + '-offered-face-' + obtainedPosition;
  document.getElementById(victimAnimatedContainerID).remove(); 
}

const summonersSwapAnimation = (player) => {
  const buttonID1 = player + '-mat-queue-button';
  const buttonContainer1 = document.getElementById(buttonID1);
  buttonContainer1.className = player + '-swapped-queue';

  const buttonID2 = player + '-mat-used-button';
  const buttonContainer2 = document.getElementById(buttonID2);
  buttonContainer2.className = player + '-swapped-used';
}

const summonersSwapAnimationReverse = (player) => {
  const buttonID1 = player + '-mat-queue-button';
  document.getElementById(buttonID1).className = 'queue-' + player;

  const buttonID2 = player + '-mat-used-button';
  document.getElementById(buttonID2).className = player + '-mat-card-button';
}

const transformAnimation = (player, playedPosition, imgPath) => {
  const buttonContainerID = player + '-mat-' + playedPosition + '-button-container';
  const buttonContainer = document.getElementById(buttonContainerID);
  const animatedContainer = document.createElement('div');
  const animatedPic = document.createElement('img');

  animatedPic.setAttribute("src", imgPath);
  animatedPic.style = "height: 61px; width: 41px; position: absolute; left: -1.5px; top: -1.5px";
  animatedContainer.appendChild(animatedPic);
  animatedContainer.id = player + '-transformed-' + playedPosition;
  animatedContainer.className = player + '-new-face';
  buttonContainer.appendChild(animatedContainer);

  const cardButtonID = player + '-mat-' + playedPosition + '-button';
  document.getElementById(cardButtonID).className = player + '-old-face';
}

const transformAnimationReverse = (player, playedPosition) => {
  const cardButtonID = player + '-mat-' + playedPosition + '-button';
  document.getElementById(cardButtonID).className = player + '-mat-card-button';

  const animatedContainerID = player + '-transformed-' + playedPosition;
  document.getElementById(animatedContainerID).remove();
}