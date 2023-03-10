const selectQueuedSummonerMenu = (usedSummonerCardID, myResolve) => {
  matCardDisplay(p1Queue);
  summonerMenus(p1Queue, "替換", myResolve, usedSummonerCardID);
}

const selectUsedSummonerMenu = (myResolve) => {
  matCardDisplay(p1Used);
  summonerMenus(p1Used, "重新候命", myResolve);
}

const summonerMenus = (summonerArray, buttonText, myResolve, usedSummonerCardID) => {
  const displayPanelButContainer = document.getElementById('display-panel-button-container');
  displayPanelButContainer.innerHTML = '';
  const container = document.createElement('div');
  container.style = "width: 280px";
  displayPanelButContainer.appendChild(container);

  for (let i = summonerArray.length-1; i >= 0; i--) {
    const choiceContainer = document.createElement('div');
    choiceContainer.style = "font-size: 12px; display: flex; justify-content: space-between; margin-top: 4px; margin-bottom: 4px";
    const cardDetailContainer = document.createElement('div');
    cardDetailContainer.style = "font-size: 12px; padding-top: 4px; padding-bottom: 4px";
    if (summonerArray[i].summonerLevel === 8) {
      cardDetailContainer.innerHTML = "Lv. &#8734; " + summonerArray[i].cardName;
    } else {
      cardDetailContainer.innerHTML = "Lv. " + summonerArray[i].summonerLevel + " " + summonerArray[i].cardName;
    }
    const summonerCardID = summonerArray[i].cardID;
    const submitOrderButton = document.createElement("button");
    submitOrderButton.innerText = buttonText;
    submitOrderButton.className = "small-play-buttons";
    
    choiceContainer.appendChild(cardDetailContainer);
    choiceContainer.appendChild(submitOrderButton);
    container.appendChild(choiceContainer);

    if (summonerCardID === 'S367') {  // 兆鬼
      submitOrderButton.disabled = true;
    } else {
      submitOrderButton.disabled = false;
      if (buttonText === "重新候命") {
        submitOrderButton.onclick = func => {
          document.getElementById('display-panel-button-container').innerHTML = '';
          promptSummonersSwapStep2(summonerCardID, myResolve);
        }
      } else {
        submitOrderButton.onclick = func => {
          document.getElementById('display-panel-button-container').innerHTML = '';
          summonersSwapEffectStep2('p1', p1Used, p1Queue, usedSummonerCardID, summonerCardID, myResolve);  // p1, p1Used and p1Queue are hard-coded
        }
      }
    }
  }
  if (summonerArray.length === 1 && summonerArray[0].cardID === 'S367') {
    const noSwapButton = document.createElement('button');
    if (buttonText === "重新候命") {
      noSwapButton.innerText = '沒有可以重新候命的召喚師';
    } else {
      noSwapButton.innerText = '沒有可以替換的召喚師';
    }
    noSwapButton.className = 'play-buttons';
    noSwapButton.style = 'display: block; margin-top: 16px';
    noSwapButton.onclick = func => {
      document.getElementById('display-panel-button-container').innerHTML = '';
      turnClass = 'play';  // if the turnClass remains 'choiceEffect', handCardDisplay() doesn't call any menu
      myResolve();
    }
    container.appendChild(noSwapButton);
  }
}

const arrangeP2Summoners = (myResolve) => {
  turnClass = 'choiceEffect';  // turnClass may impact forfeitabilityCheck(), handCardDisplay() and matCardDisplay()
  document.getElementById("p2-mat-queue-button").disabled = false;
  matCardDisplay(p2Queue);

  const displayPanelButContainer = document.getElementById('display-panel-button-container');
  const container = document.createElement('div');
  container.style = "width: 280px";
  displayPanelButContainer.appendChild(container);

  const text2 = ["排第二", "排第一", "排第二"];
  const text3 = ["排第三", "排第二", "排第一", "排第三", "排第二"];
  const text4 = ["排第四", "排第三", "排第二", "排第一", "排第四", "排第三", "排第二"];
  const text5 = ["排第五", "排第四", "排第三", "排第二", "排第一", "排第五", "排第四", "排第三", "排第二"];
  const textArray = [text2, text3, text4, text5];
  for (let i = p2Queue.length-1; i >= 0; i--) {
    const choiceContainer = document.createElement('div');
    choiceContainer.style = "font-size: 12px; display: flex; justify-content: space-between; margin-top: 3px; margin-bottom: 3px";
    const cardDetailContainer = document.createElement('div');
    cardDetailContainer.style = "font-size: 12px; padding-top: 1px; padding-bottom: 1px";
    if (p2Queue[i].summonerLevel === 8) {
      cardDetailContainer.innerHTML = "Lv. &#8734; " + p2Queue[i].cardName;
    } else {
      cardDetailContainer.innerHTML = "Lv. " + p2Queue[i].summonerLevel + " " + p2Queue[i].cardName;
    }

    const inputOrder = document.createElement('select');
    inputOrder.id = "inputOrder" + i;
    inputOrder.className = "dropdown-menu";
    for (let j = 0; j < p2Queue.length; j++) {
      const option = document.createElement("option");
      option.text = textArray[p2Queue.length-2][i+j];
      option.value = i+j;
      inputOrder.add(option);
    }

    choiceContainer.appendChild(cardDetailContainer);
    choiceContainer.appendChild(inputOrder);
    container.appendChild(choiceContainer);
  }

  const submitOrderButton = document.createElement("button");
  submitOrderButton.innerText = "決定召喚師排序";
  submitOrderButton.className = "play-buttons";
  submitOrderButton.style = "display: block; margin: auto; width: 40%";
  submitOrderButton.onclick = func => {submitP2SummonerOrder(myResolve);}
  container.appendChild(submitOrderButton);
}

const submitP2SummonerOrder = (myResolve) => {
  let fixedLength = p2Queue.length;
  for (let i = p2Queue.length-1; i >= 0; i--) {
    selectID = "inputOrder" + i;
    p2Queue[i].seq = Math.floor(document.getElementById(selectID).value);
  }
  if (p2Queue.filter(sCard => sCard.seq === p2Queue.length-1).length !== 1) {
    promptOrderError();
  } else if (p2Queue.filter(sCard => sCard.seq === 0).length + p2Queue.filter(sCard => sCard.seq === p2Queue.length).length !== 1) {
    promptOrderError();
  } else if (p2Queue.length >= 3 && (p2Queue.filter(sCard => sCard.seq === 1).length + p2Queue.filter(sCard => sCard.seq === p2Queue.length+1).length !== 1)) {
    promptOrderError();
  } else if (p2Queue.length >= 4 && (p2Queue.filter(sCard => sCard.seq === 2).length + p2Queue.filter(sCard => sCard.seq === p2Queue.length+2).length !== 1)) {
    promptOrderError();
  } else if (p2Queue.length === 5 && (p2Queue.filter(sCard => sCard.seq === 3).length + p2Queue.filter(sCard => sCard.seq === p2Queue.length+3).length !== 1)) {
    promptOrderError();
  } else {
    document.getElementById("p2-mat-queue-button").disabled = true;
    p2Queue.forEach(sCard => {
      if (sCard.seq === 0 || sCard.seq === fixedLength) {p2Queue.push({cardName: sCard.cardName, summonerLevel: sCard.summonerLevel, cardID: sCard.cardID, cardType: sCard.cardType, cardSeries: sCard.cardSeries, cardPic: sCard.cardPic})}
    });
    p2Queue.forEach(sCard => {
      if (fixedLength >= 3 && (sCard.seq === 1 || sCard.seq === fixedLength+1)) {p2Queue.push({cardName: sCard.cardName, summonerLevel: sCard.summonerLevel, cardID: sCard.cardID, cardType: sCard.cardType, cardSeries: sCard.cardSeries, cardPic: sCard.cardPic})}
    });
    p2Queue.forEach(sCard => {
      if (fixedLength >= 4 && (sCard.seq === 2 || sCard.seq === fixedLength+2)) {p2Queue.push({cardName: sCard.cardName, summonerLevel: sCard.summonerLevel, cardID: sCard.cardID, cardType: sCard.cardType, cardSeries: sCard.cardSeries, cardPic: sCard.cardPic})}
    });
    p2Queue.forEach(sCard => {
      if (fixedLength === 5 && (sCard.seq === 3 || sCard.seq === fixedLength+3)) {p2Queue.push({cardName: sCard.cardName, summonerLevel: sCard.summonerLevel, cardID: sCard.cardID, cardType: sCard.cardType, cardSeries: sCard.cardSeries, cardPic: sCard.cardPic})}
    });
    p2Queue.forEach(sCard => {
      if (sCard.seq === fixedLength-1) {p2Queue.push({cardName: sCard.cardName, summonerLevel: sCard.summonerLevel, cardID: sCard.cardID, cardType: sCard.cardType, cardSeries: sCard.cardSeries, cardPic: sCard.cardPic})}
    });
    p2Queue = p2Queue.filter(sCard => {
      if (sCard.seq >=0 && sCard.seq <= 8) {
        return false;
      } else {
        return true;
      }
    })
    
    new Promise(function(shuffleResolve) {
      shuffleAnimation('p2', 'queue-button', p2Queue.length-1);
      setTimeout(() => shuffleResolve(), ((shuffleAniDur+shuffleDelay*(p1Queue.length-1))*1000+aniBuffer));
    }).then(func => {
      turnClass = 'play';
      removeAnimatedContainer('p2', 'queue-button', p1Queue.length-1);
      matCardDisplay(p1Help);  // p1Help must be FU for this effect to take place
      myResolve();
    })
  }
}

const arrangeSummoners = (uniqueCardID, myResolve) => {
  matCardDisplay(p1Queue);

  const displayPanelButContainer = document.getElementById('display-panel-button-container');
  const container = document.createElement('div');
  container.style = "width: 280px";
  displayPanelButContainer.appendChild(container);

  const text2 = ["排第二", "排第一", "排第二"];
  const text3 = ["排第三", "排第二", "排第一", "排第三", "排第二"];
  const text4 = ["排第四", "排第三", "排第二", "排第一", "排第四", "排第三", "排第二"];
  const text5 = ["排第五", "排第四", "排第三", "排第二", "排第一", "排第五", "排第四", "排第三", "排第二"];
  const textArray = [text2, text3, text4, text5];
  for (let i = p1Queue.length-1; i >= 0; i--) {
    const choiceContainer = document.createElement('div');
    choiceContainer.style = "font-size: 12px; display: flex; justify-content: space-between; margin-top: 3px; margin-bottom: 3px";
    const cardDetailContainer = document.createElement('div');
    cardDetailContainer.style = "font-size: 12px; padding-top: 1px; padding-bottom: 1px";
    if (p1Queue[i].summonerLevel === 8) {
      cardDetailContainer.innerHTML = "Lv. &#8734; " + p1Queue[i].cardName;
    } else {
      cardDetailContainer.innerHTML = "Lv. " + p1Queue[i].summonerLevel + " " + p1Queue[i].cardName;
    }

    const inputOrder = document.createElement('select');
    inputOrder.id = "inputOrder" + i;
    inputOrder.className = "dropdown-menu";
    for (let j = 0; j < p1Queue.length; j++) {
      const option = document.createElement("option");
      option.text = textArray[p1Queue.length-2][i+j];
      option.value = i+j;
      inputOrder.add(option);
    }

    choiceContainer.appendChild(cardDetailContainer);
    choiceContainer.appendChild(inputOrder);
    container.appendChild(choiceContainer);
  }

  const submitOrderButton = document.createElement("button");
  submitOrderButton.innerText = "決定召喚師排序";
  submitOrderButton.className = "play-buttons";
  submitOrderButton.style = "display: block; margin: auto; width: 40%";
  submitOrderButton.onclick = func => {submitOrder(uniqueCardID, myResolve)};
  container.appendChild(submitOrderButton);
}

const submitOrder = (uniqueCardID, myResolve) => {
  let fixedLength = p1Queue.length;
  for (let i = p1Queue.length-1; i >= 0; i--) {
    selectID = "inputOrder" + i;
    p1Queue[i].seq = Math.floor(document.getElementById(selectID).value);
  }
  if (p1Queue.filter(sCard => sCard.seq === p1Queue.length-1).length !== 1) {
    promptOrderError();
  } else if (p1Queue.filter(sCard => sCard.seq === 0).length + p1Queue.filter(sCard => sCard.seq === p1Queue.length).length !== 1) {
    promptOrderError();
  } else if (p1Queue.length >= 3 && (p1Queue.filter(sCard => sCard.seq === 1).length + p1Queue.filter(sCard => sCard.seq === p1Queue.length+1).length !== 1)) {
    promptOrderError();
  } else if (p1Queue.length >= 4 && (p1Queue.filter(sCard => sCard.seq === 2).length + p1Queue.filter(sCard => sCard.seq === p1Queue.length+2).length !== 1)) {
    promptOrderError();
  } else if (p1Queue.length === 5 && (p1Queue.filter(sCard => sCard.seq === 3).length + p1Queue.filter(sCard => sCard.seq === p1Queue.length+3).length !== 1)) {
    promptOrderError();
  } else {
    p1Queue.forEach(sCard => {
      if (sCard.seq === 0 || sCard.seq === fixedLength) {p1Queue.push({cardName: sCard.cardName, summonerLevel: sCard.summonerLevel, cardID: sCard.cardID, cardType: sCard.cardType, cardSeries: sCard.cardSeries, cardPic: sCard.cardPic})}
    });
    p1Queue.forEach(sCard => {
      if (fixedLength >= 3 && (sCard.seq === 1 || sCard.seq === fixedLength+1)) {p1Queue.push({cardName: sCard.cardName, summonerLevel: sCard.summonerLevel, cardID: sCard.cardID, cardType: sCard.cardType, cardSeries: sCard.cardSeries, cardPic: sCard.cardPic})}
    });
    p1Queue.forEach(sCard => {
      if (fixedLength >= 4 && (sCard.seq === 2 || sCard.seq === fixedLength+2)) {p1Queue.push({cardName: sCard.cardName, summonerLevel: sCard.summonerLevel, cardID: sCard.cardID, cardType: sCard.cardType, cardSeries: sCard.cardSeries, cardPic: sCard.cardPic})}
    });
    p1Queue.forEach(sCard => {
      if (fixedLength === 5 && (sCard.seq === 3 || sCard.seq === fixedLength+3)) {p1Queue.push({cardName: sCard.cardName, summonerLevel: sCard.summonerLevel, cardID: sCard.cardID, cardType: sCard.cardType, cardSeries: sCard.cardSeries, cardPic: sCard.cardPic})}
    });
    p1Queue.forEach(sCard => {
      if (sCard.seq === fixedLength-1) {p1Queue.push({cardName: sCard.cardName, summonerLevel: sCard.summonerLevel, cardID: sCard.cardID, cardType: sCard.cardType, cardSeries: sCard.cardSeries, cardPic: sCard.cardPic})}
    });
    p1Queue = p1Queue.filter(sCard => {
      if (sCard.seq >=0 && sCard.seq <= 8) {
        return false;
      } else {
        return true;
      }
    })
    // document.getElementById("playSummonersBut").innerText = "打出召喚師";
    document.getElementById("p1-mat-queue-button").disabled = false;
    if (uniqueCardID === undefined) {document.getElementById("playSummonersBut").disabled = false;}
    
    new Promise(function(shuffleResolve) {
      shuffleAnimation('p1', 'queue-button', p1Queue.length-1);
      if (uniqueCardID === undefined) {shuffleAnimation('p2', 'queue-button', p1Queue.length-1);}
      setTimeout(() => shuffleResolve(), ((shuffleAniDur+shuffleDelay*(p1Queue.length-1))*1000+aniBuffer));
    }).then(func => {
      if (uniqueCardID === undefined) {
        removeAnimatedContainer('p1', 'queue-button', p1Queue.length-1);
        removeAnimatedContainer('p2', 'queue-button', p1Queue.length-1);
        matCardDisplay(p1Queue);
        promptOrderAccepted();
      } else {
        turnClass = 'play';
        removeAnimatedContainer('p1', 'queue-button', p1Queue.length-1);
        matCardDisplay(p1Queue);
        myResolve();
      }
    })
  }
}

const ChSummonMenu = (cardIDPlayed) => {
  let playedPosition;
  for (let i = 0; i < 3; i++) {
    if (p1MatArrays[i].length > 0) {
      if (p1MatArrays[i][p1MatArrays[i].length-1].cardType === 'Ch' && p1MatArrays[i][p1MatArrays[i].length-1].upsideDown === false) {
        playedPosition = playedPositions[i];
      }
    }
  }
  document.getElementById('display-panel-button-container').innerHTML = '';
  const displayPanelButContainer = document.getElementById('display-panel-button-container');

  const buttonContainer1 = document.createElement('div');
  buttonContainer1.style = 'width: 240px; display: flex; justify-content: space-between';

  const summonButton = document.createElement('button');
  summonButton.innerText = '打出此咭';
  summonButton.id = 'ch-summon-button';
  summonButton.className = 'play-buttons';

  const noSummonButton = document.createElement('button');
  noSummonButton.innerText = '沒有可打出的召喚獸\n（Ch 咭會蓋起）';
  noSummonButton.className = 'play-buttons';
  noSummonButton.onclick = func => {
    turnClass = 'play';
    new Promise(function(flipResolve) {
      flipCard('p1', playedPosition, 0);  // tempoUD = 0, i.e., NOT temporarilly upside-down
      setTimeout(() => flipResolve(), 500);  // reminder: sync this with Animation.css and play.js
    }).then(func => {
      // since noSummonButton provides no resolve, the only way to end this turn is preTurnSwitch():
      preTurnSwitch('p1');  // see play.js
    })
  }

  buttonContainer1.appendChild(summonButton);
  buttonContainer1.appendChild(noSummonButton);
  displayPanelButContainer.appendChild(buttonContainer1);

  if (playedPosition === 'sky') {
    conditionCheckChSummon('sky', cardIDPlayed, summonButton.id);
  } else if (playedPosition === 'left') {
    conditionCheckChSummon('left', cardIDPlayed, summonButton.id);
  } else {
    conditionCheckChSummon('right', cardIDPlayed, summonButton.id);
  }
}

const RSummonMenu = (player, playedPosition, uniqueCardID) => {
  cardDB.forEach(card => {
    if (card.cardID === uniqueCardID) {
      revivedType = card.monType;
    }
  })
  
  const displayPanelButContainer = document.getElementById('display-panel-button-container');
  displayPanelButContainer.innerHTML = '';
  const verticalFlexBox = document.createElement('div');
  verticalFlexBox.style = "display: flex; flex-direction: column; justify-content: center; padding: 6px 8px";
  displayPanelButContainer.appendChild(verticalFlexBox);

  const container = document.createElement('div');
  container.style = "width: 280px; height: 100px; overflow-y: scroll; margin-bottom: 6px; border: none; border-radius: 10px; box-shadow: 0px 0px 2px black;";
  verticalFlexBox.appendChild(container);

  for (let i = p1Hole.length-1; i >= 0; i--) {
    const choiceContainer = document.createElement('div');
    choiceContainer.style = "font-size: 12px; display: flex; justify-content: space-between;";
    const cardDetailContainer = document.createElement('div');
    cardDB.forEach(card => {
      if (card.cardID === p1Hole[i].cardID) {
        deadCardName = card.cardName;
        deadCardType = card.monType;
        deadCardType2 = card.monType2;
        deadCardPower = card.monPower;
        if (deadCardPower === 0) {deadCardPower = '';}
      }
    });
    if (deadCardType2 === '') {
      cardDetailContainer.innerHTML = deadCardName + " " + typeTranslator(deadCardType) + " " + deadCardPower;
    } else {
      cardDetailContainer.innerHTML = deadCardName + " " + typeTranslator(deadCardType) + "/" + typeTranslator(deadCardType2) + " " + deadCardPower;
    }
    cardDetailContainer.style = "padding: 1px 4px;"

    const reviveButton = document.createElement('button');
    reviveButton.innerText = "復活";
    reviveButton.id = "r-summon-button-" + i;
    reviveButton.style = "padding: 2px 3px; font-size: 12px; margin: 1px";
    
    choiceContainer.appendChild(cardDetailContainer);
    choiceContainer.appendChild(reviveButton);
    container.appendChild(choiceContainer);

    if (playedPosition === 'sky') {
      conditionCheckRSummon('sky', p1Hole[i].cardID, reviveButton.id, revivedType);
    } else if (playedPosition === 'left') {
      conditionCheckRSummon('left', p1Hole[i].cardID, reviveButton.id, revivedType);
    } else {
      conditionCheckRSummon('right', p1Hole[i].cardID, reviveButton.id, revivedType);
    }
  }

  const noReviveButton = document.createElement("button");
  noReviveButton.innerText = "沒有可復活的召喚獸（R 咭會蓋起）";
  noReviveButton.className = "play-buttons";
  noReviveButton.style = "display: block; margin: auto; padding: 4px 6px; width: 90%";
  noReviveButton.onclick = func => {
    turnClass = 'play';
    new Promise(function(flipResolve) {
      flipCard(player, playedPosition, 0);  // tempoUD = 0, i.e., NOT temporarilly upside-down
      setTimeout(() => flipResolve(), flipAniDur*1000);
    }).then(func => {
      // since noReviveButton provides no resolve, the only way to end this turn is preTurnSwitch():
      preTurnSwitch(player);  // see play.js
    })
  };
  verticalFlexBox.appendChild(noReviveButton);
}

// triggered by 020 滑翔鯨
const selectBaitMenu = (player, uniqueCardID, matArray, myResolve) => {
  document.getElementById('display-panel-button-container').innerHTML = '';
  const displayPanelButContainer = document.getElementById('display-panel-button-container');

  const buttonContainerB = document.createElement('div');
  buttonContainerB.style = 'width: 240px';
  displayPanelButContainer.appendChild(buttonContainerB);

  const textContainer1 = document.createElement('div');
  textContainer1.innerText = '請選擇滑翔鯨吃掉的對象。'
  textContainer1.style = 'display: flex; justify-content: center; margin-top: 6px; margin-bottom: 20px; font-size: 12px';
  buttonContainerB.appendChild(textContainer1);

  const buttonContainer1 = document.createElement('div');
  buttonContainer1.style = 'width: 240px; display: flex; justify-content: space-between';
  const mineButton = document.createElement('button');
  mineButton.innerText = '己方的複眼魷魚';
  mineButton.className = 'play-buttons';
  mineButton.onclick = func => {
    document.getElementById('display-panel-button-container').innerHTML = '';
    turnClass = 'play';
    new Promise(function(effectResolve) {
      pushBlockItem(player, '020', 'cardID', '021', player, false);
      selfPowerUp(findPowerBracket(player), arrayToPosition(matArray), false, 10, effectResolve);
    }).then(func => {
      inflictDmgStep1(player, myResolve);
    })
  }

  const theirButton = document.createElement('button');
  theirButton.innerText = '對方的複眼魷魚';
  theirButton.className = 'play-buttons';
  theirButton.onclick = func => {
    document.getElementById('display-panel-button-container').innerHTML = '';
    turnClass = 'play';
    new Promise(function(effectResolve) {
      pushBlockItem(findVictim(player), uniqueCardID, 'cardID', '021', player, false);
      selfPowerUp(findPowerBracket(player), arrayToPosition(matArray), false, 10, effectResolve);
    }).then(func => {
      inflictDmgStep1(player, myResolve);
    })
  }

  buttonContainer1.appendChild(mineButton);
  buttonContainer1.appendChild(theirButton);
  buttonContainerB.appendChild(buttonContainer1);
}

// triggered by 311 赤術師
const viewP2HandMenu = (myResolve) => {
  const displayPanelButContainer = document.getElementById('display-panel-button-container');
  displayPanelButContainer.innerHTML = '';

  const buttonContainer1 = document.createElement('div');
  buttonContainer1.style = 'width: 240px; display: flex; flex-direction: column; align-items: center;';
  displayPanelButContainer.appendChild(buttonContainer1);

  const textContainer1 = document.createElement('div');
  textContainer1.innerText = '提示：\n點擊對手手牌可觀看咭的資料。此效力只可在對戰中行使一次。'
  textContainer1.style = 'display: flex; justify-content: center; margin-top: 20px; margin-bottom: 20px; font-size: 14px';
  buttonContainer1.appendChild(textContainer1);

  const doneButton = document.createElement("button");
  doneButton.innerText = "結束赤術師的效果\n（本回合完結）";
  doneButton.className = "play-buttons";
  doneButton.style = "display: block; margin: auto; padding: 4px 6px; width: 90%";
  doneButton.onclick = func => {
    turnClass = 'play';
    document.getElementById('display-panel-button-container').innerHTML = '';
    renderHand('p2');
    matCardDisplay(p1Summoner);
    myResolve();
  }
  buttonContainer1.appendChild(doneButton);
}

const viewHoleMenu = (myResolve) => {
  const displayPanelButContainer = document.getElementById('display-panel-button-container');
  displayPanelButContainer.innerHTML = '';

  const buttonContainer1 = document.createElement('div');
  buttonContainer1.style = 'width: 240px; display: flex; flex-direction: column; align-items: center;';
  displayPanelButContainer.appendChild(buttonContainer1);

  const textContainer1 = document.createElement('div');
  textContainer1.innerText = '提示：\n只限於打出魔導之眼的時候，點擊自己場中墓地可翻看墓地裡的咭。'
  textContainer1.style = 'display: flex; justify-content: center; margin-top: 20px; margin-bottom: 20px; font-size: 14px';
  buttonContainer1.appendChild(textContainer1);

  const doneButton = document.createElement("button");
  doneButton.innerText = "結束魔導之眼的效果\n（本回合完結）";
  doneButton.className = "play-buttons";
  doneButton.style = "display: block; margin: auto; padding: 4px 6px; width: 90%";
  doneButton.onclick = func => {
    turnClass = 'play';
    document.getElementById('display-panel-button-container').innerHTML = '';
    document.getElementById("p1-mat-hole-button").disabled = true;
    matCardDisplay(p1Help);
    myResolve();
  }
  buttonContainer1.appendChild(doneButton);
}

const discardHandMenu = (cardIDPlayed) => {
  document.getElementById('display-panel-button-container').innerHTML = '';
  const displayPanelButContainer = document.getElementById('display-panel-button-container');

  const buttonContainer1 = document.createElement('div');
  buttonContainer1.style = 'width: 240px; display: flex; justify-content: space-between';

  const discardButton = document.createElement('button');
  discardButton.className = 'play-buttons';
  discardButton.innerText = '捨棄此咭';
  discardButton.onclick = func => {
    document.getElementById('display-panel-button-container').innerHTML = '';
    if (p1Sky.length === 0) {
      discardAndForfeit('p1', cardIDPlayed, p1Sky, 'sky');  // cardIDPlayed, emptyArray, playedPosition
    } else if (p1Left.length === 0) {
      discardAndForfeit('p1', cardIDPlayed, p1Left, 'left');
    } else if (p1Right.length === 0) {
      discardAndForfeit('p1', cardIDPlayed, p1Right, 'right');
    } else {
      discardAndForfeit('p1', cardIDPlayed, p1Help, 'help');
    }
  }

  const noDiscardButton = document.createElement('button');
  noDiscardButton.innerText = '取消放棄決定';
  noDiscardButton.className = 'play-buttons';
  noDiscardButton.onclick = func => {
    document.getElementById('display-panel-button-container').innerHTML = '';
    document.getElementById("p1ForfeitBut").disabled = false;
    turnClass = 'play';
    renderHand('p1');
    handCardDisplay('p1', 0);
  }

  buttonContainer1.appendChild(discardButton);
  buttonContainer1.appendChild(noDiscardButton);
  displayPanelButContainer.appendChild(buttonContainer1);
}

const playSPmenu = (cardIDPlayed) => {
  document.getElementById('display-panel-button-container').innerHTML = '';
  const displayPanelButContainer = document.getElementById('display-panel-button-container');

  const container = document.createElement('div');
  container.style = "display: flex; flex-direction: column; align-items: center;"
  displayPanelButContainer.appendChild(container);

  const buttonContainer1 = document.createElement('div');
  buttonContainer1.style = 'width: 240px; display: flex; justify-content: space-between';

  const buttonPlaySP = document.createElement('button');
  buttonPlaySP.onclick = func => {playSP('p1', cardIDPlayed)};
  buttonPlaySP.id = 'play-at-sp';
  buttonPlaySP.className = 'play-buttons';
  buttonPlaySP.innerText = '打出到SP';

  const noSPbuttonContainer = document.createElement('div');
  noSPbuttonContainer.style = 'display: flex; position: relative';
  noSPbuttonContainer.id = 'noSP-button-container';
  const noSPButton = document.createElement('button');
  noSPButton.id = 'noSP-button';
  noSPButton.innerText = '不打出SP咭';
  noSPButton.className = 'play-buttons';
  noSPButton.onclick = func => {declareSPdecision('p1')};
  const tooltipNoSP = document.createElement('div');
  tooltipNoSP.id = 'tooltip-No-SP-button';  // see Display-panel.css for its style
  tooltipNoSP.className = 'tooltip';  
  tooltipNoSP.innerText = "提示： \n你的回合會立即結束。";

  buttonContainer1.appendChild(buttonPlaySP);
  noSPbuttonContainer.appendChild(noSPButton);
  noSPbuttonContainer.appendChild(tooltipNoSP);
  buttonContainer1.appendChild(noSPbuttonContainer);
  container.appendChild(buttonContainer1);

  const textContainer = document.createElement('div');
  textContainer.style = "margin-top: 20px; color: black; font-size: 14px";
  textContainer.innerText = "溫馨提示: \n只有在雙方都做出SP咭決定後，卡片才會顯示在遊戲墊上。";
  container.appendChild(textContainer);

  conditionCheckSP(cardIDPlayed);
}

const diamondMenu = () => {
  document.getElementById('display-panel-button-container').innerHTML = '';
  const displayPanelButContainer = document.getElementById('display-panel-button-container');

  const buttonContainerB = document.createElement('div');
  buttonContainerB.style = 'width: 240px';
  displayPanelButContainer.appendChild(buttonContainerB);
  
  const textContainer1 = document.createElement('div');
  textContainer1.innerText = '提示：點擊自己場中的咭可觀看咭的資料。'
  textContainer1.style = 'display: flex; justify-content: center; margin-top: 6px; margin-bottom: 6px; font-size: 12px';
  buttonContainerB.appendChild(textContainer1);

  const buttonContainer1 = document.createElement('div');
  buttonContainer1.style = 'display: flex; justify-content: center; margin-top: 6px; margin-bottom: 6px';
  const buttonPlaySky = document.createElement('button');
  buttonPlaySky.id = 'select-sky';
  buttonPlaySky.className = 'play-buttons';
  buttonPlaySky.innerText = '選擇天';
  buttonContainer1.appendChild(buttonPlaySky);
  buttonContainerB.appendChild(buttonContainer1);
  
  const buttonContainer2 = document.createElement('div');
  buttonContainer2.style = 'display: flex; padding-left: 40px; padding-right: 40px; justify-content: space-between; margin-top: 6px; margin-bottom: 6px';
  buttonContainer2.id = 'button-container-2';
  const buttonPlayLeft = document.createElement('button');
  buttonPlayLeft.id = 'select-left';
  buttonPlayLeft.className = 'play-buttons';
  buttonPlayLeft.innerText = '選擇左';
  const buttonPlayRight = document.createElement('button');
  buttonPlayRight.id = 'select-right';
  buttonPlayRight.className = 'play-buttons';
  buttonPlayRight.innerText = '選擇右';
  buttonContainer2.appendChild(buttonPlayLeft);
  buttonContainer2.appendChild(buttonPlayRight);
  buttonContainerB.appendChild(buttonContainer2);

  const buttonContainer3 = document.createElement('div');
  buttonContainer3.style = 'display: flex; justify-content: center; margin-top: 6px; margin-bottom: 6px';
  const buttonPlayNone = document.createElement('button');
  buttonPlayNone.id = 'select-none';
  buttonPlayNone.className = 'play-buttons';
  buttonPlayNone.innerText = '沒有可以選擇的對象';
  buttonContainer3.appendChild(buttonPlayNone);
  buttonContainerB.appendChild(buttonContainer3);
}

// menu to selecttarget for powerup
const selectHelpedTargetMenu = (uniqueCardID, bannedEffectInTurn, powerupFlat, powerupValue, myResolve) => {
  diamondMenu();
  for (let i = 0; i < 3; i++) {
    buffableCheck(uniqueCardID, playedPositions[i], p1MatArrays[i], bannedEffectInTurn, powerupFlat, powerupValue, myResolve);
  }
  setbuttonPlayNone(myResolve);
}

// menu to select offer (i.e., from own S/L/R)
const selectOfferMenu = (uniqueCardID, obtainedPosition, obtainedArray, myResolve) => {
  diamondMenu();
  if (uniqueCardID === '162' || uniqueCardID === '524' || uniqueCardID === '958' || uniqueCardID === 'M230' || uniqueCardID === 'N205') {
    for (let i = 0; i < 3; i++) {
      blindOfferableCheck(playedPositions[i], p1MatArrays[i], obtainedPosition, obtainedArray, myResolve);
    }
    setbuttonPlayNone(myResolve);
  } else if (uniqueCardID === '161' || uniqueCardID === '989' || uniqueCardID === 'M227' || uniqueCardID === 'N204') {
    for (let i = 0; i < 3; i++) {
      typeOfferableCheck(playedPositions[i], p1MatArrays[i], obtainedPosition, obtainedArray, myResolve);
    }
    setbuttonPlayNone(myResolve);
  } else {
    console.log('exchange effect triggered by incorrect cardID')
  }
}

// menu to select target (i.e., from the foe's S/L/R)
const selectTargetMenu = (uniqueCardID, viewedArray, myResolve) => {
  document.getElementById('display-panel-button-container').innerHTML = '';
  const displayPanelButContainer = document.getElementById('display-panel-button-container');

  const buttonContainerB = document.createElement('div');
  buttonContainerB.style = 'width: 240px';
  displayPanelButContainer.appendChild(buttonContainerB);
  
  const textContainer1 = document.createElement('div');
  textContainer1.innerText = '提示：點擊對手場中的咭可觀看咭的資料'
  textContainer1.style = 'display: flex; justify-content: center; margin-top: 6px; margin-bottom: 6px; font-size: 12px';
  buttonContainerB.appendChild(textContainer1);

  const buttonContainer2 = document.createElement('div');
  buttonContainer2.style = 'display: flex; padding-left: 40px; padding-right: 40px; justify-content: space-between; margin-top: 6px; margin-bottom: 6px';
  buttonContainer2.id = 'button-container-2';
  const buttonPlayLeft = document.createElement('button');
  buttonPlayLeft.id = 'select-left';
  buttonPlayLeft.className = 'play-buttons';
  buttonPlayLeft.innerText = '選擇左';
  const buttonPlayRight = document.createElement('button');
  buttonPlayRight.id = 'select-right';
  buttonPlayRight.className = 'play-buttons';
  buttonPlayRight.innerText = '選擇右';
  buttonContainer2.appendChild(buttonPlayRight);
  buttonContainer2.appendChild(buttonPlayLeft);
  buttonContainerB.appendChild(buttonContainer2);

  const buttonContainer1 = document.createElement('div');
  buttonContainer1.style = 'display: flex; justify-content: center; margin-top: 6px; margin-bottom: 6px';
  const buttonPlaySky = document.createElement('button');
  buttonPlaySky.id = 'select-sky';
  buttonPlaySky.className = 'play-buttons';
  buttonPlaySky.innerText = '選擇天';
  buttonContainer1.appendChild(buttonPlaySky);
  buttonContainerB.appendChild(buttonContainer1);
  
  const buttonContainer3 = document.createElement('div');
  buttonContainer3.style = 'display: flex; justify-content: center; margin-top: 6px; margin-bottom: 6px';
  const buttonPlayNone = document.createElement('button');
  buttonPlayNone.id = 'select-none';
  buttonPlayNone.className = 'play-buttons';
  buttonPlayNone.innerText = '沒有可以選擇的對象';
  buttonContainer3.appendChild(buttonPlayNone);
  buttonContainerB.appendChild(buttonContainer3);
  
  if (uniqueCardID === '164' || uniqueCardID === '523' || uniqueCardID === '959' || uniqueCardID === 'M226'  // 送還
    || uniqueCardID === '236' || uniqueCardID === '479' || uniqueCardID === '867' || uniqueCardID === '1042' // 同歸於盡
    || uniqueCardID === 'M167' || uniqueCardID === 'N153') {
    for (let i = 0; i < 3; i++) {
      attackableCheck(uniqueCardID, viewedArray, 'p2', playedPositions[i], p2MatArrays[i], myResolve);  // see conditionCheck.js
    }
    setbuttonPlayNone(myResolve);
  } else if (uniqueCardID === 'N202') {
    // to be developed
  } else if (uniqueCardID === '960') {
    // to be developed
  } else if (uniqueCardID === '161' || uniqueCardID === '989' || uniqueCardID === 'M227' || uniqueCardID === 'N204') {
    for (let i = 0; i < 3; i++) {
      typeExchangeableCheck(uniqueCardID, playedPositions[i], p2MatArrays[i], myResolve);  // see conditionCheck.js
    }
    setbuttonPlayNone(myResolve);
  } else if (uniqueCardID === '162' || uniqueCardID === '524' || uniqueCardID === '958' || uniqueCardID === 'M230' || uniqueCardID === 'N205') {
    for (let i = 0; i < 3; i++) {
      blindExchangeableCheck(uniqueCardID, playedPositions[i], p2MatArrays[i], myResolve);  // see conditionCheck.js
    }
    setbuttonPlayNone(myResolve);
  } else {
    // by default, voidableCheck is run
    for (let i = 0; i < 3; i++) {
      voidableCheck(uniqueCardID, viewedArray, 'p2', playedPositions[i], p2MatArrays[i], myResolve);  // see conditionCheck.js
    }
    setbuttonPlayNone(myResolve);
  }
}

/* 
Left/Right arrows on display panel
Rationale: create a new array identical to the viewed pile (e.g., queue/used),
rearrange the new array according to left or right arrow,
then show newArray[newArray.length-1]
*/
const pileViewStep2 = (viewedPile) => {
  cardIDViewed = viewedPile[viewedPile.length-1].cardID;
  cardTypeToCheck = viewedPile[viewedPile.length-1].cardType;

  if (cardTypeToCheck === 'sum') {
    sCardDB.forEach(sCard => {
      if (sCard.cardID === cardIDViewed) {
        path = sCard.cardPic};
        })
  } else {
    cardDB.forEach(card => {
      if (card.cardID === cardIDViewed) {
        path = card.cardPic};
    });
  }
  document.getElementById('card-displayed').src = path;
  if (turnClass === "play" || turnClass === "draw") {
    document.getElementById('display-panel-button-container').innerHTML = '';
  }
  pile = viewedPile;
}

pileShuffle = (arr, index) => [
    ...arr.slice(index), 
    ...arr.slice(0, index)];

const pileViewLeft = (pile) => {      
  let viewedPile = pileShuffle(pile, 1);
  pileViewStep2(viewedPile);
}

const pileViewRight = (pile) => {
  let viewedPile = pileShuffle(pile, pile.length-1);
  pileViewStep2(viewedPile);
}

// 2nd layer menu - type A
const callButtonMenu2A = (cardIDPlayed, playedPosition) => {
  document.getElementById('display-panel-button-container').innerHTML = '';

  const playUpsideDownButton = document.createElement('button');
  playUpsideDownButton.id = 'play-UD-button';
  playUpsideDownButton.className = 'play-buttons';
  playUpsideDownButton.innerText = '蓋牌打出';
  if (playedPosition === 'sky') {
    playUpsideDownButton.onclick = func => {playUDSky('p1', cardIDPlayed, 0)};
  } else if (playedPosition === 'left') {
    playUpsideDownButton.onclick = func => {playUDLeft('p1', cardIDPlayed, 0)};
  } else if (playedPosition === 'right') {
    playUpsideDownButton.onclick = func => {playUDRight('p1', cardIDPlayed, 0)};
  } else if (playedPosition === 'help') {
    playUpsideDownButton.onclick = func => {playUDHelp('p1', cardIDPlayed, 0)};
  } else {console.log('something went wrong')}

  const backButton = document.createElement('button');
  backButton.id = 'back-button';
  backButton.className = 'play-buttons';
  backButton.innerText = '返回';
  backButton.onclick = func => {callButtonMenu1(cardIDPlayed)};

  const displayPanelButContainer = document.getElementById('display-panel-button-container');
  displayPanelButContainer.appendChild(playUpsideDownButton);
  displayPanelButContainer.appendChild(backButton);
}
  
// 2nd layer menu - type B
const callButtonMenu2B = (cardIDPlayed, playedPosition) => {
  document.getElementById('display-panel-button-container').innerHTML = '';

  const playNormallyButton = document.createElement('button');
  playNormallyButton.id = 'play-N-button';
  playNormallyButton.className = 'play-buttons';
  playNormallyButton.innerText = '正面打出';
  if (playedPosition === 'sky') {
    playNormallyButton.onclick = func => {playSky('p1', cardIDPlayed)};
  } else if (playedPosition === 'left') {
    playNormallyButton.onclick = func => {playLeft('p1', cardIDPlayed)};
  } else if (playedPosition === 'right') {
    playNormallyButton.onclick = func => {playRight('p1', cardIDPlayed)};
  } else if (playedPosition === 'help') {
    playNormallyButton.onclick = func => {playHelp('p1', cardIDPlayed)};
  } else {console.log('something went wrong')}

  const playUpsideDownButton = document.createElement('button');
  playUpsideDownButton.id = 'play-UD-button';
  playUpsideDownButton.className = 'play-buttons';
  playUpsideDownButton.innerText = '蓋牌打出';
  if (playedPosition === 'sky') {
    playUpsideDownButton.onclick = func => {playUDSky('p1', cardIDPlayed, 0)};
  } else if (playedPosition === 'left') {
    playUpsideDownButton.onclick = func => {playUDLeft('p1', cardIDPlayed, 0)};
  } else if (playedPosition === 'right') {
    playUpsideDownButton.onclick = func => {playUDRight('p1', cardIDPlayed, 0)};
  } else if (playedPosition === 'help') {
    playUpsideDownButton.onclick = func => {playUDHelp('p1', cardIDPlayed, 0)};
  } else {console.log('something went wrong')}

  const backButton = document.createElement('button');
  backButton.id = 'back-button';
  backButton.className = 'play-buttons';
  backButton.innerText = '返回';
  backButton.onclick = func => {callButtonMenu1(cardIDPlayed)};

  const displayPanelButContainer = document.getElementById('display-panel-button-container');
  displayPanelButContainer.appendChild(playNormallyButton);
  displayPanelButContainer.appendChild(playUpsideDownButton);
  displayPanelButContainer.appendChild(backButton);
};

 // 2nd layer menu - type C
 const callButtonMenu2C = (cardIDPlayed, playedPosition) => {
  document.getElementById('display-panel-button-container').innerHTML = '';

  const tempoUDButtonContainer = document.createElement('div');
  tempoUDButtonContainer.style = 'display: flex; position: relative';
  tempoUDButtonContainer.id = 'tempoUD-button-container';
  const playUpsideDownTempoButton = document.createElement('button');
  playUpsideDownTempoButton.id = 'play-UD-button';
  playUpsideDownTempoButton.className = 'play-buttons';
  playUpsideDownTempoButton.innerText = '暫時以蓋牌打出';
  if (playedPosition === 'sky') {
    playUpsideDownTempoButton.onclick = func => {playUDSky('p1', cardIDPlayed, 1)};
  } else if (playedPosition === 'left') {
    playUpsideDownTempoButton.onclick = func => {playUDLeft('p1', cardIDPlayed, 1)};
  } else if (playedPosition === 'right') {
    playUpsideDownTempoButton.onclick = func => {playUDRight('p1', cardIDPlayed, 1)};
  } else if (playedPosition === 'help') {
    playUpsideDownTempoButton.onclick = func => {playUDHelp('p1', cardIDPlayed, 1)};
  } else {console.log('something went wrong')}
  const tooltipTempoUD = document.createElement('div');
  tooltipTempoUD.id = 'tooltip-tempo-button'; // see Display-panel.css for its style
  tooltipTempoUD.className = 'tooltip';
  tooltipTempoUD.innerText = "你想打出的位置或召喚獸現正被防禦。\n你可以暫時以蓋牌形式把此咭打出，保留還原的機會。";
  tempoUDButtonContainer.appendChild(playUpsideDownTempoButton);
  tempoUDButtonContainer.appendChild(tooltipTempoUD);

  const playUpsideDownButton = document.createElement('button');
  playUpsideDownButton.id = 'play-UD-button';
  playUpsideDownButton.className = 'play-buttons';
  playUpsideDownButton.innerText = '蓋牌打出';
  if (playedPosition === 'sky') {
    playUpsideDownButton.onclick = func => {playUDSky('p1', cardIDPlayed, 0)};
  } else if (playedPosition === 'left') {
    playUpsideDownButton.onclick = func => {playUDLeft('p1', cardIDPlayed, 0)};
  } else if (playedPosition === 'right') {
    playUpsideDownButton.onclick = func => {playUDRight('p1', cardIDPlayed, 0)};
  } else if (playedPosition === 'help') {
    playUpsideDownButton.onclick = func => {playUDHelp('p1', cardIDPlayed, 0)};
  } else {console.log('something went wrong')}

  const backButton = document.createElement('button');
  backButton.id = 'back-button';
  backButton.className = 'play-buttons';
  backButton.innerText = '返回';
  backButton.onclick = func => {callButtonMenu1(cardIDPlayed)};

  const displayPanelButContainer = document.getElementById('display-panel-button-container');
  displayPanelButContainer.appendChild(tempoUDButtonContainer);
  displayPanelButContainer.appendChild(playUpsideDownButton);
  displayPanelButContainer.appendChild(backButton);
}

// 2nd layer menu - type D (for golden egg)
const callButtonMenu2D = (cardIDPlayed, playedPosition) => {
  document.getElementById('display-panel-button-container').innerHTML = '';

  const playNormallyButton = document.createElement('button');
  playNormallyButton.id = 'play-N-button';
  playNormallyButton.className = 'play-buttons';
  playNormallyButton.innerText = '正面打出';
  if (playedPosition === 'sky') {
    playNormallyButton.onclick = func => {playSky('p1', cardIDPlayed)};
  } else if (playedPosition === 'left') {
    playNormallyButton.onclick = func => {playLeft('p1', cardIDPlayed)};
  } else if (playedPosition === 'right') {
    playNormallyButton.onclick = func => {playRight('p1', cardIDPlayed)};
  } else if (playedPosition === 'help') {
    playNormallyButton.onclick = func => {playHelp('p1', cardIDPlayed)};
  } else {console.log('something went wrong')}

  const backButton = document.createElement('button');
  backButton.id = 'back-button';
  backButton.className = 'play-buttons';
  backButton.innerText = '返回';
  backButton.onclick = func => {callButtonMenu1(cardIDPlayed)};

  const displayPanelButContainer = document.getElementById('display-panel-button-container');
  displayPanelButContainer.appendChild(playNormallyButton);
  displayPanelButContainer.appendChild(backButton);
};

// 1st layer menu
const callButtonMenu1 = (cardIDPlayed) => {
  document.getElementById('display-panel-button-container').innerHTML = '';
  const displayPanelButContainer = document.getElementById('display-panel-button-container');

  const buttonContainerB = document.createElement('div');
  buttonContainerB.style = 'width: 160px';
  displayPanelButContainer.appendChild(buttonContainerB);
  
  const buttonContainer1 = document.createElement('div');
  buttonContainer1.style = 'display: flex; justify-content: center';
  const buttonPlaySky = document.createElement('button');
  buttonPlaySky.id = 'play-at-sky';
  buttonPlaySky.className = 'play-buttons';
  buttonPlaySky.innerText = '打出到天';
  buttonContainer1.appendChild(buttonPlaySky);
  buttonContainerB.appendChild(buttonContainer1);
  
  const buttonContainer2 = document.createElement('div');
  buttonContainer2.style = 'display: flex; justify-content: space-between';
  const buttonPlayLeft = document.createElement('button');
  buttonPlayLeft.id = 'play-at-left';
  buttonPlayLeft.className = 'play-buttons';
  buttonPlayLeft.innerText = '打出到左';
  const buttonPlayRight = document.createElement('button');
  buttonPlayRight.id = 'play-at-right';
  buttonPlayRight.className = 'play-buttons';
  buttonPlayRight.innerText = '打出到右';
  buttonContainer2.appendChild(buttonPlayLeft);
  buttonContainer2.appendChild(buttonPlayRight);
  buttonContainerB.appendChild(buttonContainer2);

  const buttonContainer3 = document.createElement('div');
  buttonContainer3.style = 'display: flex; justify-content: center';
  const buttonPlayHelp = document.createElement('button');
  buttonPlayHelp.id = 'play-at-help';
  buttonPlayHelp.className = 'play-buttons';
  buttonPlayHelp.innerText = '打出到Help';
  buttonContainer3.appendChild(buttonPlayHelp);
  buttonContainerB.appendChild(buttonContainer3);

  conditionCheck('p1', 'sky', cardIDPlayed);
  conditionCheck('p1', 'left', cardIDPlayed);
  conditionCheck('p1', 'right', cardIDPlayed);
  conditionCheck('p1', 'help', cardIDPlayed);
}