// ! to be expanded as more series are added
const restrictionCheck = (team, deck) => {
  let restrictionMet = true;
  // madoushuu = 魔導衆
  if (team === 'madoushuu') {
    deck.forEach(item => {
      if (item.restriction !== team && item.cardID !== 'S072' && item.cardID !== 'S109' && item.cardID !== 'MS109') {
        restrictionMet = false;
      }
    })
  // angaidou = 闇外道
  } else if (team === 'angaidou') {
    deck.forEach(item => {
      if (item.restriction !== team && item.cardID !== 'S211' && item.cardID !== 'MS110') {
        restrictionMet = false;
      }
    })
  // by default, only the restriction property is checked, e.g., kageshinobu
  } else {
    deck.forEach(item => {
      if (item.restriction !== team ) {restrictionMet = false}
    })
  }
  return restrictionMet;
}

// don't link this script to Gameplay.html, which doesn't have 'legality-check-result'
const legalityCheck = (needReturn) => {
  const msgBox = document.getElementById('legality-check-result');
  msgBox.innerHTML = '';
  let deckLegal = false;
  if (activeDeck > 1) {
    deckLegal = true;
    let tempSDeck = playerDeck.filter(item => item.cardType === 'sum');
    let tempDeck = playerDeck.filter(item => item.cardType !== 'sum');
    let restrictionMet = true;
    let disasterCardNum = 0;
    let nullCardNum = 0;
    let miracleCardNum = 0;
    let graveCardNum = 0;
    let SPLockCardNum = 0;
    let hundredDRNum = 0;
    let moreThan12 = false;
    let cardSeries = [];
    let seriesClash = false;
    const blockCards = ['116', '170', '171', '235'];
    let blockCardNum = 0;
    let duplicateFound = false;
    let summonerLevels = {lv012: 0, lv34: 0, lv5: 0, lv6: 0, lv7: 0};
    const powerPossibilities = [-200, -100, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 200, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // check if the deck contains multipe series
    playerDeck.forEach(item => {
      if (cardSeries.includes(item.cardSeries) === false) {
        cardSeries.push(item.cardSeries);
      }
    })
    // if the deck contains multiple series, check if the 50 cards all come from meiro
    if (cardSeries.length > 1) {
      if (tempDeck.filter(item => item.cardSeries !== 'meiro').length > 0) {
        seriesClash = true;
      // then, check if the sDeck contains any meiro cards
      } else {
        let meiroSCards = tempSDeck.filter(item => item.cardSeries === 'meiro');
        if (meiroSCards.length === 0) {
          seriesClash = true;
        // finally, check if those meiro sCards do not have team or are 黑、白魔術師; restrictionCheck() will take care of the rest
        } else {
          if (meiroSCards.filter(item => item.team === '' || item.team === 'hakumajutsushi' || item.team === 'kuromajutsushi').length > 0) {
            seriesClash = true;
          }
        }
      }
    }

    if (tempSDeck.length > 0) {
      tempSDeck.forEach(item => {
        if (item.summonerLevel >= 7) {
          summonerLevels.lv7 += 1;
        } else if (item.summonerLevel === 6) {
          summonerLevels.lv6 += 1;
        } else if (item.summonerLevel === 5) {
          summonerLevels.lv5 += 1;
        } else if (item.summonerLevel >= 3) {
          summonerLevels.lv34 += 1;
        } else {
          summonerLevels.lv012 += 1;
        }
      })
      // checking for 強制軍團 only happens when the sDeck length is 5, to save computing power
      if (tempSDeck.length === 5 && tempSDeck.filter(item => item.deckRestriction === true).length > 0) {
        if (tempSDeck.filter(item => item.restriction === 'madoushuu').length > 0) {
          restrictionMet = restrictionCheck('madoushuu', tempSDeck);
        } else if (tempSDeck.filter(item => item.restriction === 'kageshinobu').length > 0) {
          restrictionMet = restrictionCheck('kageshinobu', tempSDeck);
        } else if (tempSDeck.filter(item => item.restriction === 'angaidou').length > 0) {
          restrictionMet = restrictionCheck('angaidou', tempSDeck);
        } 
      }
      // checking for duplicates; this methods for cards with ver C
      if (tempSDeck.length > 1) {
        let numArray = [];
        tempSDeck.forEach(item => {
          if (item.cardID.substring(item.cardID.length-1, item.cardID.length) === 'B' || item.cardID.substring(item.cardID.length-1, item.cardID.length) === 'C') {
            numArray.push(item.cardID.substring(0, item.cardID.length-1));
          } else {
            numArray.push(item.cardID);
          }
        })
        numArray.sort();
        for (let i = 1; i < numArray.length; i++) {
          if (duplicateFound === true) {break}
          if (numArray[i] === numArray[i-1]) {
            duplicateFound = true;
          }
        }
      }
    }   

    if (tempDeck.length > 0) {
      disasterCardNum = tempDeck.filter(item => item.monClass === 'Disaster').length;
      nullCardNum = tempDeck.filter(item => item.monClass.includes('Null') === true).length;
      miracleCardNum = tempDeck.filter(item => item.monClass === 'Miracle').length;
      SPLockCardNum = tempDeck.filter(item => item.cardType === 'Mon' && item.monClass === 'SL').length;
      graveCardNum = tempDeck.filter(item => item.monClass === 'helpGrave' || item.monClass === 'monGrave').length;
      hundredDRNum = tempDeck.filter(item => item.cardID === '273' || (item.monClass === 'DR' && item.monPower === 100)).length;
      blockCardNum = tempDeck.filter(item => blockCards.includes(item.cardID)).length;

      for (let i = 0; i < powerPossibilities.length; i++) {
        if (moreThan12 === true) {break}
        let samePower = tempDeck.filter(item => item.cardType === 'Mon' && item.monPower === powerPossibilities[i]).length;
        if (samePower > 12) {
          moreThan12 = true;
        }
      }
      // checking for duplicates
      // ! this method doesn't work if non-sum cards have ver C
      if (tempDeck.length > 1) {
        let BCbracket = [];
        tempDeck.forEach(item => {
          if (item.cardID.substring(item.cardID.length-1, item.cardID.length) === 'B' || item.cardID.substring(item.cardID.length-1, item.cardID.length) === 'C') {
            BCbracket.push(item.cardID.substring(0, item.cardID.length-1));
          }
        })
        if (BCbracket.length > 0) {
          for (let i = 0; i < tempDeck.length; i++) {
            if (duplicateFound === true) {break}
            if (BCbracket.includes(tempDeck[i].cardID) === true) {
              duplicateFound = true;
            }
          }
        }        
      }
    }

    if (tempSDeck.length !== 5) {
      const warning = document.createElement('div');
      warning.className = 'legality-check-result';
      warning.innerText = '一副咭組必須有 5 張召喚師咭';
      msgBox.appendChild(warning);
      deckLegal = false;
    }

    if (tempDeck.length !== 50) {
      const warning = document.createElement('div');
      warning.className = 'legality-check-result';
      warning.innerText = '一副咭組必須有 50 張召喚師以外的咭';
      msgBox.appendChild(warning);
      deckLegal = false;
    }

    if (seriesClash === true) {
      const warning = document.createElement('div');
      warning.className = 'legality-check-result';
      warning.innerText = '咭組內的咭必須來自同一個編章';
      msgBox.appendChild(warning);
      deckLegal = false;
    }

    if (summonerLevels.lv7 > 1) {
      const warning = document.createElement('div');
      warning.className = 'legality-check-result';
      warning.innerText = '一副咭組不可以有多於 1 張 LV 7 或以上的召喚師';
      msgBox.appendChild(warning);
      deckLegal = false;
    }

    if (summonerLevels.lv6 > 1) {
      const warning = document.createElement('div');
      warning.className = 'legality-check-result';
      warning.innerText = '一副咭組不可以有多於 1 張 LV 6 的召喚師';
      msgBox.appendChild(warning);
      deckLegal = false;
    }

    if (summonerLevels.lv5 > 1) {
      const warning = document.createElement('div');
      warning.className = 'legality-check-result';
      warning.innerText = '一副咭組不可以有多於 1 張 LV 5 的召喚師';
      msgBox.appendChild(warning);
      deckLegal = false;
    }

    if (summonerLevels.lv34 < 1) {
      const warning = document.createElement('div');
      warning.className = 'legality-check-result';
      warning.innerText = '一副咭組必須有至少 1 張 LV 3 或 LV 4 的召喚師咭';
      msgBox.appendChild(warning);
      deckLegal = false;
    }

    if (summonerLevels.lv012 < 1) {
      const warning = document.createElement('div');
      warning.className = 'legality-check-result';
      warning.innerText = '一副咭組必須有至少 1 張 LV 2 或以下的召喚師';
      msgBox.appendChild(warning);
      deckLegal = false;
    }

    if (restrictionMet === false) {
      const warning = document.createElement('div');
      warning.className = 'legality-check-result';
      warning.innerText = '請注意某些召喚師只可與指定的咭入咭組';
      msgBox.appendChild(warning);
      deckLegal = false;
    }

    if (duplicateFound === true) {
      const warning = document.createElement('div');
      warning.className = 'legality-check-result';
      warning.innerText = '相同咭號的咭不可以放多於 1 張';
      msgBox.appendChild(warning);
      deckLegal = false;
    }

    if (disasterCardNum > 1) {
      const warning = document.createElement('div');
      warning.className = 'legality-check-result';
      warning.innerText = '一副咭組不可以有多於 1 張天災咭';
      msgBox.appendChild(warning);
      deckLegal = false;
    }

    if (nullCardNum > 1) {
      const warning = document.createElement('div');
      warning.className = 'legality-check-result';
      warning.innerText = '一副咭組不可以有多於 1 張無效咭（例如惡魔的劣行，鬼的劣行）';
      msgBox.appendChild(warning);
      deckLegal = false;
    }

    if (miracleCardNum > 1) {
      const warning = document.createElement('div');
      warning.className = 'legality-check-result';
      warning.innerText = '一副咭組不可以有多於 1 張天之奇蹟';
      msgBox.appendChild(warning);
      deckLegal = false;
    }

    if (graveCardNum > 1) {
      const warning = document.createElement('div');
      warning.className = 'legality-check-result';
      warning.innerText = '一副咭組不可以有多於 1 張送還咭';
      msgBox.appendChild(warning);
      deckLegal = false;
    }
    
    if (SPLockCardNum > 2) {
      const warning = document.createElement('div');
      warning.className = 'legality-check-result';
      warning.innerText = '一副咭組不可以有多於 2 張SP封鎖';
      msgBox.appendChild(warning);
      deckLegal = false;
    }

    if (hundredDRNum > 5) {
      const warning = document.createElement('div');
      warning.className = 'legality-check-result';
      warning.innerText = '一副咭組不可以有多於 5 張 100 龍';
      msgBox.appendChild(warning);
      deckLegal = false;
    }

    if (moreThan12 === true) {
      const warning = document.createElement('div');
      warning.className = 'legality-check-result';
      warning.innerText = '一副咭組不可以有多於 12 張相同力量值的召喚獸';
      msgBox.appendChild(warning);
      deckLegal = false;
    }
    // ? to revisit if this rule is applicable to non-gurifu series
    if (blockCardNum > 3) {
      const warning = document.createElement('div');
      warning.className = 'legality-check-result';
      warning.innerText = '以下的咭，一副咭組最多只可有 3 張：神之障壁（右方)，神之障壁（左方)，封截人和小封截人';
      msgBox.appendChild(warning);
      deckLegal = false;
    }

    if (deckLegal === true) {
      const cleanMsg = document.createElement('div');
      cleanMsg.className = 'legality-check-result';
      cleanMsg.innerText = playerProfile[activeDeck].deckName + '已經準備就緒。可以設為主力咭組。';
      msgBox.appendChild(cleanMsg);
    }
  }
  // used in setActive()
  if (needReturn === true) {
    return deckLegal;
  }
}