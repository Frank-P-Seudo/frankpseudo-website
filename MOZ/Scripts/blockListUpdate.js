const pushBlockItem = (victim, uniqueCardID, blockMode, blockedItem, attacker, recoverability) => {
  if (victim === 'p2') {
    if (blockMode === 'pos') {
      p2BlockedPos1.push({
        pos: blockedItem, 
        source: uniqueCardID, 
        sourcePlayer: attacker,
        recoverable: recoverability
      });
    } else if (blockMode === 'monType') {
      p2BlockedType1.push({
        monType: blockedItem, 
        source: uniqueCardID, 
        sourcePlayer: attacker,
        recoverable: recoverability
      });
      // if SS type is blocked, then SH class is also blocked
      if (blockedItem === 'SS') {
        p2BlockedClass1.push({
          monClass: 'SH', 
          source: uniqueCardID, 
          sourcePlayer: attacker,
          recoverable: recoverability
        });
      }
    } else if (blockMode === 'monClass') {
      p2BlockedClass1.push({
        monClass: blockedItem, 
        source: uniqueCardID, 
        sourcePlayer: attacker,
        recoverable: recoverability
      });
      // if SH class is blocked, then SS type is also blocked
      if (blockedItem === 'SH') {
        p2BlockedType1.push({
          monType: 'SS', 
          source: uniqueCardID, 
          sourcePlayer: attacker,
          recoverable: recoverability
        });
      }
    } else if (blockMode === 'monPower') {
      p2BlockedPower1.push({
        monPower: blockedItem, 
        source: uniqueCardID, 
        sourcePlayer: attacker,
        recoverable: recoverability
      });
    } else if (blockMode === 'cardID') {
      p2BlockedCardID1.push({
        cardID: blockedItem, 
        source: uniqueCardID, 
        sourcePlayer: attacker,
        recoverable: recoverability
      }, {
        cardID: blockedItem + 'B', 
        source: uniqueCardID, 
        sourcePlayer: attacker,
        recoverable: recoverability
      });
    } else {
      console.log('incorrect blockMode')
    }
  } else {
    if (blockMode === 'pos') {
      p1BlockedPos1.push({
        pos: blockedItem, 
        source: uniqueCardID, 
        sourcePlayer: attacker,
        recoverable: recoverability
      });
    } else if (blockMode === 'monType') {
      p1BlockedType1.push({
        monType: blockedItem, 
        source: uniqueCardID,
        sourcePlayer: attacker,
        recoverable: recoverability
      });
      // if SS type is blocked, then SH class is also blocked
      if (blockedItem === 'SS') {
        p1BlockedClass1.push({
          monClass: 'SH', 
          source: uniqueCardID, 
          sourcePlayer: attacker,
          recoverable: recoverability
        });
      }
    } else if (blockMode === 'monClass') {
      p1BlockedClass1.push({
        monClass: blockedItem, 
        source: uniqueCardID, 
        sourcePlayer: attacker,
        recoverable: recoverability
      });
      // if SH class is blocked, then SS type is also blocked
      if (blockedItem === 'SH') {
        p1BlockedType1.push({
          monType: 'SS', 
          source: uniqueCardID, 
          sourcePlayer: attacker,
          recoverable: recoverability
        });
      }
    } else if (blockMode === 'monPower') {
      p1BlockedPower1.push({
        monPower: blockedItem, 
        source: uniqueCardID, 
        sourcePlayer: attacker,
        recoverable: recoverability
      });
    } else if (blockMode === 'cardID') {
      p1BlockedCardID1.push({
        cardID: blockedItem, 
        source: uniqueCardID, 
        sourcePlayer: attacker,
        recoverable: recoverability
      }, {
        cardID: blockedItem + 'B', 
        source: uniqueCardID, 
        sourcePlayer: attacker,
        recoverable: recoverability
      });
    } else {
      console.log('incorrect blockMode');
    }
  }
}

const pushBlockItemTier2 = (victim, uniqueCardID, blockMode, blockedItem, attacker, recoverability) => {
  if (victim === 'p2') {
    if (blockMode === 'pos') {
      p2BlockedPos2.push({
        pos: blockedItem, 
        source: uniqueCardID, 
        sourcePlayer: attacker,
        recoverable: recoverability
      });
    } else if (blockMode === 'monType') {
      p2BlockedType2.push({
        monType: blockedItem, 
        source: uniqueCardID, 
        sourcePlayer: attacker,
        recoverable: recoverability
      });
      // if SS type is blocked, then SH class is also blocked
      if (blockedItem === 'SS') {
        p2BlockedClass2.push({
          monClass: 'SH', 
          source: uniqueCardID, 
          sourcePlayer: attacker,
          recoverable: recoverability
        });
      }
    } else if (blockMode === 'monClass') {
      p2BlockedClass2.push({
        monClass: blockedItem, 
        source: uniqueCardID, 
        sourcePlayer: attacker,
        recoverable: recoverability
      });
      // if SH class is blocked, then SS type is also blocked
      if (blockedItem === 'SH') {
        p2BlockedType2.push({
          monType: 'SS', 
          source: uniqueCardID, 
          sourcePlayer: attacker,
          recoverable: recoverability
        });
      }
    } else if (blockMode === 'monPower') {
      p2BlockedPower2.push({
        monPower: blockedItem, 
        source: uniqueCardID, 
        sourcePlayer: attacker,
        recoverable: recoverability
      });
    } else if (blockMode === 'cardID') {
      p2BlockedCardID2.push({
        cardID: blockedItem, 
        source: uniqueCardID, 
        sourcePlayer: attacker,
        recoverable: recoverability
      }, {
        cardID: blockedItem + 'B', 
        source: uniqueCardID, 
        sourcePlayer: attacker,
        recoverable: recoverability
      });
    } else {
      console.log('incorrect blockMode')
    }
  } else {
    if (blockMode === 'pos') {
      p1BlockedPos2.push({
        pos: blockedItem, 
        source: uniqueCardID, 
        sourcePlayer: attacker,
        recoverable: recoverability
      });
    } else if (blockMode === 'monType') {
      p1BlockedType2.push({
        monType: blockedItem, 
        source: uniqueCardID,
        sourcePlayer: attacker,
        recoverable: recoverability
      });
      // if SS type is blocked, then SH class is also blocked
      if (blockedItem === 'SS') {
        p1BlockedClass2.push({
          monClass: 'SH', 
          source: uniqueCardID, 
          sourcePlayer: attacker,
          recoverable: recoverability
        });
      }
    } else if (blockMode === 'monClass') {
      p1BlockedClass2.push({
        monClass: blockedItem, 
        source: uniqueCardID, 
        sourcePlayer: attacker,
        recoverable: recoverability
      });
      // if SH class is blocked, then SS type is also blocked
      if (blockedItem === 'SH') {
        p1BlockedType2.push({
          monType: 'SS', 
          source: uniqueCardID, 
          sourcePlayer: attacker,
          recoverable: recoverability
        });
      }
    } else if (blockMode === 'monPower') {
      p1BlockedPower2.push({
        monPower: blockedItem, 
        source: uniqueCardID, 
        sourcePlayer: attacker,
        recoverable: recoverability
      });
    } else if (blockMode === 'cardID') {
      p1BlockedCardID2.push({
        cardID: blockedItem, 
        source: uniqueCardID, 
        sourcePlayer: attacker,
        recoverable: recoverability
      }, {
        cardID: blockedItem + 'B', 
        source: uniqueCardID, 
        sourcePlayer: attacker,
        recoverable: recoverability
      });
    } else {
      console.log('incorrect blockMode');
    }
  }
}

// remove blocked items based on a particular source's cardID
const reverseBlockLists = (player, cardIDChecked) => {
  p2BlockedPos1 = p2BlockedPos1.filter(blocked => {
    if (blocked.source === cardIDChecked && blocked.sourcePlayer === player && blocked.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p2BlockedType1 = p2BlockedType1.filter(blocked => {
    if (blocked.source === cardIDChecked && blocked.sourcePlayer === player && blocked.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p2BlockedPower1 = p2BlockedPower1.filter(blocked => {
    if (blocked.source === cardIDChecked && blocked.sourcePlayer === player && blocked.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p2BlockedClass1 = p2BlockedClass1.filter(blocked => {
    if (blocked.source === cardIDChecked && blocked.sourcePlayer === player && blocked.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p2BlockedCardID1 = p2BlockedCardID1.filter(blocked => {
    if (blocked.source === cardIDChecked && blocked.sourcePlayer === player && blocked.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p2SkyBlockedPower1 = p2SkyBlockedPower1.filter(blocked => {
    if (blocked.source === cardIDChecked && blocked.sourcePlayer === player && blocked.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p2LeftBlockedPower1 = p2LeftBlockedPower1.filter(blocked => {
    if (blocked.source === cardIDChecked && blocked.sourcePlayer === player && blocked.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p2RightBlockedPower1 = p2RightBlockedPower1.filter(blocked => {
    if (blocked.source === cardIDChecked && blocked.sourcePlayer === player && blocked.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p1BlockedPos1 = p1BlockedPos1.filter(blocked => {
    if (blocked.source === cardIDChecked && blocked.sourcePlayer === player && blocked.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p1BlockedType1 = p1BlockedType1.filter(blocked => {
    if (blocked.source === cardIDChecked && blocked.sourcePlayer === player && blocked.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p1BlockedPower1 = p1BlockedPower1.filter(blocked => {
    if (blocked.source === cardIDChecked && blocked.sourcePlayer === player && blocked.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p1BlockedClass1 = p1BlockedClass1.filter(blocked => {
    if (blocked.source === cardIDChecked && blocked.sourcePlayer === player && blocked.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p1BlockedCardID1 = p1BlockedCardID1.filter(blocked => {
    if (blocked.source === cardIDChecked && blocked.sourcePlayer === player && blocked.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p1SkyBlockedPower1 = p1SkyBlockedPower1.filter(blocked => {
    if (blocked.source === cardIDChecked && blocked.sourcePlayer === player && blocked.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p1LeftBlockedPower1 = p1LeftBlockedPower1.filter(blocked => {
    if (blocked.source === cardIDChecked && blocked.sourcePlayer === player && blocked.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p1RightBlockedPower1 = p1RightBlockedPower1.filter(blocked => {
    if (blocked.source === cardIDChecked && blocked.sourcePlayer === player && blocked.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
}

// purge blocklists, except for (i) source = summoner, (ii) sourcePlayer = player themselves, or (iii) recoverable = false [need to simplify]
const miraclePurge = (blockList) => {
  if (blockList === p1BlockedPos1) {
    p1BlockedPos1 = p1BlockedPos1.filter(blockedItem => {
      if (blockedItem.source.substring(0,1) === 'S' || blockedItem.source.substring(0,2) === 'MS' || blockedItem.source.substring(0,2) === 'NS') {
        return true;
      } else if (blockedItem.sourcePlayer === 'p2' && blockedItem.recoverable === true) {
        return false;
      } else {
        return true;
      }
    })
  } else if (blockList === p1BlockedType1) {
    p1BlockedType1 = p1BlockedType1.filter(blockedItem => {
      if (blockedItem.source.substring(0,1) === 'S' || blockedItem.source.substring(0,2) === 'MS' || blockedItem.source.substring(0,2) === 'NS') {
        return true;
      } else if (blockedItem.sourcePlayer === 'p2' && blockedItem.recoverable === true) {
        return false;
      } else {
        return true;
      }
    })
  } else if (blockList === p1BlockedPower1) {
    p1BlockedPower1 = p1BlockedPower1.filter(blockedItem => {
      if (blockedItem.source.substring(0,1) === 'S' || blockedItem.source.substring(0,2) === 'MS' || blockedItem.source.substring(0,2) === 'NS') {
        return true;
      } else if (blockedItem.sourcePlayer === 'p2' && blockedItem.recoverable === true) {
        return false;
      } else {
        return true;
      }
    })
  } else if (blockList === p1BlockedClass1) {
    p1BlockedClass1 = p1BlockedClass1.filter(blockedItem => {
      if (blockedItem.source.substring(0,1) === 'S' || blockedItem.source.substring(0,2) === 'MS' || blockedItem.source.substring(0,2) === 'NS') {
        return true;
      } else if (blockedItem.sourcePlayer === 'p2' && blockedItem.recoverable === true) {
        return false;
      } else {
        return true;
      }
    })
  } else if (blockList === p1BlockedCardID1) {
    p1BlockedCardID1 = p1BlockedType1.filter(blockedItem => {
      if (blockedItem.source.substring(0,1) === 'S' || blockedItem.source.substring(0,2) === 'MS' || blockedItem.source.substring(0,2) === 'NS') {
        return true;
      } else if (blockedItem.sourcePlayer === 'p2' && blockedItem.recoverable === true) {
        return false;
      } else {
        return true;
      }
    })
  } else if (blockList === p1SkyBlockedPower1) {
    p1SkyBlockedPower1 = p1SkyBlockedPower1.filter(blockedItem => {
      if (blockedItem.source.substring(0,1) === 'S' || blockedItem.source.substring(0,2) === 'MS' || blockedItem.source.substring(0,2) === 'NS') {
        return true;
      } else if (blockedItem.sourcePlayer === 'p2' && blockedItem.recoverable === true) {
        return false;
      } else {
        return true;
      }
    })
  } else if (blockList === p1LeftBlockedPower1) {
    p1LeftBlockedPower1 = p1LeftBlockedPower1.filter(blockedItem => {
      if (blockedItem.source.substring(0,1) === 'S' || blockedItem.source.substring(0,2) === 'MS' || blockedItem.source.substring(0,2) === 'NS') {
        return true;
      } else if (blockedItem.sourcePlayer === 'p2' && blockedItem.recoverable === true) {
        return false;
      } else {
        return true;
      }
    })
  } else if (blockList === p1RightBlockedPower1) {
    p1RightBlockedPower1 = p1RightBlockedPower1.filter(blockedItem => {
      if (blockedItem.source.substring(0,1) === 'S' || blockedItem.source.substring(0,2) === 'MS' || blockedItem.source.substring(0,2) === 'NS') {
        return true;
      } else if (blockedItem.sourcePlayer === 'p2' && blockedItem.recoverable === true) {
        return false;
      } else {
        return true;
      }
    })
  } else if (blockList === p2BlockedPos1) {
    p2BlockedPos1 = p2BlockedPos1.filter(blockedItem => {
      if (blockedItem.source.substring(0,1) === 'S' || blockedItem.source.substring(0,2) === 'MS' || blockedItem.source.substring(0,2) === 'NS') {
        return true;
      } else if (blockedItem.sourcePlayer === 'p1' && blockedItem.recoverable === true) {
        return false;
      } else {
        return true;
      }
    })
  } else if (blockList === p2BlockedType1) {
    p2BlockedType1 = p2BlockedType1.filter(blockedItem => {
      if (blockedItem.source.substring(0,1) === 'S' || blockedItem.source.substring(0,2) === 'MS' || blockedItem.source.substring(0,2) === 'NS') {
        return true;
      } else if (blockedItem.sourcePlayer === 'p1' && blockedItem.recoverable === true) {
        return false;
      } else {
        return true;
      }
    })
  } else if (blockList === p2BlockedPower1) {
    p2BlockedPower1 = p2BlockedPower1.filter(blockedItem => {
      if (blockedItem.source.substring(0,1) === 'S' || blockedItem.source.substring(0,2) === 'MS' || blockedItem.source.substring(0,2) === 'NS') {
        return true;
      } else if (blockedItem.sourcePlayer === 'p1' && blockedItem.recoverable === true) {
        return false;
      } else {
        return true;
      }
    })
  } else if (blockList === p2BlockedClass1) {
    p2BlockedClass1 = p2BlockedClass1.filter(blockedItem => {
      if (blockedItem.source.substring(0,1) === 'S' || blockedItem.source.substring(0,2) === 'MS' || blockedItem.source.substring(0,2) === 'NS') {
        return true;
      } else if (blockedItem.sourcePlayer === 'p1' && blockedItem.recoverable === true) {
        return false;
      } else {
        return true;
      }
    })
  } else if (blockList === p2BlockedCardID1) {
    p2BlockedCardID1 = p2BlockedType1.filter(blockedItem => {
      if (blockedItem.source.substring(0,1) === 'S' || blockedItem.source.substring(0,2) === 'MS' || blockedItem.source.substring(0,2) === 'NS') {
        return true;
      } else if (blockedItem.sourcePlayer === 'p1' && blockedItem.recoverable === true) {
        return false;
      } else {
        return true;
      }
    })
  } else if (blockList === p2SkyBlockedPower1) {
    p2SkyBlockedPower1 = p2SkyBlockedPower1.filter(blockedItem => {
      if (blockedItem.source.substring(0,1) === 'S' || blockedItem.source.substring(0,2) === 'MS' || blockedItem.source.substring(0,2) === 'NS') {
        return true;
      } else if (blockedItem.sourcePlayer === 'p1' && blockedItem.recoverable === true) {
        return false;
      } else {
        return true;
      }
    })
  } else if (blockList === p2LeftBlockedPower1) {
    p2LeftBlockedPower1 = p2LeftBlockedPower1.filter(blockedItem => {
      if (blockedItem.source.substring(0,1) === 'S' || blockedItem.source.substring(0,2) === 'MS' || blockedItem.source.substring(0,2) === 'NS') {
        return true;
      } else if (blockedItem.sourcePlayer === 'p1' && blockedItem.recoverable === true) {
        return false;
      } else {
        return true;
      }
    })
  } else if (blockList === p2RightBlockedPower1) {
    p2RightBlockedPower1 = p2RightBlockedPower1.filter(blockedItem => {
      if (blockedItem.source.substring(0,1) === 'S' || blockedItem.source.substring(0,2) === 'MS' || blockedItem.source.substring(0,2) === 'NS') {
        return true;
      } else if (blockedItem.sourcePlayer === 'p1' && blockedItem.recoverable === true) {
        return false;
      } else {
        return true;
      }
    })
  } else {
    console.log('invalid blockList');
  }
}

// purge blocklists, except for (i) sourcePlayer = player themselves and (2) recoverable = false [need to simplify]
const nullPurge = (foe) => {
  p1BlockedPos1 = p1BlockedPos1.filter(blockedItem => {
    if (blockedItem.sourcePlayer === foe && blockedItem.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p1BlockedType1 = p1BlockedType1.filter(blockedItem => {
    if (blockedItem.sourcePlayer === foe && blockedItem.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p1BlockedPower1 = p1BlockedPower1.filter(blockedItem => {
    if (blockedItem.sourcePlayer === foe && blockedItem.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p1BlockedClass1 = p1BlockedClass1.filter(blockedItem => {
    if (blockedItem.sourcePlayer === foe && blockedItem.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p1BlockedCardID1 = p1BlockedType1.filter(blockedItem => {
    if (blockedItem.sourcePlayer === foe && blockedItem.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p1SkyBlockedPower1 = p1SkyBlockedPower1.filter(blockedItem => {
    if (blockedItem.sourcePlayer === foe && blockedItem.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p1LeftBlockedPower1 = p1LeftBlockedPower1.filter(blockedItem => {
    if (blockedItem.sourcePlayer === foe && blockedItem.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p1RightBlockedPower1 = p1RightBlockedPower1.filter(blockedItem => {
    if (blockedItem.sourcePlayer === foe && blockedItem.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p2BlockedPos1 = p2BlockedPos1.filter(blockedItem => {
    if (blockedItem.sourcePlayer === foe && blockedItem.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p2BlockedType1 = p2BlockedType1.filter(blockedItem => {
    if (blockedItem.sourcePlayer === foe && blockedItem.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p2BlockedPower1 = p2BlockedPower1.filter(blockedItem => {
    if (blockedItem.sourcePlayer === foe && blockedItem.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p2BlockedClass1 = p2BlockedClass1.filter(blockedItem => {
    if (blockedItem.sourcePlayer === foe && blockedItem.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p2BlockedCardID1 = p2BlockedType1.filter(blockedItem => {
    if (blockedItem.sourcePlayer === foe && blockedItem.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p2SkyBlockedPower1 = p2SkyBlockedPower1.filter(blockedItem => {
    if (blockedItem.sourcePlayer === foe && blockedItem.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p2LeftBlockedPower1 = p2LeftBlockedPower1.filter(blockedItem => {
    if (blockedItem.sourcePlayer === foe && blockedItem.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
  p2RightBlockedPower1 = p2RightBlockedPower1.filter(blockedItem => {
    if (blockedItem.sourcePlayer === foe && blockedItem.recoverable === true) {
      return false;
    } else {
      return true;
    }
  });
}