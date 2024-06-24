// Check if override value requires adjustment (e.g., if SP lock is cancelled, then it loses override)
const overrideAdjust = (player, playedPosition, uniqueCardID, cardOverrideChecked, voidableCheck) => {
  if (cardOverrideChecked === true) {
    // Help/SP
    if (uniqueCardID === '166' || uniqueCardID === '537' || uniqueCardID === '982') {
      return overrideAdjust166(player, uniqueCardID, playedPosition, voidableCheck);
    } else if (uniqueCardID === '167' || uniqueCardID === '699' || uniqueCardID === '533' || uniqueCardID === '641' 
      || uniqueCardID === '971' || uniqueCardID === 'M216' || uniqueCardID === 'N200'
      || uniqueCardID === '963' || uniqueCardID === '1059') {
      overrideSPLock(player, uniqueCardID, playedPosition);
    
    // Mon
    } else if (SPLockMons.includes(uniqueCardID)) {
      return overrideAdjust101(player, uniqueCardID);
    } else if (uniqueCardID === '216') {
      return overrideAdjust216(player, playedPosition, uniqueCardID, voidableCheck);
    } else if (uniqueCardID === '222') {
      return overrideSpecificCardID(player, playedPosition, uniqueCardID, '170', voidableCheck);
    } else if (uniqueCardID === '223') {
      return overrideSpecificCardID(player, playedPosition, uniqueCardID, '171', voidableCheck);
    } else {
      console.log('override adjustment is missing')
      return true;
    }
  } else {
    return false;
  }
}

// applicable to 216 甲布凡
const overrideAdjust216 = (player, playedPosition, uniqueCardID, voidableCheck) => {
  if (voidableCheck === true) {
    return false;
  } else {
    if (player === 'p1' && playedPosition === 'sky') {
      return overrideAdjust216Step2(uniqueCardID, playedPosition, p1BlockedCardID1, p1BlockedPos1, p1BlockedType1, p1BlockedClass1, p1BlockedPower1, p1SkyBlockedPower1);
    } else if (player === 'p1' && playedPosition === 'left') {
      return overrideAdjust216Step2(uniqueCardID, playedPosition, p1BlockedCardID1, p1BlockedPos1, p1BlockedType1, p1BlockedClass1, p1BlockedPower1, p1LeftBlockedPower1);
    } else if (player === 'p1' && playedPosition === 'right') {
      return overrideAdjust216Step2(uniqueCardID, playedPosition, p1BlockedCardID1, p1BlockedPos1, p1BlockedType1, p1BlockedClass1, p1BlockedPower1, p1RightBlockedPower1);
    } else if (player === 'p2' && playedPosition === 'sky') {
      return overrideAdjust216Step2(uniqueCardID, playedPosition, p2BlockedCardID1, p2BlockedPos1, p2BlockedType1, p2BlockedClass1, p2BlockedPower1, p2SkyBlockedPower1);
    } else if (player === 'p2' && playedPosition === 'left') {
      return overrideAdjust216Step2(uniqueCardID, playedPosition, p2BlockedCardID1, p2BlockedPos1, p2BlockedType1, p2BlockedClass1, p2BlockedPower1, p2LeftBlockedPower1);
    } else if (player === 'p2' && playedPosition === 'right') {
      return overrideAdjust216Step2(uniqueCardID, playedPosition, p2BlockedCardID1, p2BlockedPos1, p2BlockedType1, p2BlockedClass1, p2BlockedPower1, p2RightBlockedPower1);
    }
  }
}

const overrideAdjust216Step2 = (uniqueCardID, playedPosition, blockCardID, blockedPos, blockedType, blockedClass, blockedPower, comboblockedPower) => {
  // cannot override cardID-specific blocking
  if (blockCardID.filter(blockedItem => blockedItem.cardID === uniqueCardID).length > 0) {
    return false;
  // cannot override pos blocking
  } else if (blockedPos.filter(blockedItem => blockedItem.pos === playedPosition).length > 0) {
    return false;
  // cannot override monType blocking
  } else if (blockedType.filter(blockedItem => blockedItem.monType === 'DD').length > 0) {
    return false;
  // cannot override monClass blocking
  } else if (blockedClass.filter(blockedItem => blockedItem.monClass === 'BU').length > 0) {
    return false;
  // cannot override monPower blocking
  } else if (blockedPower.filter(blockedItem => blockedItem.monPower === 110).length > 0) {
    return false;
  } else {
    let nonTargetAttack;
    comboblockedPower.forEach(blockedItem => {  
      if (blockedItem.monPower === 110 && blockedItem.source !== '116') {nonTargetAttack = true;}
    })
    if (nonTargetAttack === true) {
      return false;  // cannot override if there is any combo attack NOT from 封截人
    } else {
      return true;
    }
  }
}

// applicable to 222 右大鎚手, 223 左大鎚手
const overrideSpecificCardID = (player, playedPosition, uniqueCardID, overriddenID, voidableCheck) => {
  if (voidableCheck === true) {
    return false;
  } else {
    if (player === 'p1' && playedPosition === 'sky') {
      return overrideSpecificCardIDStep2(uniqueCardID, overriddenID, playedPosition, p1BlockedCardID1, p1BlockedPos1, p1BlockedType1, p1BlockedPower1, p1SkyBlockedPower1);
    } else if (player === 'p1' && playedPosition === 'left') {
      return overrideSpecificCardIDStep2(uniqueCardID, overriddenID, playedPosition, p1BlockedCardID1, p1BlockedPos1, p1BlockedType1, p1BlockedPower1, p1LeftBlockedPower1);
    } else if (player === 'p1' && playedPosition === 'right') {
      return overrideSpecificCardIDStep2(uniqueCardID, overriddenID, playedPosition, p1BlockedCardID1, p1BlockedPos1, p1BlockedType1, p1BlockedPower1, p1RightBlockedPower1);
    } else if (player === 'p2' && playedPosition === 'sky') {
      return overrideSpecificCardIDStep2(uniqueCardID, overriddenID, playedPosition, p2BlockedCardID1, p2BlockedPos1, p2BlockedType1, p2BlockedPower1, p2SkyBlockedPower1);
    } else if (player === 'p2' && playedPosition === 'left') {
      return overrideSpecificCardIDStep2(uniqueCardID, overriddenID, playedPosition, p2BlockedCardID1, p2BlockedPos1, p2BlockedType1, p2BlockedPower1, p2LeftBlockedPower1);
    } else if (player === 'p2' && playedPosition === 'right') {
      return overrideSpecificCardIDStep2(uniqueCardID, overriddenID, playedPosition, p2BlockedCardID1, p2BlockedPos1, p2BlockedType1, p2BlockedPower1, p2RightBlockedPower1);
    }
  }  
}

const overrideSpecificCardIDStep2 = (uniqueCardID, overriddenID, playedPosition, blockCardID, blockedPos, blockedType, blockedPower, comboblockedPower) => {
  // cannot override cardID-specific blocking
  if (blockCardID.filter(blockedItem => blockedItem.cardID === uniqueCardID).length > 0) {
    return false;
  // cannot override monType blocking
  } else if (blockedType.filter(blockedItem => blockedItem.monType === 'MM').length > 0) {
    return false;
  // cannot override monPower blocking
  } else if (blockedPower.filter(blockedItem => blockedItem.monPower === 0).length > 0) {
    return false;
  // cannot override combo blocking
  } else if (comboblockedPower.filter(blockedItem => blockedItem.monPower === 0).length > 0) {
    return false;
  } else {
    let nonTargetAttack;
    blockedPos.forEach(blockedItem => { 
      if (blockedItem.pos === playedPosition && blockedItem.source !== overriddenID) {nonTargetAttack = true;}
    })
    if (nonTargetAttack === true) {
      return false;  // cannot override if there is any pos attack NOT from specific cardID
    } else {
      return true;
    }
  }
}

// applicable to 166 貝獸仙人爆炸！, 537 鬍子仙人大爆炸！, 982 皺紋仙人超爆炸！
const overrideAdjust166 = (player, uniqueCardID, playedPosition, voidableCheck) => {
  if (voidableCheck === true) {
    return false;
  } else {
    if (player === 'p1') {
      return overrideAdjust166Step2(uniqueCardID, playedPosition, p1BlockedCardID1, p1BlockedPos1);
    } else {
      return overrideAdjust166Step2(uniqueCardID, playedPosition, p2BlockedCardID1, p2BlockedPos1);
    }
  }
}

const overrideAdjust166Step2 = (uniqueCardID, playedPosition, blockCardID, blockedPos) => {
  if (blockCardID.filter(blockedItem => blockedItem.cardID === uniqueCardID).length > 0) { // cannot override cardID-specific blocking
    return false;
  } else {
    let nonTargetAttack;
    blockedPos.forEach(blockedItem => {  
      if (blockedItem.pos === playedPosition && blockedItem.source !== 'S057' && blockedItem.source !== 'S057B'
        && blockedItem.source !== 'S058' && blockedItem.source !== 'S058B' && blockedItem.source !== '318'
        && blockedItem.source !== '923' && blockedItem.source !== '924' && blockedItem.source !== '925'
        && blockedItem.source !== 'M210' && blockedItem.source !== 'M211' && blockedItem.source !== 'M212') {
        nonTargetAttack = true;
      }
    })
    
    if (nonTargetAttack === true) {
      return false;  // cannot override if there is any pos attack NOT from 回力刀/援助軍團/盛宴/飯團
    } else {
      return true;
    }
  }
}

// applicable to Disaster cards and 963 天之奇蹟（封魔之歌）, 1059 笑之漩渦
const overrideSPLock = (player, uniqueCardID, playedPosition) => {
  if (playedPosition === 'help') {  // cannot override when the Disaster card is put at help
    return false;
  } else {
    if (player === 'p1') {
      return overrideSPLockStep2(uniqueCardID, p1BlockedCardID1, p1BlockedClass1, p1BlockedPos1);
    } else {
      return overrideSPLockStep2(uniqueCardID, p2BlockedCardID1, p2BlockedClass1, p2BlockedPos1);
    }
  }
}

const overrideSPLockStep2 = (uniqueCardID, blockCardID, blockedClass, blockedPos) => {
  if (blockCardID.filter(blockedItem => blockedItem.cardID === uniqueCardID).length > 0) { // cannot override cardID-specific blocking
    return false;
  } else if ((uniqueCardID === '963' && blockedClass.filter(blockedItem => blockedItem.monClass === 'Miracle').length > 0)  // cannot override monClass-specific blocking
    || (uniqueCardID !== '963' && blockedClass.filter(blockedItem => blockedItem.monClass === 'Disaster').length > 0)) {
    return false; 
  } else {
    let nonTargetAttack;
    blockedPos.forEach(blockedItem => {
      if (blockedItem.pos === 'sp' && SPLockMons.includes(blockedItem.source) === false) {
        nonTargetAttack = true;
      }
    })
    if (nonTargetAttack === true) {
      return false;  // cannot override when the pos blocking comes from any non-SP Lock cards
    } else {
      return true;
    }  
  }
}

// check if there is any attack specifically targetting SP lock (by monClass or cardID)
const overrideAdjust101 = (player, uniqueCardID) => {
  if (player === 'p1') {
    return overrideAdjust101Step2(uniqueCardID, p1BlockedCardID1, p1BlockedClass1); 
  } else {
    return overrideAdjust101Step2(uniqueCardID, p2BlockedCardID1, p2BlockedClass1); 
  }
}

const overrideAdjust101Step2 = (uniqueCardID, blockCardID, blockedClass) => {
  if (blockCardID.filter(blockedItem => blockedItem.cardID === uniqueCardID).length > 0) {
    return false;
  } else {
    let checkedClass;
    cardDB.forEach(card => {
      if (card.cardID === uniqueCardID) {
        checkedClass = card.monClass
      }
    });
    if (blockedClass.filter(blockedItem => blockedItem.monClass === checkedClass).length > 0) {
      return false;
    } else {
      return true;
    }
  } 
}