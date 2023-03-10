// Ch card effect, applicable to all Ch cards
const CHcardEffect = (player, uniqueCardID, myResolve) => {
  cardDB.forEach(card => {
    if (card.cardID === uniqueCardID) {
      changedType = card.monType;
    }
  })
  if (player === 'p1') {
    if (p1Sky.length > 0) {
      if (p1Sky[p1Sky.length-1].cardID === uniqueCardID) {
        p1Summoner[0].skyType = changedType;
      }
    };
    if (p1Left.length > 0) {
      if (p1Left[p1Left.length-1].cardID === uniqueCardID) {
        p1Summoner[0].leftType = changedType;
      }
    };
    if (p1Right.length > 0) {
      if (p1Right[p1Right.length-1].cardID === uniqueCardID) {
        p1Summoner[0].rightType = changedType;
      }
    };
    turnClass = "ChEffect";
    forfeitabilityCheck('p1');
    renderHand('p1');
    handCardDisplay('p1', 0);
  } else {
    if (p2Sky.length > 0) {
      if (p2Sky[p2Sky.length-1].cardID === uniqueCardID) {
        p2Summoner[0].skyType = changedType;
      }
    };
    if (p2Left.length > 0) {
      if (p2Left[p2Left.length-1].cardID === uniqueCardID) {
        p2Summoner[0].leftType = changedType;
      }
    };
    if (p2Right.length > 0) {
      if (p2Right[p2Right.length-1].cardID === uniqueCardID) {
        p2Summoner[0].rightType = changedType;
      }
    };
    // ? p2 then selects another card to play, incorporating myResolve [to be written]
  }
}