const declareSPdecision = (player) => {
  if (player === 'p1') {
    p1SPdecision = true;
    disableP1PlayButtons();
  } else {
    p2SPdecision = true;
  };
  // the following only happens after both players have declared their SP decisions
  if (p1SPdecision === true && p2SPdecision === true) {
    // scenario 1: no one plays a SP card
    if (p1SP.length === 0 && p2SP.length === 0) {
      matCardDisplay(p1Summoner);
      SPturnEnd();
    } else {
      // scenarios 2 & 3: one or more players play a SP card
      new Promise(function(playResolve) {
        // trigger animation and rendering
        if (p1SP.length > 0) {playHandAnimation('p1', p1SP[0].cardID, 'sp', 'Normal')};
        if (p2SP.length > 0) {playHandAnimation('p2', p2SP[0].cardID, 'sp', 'Normal')};
        setTimeout(() => playResolve(), playAniDur*1000+aniBuffer);
      }).then(func => {
        if (p1SP.length > 0) {playHandAnimationReverse('p1', 'sp')};
        if (p2SP.length > 0) {playHandAnimationReverse('p2', 'sp')};
        renderHand('p1');
        disableP1PlayButtons(); // need to disable the p1Hand buttons again
        renderHand('p2');
        renderMat('p1', p1SP, 'sp');
        renderMat('p2', p2SP, 'sp');
        // render the card shown on display panel
        if (p1SP.length > 0) {
          matCardDisplay(p1SP);
        } else {
          matCardDisplay(p2SP);
        }
        // scenario 2: both players play a SP card
        if (p1SP.length > 0 && p2SP.length > 0) {
          // cancel SP effect if the SP cards are the same or of the same class
          if (SPcancelCheck(p1SP[0].cardID, p2SP[0].cardID) === true) {
            SPturnEnd();
          // if either player plays a Counter card, check if its effect can take place
          } else if (bigFourCheck('Counter') !== 'neither') {
            counterPhase();
          // if either player plays a Disaster card, check if its effect is overridden
          } else if (bigFourCheck('Disaster') !== 'neither') {
            disasterPhase();
          // if either player plays a Null card, check if its effect is overridden
          } else if (bigFourCheck('Null') !== 'neither') {
            nullPhase();
          // if either player plays a Miracle card, check if its effect is overridden
          } else if (bigFourCheck('Miracle') !== 'neither') {
            miraclePhase();
          } else {
            twoSPphase();
          }
        } else {
          // scenario 3: only one player plays a SP card
          oneSPphase();
        }
      })
    }
  } else {
    // triggered when either player hasn't made SP declaration
    if (player === 'p2') {
      console.log(p2Name, ", please wait for the other player.")
    } else {
      promptWaitMsg();
    }
  }
}

const SPturnEnd = () => {
  new Promise(function(turnResolve) {
    computeTotalPower(turnResolve);  // see calPower.js
  }).then(func => {
    new Promise(function(turnResolve2) {
      renderPowers();
      rankCombo();  // see calScore.js
      renderScores();
      promptAddScoreMsg(resultMsg, turnResolve2);
    }).then(func => {
      if (p1Score >= 50 || p2Score >= 50) {
        if (p1Score >= 50) {
          finalWinner = 'p1';
        } else {
          finalWinner = 'p2';
        }
        promptEndGameMsg();
      } else {
        new Promise(function(myResolve) {
          postGameCardEffects(myResolve);  // see postGameEffects.js
        }).then(func => {
          if (p1Queue.length === 0) {
            // ! need to sync promptResultMsg() with below
            promptArrangeSummonersMsg();
            // restock the queue arrays before prompting players to re-arrange summoners
            restockQueue('p1', p1Summoner, p1Queue, p1Used);
            restockQueue('p2', p2Summoner, p2Queue, p2Used);
            turnClass = 'choiceEffect';
            arrangeSummoners();  // see p1ButtonMenu.js for arrangeSummoners()
          } else {
            document.getElementById("playSummonersBut").disabled = false;
          }
        })     
      }
    })
  })
}

const restockQueue = (player, summonerArray, queueArray, usedArray) => {
  // restock from summonerArray
  if (summonerArray.length > 0) {
    sCardDB.forEach(sCard => {
      if (sCard.cardID === summonerArray[0].cardID) {
        queueArray.push({
          cardName: sCard.cardName,
          cardID: sCard.cardID,
          cardType: sCard.cardType,
          summonerLevel: sCard.summonerLevel,
          cardSeries: sCard.cardSeries,
          cardPic: sCard.cardPic,
        })
      }
    });
    summonerArray.pop();
  }
  // restock from usedArray
  for (let i = usedArray.length-1; i >= 0; i--) {
    queueArray.push(usedArray[i]);
  }
  usedArray.length = 0;
  renderMat(player, summonerArray, 'summoner');
  renderMat(player, queueArray, 'queue');
  renderMat(player, usedArray, 'used');
}

const twoSPphase = () => {
  if (p1Summoner[0].speed > p2Summoner[0].speed) {
    new Promise(function(myResolve) {
      cardEffect('p1', p1SP[0].cardID, p1SP, myResolve);
    }).then(func => {
      new Promise(function(myResolve) {
        cardEffect('p2', p2SP[0].cardID, p2SP, myResolve);
      }).then(func => {
        SPturnEnd();
      })
    })
  } else {
    new Promise(function(myResolve) {
      cardEffect('p2', p2SP[0].cardID, p2SP, myResolve);
    }).then(func => {
      new Promise(function(myResolve) {
        cardEffect('p1', p1SP[0].cardID, p1SP, myResolve);
      }).then(func => {
        SPturnEnd();
      })
    })
  }
}

const oneSPphase = () => {
  new Promise(function(myResolve) {
    if (p1SP.length > 0) {
      cardEffect('p1', p1SP[0].cardID, p1SP, myResolve);
    } else {
      cardEffect('p2', p2SP[0].cardID, p2SP, myResolve);
    }
  }).then(func => {SPturnEnd()})
}

// Check if SP cards cancel out each other (note: 966 and 967 need to have their own unique monClass, other than Null)
const SPcancelCheck = (p1SPID, p2SPID) => {
  if (p1SPID === p2SPID) {
    return true;
  } else {
    cardDB.forEach(card => {
      if (card.cardID === p1SPID) {
        p1SPmonClass = card.monClass
      }
      if (card.cardID === p2SPID) {
        p2SPmonClass = card.monClass
      }
    })
    if (p1SPmonClass === p2SPmonClass && p1SPmonClass !== '') {
      return true;
    } else {
      return false;
    }
  } 
}

// Big Four: Counter (i.e., 530 忍法‧女反殺), Disaster, Null0/Null1/Null2 (i.e., 惡魔的劣行/鬼的劣行/銀河的侵略), Miracle (i.e., 天之奇蹟)
const bigFourCheck = (checkedType) => {
  if (p1SP.length > 0) {
    cardDB.forEach(card => {
      if (card.cardID === p1SP[0].cardID) {
        p1SPmonClass = card.monClass;
      }
    })
  }
  if (p2SP.length > 0) {
    cardDB.forEach(card => {
      if (card.cardID === p2SP[0].cardID) {
        p2SPmonClass = card.monClass;
      }
    })
  }
  if (p1SPmonClass.includes(checkedType) === true) {  // use includes.() because the monClass of Null cards may be Null0, Null1 or Null2
    return 'p1';
  } else if (p2SPmonClass.includes(checkedType) === true) {
    return 'p2';
  } else {
    return 'neither';
  }
}

const counterPhase = () => {
  new Promise(function(myResolve) {
    if (bigFourCheck('Counter') === 'p1') {
      if (conditionCheck530('p1') === true) {
        p2SP[0].effectVoided = true;
        cardEffect('p1', p1SP[0].cardID, p1SP, myResolve);
      } else {
        p1SP[0].effectVoided = true;
        cardEffect('p2', p2SP[0].cardID, p2SP, myResolve)
      }
    } else {
      if (conditionCheck530('p2') === true) {
        p1SP[0].effectVoided = true;
        cardEffect('p2', p2SP[0].cardID, p2SP, myResolve)
      } else {
        p2SP[0].effectVoided = true;
        cardEffect('p1', p1SP[0].cardID, p1SP, myResolve)
      }
    }
  }).then(func => {
    SPturnEnd();
  })
}

// check if the effect of 530 can be triggered
const conditionCheck530 = (player) => {
  if (player === 'p1') {
    if (p1Summoner[0].team === 'kageshinobu' && p2Summoner[0].gender === 'F') {
      return true;
    } else {
      return false;
    }
  } else {
    if (p2Summoner[0].team === 'kageshinobu' && p1Summoner[0].gender === 'F') {
      return true;
    } else {
      return false;
    }
  }
}

const disasterPhase = () => {
  new Promise(function(myResolve) {
    if (bigFourCheck('Disaster') === 'p1') {
      if (p1SP[0].cardID === '167' && disasterOverride167(p2SP[0].cardID) === true) {
        p1SP[0].effectVoided = true;
        cardEffect('p2', p2SP[0].cardID, p2SP, myResolve);
      } else if ((p1SP[0].cardID === '533' || p1SP[0].cardID === '699') && disasterOverride533(p2SP[0].cardID) === true) {
        p1SP[0].effectVoided = true;
        cardEffect('p2', p2SP[0].cardID, p2SP, myResolve);
      } else if (p1SP[0].cardID === '641' && disasterOverride641(p2SP[0].cardID) === true) {
        p1SP[0].effectVoided = true;
        cardEffect('p2', p2SP[0].cardID, p2SP, myResolve);
      } else if ((p1SP[0].cardID === '971' || p1SP[0].cardID === 'M216' || p1SP[0].cardID === 'N200') && disasterOverride971(p2SP[0].cardID) === true) {
        p1SP[0].effectVoided = true;
        cardEffect('p2', p2SP[0].cardID, p2SP, myResolve);
      } else {
        p2SP[0].effectVoided = true;
        cardEffect('p1', p1SP[0].cardID);  // no resolve is needed for Disaster effects
      }
    } else {
      if (p2SP[0].cardID === '167' && disasterOverride167(p1SP[0].cardID) === true) {
        p2SP[0].effectVoided = true;
        cardEffect('p1', p1SP[0].cardID, p1SP, myResolve);
      } else if ((p2SP[0].cardID === '533' || p2SP[0].cardID === '699') && disasterOverride533(p1SP[0].cardID) === true) {
        p2SP[0].effectVoided = true;
        cardEffect('p1', p1SP[0].cardID, p1SP, myResolve);
      } else if (p2SP[0].cardID === '641' && disasterOverride641(p1SP[0].cardID) === true) {
        p2SP[0].effectVoided = true;
        cardEffect('p1', p1SP[0].cardID, p1SP, myResolve);
      } else if ((p2SP[0].cardID === '971' || p2SP[0].cardID === 'M216' || p2SP[0].cardID === 'N200') && disasterOverride971(p1SP[0].cardID) === true) {
        p2SP[0].effectVoided = true;
        cardEffect('p1', p1SP[0].cardID, p1SP, myResolve);
      } else {
        p1SP[0].effectVoided = true;
        cardEffect('p2', p2SP[0].cardID);  // no resolve is needed for Disaster effects
      }
    }
  }).then(func => {
    SPturnEnd();
  })
}

// 167 大海嘯 overridden by 168 抵壘, 534 諾亞方舟, 972 宇宙障, M217 電磁防護網 and N201 守護魔法陣
const disasterOverride167 = (uniqueCardID) => {
  if (uniqueCardID === '168' || uniqueCardID === '534' || uniqueCardID === '972' || uniqueCardID === 'M217' || uniqueCardID === 'N201') {
    return true;
  } else {
    return false;
  }
}

// 533 龍捲風 and 699 魔導地震 overridden by 534 諾亞方舟, 972 宇宙障, M217 電磁防護網 and N201 守護魔法陣
const disasterOverride533 = (uniqueCardID) => {
  if (uniqueCardID === '534' || uniqueCardID === '972' || uniqueCardID === 'M217' || uniqueCardID === 'N201') {
    return true;
  } else {
    return false;
  }
}

// 641 骷髏隕石 overridden by 168 抵壘, 972 宇宙障, M217 電磁防護網 and N201 守護魔法陣 
const disasterOverride641 = (uniqueCardID) => {
  if (uniqueCardID === '168' || uniqueCardID === '972' || uniqueCardID === 'M217' || uniqueCardID === 'N201') {
    return true;
  } else {
    return false;
  }
}

// 971 世界末日, M216 大沉沒 and N200 地之惡魔的咆哮 overridden by 972 宇宙障, M217 電磁防護網 and N201 守護魔法陣
const disasterOverride971 = (uniqueCardID) => {
  if (uniqueCardID === '972' || uniqueCardID === 'M217' || uniqueCardID === 'N201') {
    return true;
  } else {
    return false;
  }
}

const nullPhase = () => {
  new Promise(function(myResolve) {
    if (bigFourCheck('Null') === 'p1') {
      if ((p1SP[0].cardID === '163' || p1SP[0].cardID === '521' || p1SP[0].cardID === '965' || p1SP[0].cardID === 'M255' || p1SP[0].cardID === 'N208') 
        && nullOverride163(p2SP[0].cardID, 'p1') === true) {
          p1SP[0].effectVoided = true;
          cardEffect('p2', p2SP[0].cardID, p2SP, myResolve);
        } else if (p1SP[0].cardID === '966' && nullOverride966(p2SP[0].cardID) === true) {
          p1SP[0].effectVoided = true;
          cardEffect('p2', p2SP[0].cardID, p2SP, myResolve);
        } else if (p1SP[0].cardID === '967' && nullOverride967(p2SP[0].cardID) === true) {
          p1SP[0].effectVoided = true;
          cardEffect('p2', p2SP[0].cardID, p2SP, myResolve);
        } else {
          p2SP[0].effectVoided = true;
          cardEffect('p1', p1SP[0].cardID, p1SP, myResolve);
        }
    } else {
      if ((p2SP[0].cardID === '163' || p2SP[0].cardID === '521' || p2SP[0].cardID === '965' || p2SP[0].cardID === 'M255' || p2SP[0].cardID === 'N208') 
      && nullOverride163(p1SP[0].cardID, 'p2') === true) {
        p2SP[0].effectVoided = true;
        cardEffect('p1', p1SP[0].cardID, p1SP, myResolve);
      } else if (p2SP[0].cardID === '966' && nullOverride966(p1SP[0].cardID) === true) {
        p2SP[0].effectVoided = true;
        cardEffect('p1', p1SP[0].cardID, p1SP, myResolve);
      } else if (p2SP[0].cardID === '967' && nullOverride967(p1SP[0].cardID) === true) {
        p2SP[0].effectVoided = true;
        cardEffect('p1', p1SP[0].cardID, p1SP, myResolve);
      } else {
        p1SP[0].effectVoided = true;
        cardEffect('p2', p2SP[0].cardID, p2SP, myResolve);
      }
    }
  }).then(func => {
    SPturnEnd();
  })
}

/* 163, 521, 965, M255 and N208 惡魔的劣行 overridden by 264 田螺坦克, 527 神之福音, 962 有錢使得鬼推磨, 
966 鬼的劣行, 967 銀河的侵略, 1061 小惡魔的搗蛋, M222 誘惑手鐲, M228 時空救援劍, M229 時間扭曲劍, PR012 滅惡之劍*/
const nullOverride163 = (uniqueCardID, nullPlayer) => {
  if (uniqueCardID === '527' || uniqueCardID === '962' || uniqueCardID === '966' || uniqueCardID === '967' || uniqueCardID === '1061' 
    || uniqueCardID === 'M222' || uniqueCardID === 'M228' || uniqueCardID === 'M229' || uniqueCardID === 'PR012') {
    return true;
  } else if (uniqueCardID === '264') {
    return conditionCheck264(nullPlayer);
  } else {
    return false;
  }
}

// check if the foe's 264 can trigger effect
const conditionCheck264 = (nullPlayer) => {
  if (findMatArrays(findVictim(nullPlayer))[5][0].summonerType === 'SH') {
    return true;
  } else {
    return false;
  }
}

// 966 鬼的劣行 overridden by 967 銀河的侵略, 1061 小惡魔的搗蛋
const nullOverride966 = (uniqueCardID) => {
  if (uniqueCardID === '967' || uniqueCardID === '1061') {
    return true;
  } else {
    return false;
  }
}

// 967 銀河的侵略 overridden by 1061 小惡魔的搗蛋
const nullOverride967 = (uniqueCardID) => {
  if (uniqueCardID === '1061') {
    return true;
  } else {
    return false;
  }
}

const miraclePhase = () => {
  new Promise(function(myResolve) {
    if (bigFourCheck('Miracle') === 'p1') {
      if (miracleOverride(p2SP[0].cardID) === true) {
        p1SP[0].effectVoided = true;
        cardEffect('p2', p2SP[0].cardID, p2SP, myResolve);
      } else {
        p2SP[0].effectVoided = true;
        cardEffect('p1', p1SP[0].cardID, p1SP, myResolve);
      }
    } else {
      if (miracleOverride(p1SP[0].cardID) === true) {
        p2SP[0].effectVoided = true;
        cardEffect('p1', p1SP[0].cardID, p1SP, myResolve);
      } else {
        p1SP[0].effectVoided = true;
        cardEffect('p2', p2SP[0].cardID, p2SP, myResolve);
      }
    }
  }).then(func => {
    SPturnEnd();
  })
}

// 天之奇蹟 overridden by 962 有錢使得鬼推磨, M228 時空救援劍
const miracleOverride = (uniqueCardID) => {
  if (uniqueCardID === '962' || uniqueCardID === 'M228') {
    return true;
  } else {
    return false;
  }
}