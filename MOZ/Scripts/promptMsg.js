const composeMsg = () => {
  document.getElementById("alert-container").style.display = "flex";
  document.getElementById("alert-select").style = "display: none";

  const alertButton = document.getElementById("alert-button1");
  alertButton.innerText = "OK";
  alertButton.onclick = func => {closePrompt()};
  
  document.getElementById("alert-button2").style = "pointer-events: none; display: none";
}

// used by most prompt functions
const closePrompt = () => {
  document.getElementById("alert-container").style.display = "none";
}

// messages in SP turn
const promptSPturnMsg = () => {
  composeMsg();
  setTimeout(() => {window.addEventListener('click', closePrompt, {once: true})}, 0);
  document.getElementById("alert-text").innerText = "SP回合：請從手牌選擇是否打出SP咭。";
}

const promptWaitMsg = () => {
  composeMsg();
  setTimeout(() => {window.addEventListener('click', closePrompt, {once: true})}, 0);
  document.getElementById("alert-text").innerText = p1Name + "，請等候另一位玩家作出決定。";
}

const promptAddScoreMsg = (msgtext, effectResolve) => {
  composeMsg();
  setTimeout(() => {window.addEventListener('click', func => {acceptScore(effectResolve)}, {once: true})}, 0);
  document.getElementById("alert-text").innerText = msgtext;
  
  document.getElementById("alert-button1").onclick = func => {acceptScore(effectResolve)}
}

const acceptScore = (effectResolve) => {
  document.getElementById("alert-container").style.display = "none";
  renderScores();
  effectResolve();
}

const promptPointDeduction = (victim, uniqueCardID, deduction) => {
  composeMsg();
  setTimeout(() => {window.addEventListener('click', closePrompt, {once: true})}, 0);
  cardDB.forEach(card => {
    if (card.cardID === uniqueCardID) {
      displayedCardName = card.cardName;
    }
  })
  document.getElementById("alert-text").innerText = displayedCardName + '的效力使' + findPlayerName(victim) + '的總積分點減' + deduction + '點。'
}

// forfeit, certain summoner effects and disaster cards still trigger this message
promptResultMsg = () => {
  composeMsg();
  setTimeout(() => {window.addEventListener('click', acceptResult, {once: true})}, 0);
  document.getElementById("alert-text").innerText = resultMsg;
  const alertButton = document.getElementById("alert-button1");
  alertButton.innerText = "OK";
  alertButton.onclick = func => {acceptResult()};
}

// ! need to be in sync with SPturnEnd()
const acceptResult = () => {
  document.getElementById("alert-container").style.display = "none";
  if (p1Score >= 50 || p2Score >= 50) {
    if (p1Score >= 50) {
      finalWinner = 'p1';
    } else {
      finalWinner = 'p2';
    }
    promptEndGameMsg();
  } else if (p1Queue.length === 0) {
    promptArrangeSummonersMsg();
    // restock the queue arrays before prompting players to re-arrange summoners
    restockQueue('p1', p1Summoner, p1Queue, p1Used);
    restockQueue('p2', p2Summoner, p2Queue, p2Used);
    turnClass = 'choiceEffect';
    arrangeSummoners();  // see p1ButtonMenu.js for arrangeSummoners()
  }
}

const prompt50scoreMsg = (msg) => {
  composeMsg();
  setTimeout(() => {window.addEventListener('click', closeAndEnd, {once: true})}, 0);
  document.getElementById("alert-text").innerText = msg;
}

// used by prompt50scoreMsg() and promptDeckEndMsg()
const closeAndEnd = () => {
  document.getElementById("alert-container").style.display = "none";
  promptEndGameMsg();
}

const promptArrangeSummonersMsg = () => {
  composeMsg();
  setTimeout(() => {window.addEventListener('click', closePrompt, {once: true})}, 0);
  document.getElementById("alert-text").innerText = "所有召喚師咭都用完，你現在可以重新排列召喚師順序。";
}

// messages in pre-prep
const promptOrderError = () => {
  composeMsg();
  setTimeout(() => {window.addEventListener('click', closePrompt, {once: true});}, 0);  // somehow it doesn't work without the setTimeout
  document.getElementById("alert-text").innerText = "請確保召喚師的順序沒有重複。";
}

const promptOrderAccepted = () => {
  composeMsg();
  setTimeout(() => {window.addEventListener('click', closePrompt, {once: true})}, 0);
  document.getElementById("alert-text").innerText = "更新了召喚師的順序，你現在可以打出召喚師。";
}

// message for card drawing
const promptDeckEndMsg = (player) => {
  composeMsg();
  setTimeout(() => {window.addEventListener('click', closeAndEnd, {once: true});}, 0);
  document.getElementById("alert-text").innerText = findPlayerName(player) + "的 ZONE 沒有咭可抽，" + findPlayerName(findVictim(player)) + "勝。";
}

// messages for forfeit
const forfeitConfirmMsg = () => {
  document.getElementById("p1ForfeitBut").disabled = true;
  document.getElementById("drawCardp1But").disabled = true;
  disableP1PlayButtons();
  matCardDisplay(p1Summoner);

  const alertBox = document.getElementById("alert-container");
  alertBox.style.display = "flex";
  document.getElementById("alert-select").style = "display: none";
  document.getElementById("alert-text").innerText = "確定要放棄這召喚師的對戰嗎？"

  const yesButton = document.getElementById("alert-button1");
  yesButton.innerText = "確定";
  yesButton.onclick = func => {
    alertBox.style.display = "none";
    forfeit('p1');
  }

  const noButton = document.getElementById("alert-button2");
  noButton.style = "pointer-events: auto; display: inline-block"
  noButton.innerText = "返回";
  noButton.onclick = func => {
    alertBox.style.display = "none";
    document.getElementById("p1ForfeitBut").disabled = false;
    if (turnClass === 'draw') {
      document.getElementById("drawCardp1But").disabled = false;
    }
    renderHand('p1');
  }
}

const promptCardDiscard = () => {
  const alertBox = document.getElementById("alert-container");
  alertBox.style.display = "flex";
  document.getElementById("alert-select").style = "display: none";
  document.getElementById("alert-text").innerText = "本回合你已經抽牌，所以你須要從手牌中捨棄一張咭。";
  
  const yesButton = document.getElementById("alert-button1");
  yesButton.innerText = "從手牌中選擇一張咭捨棄。";
  yesButton.onclick = func => {
    alertBox.style.display = "none";
    turnClass = 'discard';
    renderHand('p1');
    handCardDisplay('p1', 0);
  }

  const noButton = document.getElementById("alert-button2");
  noButton.style = "pointer-events: auto; display: inline-block"
  noButton.innerText = "返回";
  noButton.onclick = func => {
    alertBox.style.display = "none";
    document.getElementById("p1ForfeitBut").disabled = false;
    renderHand('p1');
  }
}

// messages for card effects
const promptEffectUsed = (displayedCardName) => {
  composeMsg();
  setTimeout(() => {window.addEventListener('click', closePrompt, {once: true})}, 0);
  document.getElementById("alert-text").innerText = displayedCardName + "的效力只能在對戰中行使一次。";
}

const promptHoleEmpty = () => {
  composeMsg();
  setTimeout(() => {window.addEventListener('click', closePrompt, {once: true})}, 0);
  document.getElementById("alert-text").innerText = "墓地沒有任何咭。";
}

// applicable to 交換
const promptExchangeStep1 = (promptResolve) => {
  composeMsg();
  setTimeout(() => {window.addEventListener('click', func => {acceptResolve(promptResolve)}, {once: true})}, 0);
  document.getElementById("alert-text").innerText = "從對手的天、左、右選擇一隻召喚獸交換。";
  document.getElementById("alert-button1").onclick = func => {acceptResolve(promptResolve)};
}

const acceptResolve = (resolve) => {
  document.getElementById("alert-container").style.display = "none";
  resolve();
}

const promptExchangeStep2 = (uniqueCardID, obtainedPosition, obtainedArray, myResolve) => {
  composeMsg();
  setTimeout(() => {
    window.addEventListener('click', func => {acceptExchangeStep2(uniqueCardID, obtainedPosition, obtainedArray, myResolve)}, {once: true});
  }, 0);
  document.getElementById("alert-text").innerText = "從自己的天、左、右選擇一隻召喚獸交換。";
  document.getElementById("alert-button1").onclick = func => {
    acceptExchangeStep2(uniqueCardID, obtainedPosition, obtainedArray, myResolve);
  }
}

const acceptExchangeStep2 = (uniqueCardID, obtainedPosition, obtainedArray, myResolve) => {
  document.getElementById("alert-container").style.display = "none";
  selectOfferMenu(uniqueCardID, obtainedPosition, obtainedArray, myResolve);
}

// applicable to 送還，爆
const promptGraveEffect = (promptResolve) => {
  promptChoice(promptResolve);
  document.getElementById("alert-text").innerText = "從對手的天、左、右選擇一隻召喚獸丟進墓地內。";
}

// applicable to most choice effects
const promptVoidEffect = (promptResolve) => {
  promptChoice(promptResolve);
  document.getElementById("alert-text").innerText = "從對手的天、左、右選擇一隻符合條件的召喚獸 0 化。";
}

const promptChoice = (promptResolve) => {
  composeMsg();
  setTimeout(() => {window.addEventListener('click', func => {acceptResolve(promptResolve)}, {once: true})}, 0);
  document.getElementById("alert-button1").onclick = func => {
    acceptResolve(promptResolve);
  }
}

// applicable to vanilla power-up help card effects
const promptPowerupSelect = (uniqueCardID, bannedEffectInTurn, powerupFlat, powerupValue, myResolve) => {
  composeMsg();
  setTimeout(() => {
    window.addEventListener('click', func => {acceptPowerupSelect(uniqueCardID, bannedEffectInTurn, powerupFlat, powerupValue, myResolve)}, {once: true});
  }, 0);
  document.getElementById("alert-text").innerText = "從自己的天、左、右選擇一隻符合條件的召喚獸。";
  document.getElementById("alert-button1").onclick = func => {
    acceptPowerupSelect(uniqueCardID, bannedEffectInTurn, powerupFlat, powerupValue, myResolve);
  }
}

const acceptPowerupSelect = (uniqueCardID, bannedEffectInTurn, powerupFlat, powerupValue, myResolve) => {
  document.getElementById("alert-container").style.display = "none";
  selectHelpedTargetMenu(uniqueCardID, bannedEffectInTurn, powerupFlat, powerupValue, myResolve);
}

// applicable to 補牌咭
const promptDrawTillSeven = (player, drawLimit, myResolve) => {
  const alertBox = document.getElementById("alert-container");
  alertBox.style.display = "flex";

  document.getElementById("alert-text").innerText = "請選擇補充手牌的數量。";

  const alertSelect = document.getElementById("alert-select");
  alertSelect.style = "display: block";

  let handCardShortage = 7 - p1Hand.length;
  let optionNum = Math.min(drawLimit, handCardShortage, p1Deck.length);
  for (let i = optionNum; i >= 0; i--) {
    const drawNumOption = document.createElement("option");
    drawNumOption.text = i;
    alertSelect.add(drawNumOption);
  }

  const alertButton = document.getElementById("alert-button1");
  alertButton.innerText = "確定";
  alertButton.onclick = func => {
    alertBox.style.display = "none";
    const drawNumOptionSelected = Math.floor(document.getElementById("alert-select").value);
    if (drawNumOptionSelected === 0) {
      turnClass = 'play';
      myResolve();
    } else {
      turnClass = 'draw';
      drawCard(player, drawNumOptionSelected);
      setTimeout(() => myResolve(), (drawAniDur+(drawLimit-1)*0.05)*1000+aniBuffer);
    }
  };

  const extraButton = document.getElementById("alert-button2");
  extraButton.style = "pointer-events: none; display: none";
}

// applicable to 召喚師移動
const promptSummonersShuffle = (effectResolve) => {
  composeMsg();
  setTimeout(() => {window.addEventListener('click', func => {acceptResolve(effectResolve)}, {once: true})}, 0);
  document.getElementById("alert-text").innerText = "你現在可以重新排列召喚師順序。\n提示：點擊自己場中的咭可觀看咭的資料。";

  document.getElementById("alert-button1").onclick = func => {acceptResolve(effectResolve)};
}

const prompt304Effect = (effectResolve) => {
  composeMsg();
  setTimeout(() => {window.addEventListener('click', func => {acceptResolve(effectResolve)}, {once: true})}, 0);
  document.getElementById("alert-text").innerText = "你現在可以重新排列對方的召喚師順序。\n提示：點擊自己場中的咭可觀看咭的資料。";

  document.getElementById("alert-button1").onclick = func => {acceptResolve(effectResolve)};
}

const prompt304EffectFail = (myResolve) => {
  composeMsg();
  setTimeout(() => {window.addEventListener('click', func => {acceptResolve(myResolve)}, {once: true})}, 0);
  document.getElementById("alert-text").innerText = "闇帕加發動查看對方召喚師的效力，但對方沒有候命的召喚師。";

  document.getElementById("alert-button1").onclick = func => {acceptResolve(myResolve)};
}

// applicable to 召喚師替換
const promptSummonersSwap = (effectResolve) => {
  composeMsg();
  setTimeout(() => {window.addEventListener('click', func => {acceptResolve(effectResolve)}, {once: true})}, 0);
  document.getElementById("alert-text").innerText = "請選擇一位用完的召喚師。\n提示：有些召喚師不受召喚師替換的效果影響。點擊自己場中的咭可觀看咭的資料。";

  document.getElementById("alert-button1").onclick = func => {acceptResolve(effectResolve)};
}

const promptSummonersSwapStep2 = (usedSummonerCardID, myResolve) => {
  composeMsg();
  setTimeout(() => {
    window.addEventListener('click', func => {acceptSummonersSwapStep2(usedSummonerCardID, myResolve)}, {once: true});
  }, 0);
  document.getElementById("alert-text").innerText = "請選擇一位候命的召喚師。\n提示：有些召喚師不受召喚師替換的效果影響。點擊自己場中的咭可觀看咭的資料。";
  document.getElementById("alert-button1").onclick = func => {acceptSummonersSwapStep2(usedSummonerCardID, myResolve)};
}

const acceptSummonersSwapStep2 = (usedSummonerCardID, myResolve) => {
  document.getElementById("alert-container").style.display = "none";
  selectQueuedSummonerMenu(usedSummonerCardID, myResolve);
}

const prompt201effect = (myResolve) => {
  const alertBox = document.getElementById("alert-container");
  alertBox.style.display = "flex";
  document.getElementById("alert-select").style = "display: none";

  document.getElementById("alert-text").innerText = "金蛋可以誰化成波哥斯。你要把金蛋 0 化然後打出波哥斯嗎？"

  const play226Button = document.getElementById("alert-button1");
  play226Button.innerText = "打出波哥斯";
  play226Button.onclick = func => {
    alertBox.style.display = "none";
    for (let i = 0; i < 3; i++) {
      if (p1MatArrays[i].length > 0) {
        if (p1MatArrays[i][p1MatArrays[i].length-1].cardID === '201') {
          effectPlayCard('p1', '226', p1MatArrays[i], playedPositions[i], myResolve);
        }
      }  
    }
  }

  const notPlayButton = document.getElementById("alert-button2");
  notPlayButton.style = "pointer-events: auto; display: inline-block"
  notPlayButton.innerText = "不打出波哥斯";
  
  notPlayButton.onclick = func => {
    alertBox.style.display = "none";
    turnClass = 'effect';
    forfeitabilityCheck('p1');
    myResolve();
  }
}

const promptS061Effect = (player, myResolve) => {
  const alertBox = document.getElementById("alert-container");
  alertBox.style.display = "flex";
  document.getElementById("alert-select").style = "display: none";

  document.getElementById("alert-text").innerText = "要使用哈基米基的特殊能力補充一張手牌嗎？"

  const yesButton = document.getElementById("alert-button1");
  yesButton.innerText = "要";
  yesButton.style = "width: 45px";
  yesButton.onclick = func => {
    alertBox.style.display = "none";
    drawCard(player, 1);
    setTimeout(() => myResolve(), (drawAniDur*1000+aniBuffer));
  }

  const noButton = document.getElementById("alert-button2");
  noButton.style = "pointer-events: auto; display: inline-block; width: 45px"
  noButton.innerText = "不要";
  
  noButton.onclick = func => {
    alertBox.style.display = "none";
    myResolve();
  }
}

const promptMaxDeckNum = (maxNum) => {
  composeMsg();
  setTimeout(() => {window.addEventListener('click', closePrompt, {once: true})}, 0);
  document.getElementById("alert-text").innerText = "最多只能有 " + maxNum + " 副咭組。請先刪除部分咭組。";
}

const promptDeckInvalid = () => {
  composeMsg();
  setTimeout(() => {window.addEventListener('click', closePrompt, {once: true})}, 0);
  document.getElementById("alert-text").innerText = "此咭組不附合規則要求。";
}

const promptIllegalEntry = (promptResolve) => {
  composeMsg();
  setTimeout(() => {window.addEventListener('click', func => {acceptResolve(promptResolve)}, {once: true})}, 0);
  document.getElementById("alert-text").innerText = "發生錯誤！！！\n誤闖 ZONE 是很危險的。請確保你和你的對手有合乎規則的咭組。";

  document.getElementById("alert-button1").onclick = func => {acceptResolve(promptResolve)};
}

const promptReconsider = (promptResolve) => {
  const alertBox = document.getElementById("alert-container");
  alertBox.style.display = "flex";
  document.getElementById("alert-select").style = "display: none";

  document.getElementById("alert-text").innerText = "你尚未選擇獎品咭。你決定要離開嗎？"

  const leaveButton = document.getElementById("alert-button1");
  leaveButton.innerText = "不選擇獎品咭而離開";
  leaveButton.onclick = func => {
    alertBox.style.display = "none";
    promptResolve();
  }

  const stayButton = document.getElementById("alert-button2");
  stayButton.style = "pointer-events: auto; display: inline-block"
  stayButton.innerText = "繼續選擇獎品咭";
  stayButton.onclick = func => {
    document.getElementById('take-prize-button').disabled = false;
    const dropDownBtns = document.getElementsByClassName('drop-down-button');
    for (let i = 0; i < dropDownBtns.length; i++) {dropDownBtns[i].disabled = false;}
    alertBox.style.display = "none";
  }
}

const promptNoPrize = (promptResolve) => {
  composeMsg();
  setTimeout(() => {window.addEventListener('click', func => {acceptResolve(promptResolve)}, {once: true})}, 0);
  document.getElementById("alert-text").innerText = "發生錯誤！！！\n堂堂正正地打敗你的對手後再來吧。";

  document.getElementById("alert-button1").onclick = func => {acceptResolve(promptResolve)};
}