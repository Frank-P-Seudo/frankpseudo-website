// render big panels
const renderCollection = (collectionArray) => {
  const collPanel = document.getElementById("drag-box-c");
  collPanel.innerHTML = '';

  let tempArray = collectionArray.slice(0, collectionArray.length);
  if (filteringCriteriaC.cardSeries !== null) {
    tempArray = tempArray.filter(item => item.cardSeries === filteringCriteriaC.cardSeries);
  }
  if (filteringCriteriaC.cardType !== null) {
    tempArray = tempArray.filter(item => item.cardType === filteringCriteriaC.cardType);
  }
  if (filteringCriteriaC.summonerType !== null) {
    tempArray = tempArray.filter(item => item.summonerType === filteringCriteriaC.summonerType);
  }
  if (filteringCriteriaC.summonerLevel !== null) {
    tempArray = tempArray.filter(item => item.summonerLevel === filteringCriteriaC.summonerLevel);
  }
  if (filteringCriteriaC.monClass !== null) {
    tempArray = tempArray.filter(item => item.monClass === filteringCriteriaC.monClass);
  }
  if (filteringCriteriaC.monType !== null) {
    tempArray = tempArray.filter(item => item.monType === filteringCriteriaC.monType);
  }
  if (filteringCriteriaC.monPower !== null) {
    tempArray = tempArray.filter(item => item.monPower === filteringCriteriaC.monPower);
  }
  
  if (tempArray.length === 0) {
    const textBox = document.createElement('div');
    textBox.innerText = '沒有附合搜尋條件的咭';
    textBox.className = 'no-result-msg';
    collPanel.appendChild(textBox);
  } else {
    renderPanel(tempArray, 'c');
  } 
}

const renderPanel = (tempArray, area) => {  
  let panelID = "drag-box-" + area;
  const panel = document.getElementById(panelID);

  for (let i = 0; i < tempArray.length; i++) {
    const cardContainer = document.createElement("div");
    cardContainer.className = area + "-card-container";
    const cardPic = document.createElement('img');
    cardPic.setAttribute("src", tempArray[i].cardPic);
    cardPic.style = "width: 102%; height: 102%; top: -1%; left: -1%; position: absolute;";
    cardPic.id = tempArray[i].cardID;
    cardPic.setAttribute("draggable", true);
    cardPic.addEventListener('dragstart', dragStart);
    cardPic.addEventListener('click', func => {cardPreview(tempArray[i].cardPic)});
    cardContainer.appendChild(cardPic);
    panel.appendChild(cardContainer);
  }
}

// drag and drop functions
const dragStart = (ev) => {
  ev.dataTransfer.setData('text/plain', ev.target.id);
}

const dragEnter = (ev) => {
  ev.preventDefault();
  lightBG(ev);
}

const dragOver = (ev) => {
  ev.preventDefault();
  lightBG(ev);
}

const dragLeave = (ev) => {
  darkBG(ev);
}

const lightBG = (ev) => {
  if (ev.target.id === "drag-box-c") {
    ev.target.style.backgroundColor = "rgb(242, 241, 224)";
  } else if (ev.target.id === "drag-box-d" || ev.target.id === "drag-box-t") {
    ev.target.style.backgroundColor = "rgb(235, 235, 235)";
  }
}

const darkBG = (ev) => {
  if (ev.target.id === "drag-box-c") {
    ev.target.style.backgroundColor = "rgb(234, 233, 218)";
  } else if (ev.target.id === "drag-box-d" || ev.target.id === "drag-box-t") {
    ev.target.style.backgroundColor = "rgb(221, 221, 221)";
  }
}

const boxes = document.querySelectorAll('.drag-box');

boxes.forEach(box => {
  box.addEventListener('dragenter', dragEnter);
  box.addEventListener('dragover', dragOver);
  box.addEventListener('dragleave', dragLeave);
  box.addEventListener('drop', drop);  // note: the drop() functions for Deckbuilder and Prizecard are different
})

const smallBoxes = document.querySelectorAll('.collection-card-container');
smallBoxes.forEach(box => {
  box.addEventListener('dragenter', dragEnter);
  box.addEventListener('dragover', dragOver);
  box.addEventListener('dragleave', dragLeave);
  box.addEventListener('drop', drop);
})

// show and hide drop-down lists
const showDropdown = (elementID) => {
  // show the selected drop-down list
  document.getElementById(elementID).style.display = 'block';
  // disable all drop-down buttons to prevent two drop-down lists being shown at the same time
  const dropDownBtns = document.getElementsByClassName('drop-down-button');
  for (let i = 0; i < dropDownBtns.length; i++) {
    dropDownBtns[i].disabled = true;
  }
  setTimeout(()=> {window.addEventListener('click', removeDropDown, {once: true})}, 0);
}

const removeDropDown = (event) => {
  // hide the drop-down lists
  if (!event.target.matches('.drop-down-list')) {
    const dropdowns = document.getElementsByClassName("drop-down-list");
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].style.display = 'none';
    }
  }
  // re-enable all drop-down buttons
  const dropDownBtns = document.getElementsByClassName('drop-down-button');
  for (let i = 0; i < dropDownBtns.length; i++) {
    dropDownBtns[i].disabled = false;
  }
}

// filtering criteria
const resetCriteria = (area, collectionArray) => {
  if (area === 'C') {
    filteringCriteriaC = {
      cardSeries: null,
      cardType: null,
      summonerType: null,
      summonerLevel: null,
      monClass: null,
      monType: null,
      monPower: null
    };
    document.getElementById('drop-down-button-summonerType').style.display = 'none';
    document.getElementById('drop-down-button-summonerLevel').style.display = 'none';
    document.getElementById('drop-down-button-monClass').style.display = 'none';
    document.getElementById('drop-down-button-monType').style.display = 'none';
    document.getElementById('drop-down-button-monPower').style.display = 'none';
    renderCollection(collectionArray);
  } else if (area === 'D') {
    filteringCriteriaD = {cardType: null};
    const buttons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.backgroundColor = "rgba(221, 221, 221, 0.5)";
    }
    document.getElementById("tab-button-D").style.backgroundColor = "rgb(221, 221, 221)";
    renderDeck();
  }
}

const selectCardType = (area, collectionArray, selectedValue) => {
  if (area === 'C') {
    filteringCriteriaC.cardType = selectedValue;
    if (selectedValue === 'sum') {
      document.getElementById('drop-down-button-summonerType').style.display = 'inline-block';
      document.getElementById('drop-down-button-summonerLevel').style.display = 'inline-block';
      document.getElementById('drop-down-button-monClass').style.display = 'none';
      document.getElementById('drop-down-button-monType').style.display = 'none';
      document.getElementById('drop-down-button-monPower').style.display = 'none';
      filteringCriteriaC.monClass = null;
      filteringCriteriaC.monType = null;
      filteringCriteriaC.monPower = null;
    } else if (selectedValue === 'Mon') {
      document.getElementById('drop-down-button-summonerType').style.display = 'none';
      document.getElementById('drop-down-button-summonerLevel').style.display = 'none';
      document.getElementById('drop-down-button-monClass').style.display = 'inline-block';
      document.getElementById('drop-down-button-monType').style.display = 'inline-block';
      document.getElementById('drop-down-button-monPower').style.display = 'inline-block';
      filteringCriteriaC.summonerType = null;
      filteringCriteriaC.summonerLevel = null;
    } else {
      document.getElementById('drop-down-button-summonerType').style.display = 'none';
      document.getElementById('drop-down-button-summonerLevel').style.display = 'none';
      document.getElementById('drop-down-button-monClass').style.display = 'none';
      document.getElementById('drop-down-button-monType').style.display = 'none';
      document.getElementById('drop-down-button-monPower').style.display = 'none';
      filteringCriteriaC.summonerType = null;
      filteringCriteriaC.summonerLevel = null;
      filteringCriteriaC.monClass = null;
      filteringCriteriaC.monType = null;
      filteringCriteriaC.monPower = null;
    }
    renderCollection(collectionArray);
  } else if (area === 'D') {
    filteringCriteriaD.cardType = selectedValue;
    const buttonID = "tab-button-D-" + selectedValue;
    const buttons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.backgroundColor = "rgba(221, 221, 221, 0.5)";
    }
    document.getElementById(buttonID).style.backgroundColor = "rgb(221, 221, 221)";
    renderDeck();
  }
}

const selectSeries = (selectedValue, collectionArray) => {
  filteringCriteriaC.cardSeries = selectedValue;
  renderCollection(collectionArray);
}

const selectSummonerType = (selectedValue, collectionArray) => {
  filteringCriteriaC.summonerType = selectedValue;
  renderCollection(collectionArray);
}

const selectSummonerLevel = (selectedValue, collectionArray) => {
  filteringCriteriaC.summonerLevel = selectedValue;
  renderCollection(collectionArray);
}

const selectMonClass = (selectedValue, collectionArray) => {
  filteringCriteriaC.monClass = selectedValue;
  renderCollection(collectionArray);
}

const selectMonType = (selectedValue, collectionArray) => {
  filteringCriteriaC.monType = selectedValue;
  renderCollection(collectionArray);
}

const selectMonPower = (selectedValue, collectionArray) => {
  filteringCriteriaC.monPower = selectedValue;
  renderCollection(collectionArray);
}

// save data
const saveProfile = () => {
  localStorage.setItem('p1Profile', JSON.stringify(playerProfile));
}

// simplify deck/takeaway such that it only has cardIDs
const simplifyDeck = (deck) => {
  let tempDeck = [];
  for (let i = 0; i < deck.length; i++) {
    tempDeck.push({
      cardID: deck[i].cardID
    });
  }
  return tempDeck;
}