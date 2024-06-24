const triggerPostGameEffect = (player, uniqueCardID, myResolve) => {
  switch (uniqueCardID) {
    case 'S090':
      cardEffectS090(player, myResolve);
      break;
    case 'S110':
      cardEffectS090(player, myResolve);
      break;
    case 'S117':
      cardEffectS090(player, myResolve);
      break;
    case '270':
      cardEffect270(player, findMatArrays(player), uniqueCardID, myResolve);
      break;
    case '306':
      cardEffect306(player, findMatArrays(player), uniqueCardID, myResolve);
      break;
    case 'S501':
      cardEffectS090(player, myResolve);
      break;
    case 'S502':
      cardEffectS502(player, myResolve);
      break;
    case 'S503':
      cardEffectS090(player, myResolve);
      break;
    case '694':
      cardEffect694(player, findMatArrays(player), uniqueCardID, myResolve);
      break;
    default:
      console.log('something wrong with cardFunc');
      myResolve();
  }
}

const cardEffectS502 = (player, myResolve) => {
  const comboRank = parseInt(identifyCombo(player).substring(0,2));
  if (winner === player && comboRank === 21) {
    if (findMatArrays(player)[findMatArrays(player).length-1].monType !== 'NN') {
      new Promise(function(effectResolve) {
        if (player === 'p1') {
          p1Score += 15;
        } else {
          p2Score += 15;
        }
        let msgtext = "閃光大師以無屬性以外的閃光組合取勝，\n" + findPlayerName(player) + "的積分點再加 15。";
        promptAddScoreMsg(msgtext, effectResolve);
      }).then(func => {
        if (p1Score >= 50 || p2Score >= 50) {
          promptEndGameMsg();
        } else if (p1Queue.length === 0) {
          document.getElementById("playSummonersBut").innerText = "排列召喚師順序";
          promptArrangeSummonersMsg();
        } else {
          myResolve();
        }
      })
    } else {
      myResolve();  
    }
  } else {
    myResolve();
  }
}

// 拉柯奇
const cardEffectS090 = (player, myResolve) => {
  if (cardOnFieldCheck(player, '232') === true && cardOnFieldCheck(player, '233') === true
    && cardOnFieldCheck(player, '289') === true && cardOnFieldCheck(player, '269') === true) {
    if (player === 'p1') {
      p1Score = 50;
      finalWinner = 'p1';
    } else {
      p2Score = 50;
      finalWinner = 'p2';
    }
    renderScores();
    let msg = 'Dr.拉柯奇野心爆發！！！\n' + findPlayerName(player) + ' 得到50點積分勝出。';
    prompt50scoreMsg(msg);
  } else {
    myResolve();
  }
}

// 妖精的細語
const cardEffect270 = (player, matArrays, uniqueCardID, myResolve) => {
  if (matArrays[5][0].cardID === 'S048' && matArrays[0].length > 0 && matArrays[1].length > 0 && matArrays[2].length > 0) {
    if (matArrays[0].upsideDown === false && matArrays[0].monClass === 'FY'
      && matArrays[1].upsideDown === false && matArrays[1].monClass === 'FY'
      && matArrays[2].upsideDown === false && matArrays[2].monClass === 'FY') {
      pushBlockItemTier2(findVictim(player), uniqueCardID, 'monClass', 'DR', player, false);
      myResolve();
    } else {
      myResolve();
    }
  } else {
    myResolve();
  }
}

// 金帕加：帕加戰隊6號
const cardEffect306 = (player, matArrays, uniqueCardID, myResolve) => {
  if (winner === player && matArrays[3].length > 0) {
    if (matArrays[3][matArrays[3].length-1].upsideDown === false && matArrays[3][matArrays[3].length-1].cardID === '313' 
      && cardOnFieldCheck(player, '303') === true && cardOnFieldCheck(player, '305') === true) {  // 303 綠帕加 305 銀帕加 313 帕加仙人
      pushBlockItemTier2(findVictim(player), uniqueCardID, 'pos', 'sky', player, false);
      myResolve();
    } else {
      myResolve();
    }
  } else {
    myResolve();
  }
}

// 	幻之波板糖
const cardEffect694 = (player, matArrays, uniqueCardID, myResolve) => {
  if (winner === player && matArrays[5][0].cardID === 'S097') {
    deductPoints(findVictim(player), 20, uniqueCardID, myResolve); 
  } else {
    myResolve();
  }
}

const deductPoints = (victim, deduction, uniqueCardID, myResolve) => {
  if (victim === 'p1') {
    p1Score -= deduction;
  } else {
    p2Score -= deduction;
  }
  promptPointDeduction(victim, uniqueCardID, deduction);
  renderScores();
  myResolve();
}

const pgPromiseCheck = (player, matArray, myResolve) => {
  if (matArray.length === 0) {
    myResolve();
  } else {
    if (matArray[matArray.length-1].cardFunc === 'PG' && matArray[matArray.length-1].upsideDown === false && matArray[matArray.length-1].effectVoided === false) {
      triggerPostGameEffect(player, matArray[matArray.length-1].cardID, myResolve);
    } else {
      myResolve();
    }
  }
}

// to be updated with async/await
const postGameCardEffects = (myResolve) => {
  let p2SummonerPromise = new Promise(function(myResolve) {
    pgPromiseCheck('p2', p2MatArrays[5], myResolve);})
  p2SummonerPromise.then(func => {
    let p1SummonerPromise = new Promise(function(myResolve) {
      pgPromiseCheck('p1', p1MatArrays[5], myResolve);})
    p1SummonerPromise.then(func => {
      let p2SkyPromise = new Promise(function(myResolve) {
        pgPromiseCheck('p2', p2MatArrays[0], myResolve);}) // don't include cardPlayMode, because 'upsidedown' would provide myResolve immediately at cardEffect()
      p2SkyPromise.then(func => {
        let p2LeftPromise = new Promise(function(myResolve) {
          pgPromiseCheck('p2', p2MatArrays[1], myResolve);})
        p2LeftPromise.then(func => {
          let p2RightPromise = new Promise(function(myResolve) {
            pgPromiseCheck('p2', p2MatArrays[2], myResolve);})
          p2RightPromise.then(func => {
            let p2HelpPromise = new Promise(function(myResolve) {
              pgPromiseCheck('p2', p2MatArrays[3], myResolve);})
            p2HelpPromise.then(func => {
              let p1SkyPromise = new Promise(function(myResolve) {
                pgPromiseCheck('p1', p1MatArrays[0], myResolve);})  
              p1SkyPromise.then(func => {
                let p1LeftPromise = new Promise(function(myResolve) {
                  pgPromiseCheck('p1', p1MatArrays[1], myResolve);})
                p1LeftPromise.then(func => {
                  let p1RightPromise = new Promise(function(myResolve) {
                    pgPromiseCheck('p1', p1MatArrays[2], myResolve);})
                  p1RightPromise.then(func => {
                    let p1HelpPromise = new Promise(function(myResolve) {
                      pgPromiseCheck('p1', p1MatArrays[3], myResolve);})
                    p1HelpPromise.then(func => {
                      let p2SPPromise = new Promise(function(myResolve) {
                        pgPromiseCheck('p2', p2MatArrays[4], myResolve);})
                      p2SPPromise.then(func => {
                        pgPromiseCheck('p1', p1MatArrays[4], myResolve);
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
}