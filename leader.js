const playerScoreElement = document.querySelector("#score");
const nameElement = document.querySelector("#name");
const submitButton = document.querySelector("#submit-btn");
const warningElement = document.querySelector("#warning");
const playerContainer = document.querySelector("#player-container");
const scoreContainer = document.querySelector("#score-container");
const playAgainBtn = document.querySelector("#one-more-try");
const formElement = document.querySelector("#form");
const resetBtn = document.querySelector("#reset-btn");
let playerData = [];
let top5names = [];
let top5scores = [];

let finalScore = localStorage.getItem("javaScrizzPlayer");
playerScoreElement.innerHTML = finalScore;

submitButton.addEventListener("click", checkName);
playAgainBtn.addEventListener("click", restart);
resetBtn.addEventListener("click", clearLeaderData);

function restart() {
  window.location.assign("./index.html");
}

function clearLeaderData() {
  localStorage.clear();
  resetPage();
}

function checkName(e) {
  e.preventDefault();
  let name = nameElement.value;
  let existingNames = getStorageNames();
  if (name === "" || name.length >= 15) {
    warningElement.innerHTML = "Name is not valid";
  } else if (existingNames.includes(name)) {
    warningElement.innerHTML = "Name is already taken!";
  } else {
    storeName();
    formElement.classList.add("hide");
    warningElement.innerHTML = "";
  }
}

function getStorageNames() {
  let names = [];
  let keys = Object.keys(localStorage);
  for (let i = 0; i < keys.length; i++) {
    names.push(keys[i]);
  }
  return names;
}

function storeName() {
  localStorage.setItem(nameElement.value, finalScore.toString());
  rankTop5();
}

function rankTop5() {
  // Convert localstorage obj to array
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    playerData.push([key, value]);
  }
  // Remove javaScrizzPlayer as this name is used as vairable across the page
  playerData.forEach((item) => {
    if (item[0] === "javaScrizzPlayer") {
      playerData.splice(playerData.indexOf(item), 1);
    }
  });
  // Sort array based on values in descending order
  playerData.sort((a, b) => b[1] - a[1]);
  // Place values in corresponding array container
  for (let j = 0; j < playerData.length; j++) {
    top5names.push(playerData[j][0]);
    top5scores.push(playerData[j][1]);
  }
  // Adjust array length to 5
  if (top5names.length < 5) {
    let voidInserts = 5 - top5names.length;
    for (let k = 0; k < voidInserts; k++) {
      top5names.push("No entry");
      top5scores.push("0");
    }
  }
  if (top5names.length > 5) {
    top5names = top5names.splice(0, 5);
    top5scores = top5scores.splice(0, 5);
  }
  showTop5();
}

function showTop5() {
  resetPage();
  top5names.forEach((name) => {
    const span = document.createElement("span");
    span.innerHTML = name;
    playerContainer.appendChild(span);
  });
  top5scores.forEach((score) => {
    const span = document.createElement("span");
    span.innerHTML = score;
    scoreContainer.appendChild(span);
  });
}

function resetPage() {
  playerContainer.innerHTML = "";
  scoreContainer.innerHTML = "";
}
