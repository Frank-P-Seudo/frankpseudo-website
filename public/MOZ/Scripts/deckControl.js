// triggered when a deckbox is clicked
const pushDecklist = (deck, indexOfProfile) => {
  playerDeck.length = 0;
  activeDeck = indexOfProfile;
  if (deck !== null && indexOfProfile > 1) {
    deck.forEach(item => {
      if (item.cardID.substring(0,1) === 'S' || item.cardID.substring(0,2) === 'MS' || item.cardID.substring(0,2) === 'NS') {
        sCardDB.forEach(sCard => {
          if (sCard.cardID === item.cardID) {
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
          if (card.cardID === item.cardID) {
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
            })
          }
        })
      }
    })
  }
  updateBoxPic();
  remainingCards = getRemainingCards();
  legalityCheck(false);
  renderCollection(remainingCards);
  renderDeck();
}

const updateBoxPic = () => {
  const deckBoxes = document.getElementsByClassName('deck-box');
  for (let i = 0; i < deckBoxes.length; i++) {
    if (i === 0) {
      deckBoxes[i].setAttribute("src", "CardBox/White.png");  
    } else {
      if (activeDeck > 1 && i === activeDeck - 1) {
        deckBoxes[i].setAttribute("src", "CardBox/Blue.png");  
      } else {
        deckBoxes[i].setAttribute("src", "CardBox/Black.png");
      }
    }
  }
}

const createNewDeck = () => {
  if (playerProfile.length === maxDeckNum) {
    promptMaxDeckNum(maxDeckNum-2);
  } else {
    playerProfile.push({
      deckName: '無名',
      deck: []
    });
    saveProfile();
    pushDecklist(null, playerProfile.length - 1);
    renderDecklists();
  }
}

const setActive = () => {
  const checkResult = legalityCheck(true);
  if (activeDeck > 1 && checkResult === true) {
    playerProfile[0].activeSlot = activeDeck;
    saveProfile();
    promptOpponentSelect();
  } else {
    promptDeckInvalid();
  }
}

const renameDeck = () => {
  if (activeDeck > 1) {
    renderDecklists();
    let backupName = playerProfile[activeDeck].deckName;
      const nameTagID = 'deck-list-nametag-' + activeDeck;  
      const nameTag = document.getElementById(nameTagID);
      nameTag.innerHTML = '';
      
      const inputBox = document.createElement('input');
      inputBox.style.width = '30px';
      inputBox.id = 'inputBox-' + activeDeck;
      nameTag.appendChild(inputBox);
      
      const acceptButton = document.createElement('button');
      nameTag.appendChild(acceptButton);
      acceptButton.innerText = 'OK';
      let i = activeDeck;
      acceptButton.onclick = func => {acceptName(i, backupName)};
  }
}

const acceptName = (i, backupName) => {
  const inputBoxID = 'inputBox-' + i;
  const inputBox = document.getElementById(inputBoxID);
  const newName = inputBox.value;
  const nameTagID = 'deck-list-nametag-' + i;
  if (newName.trim().length === 0) {
    document.getElementById(nameTagID).innerHTML = backupName;
  } else {
    document.getElementById(nameTagID).innerHTML = newName.trim().substring(0,5);
    playerProfile[i].deckName = newName.trim().substring(0,5);
    saveProfile();
  }
}

const copyDeck = () => {
  if (activeDeck > 1) {
    if (playerProfile.length === maxDeckNum) {
      promptMaxDeckNum(maxDeckNum-2);
    } else {
      playerProfile.push({
        deckName: playerProfile[activeDeck].deckName,
        deck: playerProfile[activeDeck].deck.slice(0, playerProfile[activeDeck].deck.length)
      });
      saveProfile();
      activeDeck = playerProfile.length - 1;
      pushDecklist(playerProfile[activeDeck].deck, activeDeck);
      renderDecklists();
    }
  }
}

const deleteDeck = () => {
  if (activeDeck > 1) {
  // determine which decklist will be pushed next
  let newActiveDeck;
  if (playerProfile.length === 3) {
    newActiveDeck = 0;
  } else if (activeDeck === playerProfile.length-1) {
    newActiveDeck = activeDeck - 1;
  } else {
    newActiveDeck = activeDeck;
  }
  // if the decklist being deleted is in activeSlot, then clear the activeSlot in playerProfile
  if (activeDeck === playerProfile[0].activeSlot) {
    playerProfile[0].activeSlot = 0;
  // if the decklist being deleted is located before activeSlot, then the activeSlot is deducted by 1
  } else if (activeDeck < playerProfile[0].activeSlot) {
    playerProfile[0].activeSlot -= 1;
  }
  playerProfile.splice(activeDeck, 1);
  saveProfile();
  activeDeck = newActiveDeck;
  pushDecklist(playerProfile[activeDeck].deck, activeDeck);
  renderDecklists();
  }
}