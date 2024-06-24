const reverseOwnPowerBracket = (powerBracket, levelBracket, i) => {
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

  levelBracket[i].monPower = 0;
  levelBracket[i].monType = ''; 
  levelBracket[i].source = '';
  levelBracket[i].sourcePlayer = ''; 
  levelBracket[i].recoverable = true;
}

const reverseOwnPower = (powerBracket, i) => {
  powerBracket[i].OGP = 0;
  powerBracket[i].absorbedPU = 0;
}
const reversePos0PU = (powerBracket, i) => {
  powerBracket[i].allyPos0flatPU = 0;
  powerBracket[i].allyPos0mPU = 1;
}

const reversePos1PU = (powerBracket, i) => {
  powerBracket[i].allyPos1flatPU = 0;
  powerBracket[i].allyPos1mPU = 1;
}

const reversePos2PU = (powerBracket, i) => {
  powerBracket[i].allyPos2flatPU = 0;
  powerBracket[i].allyPos2mPU = 1;
}

const reversePosHPU = (allyPowerBracket, foePowerBracket) => {
  for (let i = 0; i < 3; i++) {
    allyPowerBracket[i].allyPosHflatPU = 0;
    allyPowerBracket[i].allyPosHmPU = 1;
    foePowerBracket[i].foePosHflatPU = 0;
    foePowerBracket[i].foePosHmPU = 1;
  }
  allyPowerBracket[3].allyFlatPU = 0;
  allyPowerBracket[3].foeFlatPU = 0;
  allyPowerBracket[3].absorbedPU = 0;
}

const reversePosSPPU = (allyPowerBracket, foePowerBracket) => {
  for (let i = 0; i < 3; i++) {
    allyPowerBracket[i].allyPosSPflatPU = 0;
    allyPowerBracket[i].allyPosSPmPU = 1;
    foePowerBracket[i].foePosSPflatPU = 0;
    foePowerBracket[i].foePosSPmPU = 1;
  }
  allyPowerBracket[4].allyFlatPU = 0;
  allyPowerBracket[4].foeFlatPU = 0;
  allyPowerBracket[4].absorbedPU = 0;
}

const reversePowerBracket = (player, playedPosition, fullReverse) => {
  if (player === 'p1' && playedPosition === 'sky') {
    if (fullReverse === true) {
      reverseOwnPowerBracket(p1PowerBracket, p1LevelUpBracket, 0);
    } else {
      reverseOwnPower(p1PowerBracket, 0);
    }
    reversePos0PU(p1PowerBracket, 1);
    reversePos0PU(p1PowerBracket, 2);
    for (let j = 0; j < 3; j++) {
      p2PowerBracket[j].foePos0flatPU = 0;
      p2PowerBracket[j].foePos0mPU = 1;
    }
  } else if (player === 'p1' && playedPosition === 'left') {
    if (fullReverse === true) {
      reverseOwnPowerBracket(p1PowerBracket, p1LevelUpBracket, 1);
    } else {
      reverseOwnPower(p1PowerBracket, 1);
    }
    reversePos1PU(p1PowerBracket, 0);
    reversePos1PU(p1PowerBracket, 2);
    for (let j = 0; j < 3; j++) {
      p2PowerBracket[j].foePos1flatPU = 0;
      p2PowerBracket[j].foePos1mPU = 1;
    }
  } else if (player === 'p1' && playedPosition === 'right') {
    if (fullReverse === true) {
      reverseOwnPowerBracket(p1PowerBracket, p1LevelUpBracket, 2);
    } else {
      reverseOwnPower(p1PowerBracket, 2);
    }
    reversePos2PU(p1PowerBracket, 0);
    reversePos2PU(p1PowerBracket, 1);
    for (let j = 0; j < 3; j++) {
      p2PowerBracket[j].foePos2flatPU = 0;
      p2PowerBracket[j].foePos2mPU = 1;
    }
  } else if (player === 'p1' && playedPosition === 'help') {
    reversePosHPU(p1PowerBracket, p2PowerBracket);
  } else if (player === 'p1' && playedPosition === 'sp') {
    reversePosSPPU(p1PowerBracket, p2PowerBracket);
  } else if (player === 'p2' && playedPosition === 'sky') {
    if (fullReverse === true) {
      reverseOwnPowerBracket(p2PowerBracket, p2LevelUpBracket, 0);
    } else {
      reverseOwnPower(p2PowerBracket, 0);
    }
    reversePos0PU(p2PowerBracket, 1);
    reversePos0PU(p2PowerBracket, 2);
    for (let j = 0; j < 3; j++) {
      p1PowerBracket[j].foePos0flatPU = 0;
      p1PowerBracket[j].foePos0mPU = 1;
    }
  } else if (player === 'p2' && playedPosition === 'left') {
    if (fullReverse === true) {
      reverseOwnPowerBracket(p2PowerBracket, p2LevelUpBracket, 1);
    } else {
      reverseOwnPower(p2PowerBracket, 1);
    }
    reversePos1PU(p2PowerBracket, 0);
    reversePos1PU(p2PowerBracket, 2);
    for (let j = 0; j < 3; j++) {
      p1PowerBracket[j].foePos1flatPU = 0;
      p1PowerBracket[j].foePos1mPU = 1;
    }
  } else if (player === 'p2' && playedPosition === 'right') {
    if (fullReverse === true) {
      reverseOwnPowerBracket(p2PowerBracket, p2LevelUpBracket, 2);
    } else {
      reverseOwnPower(p2PowerBracket, 2);
    }
    reversePos2PU(p2PowerBracket, 0);
    reversePos2PU(p2PowerBracket, 1);
    for (let j = 0; j < 3; j++) {
      p1PowerBracket[j].foePos2flatPU = 0;
      p1PowerBracket[j].foePos2mPU = 1;
    }
  } else if (player === 'p2' && playedPosition === 'help') {
    reversePosHPU(p2PowerBracket, p1PowerBracket);  
  } else if (player === 'p2' && playedPosition === 'sp') {
    reversePosSPPU(p2PowerBracket, p1PowerBracket);
  }
}

// remove power-up and multiplier from the foe's cards
const nullPowerup = (foePowerBracket, myPowerBracket, i) => {
  if (i >= 3) {
    foePowerBracket[i].absorbedPU = 0;
    foePowerBracket[i].allyFlatPU = 0;
    myPowerBracket[i].foeFlatPU = 0;
  } else {
    foePowerBracket[i].allyPosSumflatPU = 0;
    foePowerBracket[i].allyPosSummPU = 1;
    foePowerBracket[i].allyPos0flatPU = 0;
    foePowerBracket[i].allyPos0mPU = 1;
    foePowerBracket[i].allyPos1flatPU = 0;
    foePowerBracket[i].allyPos1mPU = 1;
    foePowerBracket[i].allyPos2flatPU = 0;
    foePowerBracket[i].allyPos2mPU = 1;
    foePowerBracket[i].allyPosHflatPU = 0;
    foePowerBracket[i].allyPosHmPU = 1;
    foePowerBracket[i].allyPosSPflatPU = 0;
    foePowerBracket[i].allyPosSPmPU = 1;
    foePowerBracket[i].absorbedPU = 0;
    
    myPowerBracket[i].foePosSumflatPU = 0;
    myPowerBracket[i].foePosSummPU = 1;
    myPowerBracket[i].foePos0flatPU = 0;
    myPowerBracket[i].foePos0mPU = 1;
    myPowerBracket[i].foePos1flatPU = 0;
    myPowerBracket[i].foePos1mPU = 1;
    myPowerBracket[i].foePos2flatPU = 0;
    myPowerBracket[i].foePos2mPU = 1;
    myPowerBracket[i].foePosHflatPU = 0;
    myPowerBracket[i].foePosHmPU = 1;
    myPowerBracket[i].foePosSPflatPU = 0;
    myPowerBracket[i].foePosSPmPU = 1;
  }
}

// pull the power adjustment value from summoner adjustment history
const pullSummonerAdj = (player, viewedPowerBracket) => {
  viewedPowerBracket.allyFlatPU = findSummonerAdjHist(player)[0].adjValue;
  viewedPowerBracket.foeFlatPU = findSummonerAdjHist(player)[1].adjValue;
}

const pullSummonerAdjUnderHammer = (player, viewedPowerBracket) => {
  if (findSummonerAdjHist(player)[0].recoverable === false) {
    viewedPowerBracket.allyFlatPU = findSummonerAdjHist(player)[0].adjValue;
  }
  if (findSummonerAdjHist(player)[1].recoverable === false) {
    viewedPowerBracket.foeFlatPU = findSummonerAdjHist(player)[1].adjValue;
  }
}

// Push the 修正值 (i.e., powerUp) to power brackets
const pushPowerUpStep2 = (player, monTypeOrClass, viewedPowerBracket, powerUpString, i) => {
  if (i > 0) {
      let powerUpType = powerUpString.substring(i-5,i-3);
      let powerUpValue = parseInt(powerUpString.substring(i-3,i));
    
      if (monTypeOrClass === powerUpType) {
        viewedPowerBracket.allyPosSumflatPU += powerUpValue;
      // reminder: the first and second characters of monType are always identical
      } else if (monTypeOrClass.substring(0,1) === monTypeOrClass.substring(1,2) && monTypeOrClass !== '' && powerUpType === 'XX') {
        viewedPowerBracket.allyPosSumflatPU += powerUpValue;
        console.log('XX is triggered', monTypeOrClass);
      }
  i -= 5;
  pushPowerUpStep2(player, monTypeOrClass, viewedPowerBracket, powerUpString, i);
  }
}

const pushPowerUp = (player, matArrays, viewedCard, viewedPowerBracket) => {
  if (viewedCard[viewedCard.length-1].cardType === 'Mon') {
    let powerUpString = matArrays[5][0].powerUp;
      pushPowerUpStep2(player, viewedCard[viewedCard.length-1].monType, viewedPowerBracket, powerUpString, powerUpString.length);
      pushPowerUpStep2(player, viewedCard[viewedCard.length-1].monClass, viewedPowerBracket, powerUpString, powerUpString.length);
  }
}

// Compute total power using power bracket
const computeMonPower = (player, powerBracket, matArrays, computeResolve) => {
  let powerValue = 0;
  new Promise(function(resolve) {
    for (let i = 0; i < 3; i++) {powerBracket[i].allyPosSumflatPU = 0;}
    // the formula is different if the player has been hit by hammer
    if (hitByHammer.includes(player) === true) {
      for (let i = 0; i < 6; i++) {
        if (i === 3 || i === 4) {continue;}
        if (matArrays[i].length > 0) {
          if (i === 5) {
            pullSummonerAdjUnderHammer(player, powerBracket[i]);
            powerValue = powerValue + powerBracket[i].allyFlatPU + powerBracket[i].foeFlatPU;
            resolve();
          } else {
            if (matArrays[i][matArrays[i].length-1].upsideDown === false) {
              powerBracket[i].OGP = matArrays[i][matArrays[i].length-1].monPower;
              powerValue = powerValue + powerBracket[i].OGP;
            } else {
              powerBracket[i].OGP = 0;
            }
          }
        }
      }
    } else {
      // formula for normally computing power
      for (let i = 0; i < 6; i++) {
        if (matArrays[i].length > 0) {
          if (i === 5) {
            pullSummonerAdj(player, powerBracket[i]);
            powerValue = powerValue + powerBracket[i].allyFlatPU + powerBracket[i].foeFlatPU;
            resolve();
          } else if (i >= 3) {
            if (matArrays[i][matArrays[i].length-1].upsideDown === false) {
              powerValue = powerValue + (powerBracket[i].allyFlatPU + powerBracket[i].foeFlatPU + powerBracket[i].absorbedPU);
            }
          } else {
            if (matArrays[i][matArrays[i].length-1].upsideDown === false) {
              powerBracket[i].OGP = matArrays[i][matArrays[i].length-1].monPower;
              if (matArrays[5][0].powerupVoided === false) {pushPowerUp(player, matArrays, matArrays[i], powerBracket[i]);} 
              
              powerValue = powerValue + (powerBracket[i].OGP * powerBracket[i].allyPosSummPU * powerBracket[i].allyPos0mPU 
                * powerBracket[i].allyPos1mPU * powerBracket[i].allyPos2mPU * powerBracket[i].allyPosHmPU * powerBracket[i].allyPosSPmPU 
                * powerBracket[i].foePosSummPU * powerBracket[i].foePos0mPU * powerBracket[i].foePos1mPU * powerBracket[i].foePos2mPU 
                * powerBracket[i].foePosHmPU * powerBracket[i].foePosSPmPU + powerBracket[i].allyPosSumflatPU + powerBracket[i].allyPos0flatPU 
                + powerBracket[i].allyPos1flatPU + powerBracket[i].allyPos2flatPU + powerBracket[i].allyPosHflatPU + powerBracket[i].allyPosSPflatPU
                + powerBracket[i].foePosSumflatPU + powerBracket[i].foePos0flatPU + powerBracket[i].foePos1flatPU + powerBracket[i].foePos2flatPU 
                + powerBracket[i].foePosHflatPU + powerBracket[i].foePosSPflatPU + powerBracket[i].absorbedPU);
            } else {
              powerBracket[i].OGP = 0;
            }
          }
        }
      }
    }
  }).then(func => {
    // p1PowerAdj and p2PowerAdj are a global variables informed by balanceEffect()
    if (player === 'p1') {
      p1Power = powerValue + p1PowerAdj;
      console.log(player, p1Power);
    } else {
      p2Power = powerValue + p2PowerAdj;
      console.log(player, p2Power);
    }
    computeResolve();
  })
}

// Compute total power, including flat increase from Summoner/Help/SP
const computeTotalPower = (myResolve) => {
  new Promise(function(computeResolve) {
    computeMonPower('p1', p1PowerBracket, p1MatArrays, computeResolve);
  }).then(func => {
    new Promise(function(computeResolve2) {
      computeMonPower('p2', p2PowerBracket, p2MatArrays, computeResolve2);
    }).then(func => {
      myResolve();
    })
  })
}