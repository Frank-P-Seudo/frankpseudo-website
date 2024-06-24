// Check if the mon/R card's type matches the relevant side [not ready for dual-type yet, i.e., monType2 !== '']
const monTypeChecking = (player, playedPosition, cardIDPlayed, monTypeChecked) => {
  if (playedPosition !== 'sky' && playedPosition !== 'left' && playedPosition !== 'right') {
    return false;
  } else {
    let typeCondition;
    if (playedPosition === 'sky') {
      typeCondition = findMatArrays(player)[5][0].skyType;
    } else if (playedPosition === 'left') {
      typeCondition = findMatArrays(player)[5][0].leftType;
    } else {
      typeCondition = findMatArrays(player)[5][0].rightType;
    };
    
    if (monTypeChecked !== null) {
      if (monTypeChecked === 'NN') {
        return true;
      } else if (typeCondition.includes(monTypeChecked)) {
        return true;
      } else {
        return false;
      }
    } else {
      cardDB.forEach(card => {
        if (card.cardID === cardIDPlayed) {
          monType1Checked = card.monType;
          monType2Checked = card.monType2;
          };
        });
    
      if (monType2Checked === '') {
        if (monType1Checked === 'NN') {
          return true;
        } else if (typeCondition.includes(monType1Checked)) {
          return true;
        } else {
          return false;
        }
      } else {
        // ! Dual type to be catered
        console.log('Oops, it is dual type')
      }
    }
  }
}

// Exception made for cards 201 and 226
const goldEggCheck = (playedPosition, cardIDPlayed) => {
  if (playedPosition === 'sky') {
    if (p1Sky[p1Sky.length-1].cardID === '201' && p1Sky[p1Sky.length-1].upsideDown === false && cardIDPlayed === '226') {
      return true;
    }
  } else if (playedPosition === 'left') {
    if (p1Left[p1Left.length-1].cardID === '201' && p1Left[p1Left.length-1].upsideDown === false && cardIDPlayed === '226') {
      return true;
    }
  } else if (playedPosition === 'right') {
    if (p1Right[p1Right.length-1].cardID === '201' && p1Right[p1Right.length-1].upsideDown === false && cardIDPlayed === '226') {
      return true;
    }
  } else {
    return false;
  }
}

//Check if a card can be placed at S/L/R/Help
const conditionCheck = (player, playedPosition, cardIDPlayed) => {
  playButtonID = "play-at-" + playedPosition;
  // If the position is occupied, disable play-at-[...] (test 1)
  if (confirmFlag(player, playedPosition, 'occupiedFlag') === true) {
    if (goldEggCheck(playedPosition, cardIDPlayed) === true) {
      document.getElementById(playButtonID).disabled = false;
      document.getElementById(playButtonID).onclick = func => {callButtonMenu2D(cardIDPlayed, playedPosition)};
    } else {
      document.getElementById(playButtonID).disabled = true;
    }
  } else {
    document.getElementById(playButtonID).disabled = false;
    // Retrieve card's details for checking (including override and playRestriction to speed things up).
    cardDB.forEach(card => {
    if (card.cardID === cardIDPlayed) {
      cardTypeChecked = card.cardType;
      cardOverrideChecked = card.override;
      cardRestrictionChecked = card.playRestriction;
      };
    });
    // If the card type is wrong, prompt menu2A (test 2) 
    if ((playedPosition === 'help' && cardTypeChecked !== 'Help' && cardTypeChecked !== 'Help/SP') ||
      (playedPosition !== 'help' && cardTypeChecked !== 'Mon' && cardTypeChecked !== 'Ch' && cardTypeChecked !== 'R')) {
      document.getElementById(playButtonID).onclick = func => {callButtonMenu2A(cardIDPlayed, playedPosition)};
    } else {
      // For Mon/R card, if its type doesn't match the summoner's, prompt menu2A (test 3)
      if ((cardTypeChecked === 'Mon' ||  cardTypeChecked === 'R') && monTypeChecking('p1',playedPosition, cardIDPlayed, null) === false) {
        document.getElementById(playButtonID).onclick = func => {callButtonMenu2A(cardIDPlayed, playedPosition)};
      } else {
        // If pre-contion is not met, prompt menu 2A (test 4)
        if (preconditionCheck('p1', cardRestrictionChecked, cardIDPlayed) === false) {  // see precondition.js
          document.getElementById(playButtonID).onclick = func => {callButtonMenu2A(cardIDPlayed, playedPosition)};
        } else {
          // If the position is NOT attacked, prompt menu2B (test 5)
          if (attackCheck('p1', playedPosition, cardIDPlayed, null, null, null) === false) {
            document.getElementById(playButtonID).onclick = func => {callButtonMenu2B(cardIDPlayed, playedPosition)};
          } else {
            // Check if override value requires adjustment. If the card has override (e.g., disaster), prompt menu2B
            if (overrideAdjust(player, playedPosition, cardIDPlayed, cardOverrideChecked, false) === true) {
              document.getElementById(playButtonID).onclick = func => {callButtonMenu2B(cardIDPlayed, playedPosition)};
            } else {
              // If the block is reversible, prompt menu2C; otherwise, prompt menu2A
              if (confirmFlag(player, playedPosition, 'RecoverableTier1') === true) {
                document.getElementById(playButtonID).onclick = func => {callButtonMenu2C(cardIDPlayed, playedPosition)};
              } else {
                document.getElementById(playButtonID).onclick = func => {callButtonMenu2A(cardIDPlayed, playedPosition)};
              }
            }
          }
        }
      }
    }
  };
}

//Check if a card can be placed at SP slot.
const conditionCheckSP = (cardIDPlayed) => {
  cardDB.forEach(card => {
  if (card.cardID === cardIDPlayed) {
    cardTypeChecked = card.cardType;
    monTypeChecked = card.monType;
    monClassChecked = card.monClass;
    monPowerChecked = card.monPower;
    cardOverrideChecked = card.override;
    cardRestrictionChecked = card.playRestriction;
    }
  });
  // Check if the card is SP or Help/SP
  if (cardTypeChecked !== 'SP' && cardTypeChecked !== 'Help/SP') {
    document.getElementById('play-at-sp').disabled = true;
  } else {
    // Check if any pre-condition is met
    if (preconditionCheck('p1', cardRestrictionChecked, cardIDPlayed) === false) {  // see precondition.js
      document.getElementById('play-at-sp').disabled = true;
    } else {
      // Check if SP slot is attacked.
      if (attackCheck('p1', 'sp', cardIDPlayed, monClassChecked, monTypeChecked, monPowerChecked) === false) {
        document.getElementById('play-at-sp').disabled = false;
      } else {
        // Check if the attack can be over-ridden.
        if (overrideAdjust('p1', 'sp', cardIDPlayed, cardOverrideChecked, false) === true) {
          document.getElementById('play-at-sp').disabled = false;
        } else {
          document.getElementById('play-at-sp').disabled = true;
        }
      }
    }
  }
}

const positionAttackCheck = (player, playedPosition) => {
  if (player === 'p1') {
    if (p1BlockedPos2.filter(blockedItem => blockedItem.pos === playedPosition).length > 0) {
      updateRecoverableTier1(player, playedPosition, 0);
      return true;
    } else {
      let attacked = false;
      p1BlockedPos1.forEach(blockedItem => {
        if (blockedItem.pos === playedPosition) {
          attacked = true;
          if (blockedItem.recoverable === false) {updateRecoverableTier1(player, playedPosition, 0);}
        } 
      })
      if (attacked === true) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    if (p2BlockedPos2.filter(blockedItem => blockedItem.pos === playedPosition).length > 0) {
      updateRecoverableTier1(player, playedPosition, 0);
      return true;
    } else {
      let attacked = false;
      p2BlockedPos1.forEach(blockedItem => {
        if (blockedItem.pos === playedPosition) {
          attacked = true;
          if (blockedItem.recoverable === false) {updateRecoverableTier1(player, playedPosition, 0);}
        } 
      })
      if (attacked === true) {
        return true;
      } else {
        return false;
      }
    }
  }
}

const cardIDAttackCheck = (player, playedPosition, cardIDPlayed) => {
  if (player === 'p1') {
    if (p1BlockedCardID2.filter(blockedItem => blockedItem.cardID === cardIDPlayed).length > 0) {
      updateRecoverableTier1(player, playedPosition, 0);
      return true;
    } else {
      let attacked = false;
      p1BlockedCardID1.forEach(blockedItem => {
        if (blockedItem.cardID === cardIDPlayed) {
          attacked = true;
          if (blockedItem.recoverable === false) {updateRecoverableTier1(player, playedPosition, 0);}
        } 
      })
      if (attacked === true) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    if (p2BlockedCardID2.filter(blockedItem => blockedItem.cardID === cardIDPlayed).length > 0) {
      updateRecoverableTier1(player, playedPosition, 0);
      return true;
    } else {
      let attacked = false;
      p2BlockedCardID1.forEach(blockedItem => {
        if (blockedItem.cardID === cardIDPlayed) {
          attacked = true;
          if (blockedItem.recoverable === false) {updateRecoverableTier1(player, playedPosition, 0);}
        } 
      })
      if (attacked === true) {
        return true;
      } else {
        return false;
      }
    }
  }
}

const typeAttackCheck = (player, playedPosition, monTypeChecked) => {
  if (player === 'p1') {
    if (p1BlockedType2.filter(blockedItem => blockedItem.monType === monTypeChecked).length > 0) {
      recoverableTierFlag = false;
      return true;
    } else {
      let attacked = false;
      p1BlockedType1.forEach(blockedItem => {
        if (blockedItem.monType === monTypeChecked) {
          attacked = true;
          if (blockedItem.recoverable === false) {updateRecoverableTier1(player, playedPosition, 0);}
        } 
      })
      if (attacked === true) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    if (p2BlockedType2.filter(blockedItem => blockedItem.monType === monTypeChecked).length > 0) {
      recoverableTierFlag = false;
      return true;
    } else {
      let attacked = false;
      p2BlockedType1.forEach(blockedItem => {
        if (blockedItem.monType === monTypeChecked) {
          attacked = true;
          if (blockedItem.recoverable === false) {updateRecoverableTier1(player, playedPosition, 0);}
        } 
      })
      if (attacked === true) {
        return true;
      } else {
        return false;
      }
    }
  }
}

const classAttackCheck = (player, playedPosition, monClassChecked) => {
  if (player === 'p1') {
    if (p1BlockedClass2.filter(blockedItem => blockedItem.monClass === monClassChecked).length > 0) {
      recoverableTierFlag = false;
      return true;
    } else {
      let attacked = false;
      p1BlockedClass1.forEach(blockedItem => {
        if (blockedItem.monClass === monClassChecked) {
          attacked = true;
          if (blockedItem.recoverable === false) {updateRecoverableTier1(player, playedPosition, 0);}
        } 
      })
      if (attacked === true) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    if (p2BlockedClass2.filter(blockedItem => blockedItem.monClass === monClassChecked).length > 0) {
      recoverableTierFlag = false;
      return true;
    } else {
      let attacked = false;
      p2BlockedClass1.forEach(blockedItem => {
        if (blockedItem.monClass === monClassChecked) {
          attacked = true;
          if (blockedItem.recoverable === false) {updateRecoverableTier1(player, playedPosition, 0);}
        } 
      })
      if (attacked === true) {
        return true;
      } else {
        return false;
      }
    }
  }
}

const powerAttackCheck = (player, playedPosition, monPowerChecked) => {
  if (player === 'p1') {
    if (p1BlockedPower2.filter(blockedItem => blockedItem.monPower === monPowerChecked).length > 0) {
      recoverableTierFlag = false;
      return true;
    } else {
      let attacked = false;
      p1BlockedPower1.forEach(blockedItem => {
        if (blockedItem.monPower === monPowerChecked) {
          attacked = true;
          if (blockedItem.recoverable === false) {updateRecoverableTier1(player, playedPosition, 0);}
        } 
      })
      if (attacked === true) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    if (p2BlockedPower2.filter(blockedItem => blockedItem.monPower === monPowerChecked).length > 0) {
      recoverableTierFlag = false;
      return true;
    } else {
      let attacked = false;
      p2BlockedPower1.forEach(blockedItem => {
        if (blockedItem.monPower === monPowerChecked) {
          attacked = true;
          if (blockedItem.recoverable === false) {updateRecoverableTier1(player, playedPosition, 0);}
        } 
      })
      if (attacked === true) {
        return true;
      } else {
        return false;
      }
    }
  }
}

const comboAttackCheck = (player, playedPosition, monPowerChecked) => {
  if (player === 'p1' && playedPosition === 'sky') {
    let attacked = false;
    p1SkyBlockedPower1.forEach(blockedItem => {
      if (blockedItem.monPower === monPowerChecked) {
        attacked = true;
        if (blockedItem.recoverable === false) {updateRecoverableTier1(player, playedPosition, 0);}
      } 
    })
    if (attacked === true) {
      return true;
    } else {
      return false;
    }
  } else if (player === 'p1' && playedPosition === 'left') {
    let attacked = false;
    p1LeftBlockedPower1.forEach(blockedItem => {
      if (blockedItem.monPower === monPowerChecked) {
        attacked = true;
        if (blockedItem.recoverable === false) {updateRecoverableTier1(player, playedPosition, 0);}
      } 
    })
    if (attacked === true) {
      return true;
    } else {
      return false;
    }
  } else if (player === 'p1' && playedPosition === 'right') {
    let attacked = false;
    p1RightBlockedPower1.forEach(blockedItem => {
      if (blockedItem.monPower === monPowerChecked) {
        attacked = true;
        if (blockedItem.recoverable === false) {updateRecoverableTier1(player, playedPosition, 0);}
      } 
    })
    if (attacked === true) {
      return true;
    } else {
      return false;
    }
  } else if (player === 'p2' && playedPosition === 'sky') {
    let attacked = false;
    p2SkyBlockedPower1.forEach(blockedItem => {
      if (blockedItem.monPower === monPowerChecked) {
        attacked = true;
        if (blockedItem.recoverable === false) {updateRecoverableTier1(player, playedPosition, 0);}
      } 
    })
    if (attacked === true) {
      return true;
    } else {
      return false;
    }
  } else if (player === 'p2' && playedPosition === 'left') {
    let attacked = false;
    p2LeftBlockedPower1.forEach(blockedItem => {
      if (blockedItem.monPower === monPowerChecked) {
        attacked = true;
        if (blockedItem.recoverable === false) {updateRecoverableTier1(player, playedPosition, 0);}
      } 
    })
    if (attacked === true) {
      return true;
    } else {
      return false;
    }
  } else if (player === 'p2' && playedPosition === 'right') {
    let attacked = false;
    p2RightBlockedPower1.forEach(blockedItem => {
      if (blockedItem.monPower === monPowerChecked) {
        attacked = true;
        if (blockedItem.recoverable === false) {updateRecoverableTier1(player, playedPosition, 0);}
      } 
    })
    if (attacked === true) {
      return true;
    } else {
      return false;
    }
  }
}

// Check if the position is being attacked
const attackCheck = (player, playedPosition, cardIDPlayed, monClassParsed, monTypeParsed, monPowerParsed) => {
  if (positionAttackCheck(player, playedPosition) === true) {
    return true;
  } else if (cardIDAttackCheck(player, playedPosition, cardIDPlayed) === true) {
    return true;
  } else {
    let monClassChecked;
    let monTypeChecked;
    let monPowerChecked;
    if (monClassParsed === null && monTypeParsed === null && monPowerParsed === null) {
      cardDB.forEach(card => {
        if (card.cardID === cardIDPlayed) {
          monClassChecked = card.monClass;
          monTypeChecked = card.monType;
          monPowerChecked = card.monPower;
        }
      });
    } else {
      monClassChecked = monClassParsed;
      monTypeChecked = monTypeParsed;
      monPowerChecked = monPowerParsed;
    }
    if (typeAttackCheck(player, playedPosition, monTypeChecked) === true) {
      return true;
    } else if (classAttackCheck(player, playedPosition, monClassChecked) === true) {
      return true;
    } else if (powerAttackCheck(player, playedPosition, monPowerChecked) === true) {
      return true;
    } else if (comboAttackCheck(player, playedPosition, monPowerChecked) === true) {
      return true;
    } else {
      return false;
    }
  }
}

/*not useful for now...
cardOnHandCheckType = (player, CHcardIDPlayed) => {
  let typeOnHand = false;
  cardDB.forEach(card => {
    if (card.cardID === CHcardIDPlayed) {
      CHcardType = card.monType;
    }
  });
  
  for (let i = CHcardType.length; i > 0; i -= 2) {
    if (player === 'p1') {
      p1Hand.forEach(card => {
        cardDB.forEach(DBcard => {
          if (DBcard.cardID === card.cardID) {
            card.monType = DBcard.monType;
          }
        });
        if (card.monType === CHcardType.substring(i-2,i)) {
          typeOnHand = true;
        }
      })
    } else {
      p2Hand.forEach(card => {
        cardDB.forEach(DBcard => {
          if (DBcard.cardID === card.cardID) {
            card.monType = DBcard.monType;
          }
        });
        if (card.monType === CHcardType.substring(i-2,i)) {
          typeOnHand = true;
        }
      })
    }
  }
  if (typeOnHand === true) {
    return true;
  } else {
    return false;
  }
}
*/

// to revisit whether we still need attacked flags and how Tier2 can be updated //
const conditionCheckChSummon = (playedPosition, cardIDPlayed, buttonName) => {
  cardDB.forEach(card => {
    if (card.cardID === cardIDPlayed) {
      cardTypeChecked = card.cardType;
      cardOverrideChecked = card.override;
      cardRestrictionChecked = card.playRestriction;
      };
    });
    if (cardTypeChecked !== 'Mon' && cardTypeChecked !== 'R') {
      document.getElementById(buttonName).disabled = true;
    } else {
      if (monTypeChecking('p1', playedPosition, cardIDPlayed, null) === false) {
        document.getElementById(buttonName).disabled = true;
      } else {
        if (preconditionCheck('p1', cardRestrictionChecked, cardIDPlayed) === false) {
          document.getElementById(buttonName).disabled = true;
        } else {
          if (attackCheck('p1', playedPosition, cardIDPlayed, null, null, null) === false) {
            setSummonButtonNormalPlay(cardIDPlayed, playedPosition, buttonName);
          } else {
            if (overrideAdjust('p1', playedPosition, cardIDPlayed, cardOverrideChecked, false) === true) {
              setSummonButtonNormalPlay(cardIDPlayed, playedPosition, buttonName);
            } else {
              if (confirmFlag('p1', playedPosition, 'RecoverableTier1') === true) {
                setSummonButtonUDPlay(cardIDPlayed, playedPosition, buttonName);
              } else {
              document.getElementById(buttonName).disabled = true;
            }
          }
        }
      }
    }
  }
}

const setSummonButtonNormalPlay = (cardIDPlayed, playedPosition, buttonName) => {
  document.getElementById(buttonName).onclick = func => {
    turnClass = 'play';
    if (playedPosition === 'sky') {
      playCardStep2('p1', cardIDPlayed, p1Sky, playedPosition);
    } else if (playedPosition === 'left') {
      playCardStep2('p1', cardIDPlayed, p1Left, playedPosition);
    } else {
      playCardStep2('p1', cardIDPlayed, p1Right, playedPosition);
    }
  }
}

const setSummonButtonUDPlay = (cardIDPlayed, playedPosition, buttonName) => {
  document.getElementById(buttonName).innerText = '打出此咭\n（暫時蓋牌）';
  document.getElementById(buttonName).onclick = func => {
    turnClass = 'play';
    if (playedPosition === 'sky') {
      playCardUDStep2('p1', cardIDPlayed, p1Sky, playedPosition, 1);
    } else if (playedPosition === 'left') {
      playCardUDStep2('p1', cardIDPlayed, p1Left, playedPosition, 1);
    } else {
      playCardUDStep2('p1', cardIDPlayed, p1Right, playedPosition, 1);
    }
  }
}

// to revisit whether we still need attacked flags and how Tier2 can be updated //
const conditionCheckRSummon = (playedPosition, cardIDPlayed, buttonName, revivedType) => {
  cardDB.forEach(card => {
    if (card.cardID === cardIDPlayed) {
      cardTypeChecked = card.cardType;
      cardMonTypeChecked = card.monType;
      cardMonType2Checked = card.monType2;
      cardOverrideChecked = card.override;
      cardRestrictionChecked = card.playRestriction;
      };
    });
  if (cardTypeChecked !== 'Mon') {
    document.getElementById(buttonName).disabled = true;
  } else {
    if (cardMonTypeChecked !== revivedType && cardMonType2Checked !== revivedType) {
      document.getElementById(buttonName).disabled = true;
    } else {
      if (preconditionCheck('p1', cardRestrictionChecked, cardIDPlayed) === false) {
        document.getElementById(buttonName).disabled = true;
      } else {
        if (attackCheck('p1', playedPosition, cardIDPlayed, null, null, null) === false) {
          setSummonButtonNormalPlay(cardIDPlayed, playedPosition, buttonName);
        } else {
          if (overrideAdjust('p1', playedPosition, cardIDPlayed, cardOverrideChecked, false) === true) {
            setSummonButtonNormalPlay(cardIDPlayed, playedPosition, buttonName);
          } else {
            if (confirmFlag('p1', playedPosition, 'RecoverableTier1') === true) {
              setSummonButtonUDPlay(cardIDPlayed, playedPosition, buttonName);
            } else {
              document.getElementById(buttonName).disabled = true;
            }
          }
        }
      } 
    }
  }
}

const attackableCheck = (uniqueCardID, viewedArray, player2, attackedPosition, checkedArray, myResolve, validTarget) => { 
  playButtonID = 'select-' + attackedPosition;
  if (checkedArray.length === 0) {
    if (Array.isArray(validTarget) === false) {document.getElementById(playButtonID).disabled = true};
  } else if (checkedArray[checkedArray.length-1].upsideDown === true) {
    if (Array.isArray(validTarget) === false) {document.getElementById(playButtonID).disabled = true};
  } else {
    if (overrideAdjust(player2, attackedPosition, checkedArray[checkedArray.length-1].cardID, checkedArray[checkedArray.length-1].override, true) === true) {
      if (Array.isArray(validTarget) === false) {document.getElementById(playButtonID).disabled = true};
    } else if (armourCheck(player2, checkedArray[checkedArray.length-1].cardID) === true) {
      if (Array.isArray(validTarget) === false) {document.getElementById(playButtonID).disabled = true};
    } else {
      if (Array.isArray(validTarget) === false) {
        document.getElementById(playButtonID).disabled = false;
        document.getElementById(playButtonID).onclick = func => {
          turnClass = 'play';  // if the turnClass remains 'choiceEffect', handCardDisplay() doesn't call any menu
          document.getElementById('display-panel-button-container').innerHTML = '';
          if (uniqueCardID === '164' || uniqueCardID === '523' || uniqueCardID === '959' || uniqueCardID === 'M226') {
            graveEffectStep2(player2, attackedPosition, checkedArray, p2Hole, myResolve);  // Note: hardcoded to target p2Hole
          } else if (uniqueCardID === '236' || uniqueCardID === '479' || uniqueCardID === '867' || uniqueCardID === '1042' 
            || uniqueCardID === 'M167' || uniqueCardID === 'N153') {
              bombEffectStep2('p1', viewedArray, p1Hole, player2, attackedPosition, checkedArray, p2Hole, myResolve);  // Note: p1Hole and p2Hole are hardcoded here
          }
        }
      } else {
        validTarget.push(attackedPosition);
      }
    }
  } 
}

const setbuttonPlayNone = (myResolve) => {
  const buttonPlaySky = document.getElementById('select-sky');
  const buttonPlayLeft = document.getElementById('select-left');
  const buttonPlayRight = document.getElementById('select-right');
  const buttonPlayNone = document.getElementById('select-none');
  
  if (buttonPlaySky.disabled === buttonPlayLeft.disabled && buttonPlayLeft.disabled === buttonPlayRight.disabled 
    && buttonPlayRight.disabled === true) {
    buttonPlayNone.disabled = false;
    buttonPlayNone.style.display = "inline-block";
    buttonPlayNone.onclick = func => {
      document.getElementById('display-panel-button-container').innerHTML = '';
      turnClass = 'play';  // if the turnClass remains 'choiceEffect', handCardDisplay() doesn't call any menu
      myResolve();
    }
  } else {
    buttonPlayNone.disabled = true;
    buttonPlayNone.style.display = "none";
  }
}

const blindExchangeableCheck = (uniqueCardID, playedPosition, checkedArray, myResolve) => {  
  playButtonID = 'select-' + playedPosition;
  if (checkedArray.length === 0) {
    document.getElementById(playButtonID).disabled = true;
  } else {
    document.getElementById(playButtonID).disabled = false;
    document.getElementById(playButtonID).onclick = func => {
      document.getElementById('display-panel-button-container').innerHTML = '';
      promptExchangeStep2(uniqueCardID, playedPosition, checkedArray, myResolve);
    }
  }
}

const blindOfferableCheck = (offeredPosition, offeredArray, obtainedPosition, obtainedArray, myResolve) => {  // Note: obtainedArray refers to the array obtained from foe
  playButtonID = 'select-' + offeredPosition;
  if (offeredArray.length === 0) {
    document.getElementById(playButtonID).disabled = true;
  } else {
    document.getElementById(playButtonID).disabled = false;
    document.getElementById(playButtonID).onclick = func => {
      turnClass = 'play';  // if the turnClass remains 'choiceEffect', handCardDisplay() doesn't call any menu
      document.getElementById('display-panel-button-container').innerHTML = '';
      exchangeEffectStep2('p1', 'p2', offeredPosition, offeredArray, obtainedPosition, obtainedArray, myResolve);
    }
  }
}

const typeExchangeableCheck = (uniqueCardID, playedPosition, checkedArray, myResolve) => {  
  playButtonID = 'select-' + playedPosition;
  if (checkedArray.length === 0) {
    document.getElementById(playButtonID).disabled = true;
  } else if (checkedArray[checkedArray.length-1].upsideDown === true) {
    document.getElementById(playButtonID).disabled = true;
  } else {
    document.getElementById(playButtonID).disabled = false;
    document.getElementById(playButtonID).onclick = func => {
      document.getElementById('display-panel-button-container').innerHTML = '';
      promptExchangeStep2(uniqueCardID, playedPosition, checkedArray, myResolve);
    }
  }
}

const typeOfferableCheck = (offeredPosition, offeredArray, obtainedPosition, obtainedArray, myResolve) => {
  playButtonID = 'select-' + offeredPosition;
  if (offeredArray.length === 0) {
    document.getElementById(playButtonID).disabled = true;
  } else if (offeredArray[offeredArray.length-1].upsideDown === true) {
    document.getElementById(playButtonID).disabled = true;
  } else {
    cardDB.forEach(card => {
      if (card.cardID === offeredArray[offeredArray.length-1].cardID) {
        offeredType = card.monType;
        offeredClass = card.monClass;
      }
    });
    cardDB.forEach(card => {
      if (card.cardID === obtainedArray[obtainedArray.length-1].cardID) {
        obtainedType = card.monType;
        obtainedClass = card.monClass;
      }
    });
    if (offeredType === obtainedType || offeredClass === obtainedClass || (offeredType === 'SS' && obtainedClass === 'SH') // need to double-check if class-class exchange is allowed
      || (offeredClass === 'SS' && obtainedType === 'SH')) {
      document.getElementById(playButtonID).disabled = false;
      document.getElementById(playButtonID).onclick = func => {
        turnClass = 'play';  // if the turnClass remains 'choiceEffect', handCardDisplay() doesn't call any menu
        document.getElementById('display-panel-button-container').innerHTML = '';
        exchangeEffectStep2('p1', 'p2', offeredPosition, offeredArray, obtainedPosition, obtainedArray, myResolve);
      }
    } else {
      document.getElementById(playButtonID).disabled = true;
    }
  }
}

const buffableCheck = (uniqueCardID, playedPosition, checkedArray, bannedEffectInTurn, powerupFlat, powerupValue, myResolve, validTarget) => {
  playButtonID = 'select-' + playedPosition;
  if (checkedArray.length === 0) {
    if (Array.isArray(validTarget) === false) {document.getElementById(playButtonID).disabled = true};
  } else if (checkedArray[checkedArray.length-1].upsideDown === true) {
    if (Array.isArray(validTarget) === false) {document.getElementById(playButtonID).disabled = true};
  } else {
    cardDB.forEach(card => {
      if (card.cardID === uniqueCardID) {
        helpedType = card.monType.slice(1, card.monType.length);
        helpedClass = card.monClass.slice(1, card.monClass.length);
      }
    })
    if ((helpedType.length > 0 && (checkedArray[checkedArray.length-1].monType === helpedType || (helpedType === 'SS' && checkedArray[checkedArray.length-1].monClass === 'SH'))) 
      || (helpedClass.length > 0 && (checkedArray[checkedArray.length-1].monClass === helpedClass || (helpedClass === 'SH' && checkedArray[checkedArray.length-1].monType === 'SS')))) {
      if (Array.isArray(validTarget) === false) {
        document.getElementById(playButtonID).disabled = false;
        document.getElementById(playButtonID).onclick = func => {
          turnClass = 'play';  // if the turnClass remains 'choiceEffect', handCardDisplay() doesn't call any menu
          document.getElementById('display-panel-button-container').innerHTML = '';
          let validTarget = [playedPosition];
          if (powerupFlat === null) {
            autoLevelUpStep2('p1', uniqueCardID, p1LevelUpBracket, validTarget, bannedEffectInTurn, powerupValue, myResolve);  // the powerupValue here is levelValue
          } else {
            autoPowerUpStep2(uniqueCardID, p1PowerBracket, validTarget, bannedEffectInTurn, powerupFlat, powerupValue, myResolve);
          }
        }
      } else {validTarget.push(playedPosition);}
    } else {
      if (Array.isArray(validTarget) === false) {document.getElementById(playButtonID).disabled = true};
    }
  }
}

const voidableCheck = (uniqueCardID, viewedArray, player2, attackedPosition, checkedArray, myResolve, validTarget) => {  
  playButtonID = 'select-' + attackedPosition;
  if (checkedArray.length === 0) {
    if (Array.isArray(validTarget) === false) {document.getElementById(playButtonID).disabled = true};
  } else if (checkedArray[checkedArray.length-1].upsideDown === true) {
    if (Array.isArray(validTarget) === false) {document.getElementById(playButtonID).disabled = true};
  } else if (voidEffectCondition(uniqueCardID, checkedArray) === false) {
    if (Array.isArray(validTarget) === false) {document.getElementById(playButtonID).disabled = true};
  } else {
    if (overrideAdjust(player2, attackedPosition, checkedArray[checkedArray.length-1].cardID, checkedArray[checkedArray.length-1].override, true) === true) {
      if (Array.isArray(validTarget) === false) {document.getElementById(playButtonID).disabled = true};
    } else if (armourCheck(player2, checkedArray[checkedArray.length-1].cardID) === true) {
      if (Array.isArray(validTarget) === false) {document.getElementById(playButtonID).disabled = true};
    } else {
      if (Array.isArray(validTarget) === false) {
        document.getElementById(playButtonID).disabled = false;
        document.getElementById(playButtonID).onclick = func => {
          turnClass = 'play';  // if the turnClass remains 'choiceEffect', handCardDisplay() doesn't call any menu
          document.getElementById('display-panel-button-container').innerHTML = '';
          voidPowerEffect('p1', viewedArray, uniqueCardID, checkedArray, myResolve);
        }
      } else {
        validTarget.push(attackedPosition);
      }
    }
  } 
}

const voidEffectCondition = (uniqueCardID, checkedArray) => {
  switch (uniqueCardID) {
    case '006':
      if (checkedArray[checkedArray.length-1].monPower === 50) {return true;} else {return false;}
    case '031':
      if (checkedArray[checkedArray.length-1].monClass === 'FL') {return true;} else {return false;}
    case '086':
      if (checkedArray[checkedArray.length-1].monClass === 'ML') {return true;} else {return false;}
    case '117':
    if (checkedArray[checkedArray.length-1].monPower === 20 || checkedArray[checkedArray.length-1].monPower === 40 || 
      checkedArray[checkedArray.length-1].monPower === 60 || checkedArray[checkedArray.length-1].monPower === 80 || 
      checkedArray[checkedArray.length-1].monPower === 100) {return true;} else {return false;}
    case '118':
      if (checkedArray[checkedArray.length-1].monPower !== 0) {return true;} else {return false;}
    case '205':
      if (checkedArray[checkedArray.length-1].monClass === 'DR') {return true;} else {return false;}
    case '210':
      if (checkedArray[checkedArray.length-1].monType === 'MM') {return true;} else {return false;}
    case '211':
      if (checkedArray[checkedArray.length-1].monType === 'LL') {return true;} else {return false;}
    case '215':
      if (checkedArray[checkedArray.length-1].monPower === 50) {return true;} else {return false;}
    case '228':
      if (checkedArray[checkedArray.length-1].monClass === 'ML') {return true;} else {return false;}
    case '234':
    if (checkedArray[checkedArray.length-1].monPower === 10 || checkedArray[checkedArray.length-1].monPower === 30 || 
      checkedArray[checkedArray.length-1].monPower === 70 || checkedArray[checkedArray.length-1].monPower === 70 || 
      checkedArray[checkedArray.length-1].monPower === 90) {return true;} else {return false;}
    case '242':
      if (checkedArray[checkedArray.length-1].monClass === 'DR') {return true;} else {return false;}
    case '272':
      if (checkedArray[checkedArray.length-1].monClass === 'FL') {return true;} else {return false;}
    case '308':
      if (checkedArray[checkedArray.length-1].monType === 'GG') {return true;} else {return false;}
    case '309':
      if (checkedArray[checkedArray.length-1].monType === 'DD') {return true;} else {return false;}
    case '317':
      if (checkedArray[checkedArray.length-1].cardID === '075') {return true;} else {return false;}
    case '476':
      if (checkedArray[checkedArray.length-1].monPower === 10 || checkedArray[checkedArray.length-1].monPower === 30 || 
        checkedArray[checkedArray.length-1].monPower === 70 || checkedArray[checkedArray.length-1].monPower === 70 || 
        checkedArray[checkedArray.length-1].monPower === 90) {return true;} else {return false;}
    case '477':
    if (checkedArray[checkedArray.length-1].monPower === 20 || checkedArray[checkedArray.length-1].monPower === 40 || 
      checkedArray[checkedArray.length-1].monPower === 60 || checkedArray[checkedArray.length-1].monPower === 80 || 
      checkedArray[checkedArray.length-1].monPower === 100) {return true;} else {return false;}
    case '478':
      if (checkedArray[checkedArray.length-1].monPower !== 0) {return true;} else {return false;}
    case '874':
      if (checkedArray[checkedArray.length-1].monPower !== 0) {return true;} else {return false;}
    case 'N152':
      if (checkedArray[checkedArray.length-1].monPower !== 0) {return true;} else {return false;}
    default:
      // by default, there is no condition for void effect (e.g., 007 火焰孩, 212 靈骷髏, 244 火藥球)
      return true;
  }
}