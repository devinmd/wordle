var guessNum, currGuess, solution, sID, completed, timer, time;
var settings1 = false;
var currTheme = "default";

const guesses = 6;
const wordLength = 5;

const params = new URLSearchParams(window.location.search);

function init() {
  let request = new XMLHttpRequest();
  request.open("GET", "themes.json", false);
  request.send(null);
  themes = JSON.parse(request.responseText);
  createThemes();
  start();
  for (let i = 0; i < document.getElementsByTagName("button"); i++) {
    document.getElementsByTagName("button")[i].style.transition = "300ms";
  }
}

function start() {
  // update
  updateScores();

  // default vars
  completed = false;
  document.getElementById("next").style.display = "none";
  document.getElementById("solution").innerHTML = "0:00:00";
  currGuess = "";
  guessNum = 0;

  // param handling
  if (
    Number.isInteger(parseInt(params.get("s"))) &&
    parseInt(params.get("s")) < solutions.length
  ) {
    solution = solutions[params.get("s")].toUpperCase();
    sID = parseInt(params.get("s"));
  } else {
    sID = Math.floor(Math.random() * solutions.length);
    solution = solutions[sID].toUpperCase();
  }
  console.log(solution);

  // copy link handling
  document.getElementById("copy").innerHTML =
    "https://" +
    window.location.hostname +
    window.location.pathname +
    "?s=" +
    sID +
    "<br>(click to copy)";

  // do main list
  removeAllChildNodes(document.getElementById("mainList"));
  for (let i = 0; i < guesses; i++) {
    guessBox = document.createElement("OL");
    for (let e = 0; e < wordLength; e++) {
      let listItem = document.createElement("LI");
      listItem.style.backgroundColor = themes[currTheme].lbg;
      listItem.innerHTML = "";
      listItem.className = "lbg";
      guessBox.append(listItem);
    }
    document.getElementById("mainList").append(guessBox);
  }
  time = 0;
  timer = setInterval(doTimer, 1000);
  for (let p = 0; p < document.getElementsByClassName("key").length; p++) {
    document.getElementsByClassName("key")[p].className = "key";
  }
  doColors();
}
function getData(letter) {
  let arr = [];
  for (let i = 0; i < solutions.length; i++) {
    let st = solutions[i].toString().charAt(letter - 1);
    if (arr[st.charCodeAt(0) - 97] == null) {
      arr[st.charCodeAt(0) - 97] = 0;
    }
    arr[st.charCodeAt(0) - 97] = arr[st.charCodeAt(0) - 97] + 1;
  }

  let largest = -1;
  let largestIndex = 0;

  for (let h = 0; h < arr.length; h++) {
    if (arr[h] > largest) {
      largest = arr[h];
      largestIndex = h;
    }
  }
  return (
    "<span class='ltxt'>" +
    String.fromCharCode(97 + largestIndex).toUpperCase() +
    "</span><span class='dtxt'> " +
    arr[largestIndex] +
    "</span>"
  );
}

function getAllData() {
  // get the letters
  let letters = [];
  for (let i = 0; i < solutions.length; i++) {
    for (let e = 0; e < wordLength; e++) {
      let currLetter = solutions[i].toString().charAt(e);
      if (letters[currLetter] == null) {
        letters[currLetter] = 0;
      }
      letters[currLetter] = letters[currLetter] + 1;
    }
  }
  // sort
  const sorted = Object.fromEntries(
    Object.entries(letters).sort(([, a], [, b]) => b - a)
  );

  // create string to display
  for (let p = 0; p < Object.keys(sorted).length; p++) {
    let li = document.createElement("li");
    li.innerHTML =
      " <span class='ltxt'>" +
      Object.keys(sorted)[p].toUpperCase() +
      "</span> <span class='dtxt'>" +
      sorted[Object.keys(sorted)[p]].toString().padEnd(3, " ") +
      "\u2002</span>";
    document.getElementById("ldAll").append(li);
  }
}

var ldg1 = false;
function ldg() {
  ldg1 = !ldg1;
  if (ldg1 == true) {
    document.getElementById("ldg").style.display = "inline-block";
  } else {
    document.getElementById("ldg").style.display = "none";
  }
}

var ldy1 = false;
function ldy() {
  ldy1 = !ldy1;
  if (ldy1 == true) {
    document.getElementById("ldy").style.display = "inline-block";
  } else {
    document.getElementById("ldy").style.display = "none";
  }
}

getAllData();

document.getElementById("guessDist").innerHTML =
  getData(1) +
  "<br>" +
  getData(2) +
  "<br>" +
  getData(3) +
  "<br>" +
  getData(4) +
  "<br>" +
  getData(5);

function submitGuess() {
  // put guess on lists and do colors

  if (currGuess.length == wordLength) {
    if (currGuess == solution) {
      // win!
      win();
    }
    for (let i = 0; i < wordLength; i++) {
      if (currGuess.split("")[i] == solution.split("")[i]) {
        // direct match
        document.getElementById("mainList").children[guessNum].children[
          i
        ].className = "green";
        document.getElementById(
          currGuess.split("")[i].toString().toLowerCase()
        ).className = "key green";
      } else if (isInWord(i)) {
        // is in the word
        document.getElementById("mainList").children[guessNum].children[
          i
        ].className = "yellow";
        document.getElementById(
          currGuess.split("")[i].toString().toLowerCase()
        ).className = "key yellow";
      } else {
        document.getElementById("mainList").children[guessNum].children[
          i
        ].className = "dark";
        document.getElementById(
          currGuess.split("")[i].toString().toLowerCase()
        ).className = "key dark";
      }
    }
    currGuess = "";
    guessNum += 1;
    if (guessNum >= guesses) {
      endGame();
    }
  }
  doColors();
  updateScores();
}

function showLetters() {
  for (let i = 0; i < wordLength; i++) {
    if (currGuess.split("")[i] != null) {
      document.getElementById("mainList").children[guessNum].children[
        i
      ].innerHTML = currGuess.split("")[i];
    } else {
      document.getElementById("mainList").children[guessNum].children[
        i
      ].innerHTML = "";
    }
  }
}

function doTimer() {
  time += 1;
  document.getElementById("solution").innerHTML = secondsToHms(time);
  localStorage.setItem(
    "timeSpent",
    parseInt(localStorage.getItem("timeSpent")) + 1
  );
}

function endGame() {
  if (completed == false) {
    // show user the answer
    if (params.get("s")) {
      // reset params
      params.delete("s");
    }
    document.getElementById("solution").innerHTML =
      "The solution was " + solution;
    document.getElementById("next").style.display = "inline";
    completed = true;
    localStorage.setItem(
      "attempts",
      parseInt(localStorage.getItem("attempts")) + 1
    );
    updateScores();
    clearInterval(timer);
  }
}

function win() {
  let score = Math.floor(5000 - (time * 15 + (guessNum + 1) * 15));
  localStorage.setItem(
    "totalScore",
    parseInt(localStorage.getItem("totalScore")) + score
  );
  if (score < 0) {
    score = 0;
  }
  if (score > localStorage.getItem("bestScore")) {
    localStorage.setItem("bestScore", score);
  }
  if (params.get("s")) {
    // reset params
    params.delete("s");
  }
  document.getElementById("solution").innerHTML = "Score: " + score;
  document.getElementById("next").style.display = "inline";
  completed = true;
  localStorage.setItem(
    "completed",
    parseInt(localStorage.getItem("completed")) + 1
  );
  localStorage.setItem(
    "attempts",
    parseInt(localStorage.getItem("attempts")) + 1
  );
  clearInterval(timer);

  updateScores();
}

init();

function copy() {
  navigator.clipboard.writeText(
    document.getElementById("copy").innerHTML.replace("<br>(click to copy)", "")
  );
}

function key(k) {
  if (completed == false) {
    if (k == "Backspace") {
      currGuess = currGuess.slice(0, -1);
      showLetters();
    } else if (k == "Enter") {
      for (let p = 0; p < words.length; p++) {
        if (words[p].toUpperCase() == currGuess && currGuess.length == 5) {
          submitGuess();
        }
      }
    } else if (currGuess.length + 1 <= wordLength) {
      if (
        k == "KeyA" ||
        k == "KeyB" ||
        k == "KeyC" ||
        k == "KeyD" ||
        k == "KeyE" ||
        k == "KeyF" ||
        k == "KeyG" ||
        k == "KeyH" ||
        k == "KeyI" ||
        k == "KeyJ" ||
        k == "KeyK" ||
        k == "KeyL" ||
        k == "KeyM" ||
        k == "KeyN" ||
        k == "KeyO" ||
        k == "KeyP" ||
        k == "KeyQ" ||
        k == "KeyR" ||
        k == "KeyS" ||
        k == "KeyT" ||
        k == "KeyU" ||
        k == "KeyV" ||
        k == "KeyW" ||
        k == "KeyX" ||
        k == "KeyY" ||
        k == "KeyZ"
      ) {
        // not backspace and is under 5 letters
        currGuess += k.replace("Key", "");
        // put current guess on the screen
        showLetters();
      }
    } else {
      // too many letters
    }
  }
}

function doColors() {
  // keyboard keys
  for (let g = 0; g < document.getElementsByClassName("key").length; g++) {
    document.getElementsByClassName("key")[g].style.backgroundColor =
      themes[currTheme].lbg;
    document.getElementsByClassName("key")[g].style.color =
      themes[currTheme].ltxt;
  }

  // green
  for (let i = 0; i < document.getElementsByClassName("green").length; i++) {
    document.getElementsByClassName("green")[i].style.backgroundColor =
      themes[currTheme].g;
  }

  // yellow
  for (let e = 0; e < document.getElementsByClassName("yellow").length; e++) {
    document.getElementsByClassName("yellow")[e].style.backgroundColor =
      themes[currTheme].y;
  }

  // darker
  for (let d = 0; d < document.getElementsByClassName("dark").length; d++) {
    document.getElementsByClassName("dark")[d].style.backgroundColor =
      themes[currTheme].d;
  }

  // background
  for (let p = 0; p < document.getElementsByClassName("bg").length; p++) {
    document.getElementsByClassName("bg")[p].style.backgroundColor =
      themes[currTheme].bg;
  }
  // light background
  for (let t = 0; t < document.getElementsByClassName("lbg").length; t++) {
    document.getElementsByClassName("lbg")[t].style.backgroundColor =
      themes[currTheme].lbg;
  }
  // dark text
  for (let t = 0; t < document.getElementsByClassName("dtxt").length; t++) {
    document.getElementsByClassName("dtxt")[t].style.color =
      themes[currTheme].dtxt;
  }
  // light text
  for (let t = 0; t < document.getElementsByClassName("ltxt").length; t++) {
    document.getElementsByClassName("ltxt")[t].style.color =
      themes[currTheme].ltxt;
  }

  // big title
  document.getElementById("title").style.color = themes[currTheme].ltxt;
  // copy link
  document.getElementById("copy").style.color = themes[currTheme].dtxt;
  // main page background
  document.body.style.backgroundColor = themes[currTheme].bg;
  // giveup button
  document.getElementById("giveup").style.backgroundColor = themes[currTheme].y;
  document.getElementById("giveup").style.color = themes[currTheme].ltxt;
  // clear button
  document.getElementById("clear").style.backgroundColor = themes[currTheme].y;
  document.getElementById("clear").style.color = themes[currTheme].ltxt;
  // next button
  document.getElementById("next").style.backgroundColor = themes[currTheme].g;
  document.getElementById("next").style.color = themes[currTheme].ltxt;
  // source code link
  document.getElementById("link").style.color = themes[currTheme].g;
  // settings menu background color
  document.getElementById("settings").style.backgroundColor =
    themes[currTheme].lbg;
  // main grid text color
  document.getElementById("mainList").style.color = themes[currTheme].ltxt;
  // close settings icon
  document.getElementById("close").style.color = themes[currTheme].ltxt;
  // open settings icon
  document.getElementById("settingsBtn").style.color = themes[currTheme].ltxt;
}

function createThemes() {
  for (let i = 0; i < Object.keys(themes).length; i++) {
    let item = document.createElement("li");
    let button = document.createElement("button");
    button.innerHTML = Object.keys(themes)[i];
    button.style.backgroundColor = themes[Object.keys(themes)[i]].bg;
    button.style.color = themes[Object.keys(themes)[i]].ltxt;
    button.onclick = function () {
      currTheme = Object.keys(themes)[i];
      for (
        let p = 0;
        p < document.getElementById("themes").children.length;
        p++
      ) {
        document.getElementById("themes").children[p].children[0].style.border =
          "none";
      }
      this.style.border = "2px solid " + themes[currTheme].g;
      doColors();
    };
    if (i == 0) {
      button.click();
    }
    item.append(button);
    document.getElementById("themes").append(item);
  }
}
function settings() {
  settings1 = !settings1;

  if (settings1) {
    if(getWidth() < 600){
      document.getElementById("main").style.marginLeft = getWidth() + "px";
      document.getElementById("main").style.display = "none"
      document.getElementById("settings").style.width = getWidth() + "px";
      document.getElementById("settings").style.opacity = "100%";
      console.log('hw')
    }else{
      document.getElementById("main").style.marginLeft = getWidth() / 3 + "px";
      document.getElementById("settings").style.width = getWidth() / 3 + "px";
      document.getElementById("settings").style.opacity = "100%";
    }
    
  } else {
    document.getElementById("main").style.display = "block"
    document.getElementById("main").style.marginLeft = "0"
    document.getElementById("settings").style.width = "0";
    document.getElementById("settings").style.opacity = "0";
  }
}

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}
function isInWord(i) {
  for (let e = 0; e < wordLength; e++) {
    if (currGuess.split("")[i] == solution.split("")[e]) {
      // is in the word
      return true;
    }
  }
  return false;
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

onkeydown = function (e) {
  key(e.code);
};

function updateScores() {
  if (localStorage.getItem("completed") == null) {
    localStorage.setItem("completed", 0);
  }
  if (localStorage.getItem("attempts") == null) {
    localStorage.setItem("attempts", 0);
  }
  if (localStorage.getItem("timeSpent") == null) {
    localStorage.setItem("timeSpent", 0);
  }
  if (localStorage.getItem("bestScore") == null) {
    localStorage.setItem("bestScore", 0);
  }
  if (localStorage.getItem("totalScore") == null) {
    localStorage.setItem("totalScore", 0);
  }
  let acc = Math.floor(
    (localStorage.getItem("completed") / localStorage.getItem("attempts")) * 100
  );

  if (!Number.isInteger(acc)) {
    acc = 0;
  }

  // completed, attempts, accuracy%
  document.getElementById("wins").innerHTML =
    "<span class='ltxt'>" +
    localStorage.getItem("completed") +
    "</span> <span class='dtxt'>Completed</span> <span class='ltxt'> / " +
    localStorage.getItem("attempts") +
    "</span><span class='dtxt'> Attempts (</span><span class='ltxt'>" +
    acc +
    "%</span><span class='dtxt'>)</span>";

  // average score
  if (
    Number.isInteger(
      Math.floor(
        parseInt(localStorage.getItem("totalScore")) /
          parseInt(localStorage.getItem("completed"))
      )
    )
  ) {
    document.getElementById("avgScore").innerHTML =
      "<span class='ltxt'>Average Score: </span><span class='dtxt'>" +
      Math.floor(
        parseInt(localStorage.getItem("totalScore")) /
          parseInt(localStorage.getItem("completed"))
      ) +
      "</span>";
  } else {
    document.getElementById("avgScore").innerHTML =
      "<span class='ltxt'>Average Score: </span><span class='dtxt'>" +
      0 +
      "</span>";
  }
  // best score
  document.getElementById("bestScore").innerHTML =
    "<span class='ltxt'>Best Score: </span><span class='dtxt'>" +
    localStorage.getItem("bestScore") +
    "</span>";
  // time spent
  document.getElementById("timeSpent").innerHTML =
    "<span class='ltxt'>Time Spent:</span> <span class='dtxt'>" +
    secondsToHms(parseInt(localStorage.getItem("timeSpent"))).replaceAll(
      ":",
      "<span class='ltxt'>:</span>"
    ) +
    "</span>";

  doColors();
}

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  return h + ":" + ("0" + m).slice(-2) + ":" + ("0" + s).slice(-2);
}
