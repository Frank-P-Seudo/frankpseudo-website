const drop = (ev) => {
  const dragCardID = ev.dataTransfer.getData('text/plain');
  // when the ev.target is drag-box-t and takeaway doesn't already have that card, move that card from prizeCards to takeaway
  if (ev.target.id === "drag-box-t" && takeaway.filter(card => card.cardID === dragCardID).length === 0) {
    prizeCards = prizeCards.filter(card => card.cardID !== dragCardID);
    if (dragCardID.substring(0,1) === 'S' || dragCardID.substring(0,2) === 'MS' || dragCardID.substring(0,2) === 'NS') {
      sCardDB.forEach(sCard => {
        if (sCard.cardID === dragCardID) {
          takeaway.push({
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
        if (card.cardID === dragCardID) {
          takeaway.push({
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
          });
        }
      })
    }
    
    takeaway.sort((a,b) => {
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
    renderCollection(prizeCards);
    renderPrize();
  // when the ev.target is drag-box-c and takeaway already has that card, move that card from takeaway to prizeCards
  } else if (ev.target.id === "drag-box-c" && takeaway.filter(card => card.cardID === dragCardID).length > 0) {
    takeaway = takeaway.filter(card => card.cardID !== dragCardID);
    if (dragCardID.substring(0,1) === 'S' || dragCardID.substring(0,2) === 'MS' || dragCardID.substring(0,2) === 'NS') {
      sCardDB.forEach(sCard => {
        if (sCard.cardID === dragCardID) {
          prizeCards.push({
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
        if (card.cardID === dragCardID) {
          prizeCards.push({
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
          });
        }
      })
    }
    
    prizeCards.sort((a,b) => {
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
    renderCollection(prizeCards);
    renderPrize();
  }
  darkBG(ev);
  prizeCheck();
}

const renderPrize = () => {
  const takeawayPanel = document.getElementById("drag-box-t");
  takeawayPanel.innerHTML = '';
  if (takeaway.length > 0) {
    renderPanel(takeaway, 't');
  }
}

const prizeCheck = () => {
  let prizeHints;
  let prizeCardsOG = buildPrizes(p2Profile[0].deck);
  if (prizeCardsOG.length === 0) {
    prizeHints = "你已經擁有這個對手的所有咭。沒有獎品咭可供選擇。"
  } else {
    const exp = playerProfile[0].exp;
    if (exp >= 72900) {
      prizeHints = "奇蹟大師（LV 7）可以得到最多 15 張咭，當中最多 3 張可以是召喚師咭。";
      prizeCheckStep2(15, 3);
    } else if (exp >= 24300) {
      prizeHints = "檔案大師（LV 6） - 可以得到最多可以得到最多 12 張咭，當中最多 3 張可以是召喚師咭。";
      prizeCheckStep2(12, 3);
    } else if (exp >= 8100) {
      prizeHints = "地域大師（LV 5） - 可以得到最多可以得到最多 10 張咭，當中最多 3 張可以是召喚師咭。";
      prizeCheckStep2(10, 3);
    } else if (exp >= 2700) {
      prizeHints = "泥盆大師（LV 4） - 可以得到最多可以得到最多 10 張咭，當中最多 2 張可以是召喚師咭。";
      prizeCheckStep2(10, 2);
    } else if (exp >= 900) {
      prizeHints = "彗星大師（LV 3）可以得到最多 8 張咭，當中最多 2 張可以是召喚師咭。";
      prizeCheckStep2(8, 2);
    } else if (exp >= 300) {
      prizeHints = "光明大師（LV 2）可以得到最多 8 張咭，當中最多 1 張可以是召喚師咭。";
      prizeCheckStep2(8, 1);
    } else if (exp >= 100) {
      prizeHints = "方舟大師（LV 1）可以得到最多 5 張咭，當中最多 1 張可以是召喚師咭。";
      prizeCheckStep2(5, 1);
    } else {
      prizeHints = "見習大師（LV 0）可以得到最多 5 張咭，但當中不可以有召喚師咭。";
      prizeCheckStep2(5, 0);
    }
  }
  
  document.getElementById('take-away-hints').innerText = prizeHints;
}

const prizeCheckStep2 = (maxNum, maxSum) => {
  if (takeaway.length > maxNum) {
    document.getElementById('take-prize-button').disabled = true;
    document.getElementById('take-away-hints').style.color = 'red';
  } else if (takeaway.length > 0) {
    let sumCards = [];
    for (let i = 0; i < takeaway.length; i++) {
      if (takeaway[i].cardID.substring(0,1) === 'S' || takeaway[i].cardID.substring(0,2) === 'MS' || takeaway[i].cardID.substring(0,2) === 'NS') {
        sumCards.push(takeaway[i].cardID);
      }
    }
    if (sumCards.length > maxSum) {
      document.getElementById('take-prize-button').disabled = true;
      document.getElementById('take-away-hints').style.color = 'red';
    } else {
      document.getElementById('take-prize-button').disabled = false;
      document.getElementById('take-away-hints').style.color = 'black';
    }
  } else {
    document.getElementById('take-prize-button').disabled = false;
    document.getElementById('take-away-hints').style.color = 'black';
  }
}

const pickAward = () => {
  document.getElementById('take-prize-button').disabled = true;
  const dropDownBtns = document.getElementsByClassName('drop-down-button');
  for (let i = 0; i < dropDownBtns.length; i++) {dropDownBtns[i].disabled = true;}
  if (takeaway.length === 0 && prizeCards.length > 0) {
    new Promise(function(promptResolve) {
      promptReconsider(promptResolve);
    }).then(() => {
      goHome();
    })
  } else {
    let newCollection = simplifyDeck(takeaway);
    playerProfile[1].collection = playerProfile[1].collection.concat(newCollection);
    playerProfile[1].collection.sort((a,b) => {
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
    goHome();
  }
}

const goHome = () => {
  saveProfile();
  prizeCards.length = 0;
  takeaway.length = 0;
  localStorage.removeItem('p2Profile');
  window.location.replace("Deckbuilder.html");
}