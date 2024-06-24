// tutorial for drawing a hex in JS - http://jtauber.github.io/articles/css-hexagon.html
const promptEndGameMsg = () => {
    const endGameOL = document.getElementById('endgame-overlay');
    endGameOL.style.display = 'block';
    endGameOL.style.visibility = 'visible';
    endGameOL.style.opacity = '1';
    
    const shortMsg = document.getElementById('endgame-msg-short');
    shortMsg.style.height = '200px';

    if (finalWinner === 'p1') {
      let msgArray = ['V', 'I', 'C', 'T', 'O', 'R', 'Y'];
      for (let i = 1; i <= msgArray.length; i++) {
        const letterDiv = document.createElement('div');
        letterDiv.innerText = msgArray[i-1];
        letterDiv.id = 'short-msg-victory-' + i;
        letterDiv.className = 'short-msg-victory';
        shortMsg.appendChild(letterDiv);
      }
      document.getElementById('endgame-msg-long').innerText = p1Name + '勝出。';
      document.getElementById('end-game-button').onclick = getPrize;
      document.getElementById('end-game-button').innerText = '選擇獎品咭';
      //document.getElementById('endgame-msg-hint').innerText = '選擇獎品咭';
    } else if (finalWinner === 'p2') {
      let msgArray = ['D', 'E', 'F', 'E', 'A', 'T'];
      for (let i = 1; i <= msgArray.length; i++) {
        const letterDiv = document.createElement('div');
        letterDiv.innerText = msgArray[i-1];
        letterDiv.id = 'short-msg-defeat-' + i;
        letterDiv.className = 'short-msg-defeat';
        shortMsg.appendChild(letterDiv);
      }
      document.getElementById('endgame-msg-long').innerText = p2Name + '勝出。';
      document.getElementById('end-game-button').onclick = goHome;
      document.getElementById('end-game-button').innerText = '回到咭組構築畫面';
      //document.getElementById('endgame-msg-hint').innerText = '回到咭組構築畫面';
    }

    // add XP and save to p1Profile
    const addExp = Math.max(p1Score, 0); // it is possible for a player to get negative score
    p1Profile[0].exp += addExp;
    localStorage.setItem('p1Profile', JSON.stringify(p1Profile));

    // display XP bar
    setTimeout(() => {
      shortMsg.innerHTML = '';
      shortMsg.style.height = '0px';
      document.getElementById('xp-grid').style.display = 'grid';
      renderbar(p1Exp, addExp, 500, false);
    }, 2000);  // sync with Endgame.css
}

const getPrize = () => {
  window.location.replace("Prizecard.html");
}

const goHome = () => {
  window.location.replace("Deckbuilder.html");
}

const renderbar = (exp, score, widthG, static) => {
  const newExp = exp + score;
  let width;
  let denominator;
  let newDenominator;
  let lv;
  let newLv;
  let scenario;
  if (exp >= 72900 && newExp >= 72900) {
    denominator = 72900;
    lv = 7;
    scenario = 1;
  // level-up
  } else if (exp >= 24300 && newExp >= 72900) {
    denominator = 72900;
    newDenominator = 72900;
    lv = 6;
    newLv = 7;
    scenario = 2;
  } else if (exp >= 24300 && newExp >= 24300) {
    denominator = 72900;
    lv = 6
    scenario = 1;
  // level-up
  } else if (exp >= 8100 && newExp >= 24300) {
    denominator = 24300;
    newDenominator = 72900;
    lv = 5;
    newLv = 6;
    scenario = 2;
  } else if (exp >= 8100 && newExp >= 8100) {
    denominator = 24300;
    lv = 5;
    scenario = 1;
  // level-up
  } else if (exp >= 2700 && newExp >= 8100) {
    denominator = 8100;
    newDenominator = 24300;
    lv = 4;
    newLv = 5;
    scenario = 2;
  } else if (exp >= 2700 && newExp >= 2700) {
    denominator = 8100;
    lv = 4;
    scenario = 1;
  // level-up
  } else if (exp >= 900 && newExp >= 2700) {
    denominator = 2700;
    newDenominator = 8100;
    lv = 3;
    newLv = 4;
    scenario = 2;
  } else if (exp >= 900 && newExp >= 900) {
    denominator = 2700;
    lv = 3;
    scenario = 1;
  // level-up
  } else if (exp >= 300 && newExp >= 900) {
    denominator = 900;
    newDenominator = 2700;
    lv = 2;
    newLv = 3;
    scenario = 2;
  } else if (exp >= 300 && newExp >= 300) {
    denominator = 900;
    lv = 2;
    scenario = 1;
  // level-up
  } else if (exp >= 100 && newExp >= 300) {
    denominator = 300;
    newDenominator = 900;
    lv = 1;
    newLv = 2;
    scenario = 2;
  } else if (exp >= 100 && newExp >= 100) {
    denominator = 300;
    lv = 1;
    scenario = 1;
  // level-up
  } else if (exp < 100 && newExp >= 100) {
    denominator = 100;
    newDenominator = 300;
    lv = 0;
    newLv = 1;
    scenario = 2;
  } else if (exp < 100 && newExp < 100) {
    denominator = 100;
    lv = 0;
    scenario = 1;
  }
  width = Math.min(exp/denominator*widthG, widthG);
  document.getElementById('level-value').innerText = "LV " + lv;
  staticBar(widthG, exp, width, denominator);
  if (static !== true) {
    if (scenario === 1) {
      setTimeout(async () => {
        await extendBarS1(widthG, exp, score, width, denominator);
        setTimeout(() => {document.getElementById('end-game-button').style.display = 'block';}, 500);
      }, 500);
    } else {
      setTimeout(() => extendBarS2(widthG, exp, score, width, denominator, newDenominator, newLv), 500);
    }
  }
}

const staticBar = (widthG, exp, width, denominator) => {
  const shortage = denominator - exp;
  document.getElementById('xp-bar').style.width = width + 'px';
  document.getElementById('total-xp-bar').style.width = widthG + 'px';
  if (exp < 72900) {
    document.getElementById('xp-value').innerText = exp + "/" + denominator + "\n離下一次升級尚餘" + shortage + " xp";
  } else {
    document.getElementById('xp-value').innerText = exp + "/" + denominator;
  }
}

async function extendBarS2(widthG, exp, score, width, denominator, newDenominator, newLv) {
  let subScore1 = denominator - exp;
  await extendBarS1(widthG, exp, subScore1, width, denominator);
  let width2 = (exp + subScore1)/newDenominator*widthG;
  let subScore2 = score - subScore1;
  await extendBarS1(widthG, denominator, subScore2, width2, newDenominator);
  document.getElementById('xp-emblem').className = 'animated-hex';
  setTimeout(() => {
    document.getElementById('level-value').innerText = "LV " + newLv;
    document.getElementById('end-game-button').style.display = 'block';
  }, 1500);  // 1 second longer than renderbar(), because of the animation
}

const extendBarS1 = (widthG, exp, score, width, denominator) => {
  return new Promise(function(resolve) {
    const newExp = exp + score;
    const xpBar = document.getElementById('xp-bar');
    const xpValue = document.getElementById('xp-value');
    let shortage;
    let timerId = null;
    clearInterval(timerId);
    timerId = setInterval(extend, 30);
  
    function extend() {
      if (exp > newExp) {
        clearInterval(timerId);
        resolve();
      } else {
        shortage = denominator - exp;
        console.log('width', width);
        xpBar.style.width = width + 'px';
        if (exp < 72900) {
          xpValue.innerText = exp + "/" + denominator + "\n離下一次升級尚餘" + shortage + " xp";
        } else {
          xpValue.innerText = exp + "/" + denominator;
        }
        exp++;
        width += widthG/denominator;
        width = Math.min(widthG, width);  // the blue xp bar should never be longer than the grey xp bar
      }
    } 
  })
}