const reversePowerUpHist = (player, cardIDChecked) => {
  p1PowerupHist = p1PowerupHist.filter(item => {
    if (item.source === cardIDChecked && item.sourcePlayer === player && item.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p2PowerupHist = p2PowerupHist.filter(item => {
    if (item.source === cardIDChecked && item.sourcePlayer === player && item.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  applyPowerUpHist(p1PowerupHist, p1Summoner);
  applyPowerUpHist(p2PowerupHist, p2Summoner);
}

const pushPowerUpHist = (player, victim, uniqueCardID, powerUpString, recoverability) => {
  findPUHist(victim).push({
    newPUvalue: powerUpString,
    source: uniqueCardID,
    sourcePlayer: player,
    recoverable: recoverability
  });
  applyPowerUpHist(findPUHist(victim), findMatArrays(victim)[5]);
}

const removePowerUpHist = (player, uniqueCardID, powerupHist) => {
  if (powerupHist === p1PowerupHist) {
    p1PowerupHist = p1PowerupHist.filter(item => {
      if (item.source === uniqueCardID && item.sourcePlayer === player && item.recoverable === true) {
        return false;
      } else {
        return true;
      }
    });
    applyPowerUpHist(p1PowerupHist, p1Summoner);
  } else {
    p2PowerupHist = p2PowerupHist.filter(item => {
      if (item.source === uniqueCardID && item.sourcePlayer === player && item.recoverable === true) {
        return false;
      } else {
        return true;
      }
    });
    applyPowerUpHist(p2PowerupHist, p2Summoner);
  }
}

const nullPurgePowerUpHist = (foe) => {
  p1PowerupHist = p1PowerupHist.filter(item => {
    if (item.sourcePlayer === foe && item.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p2PowerupHist = p2PowerupHist.filter(item => {
    if (item.sourcePlayer === foe && item.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  applyPowerUpHist(p1PowerupHist, p1Summoner);
  applyPowerUpHist(p2PowerupHist, p2Summoner);
}

const miraclePurgePowerUpHist = (powerupHist) => {
  if (powerupHist === p1PowerupHist) {
    p1PowerupHist = p1PowerupHist.filter(item => {
      if (item.source.substring(0,1) === 'S' || item.source.substring(0,2) === 'MS' || item.source.substring(0,2) === 'NS') {
        return true;
      } else if (item.sourcePlayer === 'p2' && item.recoverable === true) {
        return false;
      } else {
        return true;
      }
    });
  } else {
    p2PowerupHist = p2PowerupHist.filter(item => {
      if (item.source.substring(0,1) === 'S' || item.source.substring(0,2) === 'MS' || item.source.substring(0,2) === 'NS') {
        return true;
      } else if (item.sourcePlayer === 'p1' && item.recoverable === true) {
        return false;
      } else {
        return true;
      }
    });
  }
}

const applyPowerUpHist = (powerupHist, summonerArray) => {
  if (powerupHist.length > 0) {
    // rule #1: power-up voiding always trumps
    if (powerupHist.filter(item => item.newPUvalue === 'XX000').length > 0) {
      summonerArray[0].powerupVoided = true;
      summonerArray[0].powerUp = '';
    } else {
      summonerArray[0].powerupVoided = false;
      let tempArray = powerupHist.filter(item => {
        if (item.source.substring(0,1) === 'S' || item.source.substring(0,2) === 'MS' || item.source.substring(0,1) === 'NS') {
          return true;
        } else {
          return false;
        }
      })
      if (tempArray.length > 0) {
        // rule #2: effects from summoners trump non-summoner effects
        // rule #3: the most detrimental effect (i.e., the smallest newPUvalue) is applied)
        summonerArray[0].powerUp = tempArray.sort((a,b) => a.newPUvalue.substring(2,5) - b.newPUvalue.substring(2,5))[0].newPUvalue;
      } else {
        summonerArray[0].powerUp = powerupHist.sort((a,b) => a.newPUvalue.substring(2,5) - b.newPUvalue.substring(2,5))[0].newPUvalue;
      }
    }
  } else {
    // restore the powerUp value when the powerupHist is empty
    summonerArray[0].powerupVoided = false;
    summonerArray[0].powerUp = summonerArray[0].powerUpOG;
  }
}