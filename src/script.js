var score = 0;
var bestscore = 0;
var lastscore = "";
var started = 0;
var time = 1;
var diff = "hard";
var alltdArray = Array.from(document.querySelectorAll("td"));
var mine = [];
var minep1 = []; //p means places around mine
var minep2 = [];
var minep3 = [];
var minep4 = [];
var minep5 = [];
var minep6 = [];
var minep7 = [];
var minep8 = [];
var duplis = [];
var flatedAllPlaces = [];
var digedtiles = [];
var nIntervId;

function wait() {
  for (let index = 0; index < alltdArray.length; index++) {
    alltdArray[index].style.pointerEvents = "none";
  }
  // document.getElementById("difficulty").style.pointerEvents = "none";
}

function play() {
  started = 1;
  for (let index = 0; index < alltdArray.length; index++) {
    alltdArray[index].style.pointerEvents = "auto";
  }
  // document.getElementById("difficulty").style.pointerEvents = "auto";
  document.getElementById("play").style.display = "none";
  diff = document.getElementById("difficulty").value;
  mineBuild15x();
}

function mineBuild15x() {
  switch (diff) {
    case "hard":
      for (let index = 0; index < 15; index++) {
        mineBuild();
      }
      break;
    case "normal":
      for (let index = 0; index < 10; index++) {
        mineBuild();
      }
      break;
    case "easy":
      for (let index = 0; index < 5; index++) {
        mineBuild();
      }
      break;
    case "extreme":
      for (let index = 0; index < 20; index++) {
        mineBuild();
      }
      break;
  }
  console.log(mine);
  var allPlaces = [
    minep1,
    minep2,
    minep3,
    minep4,
    minep5,
    minep6,
    minep7,
    minep8,
  ];
  flatedAllPlaces = allPlaces.flat();
  const uniqueSet = new Set(flatedAllPlaces);
  var filtered = flatedAllPlaces.filter((currentValue) => {
    if (uniqueSet.has(currentValue)) {
      uniqueSet.delete(currentValue);
    } else {
      return currentValue;
    }
  });
  duplis.push(filtered);
  while (filtered.length != 0) {
    const uniqueSet = new Set(filtered);
    filtered = filtered.filter((currentValue) => {
      if (uniqueSet.has(currentValue)) {
        uniqueSet.delete(currentValue);
      } else {
        return currentValue;
      }
    });
    duplis.push(filtered);
  }
  console.log(duplis);
  // for (let index = 0; index < mine.length; index++) {
  //   dig(document.getElementById(mine[index]));
  // }
  timer();
}
//
//
function mineBuild() {
  var row = Math.floor(Math.random() * 8 + 1);
  var col = Math.floor(Math.random() * 10);
  var randomNum = row + ":" + col;

  while (mine.includes(randomNum)) {
    var row = Math.floor(Math.random() * 8 + 1);
    var col = Math.floor(Math.random() * 10);
    randomNum = row + ":" + col;
  }
  mine.push(randomNum);

  minep1.push(row - 1 + ":" + (col - 1));
  minep2.push(row - 1 + ":" + col);
  minep3.push(row - 1 + ":" + (col + 1));
  minep4.push(row + ":" + (col - 1));
  minep5.push(row + ":" + (col + 1));
  minep6.push(row + 1 + ":" + (col - 1));
  minep7.push(row + 1 + ":" + col);
  minep8.push(row + 1 + ":" + (col + 1));
}
//
//
function dig(tile) {
  var id = tile.id + "";
  // changing bg
  if (
    id.at(0) == "1" ||
    id.at(0) == "3" ||
    id.at(0) == "5" ||
    id.at(0) == "7" ||
    id.at(0) == "9"
  ) {
    if (
      id.at(2) == "1" ||
      id.at(2) == "3" ||
      id.at(2) == "5" ||
      id.at(2) == "7" ||
      id.at(2) == "9"
    ) {
      tile.style.background = "#87805E";
      !digedtiles.includes(id) ? digedtiles.push(id) : false;
    } else {
      tile.style.background = "#B09B71";
      !digedtiles.includes(id) ? digedtiles.push(id) : false;
    }
  } else {
    if (
      id.at(2) == "1" ||
      id.at(2) == "3" ||
      id.at(2) == "5" ||
      id.at(2) == "7" ||
      id.at(2) == "9"
    ) {
      tile.style.background = "#B09B71";
      !digedtiles.includes(id) ? digedtiles.push(id) : false;
    } else {
      tile.style.background = "#87805E";
      !digedtiles.includes(id) ? digedtiles.push(id) : false;
    }
  }

  // puting mine img
  for (let index = 0; index < mine.length; index++) {
    if (tile.id == mine[index]) {
      tile.innerHTML = `<img class="w-full" src="./img/bomb.svg" alt="">`;
    }
  }

  // counting nums
  if (mine.includes(id) == false && flatedAllPlaces.includes(id)) {
    tile.innerHTML = `<img class="m-auto" src="./img/1.svg" alt="">`;
    for (let index = 1; index < duplis.length + 1; index++) {
      if (duplis[index - 1].includes(id)) {
        tile.innerHTML = `<img class="m-auto" src="./img/${
          index + 1 + ""
        }.svg" alt="">`;
      }
    }
  }
  // places around clicked position
  var row = Number(id.charAt(0));
  var col = Number(id.charAt(2));
  var p1 = row - 1 + ":" + (col - 1);
  var p2 = row - 1 + ":" + col;
  var p3 = row - 1 + ":" + (col + 1);
  var p4 = row + ":" + (col - 1);
  var p5 = row + ":" + (col + 1);
  var p6 = row + 1 + ":" + (col - 1);
  var p7 = row + 1 + ":" + col;
  var p8 = row + 1 + ":" + (col + 1);
  var pArray = [p1, p2, p3, p4, p5, p6, p7, p8];
  // dig again
  if (mine.includes(id) == false && flatedAllPlaces.includes(id) == false) {
    for (let index = 0; index < pArray.length; index++) {
      try {
        // changing bg
        if (
          pArray[index].at(0) == "1" ||
          pArray[index].at(0) == "3" ||
          pArray[index].at(0) == "5" ||
          pArray[index].at(0) == "7" ||
          pArray[index].at(0) == "9"
        ) {
          if (
            pArray[index].at(2) == "1" ||
            pArray[index].at(2) == "3" ||
            pArray[index].at(2) == "5" ||
            pArray[index].at(2) == "7" ||
            pArray[index].at(2) == "9"
          ) {
            document.getElementById(pArray[index]).style.background = "#87805E";
            !digedtiles.includes(pArray[index])
              ? digedtiles.push(pArray[index])
              : false;
          } else {
            document.getElementById(pArray[index]).style.background = "#B09B71";
            !digedtiles.includes(pArray[index])
              ? digedtiles.push(pArray[index])
              : false;
          }
        } else {
          if (
            pArray[index].at(2) == "1" ||
            pArray[index].at(2) == "3" ||
            pArray[index].at(2) == "5" ||
            pArray[index].at(2) == "7" ||
            pArray[index].at(2) == "9"
          ) {
            document.getElementById(pArray[index]).style.background = "#B09B71";
            !digedtiles.includes(pArray[index])
              ? digedtiles.push(pArray[index])
              : false;
          } else {
            document.getElementById(pArray[index]).style.background = "#87805E";
            !digedtiles.includes(pArray[index])
              ? digedtiles.push(pArray[index])
              : false;
          }
        }
        // puting mine img
        if (
          !mine.includes(pArray[index]) &&
          flatedAllPlaces.includes(pArray[index])
        ) {
          document.getElementById(
            pArray[index]
          ).innerHTML = `<img class="m-auto" src="./img/1.svg" alt="">`;
          for (let index2 = 1; index2 < duplis.length + 1; index2++) {
            if (duplis[index2 - 1].includes(pArray[index])) {
              document.getElementById(
                pArray[index]
              ).innerHTML = `<img class="m-auto" src="./img/${
                index2 + 1 + ""
              }.svg" alt="">`;
            }
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }
  // diged mine lose
  if (mine.includes(id)) {
    setTimeout(() => {
      document.getElementById("winOrLose").innerText = "You Lose!";
      win();
    }, 500);
  }
  // win
  switch (diff) {
    case "hard":
      if (digedtiles.length == 65 && !mine.includes(id)) {
        setTimeout(() => {
          document.getElementById("winOrLose").innerText = "You Win!";
          score++;
          win();
        }, 500);
      }
      break;
    case "normal":
      if (digedtiles.length == 70) {
        setTimeout(() => {
          document.getElementById("winOrLose").innerText = "You Win!";
          win();
        }, 500);
      }
      break;
    case "easy":
      if (digedtiles.length == 75 && !mine.includes(id)) {
        setTimeout(() => {
          document.getElementById("winOrLose").innerText = "You Win!";
          win();
        }, 500);
      }
      break;
    case "extreme":
      if (digedtiles.length == 60) {
        setTimeout(() => {
          document.getElementById("winOrLose").innerText = "You Win!";
          win();
        }, 500);
      }
      break;
  }
}

function win() {
  for (let index = 0; index < alltdArray.length; index++) {
    alltdArray[index].style.pointerEvents = "none";
  }
  document.getElementById("tryagain").style.display = "block";
  clearInterval(nIntervId);
  lastscore = document.getElementById("timer").innerText;
  var result = document.getElementById("winOrLose").innerText;
  switch (result) {
    case "You Lose!":
      break;
    case "You Win!":
      if (bestscore == 0 || bestscore > Number(lastscore.slice(0, -1))) {
        bestscore = Number(lastscore.slice(0, -1));
      }
      document.getElementById(
        "score"
      ).innerHTML = `<p>Best Score : ${bestscore}s</p>`;
      break;
  }
  document.getElementById("best").innerText = `Best Score : ${bestscore}s`;
  document.getElementById("last").innerText = `Last Score : ${Number(
    lastscore.slice(0, -1)
  )}s`;
  document.getElementById("timer").innerText = "0s";
  time = 1;
}

function counting() {
  document.getElementById("timer").innerText = `${time++}s`;
}

function timer() {
  nIntervId = setInterval(counting, 1000);
}

function tryagain() {
  clearInterval(nIntervId);
  document.getElementById("timer").innerText = "0s";
  time = 1;
  for (let index = 0; index < alltdArray.length; index++) {
    if (
      alltdArray[index].id.at(0) == "1" ||
      alltdArray[index].id.at(0) == "3" ||
      alltdArray[index].id.at(0) == "5" ||
      alltdArray[index].id.at(0) == "7" ||
      alltdArray[index].id.at(0) == "9"
    ) {
      if (
        alltdArray[index].id.at(2) == "1" ||
        alltdArray[index].id.at(2) == "3" ||
        alltdArray[index].id.at(2) == "5" ||
        alltdArray[index].id.at(2) == "7" ||
        alltdArray[index].id.at(2) == "9"
      ) {
        alltdArray[index].style.background = "#54B435";
      } else {
        alltdArray[index].style.background = "#82CD47";
      }
    } else {
      if (
        alltdArray[index].id.at(2) == "1" ||
        alltdArray[index].id.at(2) == "3" ||
        alltdArray[index].id.at(2) == "5" ||
        alltdArray[index].id.at(2) == "7" ||
        alltdArray[index].id.at(2) == "9"
      ) {
        alltdArray[index].style.background = "#82CD47";
      } else {
        alltdArray[index].style.background = "#54B435";
      }
    }
    alltdArray[index].innerHTML = "";
  }
  for (let index = 0; index < alltdArray.length; index++) {
    alltdArray[index].style.pointerEvents = "auto";
  }
  document.getElementById("tryagain").style.display = "none";
  mine = [];
  minep1 = []; //p means places around mine
  minep2 = [];
  minep3 = [];
  minep4 = [];
  minep5 = [];
  minep6 = [];
  minep7 = [];
  minep8 = [];
  duplis = [];
  flatedAllPlaces = [];
  digedtiles = [];
  mineBuild15x();
}

function difficulty(mode) {
  if (started == 1) {
    if (diff != mode.value) {
      bestscore = 0;
      document.getElementById("score").innerHTML = `<p>Best Score : ${bestscore}s</p>`;
      document.getElementById("best").innerText = `Best Score : ${bestscore}s`;
      diff = mode.value;
      tryagain();
    }
  }
}
