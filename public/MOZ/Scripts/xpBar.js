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
  staticBar(widthG, exp, width, denominator, static);
  if (static !== true) {
    if (scenario === 1) {
      setTimeout(async () => {
        await extendBarS1(widthG, exp, score, width, denominator);
        document.getElementById('next-button').className = "show";
      }, 500);
    } else {
      setTimeout(() => extendBarS2(widthG, exp, score, width, denominator, newDenominator, newLv), 500);
    }
  } 
}

const staticBar = (widthG, exp, width, denominator, static) => {
  const shortage = denominator - exp;
  document.getElementById('xp-bar').style.width = width + 'px';
  document.getElementById('total-xp-bar').style.width = widthG + 'px';
  if (exp < 72900 && static !== true) {
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
    document.getElementById('next-button').className = "show";
  }, 500);
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