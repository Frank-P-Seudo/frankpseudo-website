// 仙人爆炸
const oldManEffect = (player, victim, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    oldManEffectStep2(player, victim, uniqueCardID, findMatArrays(victim)[5]);
    
    pushBlockItem(victim, uniqueCardID, 'cardID', '143', player, true);  // see utility.js
    pushBlockItem(victim, uniqueCardID, 'cardID', '144', player, true);
    pushBlockItem(victim, uniqueCardID, 'cardID', '145', player, true);
    pushBlockItem(victim, uniqueCardID, 'cardID', '318', player, true);
    pushBlockItem(victim, uniqueCardID, 'cardID', '923', player, true);
    pushBlockItem(victim, uniqueCardID, 'cardID', '924', player, true);
    pushBlockItem(victim, uniqueCardID, 'cardID', '925', player, true);
    pushBlockItem(victim, uniqueCardID, 'cardID', 'M210', player, true);
    pushBlockItem(victim, uniqueCardID, 'cardID', 'M211', player, true);
    pushBlockItem(victim, uniqueCardID, 'cardID', 'M212', player, true);
    setTimeout(() => effectResolve(), 10);
  }).then(func => {
    inflictDmgStep1(player, myResolve);
  })
}

const oldManEffectStep2 = (player, victim, uniqueCardID, foeSummonerArray) => {
  if (foeSummonerArray[0].cardName === '波尤' || foeSummonerArray[0].cardName === '巴布' || foeSummonerArray[0].cardName === '古比古比') {
    pushPowerUpHist(player, findVictim(player), uniqueCardID, 'XX000', true);
  } else if (uniqueCardID === '982' && (foeSummonerArray[0].cardName === '貝獸仙人' || foeSummonerArray[0].cardName === '鬍子仙人')) {
    pushPowerUpHist(player, findVictim(player), uniqueCardID, 'XX000', true);
  }
}

// 天災 (no chance to trigger postGameEffects())
const forcedDraw = () => {
  drawGame = true;
  resultMsg = '本回合打和，場上的咭會送到保留區。';
  disableP1PlayButtons();
  document.getElementById("p1ForfeitBut").disabled = true;
  promptResultMsg();  // ! promptResultMsg needs to handle (1) score > 50 and (2) queue.length === 0
  if (p1Queue.length > 0) {document.getElementById("playSummonersBut").disabled = false;}
}

// 抵壘 (Note: it is recoverable, unlike other similar cards)
const cardEffect168 = (player, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    pushBlockItem(findVictim(player), uniqueCardID, 'cardID', '167', true);
    pushBlockItem(findVictim(player), uniqueCardID, 'cardID', '641', true);
    setTimeout(() => effectResolve(), 10);
  }).then(func => {
    inflictDmgStep1(player, myResolve);
  })
}

const cardEffect262 = (player, matArrays, myResolve) => {
  let location230 = [];
  for (let i = 0; i < 3; i++) {
    if (matArrays[i].length > 0) {
      if (matArrays[i][matArrays[i].length-1].upsideDown === false && matArrays[i][matArrays[i].length-1].cardID === '230') {
        location230.push(playedPositions[i]);
      }
    }
  }
  if (location230.length === 0) {
    myResolve();
  } else if (location230.length === 1) {
    triggerCardEffects(player, '230', positionToArray(player, location230[0]), myResolve);
  } else {
    new Promise(function(effectResolve) {
      triggerCardEffects(player, '230', positionToArray(player, location230[0]), effectResolve);
    }).then(func => {
      triggerCardEffects(player, '230', positionToArray(player, location230[1]), myResolve);
    })
  }

}

// 護龍人
const cardEffect263 = (player, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    pushBlockItem(findVictim(player), uniqueCardID, 'cardID', '205', true);
    pushBlockItem(findVictim(player), uniqueCardID, 'monClass', 'Sword', true);
    setTimeout(() => effectResolve(), 10);
  }).then(func => {
    inflictDmgStep1(player, myResolve);
  })
}

// 田螺坦克
const cardEffect264 = (player, uniqueCardID, myResolve) => {
  if (findMatArrays(player)[5][0].summonerType !== 'SS') {
    myResolve();
  } else {
    blockEffect(player, uniqueCardID, 'monClass', 'Null', true, myResolve);
  }
}

// 奇異兔
const cardEffect265 = (player, uniqueCardID, myResolve) => {
  if (findMatArrays(player)[5][0].cardName !== '雷克斯' && findMatArrays(player)[5][0].cardName !== '加菲爾') {
    myResolve();
  } else {
    blockEffect(player, uniqueCardID, 'pos', 'help', false, myResolve);
  }
}

// 魔導劍
const cardEffect695 = (player, uniqueCardID, myResolve) => {
  new Promise(function(effectResolve) {
    pushBlockItem(findVictim(player), uniqueCardID, 'pos', 'left', player, true);
    pushBlockItem(findVictim(player), uniqueCardID, 'pos', 'right', player, true);
    setTimeout(() => effectResolve(), 10);
  }).then(func => {
    inflictDmgStep1(player, myResolve);
  })
}