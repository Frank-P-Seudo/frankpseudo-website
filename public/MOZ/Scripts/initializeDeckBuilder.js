let playerName;
let activeDeck;  // activeDeck denotes the index (within playerProfile) of deck that is being edited/deleted/copied
let maxDeckNum = 52;  // the max number of decklists a player is allowed to have
let filteringCriteriaC = {
  cardSeries: null,
  cardType: null,
  summonerType: null,
  summonerLevel: null,
  monClass: null,
  monType: null,
  monPower: null
};
let filteringCriteriaD = {cardType: null};
let playerProfile;
let playerCollection;
let playerDeck = [];
let remainingCards = [];

const buildCollection = () => {
  let tempCollection = [];
  for (let i = 0; i < playerProfile[1].collection.length; i++) {
    if (playerProfile[1].collection[i].cardID.substring(0,1) === 'S' || playerProfile[1].collection[i].cardID.substring(0,2) === 'MS' || playerProfile[1].collection[i].cardID.substring(0,2) === 'NS') {
      sCardDB.forEach(sCard => {
        if (sCard.cardID === playerProfile[1].collection[i].cardID) {
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
        if (card.cardID === playerProfile[1].collection[i].cardID) {
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

const getRemainingCards = () => {
  let tempArray = playerCollection.slice(0, playerCollection.length);
  for (let i = 0; i < playerDeck.length; i++) {
    tempArray = tempArray.filter(card => card.cardID !== playerDeck[i].cardID)
  }
  return tempArray;
}

const startDeckbuilder = () => {
  playerCollection = buildCollection();
  remainingCards = getRemainingCards();
  activeDeck = playerProfile[0].activeSlot;
  // see utility.js for returnTitle()
  document.getElementById('player-name').innerText = '召喚師稱號: ' + playerProfile[0].playerName + '（'+ returnTitle(playerProfile[0].exp)[1] + '）';
  renderbar(playerProfile[0].exp, 0, 300, true);
  renderDecklists();
  pushDecklist(playerProfile[activeDeck].deck, activeDeck);
  renderCollection(remainingCards);
}

async function welcomeNewPlayer() {
  await promptIntro1();
  await promptIntro2();
  startDeckbuilder();
}

const promptIntro1 = () => {
  return new Promise(function(resolve) {
    document.getElementById('startgame-overlay').style.display = 'block';
    composeMsg();

    const picContainer = document.getElementById('guide-pic-container');
    picContainer.style = 'width: 160px; border-radius: 6px; border: none; overflow: hidden';
    const pic = document.createElement('img');
    pic.setAttribute("src", 'OpponentPic/frank_pseudo.png');
    pic.style.width = '100%';
    pic.id = 'frank_pseudo';
    picContainer.appendChild(pic);

    document.getElementById("alert-text").innerText = "你好，歡迎來到 MOZ REBORN - BETA。我是你的嚮導。\n你可以在這裡組合你的咭組，然後挑戰各色各樣的召喚師。\n開始之前，請告訴我你的名字。";
    const inputBox = document.getElementById("player-name-input");
    inputBox.style = "display: block; width: 300px; border-radius: 8px; margin-top: 12px; padding: 6px; font-size: 16px";
    document.getElementById("alert-button1").innerText = "確定";
    document.getElementById("alert-button1").onclick = func => {
      if (inputBox.value.length > 0) {
        inputBox.style.display = "none";
        playerName = inputBox.value.substring(0, 10);
        playerProfile[0].playerName = playerName;
        saveProfile();
        resolve();
      }
    }
  })
}

const promptIntro2 = () => {
  return new Promise(function(resolve) {
    document.getElementById("alert-text").innerText = playerName + "，幸會。\n作為見面禮，五副格里夫基本咭組已經加到你的收藏中。\n你可點擊畫面右上方的咭盒查閱和編輯咭組內容。\n完成後，點擊『設為主力』可選擇你的對手。";
    document.getElementById("alert-button1").onclick = func => {
      document.getElementById("frank_pseudo").remove();
      document.getElementById('startgame-overlay').style.display = 'none';
      closePrompt();
      resolve();
    }
  })
}

const savedProfile = JSON.parse(localStorage.getItem('p1Profile'));

if (Array.isArray(savedProfile)) {
  playerProfile = savedProfile;
  startDeckbuilder();
} else {
  playerProfile = defaultProfile;
  welcomeNewPlayer();
}
