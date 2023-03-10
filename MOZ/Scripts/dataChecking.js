// commands for checking sCardDB data input:
sCardDB.forEach(card => {
  if (Number.isInteger(card.summonerLevel) === false) {
    console.log('sommonerLevel check failed:', card.cardID, card.summonerLevel);
  }
})

sCardDB.forEach(card => {
  if (Math.floor(card.summonerType.length/2) !== Math.floor((card.summonerType.length+1)/2) 
    || (card.summonerType.substring(0,1) !== card.summonerType.substring(1,2))) {
    console.log('sommonerType length check failed:',card.cardID, card.summonerType);
  }
})

sCardDB.forEach(card => {
  if (card.gender !== 'M' && card.gender !== 'F' && card.gender !== 'Unknown') {
    console.log('gender check failed:',card.cardID, card.gender);
  }
})

sCardDB.forEach(card => {
  if (card.ageKnown === true && Number.isInteger(card.age) === false) {
    console.log('age check failed:',card.cardID, card.age);
  }
})

sCardDB.forEach(card => {
  if (Number.isInteger(card.speed) === false) {
    console.log('speed check failed:', card.cardID, card.speed);
  }
})

sCardDB.forEach(card => {
  if (Math.floor(card.skyType.length/2) !== Math.floor((card.skyType.length+1)/2)) {
    console.log('skyType length check failed:',card.cardID, card.skyType);
  }
})

sCardDB.forEach(card => {
  if (Math.floor(card.leftType.length/2) !== Math.floor((card.leftType.length+1)/2)) {
    console.log('leftType length check failed:',card.cardID, card.leftType);
  }
})

sCardDB.forEach(card => {
  if (Math.floor(card.rightType.length/2) !== Math.floor((card.rightType.length+1)/2)) {
    console.log('rightType length check failed:',card.cardID, card.rightType);
  }
})

sCardDB.forEach(card => {
  if (card.powerUp.length % 5) {
    console.log('powerUp check failed:',card.cardID, card.powerUp);
  }
})

sCardDB.forEach(card => {
  if (card.cardPic.substring(card.cardPic.length-card.cardID.length-4, card.cardPic.length-4) !== card.cardID) {
    console.log('cardPic check failed:',card.cardID, card.cardPic);
  }
})

sCardDB.forEach(card => {
  if ((card.deckRestriction === false && card.restriction !== '') || (card.deckRestriction === true && card.restriction === '')) {
    console.log('deckRestriction check failed:',card.cardID, card.deckRestriction, card.restriction);
  }
})

/** insert the following into sCardDB.js for checking the commands above
cardID: 'S000',
    cardName: 'dummy4testing',
    cardType: 'sum',
    summonerLevel: 't',
    summonerType: 'K',
    gender: 'unknown',
    ageKnown: true,
    age: null,
    team: '',
    speed: 't',
    skyType: 'K',
    leftType: 'KMM',
    rightType: 'EKK',
    powerUp: 'K010',
    cardFunc: '',
    cardSeries: 'gurifu',
    cardPic: "SummonerCard/S600.jpg",
    deckRestriction: true,
    restriction: ''
  }, {
 */

// commands for checking cardDB data input:
cardDB.forEach(card => {
  if (card.cardType !== 'Mon' && card.cardType !== 'Ch' && card.cardType !== 'R' && card.cardType !== 'Help'
    && card.cardType !== 'SP' && card.cardType !== 'Help/SP') {
    console.log('cardType check failed:',card.cardID, card.cardType);
  }
})

cardDB.forEach(card => {
  if (card.cardType === 'Mon' && monTypes.includes(card.monType) === false) {
    console.log('monType check failed:',card.cardID, card.monType);
  }
})

cardDB.forEach(card => {
  if (card.cardType === 'Mon' && card.monClass !== '' && monClasses.includes(card.monClass) === false) {
    console.log('monClass check failed:',card.cardID, card.monClass);
  }
})

cardDB.forEach(card => {
  if (Number.isInteger(card.monPower) === false) {
    console.log('monPower check failed:',card.cardID, card.monPower);
  }
})

cardDB.forEach(card => {
  if (card.cardPic.substring(card.cardPic.length-card.cardID.length-4, card.cardPic.length-4) !== card.cardID) {
    console.log('cardPic check failed:',card.cardID, card.cardPic);
  }
})

cardDB.forEach(card => {
  if (card.override !== true && card.override !== false) {
    console.log('invalid override:',card.cardID);
  }
})


cardDB.forEach(card => {
  if (card.playRestriction !== true && card.playRestriction !== false) {
    console.log('invalid playRestriction:',card.cardID);
  }
})

cardDB.forEach(card => {
  if (card.cardType !== 'Ch' && card.cardType !== 'R' && card.override === true) {
    console.log('Please cross-check overrideAdjust.js for:',card.cardID);
  }
})

cardDB.forEach(card => {
  if (card.playRestriction === true) {
    console.log('Please cross-check preconditionCheck.js for:',card.cardID);
  }
})