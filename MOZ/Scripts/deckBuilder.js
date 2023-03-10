const renderDeck = () => {
  const deckPanel = document.getElementById("drag-box-d");
  deckPanel.innerHTML = '';
  // re-do the text within tab buttons
  const buttons = document.getElementsByClassName('tab-button');
  const buttonTexts = ['全部', '召喚師', '召喚獸', 'Help', 'SP', 'Help/SP', 'Ch', 'R', 'F', '占星術'];
  for (let i = 0; i < buttonTexts.length; i++) {
    buttons[i].innerText = buttonTexts[i];
  }
  // filter playerDeck based on filteringCriteriaD and update the number in tab button
  let tempArray = playerDeck.slice(0, playerDeck.length);
  let tabID;
  if (filteringCriteriaD.cardType !== null) {
    tempArray = tempArray.filter(item => item.cardType === filteringCriteriaD.cardType);
    tabID = 'tab-button-D-' + filteringCriteriaD.cardType;
  } else {
    tabID = 'tab-button-D';
  }
  // render the filtered playerDeck
  document.getElementById(tabID).innerText += '\n(' + tempArray.length + ')';
  if (tempArray.length !== 0) {
    renderPanel(tempArray, 'd');
  }
}

const drop = (ev) => {
  const dragCardID = ev.dataTransfer.getData('text/plain');
  // when the ev.target is drag-box-d and playerDeck doesn't already have that card, move that card from remainingCards to playerDeck
  if (ev.target.id === "drag-box-d" && playerDeck.filter(card => card.cardID === dragCardID).length === 0) {
    remainingCards = remainingCards.filter(card => card.cardID !== dragCardID);
    if (dragCardID.substring(0,1) === 'S' || dragCardID.substring(0,2) === 'MS' || dragCardID.substring(0,2) === 'NS') {
      sCardDB.forEach(sCard => {
        if (sCard.cardID === dragCardID) {
          playerDeck.push({
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
          playerDeck.push({
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
    
    playerDeck.sort((a,b) => {
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
    renderCollection(remainingCards);
    renderDeck();
  // when the ev.target is drag-box-c and playerDeck already has that card, move that card from playerDeck to remainingCards
  } else if (ev.target.id === "drag-box-c" && playerDeck.filter(card => card.cardID === dragCardID).length > 0) {
    playerDeck = playerDeck.filter(card => card.cardID !== dragCardID);
    if (dragCardID.substring(0,1) === 'S' || dragCardID.substring(0,2) === 'MS' || dragCardID.substring(0,2) === 'NS') {
      sCardDB.forEach(sCard => {
        if (sCard.cardID === dragCardID) {
          remainingCards.push({
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
          remainingCards.push({
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
    
    remainingCards.sort((a,b) => {
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
    renderCollection(remainingCards);
    renderDeck();
  }
  legalityCheck(false);
  playerProfile[activeDeck].deck = simplifyDeck(playerDeck);
  saveProfile();
  darkBG(ev);
}

const renderDecklists = () => {
  const panel = document.getElementById('deck-list-panel');
  panel.innerHTML = '';

  const deckListContainer1 = document.createElement('div');
  panel.appendChild(deckListContainer1);
  deckListContainer1.id = 'deck-list-container-1';
  deckListContainer1.className = 'deck-list-container';

  const deckListButton1 = document.createElement('button');
  deckListContainer1.appendChild(deckListButton1);
  deckListButton1.className = 'deck-list-button';
  deckListButton1.onclick = func => {createNewDeck()};

  const deckListImg1 = document.createElement('img');
  deckListButton1.appendChild(deckListImg1);
  deckListImg1.setAttribute("src", "CardBox/White.png");
  deckListImg1.className = 'deck-box';

  const deckListNametag1 = document.createElement('div');
  deckListContainer1.appendChild(deckListNametag1);
  deckListNametag1.id = 'deck-list-nametag-1';
  deckListNametag1.className = 'deck-list-nametag';
  deckListNametag1.innerText = '自訂新咭組';

  for (let i = 2; i < playerProfile.length; i++) {
    const deckListContainer = document.createElement('div');
    panel.appendChild(deckListContainer);
    deckListContainer.id = 'deck-list-container-' + i;
    deckListContainer.className = 'deck-list-container';

    const deckListButton = document.createElement('button');
    deckListContainer.appendChild(deckListButton);
    deckListButton.className = 'deck-list-button';
    deckListButton.onclick = func => {pushDecklist(playerProfile[i].deck, i)};

    const deckListImg = document.createElement('img');
    deckListButton.appendChild(deckListImg);
    deckListImg.setAttribute("src", "CardBox/Black.png");
    deckListImg.className = 'deck-box';

    const deckListNametag = document.createElement('div');
    deckListContainer.appendChild(deckListNametag);
    deckListNametag.id = 'deck-list-nametag-' + i;
    deckListNametag.className = 'deck-list-nametag';
    deckListNametag.innerText = playerProfile[i].deckName;
  }
  updateBoxPic();
}