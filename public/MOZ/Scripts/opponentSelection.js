// ! the transition of visibility and opacity doesn't work; to revisit later
const promptOpponentSelect = () => {
  const panel = document.getElementById('opponent-selection-panel');
  panel.style.display = 'block';
  panel.style.visibility = 'visible';
  panel.style.opacity = '1';
}

const hideSelectionPanel = () => {
  const panel = document.getElementById('opponent-selection-panel');
  panel.style.display = 'none';
  panel.style.visibility = 'hidden';
  panel.style.opacity = '0';
}

const selectOpponent = (p2ProfileName) => {
  localStorage.setItem('p2Profile', JSON.stringify(p2ProfileName));
  window.location.replace("Gameplay.html");
}

const showLvDetails = () => {
  document.getElementById('level-details').style.display = 'block';
  setTimeout(() => {
    window.addEventListener('click', func => {document.getElementById('level-details').style.display = 'none'}, {once: true})
  }, 0);
}

