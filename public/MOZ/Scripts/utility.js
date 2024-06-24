const coinFlip = () => {
  p1Coin = Math.random(9);
  p2Coin = Math.random(9);
  if (p1Coin >= p2Coin) {
    return true;  
  } else {
    return false;
  }
}

const findVictim = (player) => {
    if (player === 'p1') {
      return 'p2';
    } else {
      return 'p1';
    }
}

const findMatArrays = (player) => {
  if (player === 'p1') {
    return p1MatArrays;
  } else {
    return p2MatArrays;
  }
}

const findPowerBracket = (player) => {
  if (player === 'p1') {
    return p1PowerBracket;
  } else {
    return p2PowerBracket;
  }
}

const findLevelUpBracket = (player) => {
  if (player === 'p1') {
    return p1LevelUpBracket;
  } else {
    return p2LevelUpBracket;
  }
}

const findHand = (player) => {
  if (player === 'p1') {
    return p1Hand;
  } else {
    return p2Hand;
  }
}

const findDeck = (player) => {
  if (player === 'p1') {
    return p1Deck;
  } else {
    return p2Deck;
  }
}

const findPlayerName = (player) => {
  if (player === 'p1') {
    return p1Name;
  } else {
    return p2Name;
  }
}

const findPlayerScore = (player) => {
  if (player === 'p1') {
    return p1Score;
  } else {
    return p2Score;
  }
}

const findPUHist = (player) => {
  if (player === 'p1') {
    return p1PowerupHist;
  } else {
    return p2PowerupHist;
  }
}

const findSummonerAdjHist = (player) => {
  if (player === 'p1') {
    return p1SummonerAdjHist;
  } else {
    return p2SummonerAdjHist;
  }
}

const findSafeHouse = (player) => {
  if (player === 'p1') {
    return p1SafeHouse;
  } else {
    return p2SafeHouse;
  }
}

const findBannedInTurn = (player) => {
  if (player === 'p1') {
    return p1BannedEffectInTurn;
  } else {
    return p2BannedEffectInTurn;
  }
}

const findBannedInTurnNR = (player) => {
  if (player === 'p1') {
    return p1BannedEffectInTurnNR;
  } else {
    return p2BannedEffectInTurnNR;
  }
}

const findBannedInGame = (player) => {
  if (player === 'p1') {
    return p1BannedEffectInGame;
  } else {
    return p2BannedEffectInGame;
  }
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const countPlayedCards = (playedCards) => {
  let p1PlayedCards = 0;
  if (p1Sky.length > 0) {p1PlayedCards += 1};
  if (p1Left.length > 0) {p1PlayedCards += 1};
  if (p1Right.length > 0) {p1PlayedCards += 1};
  if (p1Help.length > 0) {p1PlayedCards += 1};
  let p2PlayedCards = 0;
  if (p2Sky.length > 0) {p2PlayedCards += 1};
  if (p2Left.length > 0) {p2PlayedCards += 1};
  if (p2Right.length > 0) {p2PlayedCards += 1};
  if (p2Help.length > 0) {p2PlayedCards += 1};
  playedCards.push(p1PlayedCards);
  playedCards.push(p2PlayedCards);
}

const disableP1PlayButtons = () => {
  for (let i = p1Hand.length; i > 0; i--) {
    cardslot = "p1-hand-c" + i + '-button';
    document.getElementById(cardslot).disabled = true;
  }
}

const confirmFlag = (player, playedPosition, flagName) => {
  if (player === 'p1') {
    if (playedPosition === 'sky') {
      if (flagName === 'RecoverableTier1') {
        return p1SkyRecoverableTier1;
      } else if (flagName === 'RecoverableTier2') {
        return p1SkyRecoverableTier2;
      } else if (flagName === 'occupiedFlag') {
        return p1SkyOccupied;
      } else if (flagName === 'attackFlag') {
        return p1SkyAttacked;
      } else {
        console.log('invalid flagName')
      }
    } else if (playedPosition === 'left') {
      if (flagName === 'RecoverableTier1') {
        return p1LeftRecoverableTier1;
      } else if (flagName === 'RecoverableTier2') {
        return p1LeftRecoverableTier2;
      } else if (flagName === 'occupiedFlag') {
        return p1LeftOccupied;
      } else if (flagName === 'attackFlag') {
        return p1LeftAttacked;
      } else {
        console.log('invalid flagName')
      }
    } else if (playedPosition === 'right') {
      if (flagName === 'RecoverableTier1') {
        return p1RightRecoverableTier1;
      } else if (flagName === 'RecoverableTier2') {
        return p1RightRecoverableTier2;
      } else if (flagName === 'occupiedFlag') {
        return p1RightOccupied;
      } else if (flagName === 'attackFlag') {
        return p1RightAttacked;
      } else {
        console.log('invalid flagName')
      }
    } else if (playedPosition === 'help') {
      if (flagName === 'RecoverableTier1') {
        return p1HelpRecoverableTier1;
      } else if (flagName === 'RecoverableTier2') {
        return p1HelpRecoverableTier2;
      } else if (flagName === 'occupiedFlag') {
        return p1HelpOccupied;
      } else if (flagName === 'attackFlag') {
        return p1HelpAttacked;
      } else {
        console.log('invalid flagName')
      }
    } else if (playedPosition === 'sp') {
      if (flagName === 'RecoverableTier1') {
        return p1SPRecoverableTier1;
      } else if (flagName === 'RecoverableTier2') {
        return p1SPRecoverableTier2;
      } else if (flagName === 'attackFlag') {
        return p1SPAttacked;
      } else {
        console.log('invalid flagName')
      }
    }
  } else {
    if (playedPosition === 'sky') {
      if (flagName === 'RecoverableTier1') {
        return p2SkyRecoverableTier1;
      } else if (flagName === 'RecoverableTier2') {
        return p2SkyRecoverableTier2;
      } else if (flagName === 'occupiedFlag') {
        return p2SkyOccupied;
      } else if (flagName === 'attackFlag') {
        return p2SkyAttacked;
      } else {
        console.log('invalid flagName')
      }
    } else if (playedPosition === 'left') {
      if (flagName === 'RecoverableTier1') {
        return p2LeftRecoverableTier1;
      } else if (flagName === 'RecoverableTier2') {
        return p2LeftRecoverableTier2;
      } else if (flagName === 'occupiedFlag') {
        return p2LeftOccupied;
      } else if (flagName === 'attackFlag') {
        return p2LeftAttacked;
      } else {
        console.log('invalid flagName')
      }
    } else if (playedPosition === 'right') {
      if (flagName === 'RecoverableTier1') {
        return p2RightRecoverableTier1;
      } else if (flagName === 'RecoverableTier2') {
        return p2RightRecoverableTier2;
      } else if (flagName === 'occupiedFlag') {
        return p2RightOccupied;
      } else if (flagName === 'attackFlag') {
        return p2RightAttacked;
      } else {
        console.log('invalid flagName')
      }
    } else if (playedPosition === 'help') {
      if (flagName === 'RecoverableTier1') {
        return p2HelpRecoverableTier1;
      } else if (flagName === 'RecoverableTier2') {
        return p2HelpRecoverableTier2;
      } else if (flagName === 'occupiedFlag') {
        return p2HelpOccupied;
      } else if (flagName === 'attackFlag') {
        return p2HelpAttacked;
      } else {
        console.log('invalid flagName')
      }
    } else if (playedPosition === 'sp') {
      if (flagName === 'RecoverableTier1') {
        return p2SPRecoverableTier1;
      } else if (flagName === 'RecoverableTier2') {
        return p2SPRecoverableTier2;
      } else if (flagName === 'attackFlag') {
        return p2SPAttacked;
      } else {
        console.log('invalid flagName')
      }
    }
  }
}

const updateRecoverableTier1 = (player, playedPosition, tempoUD) => {
  let recoverableTier1;
  if (tempoUD === 1) {
    recoverableTier1 = true;
  } else if (tempoUD === 0) {
    recoverableTier1 = false;
  };

  if (player === 'p1' && playedPosition === 'sky') {
    p1SkyRecoverableTier1 = recoverableTier1;
  } else if (player === 'p1' && playedPosition === 'left') {
    p1LeftRecoverableTier1 = recoverableTier1;
  } else if (player === 'p1' && playedPosition === 'right') {
    p1RightRecoverableTier1 = recoverableTier1;
  } else if (player === 'p1' && playedPosition === 'help') {
    p1HelpRecoverableTier1 = recoverableTier1;
  } else if (player === 'p2' && playedPosition === 'sky') {
    p2SkyRecoverableTier1 = recoverableTier1;
  } else if (player === 'p2' && playedPosition === 'left') {
    p2LeftRecoverableTier1 = recoverableTier1;
  } else if (player === 'p2' && playedPosition === 'right') {
    p2RightRecoverableTier1 = recoverableTier1;
  } else if (player === 'p2' && playedPosition === 'help') {
    p2HelpRecoverableTier1 = recoverableTier1;
  }
}

const arrayToPosition = (matArray) => {
  if (matArray === p1Sky || matArray === p2Sky) {
    return 'sky';
  } else if (matArray === p1Left || matArray === p2Left) {
    return 'left';
  } else if (matArray === p1Right || matArray === p2Right) {
    return 'right';
  } else if (matArray === p1Help || matArray === p2Help) {
    return 'help';
  } else if (matArray === p1SP || matArray === p2SP) {
    return 'sp';
  } else {
    console.log('something is wrong with matArray');
  }
}

const positionToArray = (player, playedPosition) => {
  if (player === 'p1' && playedPosition === 'sky') {
    return p1Sky;
  } else if (player === 'p1' && playedPosition === 'left') {
    return p1Left;
  } else if (player === 'p1' && playedPosition === 'right') {
    return p1Right;
  } else if (player === 'p1' && playedPosition === 'help') {
    return p1Help;
  } else if (player === 'p1' && playedPosition === 'sp') {
    return p1SP;
  } else if (player === 'p2' && playedPosition === 'sky') {
    return p2Sky;
  } else if (player === 'p2' && playedPosition === 'left') {
    return p2Left;
  } else if (player === 'p2' && playedPosition === 'right') {
    return p2Right;
  } else if (player === 'p2' && playedPosition === 'help') {
    return p2Help;
  } else if (player === 'p2' && playedPosition === 'sp') {
    return p2SP;
  }
}

const returnTitle = (exp) => {
  let playerTitle = [];
  if (exp < 100) {
    playerTitle.push(0);
    playerTitle.push('見習大師');
  } else if (exp < 300) {
    playerTitle.push(1);
    playerTitle.push('方舟大師');
  } else if (exp < 900) {
    playerTitle.push(2);
    playerTitle.push('光明大師');
  } else if (exp < 2700) {
    playerTitle.push(3);
    playerTitle.push('彗星大師');
  } else if (exp < 8100) {
    playerTitle.push(4);
    playerTitle.push('泥盆大師');
  } else if (exp < 24300) {
    playerTitle.push(5);
    playerTitle.push('地域大師');
  } else if (exp < 72900) {
    playerTitle.push(6);
    playerTitle.push('檔案大師');
  } else {
    playerTitle.push(7);
    playerTitle.push('見習大師');
  }
  return playerTitle;
}

const typeTranslator = (typeSymbol) => {
  if (typeSymbol === 'AA') {
    translatedType = '大氣';
  } else if (typeSymbol === 'CC') {
    translatedType = '宇宙';
  } else if (typeSymbol === 'DD') {
    translatedType = '闇';
  } else if (typeSymbol === 'EE') {
    translatedType = '大地';
  } else if (typeSymbol === 'FF') {
    translatedType = '火';
  } else if (typeSymbol === 'GG') {
    translatedType = '森';
  } else if (typeSymbol === 'HH') {
    translatedType = '星';
  } else if (typeSymbol === 'KK') {
    translatedType = '黃金';
  } else if (typeSymbol === 'LL') {
    translatedType = '光';
  } else if (typeSymbol === 'MM') {
    translatedType = '機械';
  } else if (typeSymbol === 'NN') {
    translatedType = '無';
  } else if (typeSymbol === 'OO') {
    translatedType = '魔';
  } else if (typeSymbol === 'SS') {
    translatedType = '貝';
  } else if (typeSymbol === 'WW') {
    translatedType = '水';
  } else if (typeSymbol === 'YY') {
    translatedType = '電氣';
  } else if (typeSymbol === 'ZZ') {
    translatedType = '次元';
  } else {
    translatedType = '';
  }
  return translatedType;
}