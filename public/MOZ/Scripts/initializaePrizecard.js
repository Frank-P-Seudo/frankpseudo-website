let prizeCards = [];
let takeaway = [];
const p1Profile = JSON.parse(localStorage.getItem('p1Profile'));
const p2Profile = JSON.parse(localStorage.getItem('p2Profile'));

const initializePrizecard = () => {  
  if (Array.isArray(p1Profile) && Array.isArray(p2Profile)) {
    prizeCards = buildPrizes(p2Profile[0].deck);
    renderCollection(prizeCards);
    prizeCheck();
  } else {
    new Promise(function(promptResolve) {
      document.getElementById('take-prize-button').disabled = true;
      const dropDownBtns = document.getElementsByClassName('drop-down-button');
      for (let i = 0; i < dropDownBtns.length; i++) {dropDownBtns[i].disabled = true;}
      promptNoPrize(promptResolve);
    }).then(func => {
      window.location.replace("Deckbuilder.html");
    })
  }
}

const buildPrizes = (p2Deck) => {
  let prizePool = [];
  for (let i = 0; i < p2Deck.length; i++) {
    if (playerCollection.filter(card => card.cardID === p2Deck[i].cardID).length === 0) {
      prizePool.push(p2Deck[i]);
    }
  }
  
  prizePool.sort((a,b) => {
    if ((a.cardID.substring(0,1) === 'S' || a.cardID.substring(0,2) === 'MS' || a.cardID.substring(0,2) === 'NS') 
      && (b.cardID.substring(0,1) !== 'S' && b.cardID.substring(0,2) !== 'MS' && b.cardID.substring(0,2) !== 'NS')) {
      return -1
    } else if ((a.cardID.substring(0,1) !== 'S' && a.cardID.substring(0,2) !== 'MS' && a.cardID.substring(0,2) !== 'NS') 
    && (b.cardID.substring(0,1) === 'S' || b.cardID.substring(0,2) === 'MS' || b.cardID.substring(0,2) === 'NS')) {
      return 1
    } else if (a.cardID > b.cardID) {
      return 1
    } else {
      return -1
    }
  });
  
  let tempCollection = [];
  for (let i = 0; i < prizePool.length; i++) {
    if (prizePool[i].cardID.substring(0,1) === 'S' || prizePool[i].cardID.substring(0,2) === 'MS' || prizePool[i].cardID.substring(0,2) === 'NS') {
      sCardDB.forEach(sCard => {
        if (sCard.cardID === prizePool[i].cardID) {
          tempCollection.push({
            cardID: sCard.cardID,
            cardName: sCard.cardName,
            cardType: sCard.cardType,
            summonerLevel: sCard.summonerLevel,
            summonerType: sCard.summonerType,
            gender: sCard.gender,
            ageKnown: sCard.ageKnown,
            age: sCard.age,
            team: sCard.team,
            speed: sCard.speed,
            cardSeries: sCard.cardSeries,
            cardPic: sCard.cardPic,
            deckRestriction: sCard.deckRestriction,
            restriction: sCard.restriction
          })
        }
      })
    } else {
      cardDB.forEach(card => {
        if (card.cardID === prizePool[i].cardID) {
          tempCollection.push({
            cardID: card.cardID,
            cardName: card.cardName,
            cardType: card.cardType,
            monClass: card.monClass,
            monType: card.monType,
            monType2: card.monType2,
            monPower: card. monPower,
            cardFunc: card.cardFunc,
            cardSeries: card.cardSeries,
            cardPic: card.cardPic,
            override: card.override,
            playRestriction: card.playRestriction
          })
        }
      })
    }
  }
  return tempCollection;
}