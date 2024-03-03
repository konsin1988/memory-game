const displays = document.querySelectorAll(".display");
const startBtn = document.querySelector(".startBtn");
let images;
const countElem16 = document.getElementById("countelem16");
const countElem36 = document.getElementById("countelem36");
const countPairs1 = document.getElementById("countpairs1");
const countPairs2 = document.getElementById("countpairs2");
const board = document.querySelector(".board");
let ELEMCOUNT = 36;
let PAIRCOUNT = 2;
const imageNumbers = [];
let colorNumber;
let countCards = 0;
let eventPrev;
let score = 0;
let countSteps = 0;
let flag_elem = false;
let flag_pairs = false;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  displays[0].classList.add("displayMoveUp");
});

setTimeout(() => {
  countElem16.addEventListener("click", (event) => {
    flag_elem = true;
    if (countElem36.classList.contains("hovered")) {
      countElem36.classList.remove("hovered");
    }
    event.target.classList.add("hovered");
    ELEMCOUNT = +event.target.dataset.countelem;
    checkCardsPairs();
  });
  countElem36.addEventListener("click", (event) => {
    flag_elem = true;
    if (countElem16.classList.contains("hovered")) {
      countElem16.classList.remove("hovered");
    }
    event.target.classList.add("hovered");
    ELEMCOUNT = +event.target.dataset.countelem;
    checkCardsPairs();
  });
  countPairs1.addEventListener("click", (event) => {
    flag_pairs = true;
    if (countPairs2.classList.contains("hovered")) {
      countPairs2.classList.remove("hovered");
    }
    event.target.classList.add("hovered");
    PAIRCOUNT = +event.target.dataset.countpairs;
    checkCardsPairs();
  });
  countPairs2.addEventListener("click", (event) => {
    flag_pairs = true;
    if (countPairs1.classList.contains("hovered")) {
      countPairs1.classList.remove("hovered");
    }
    event.target.classList.add("hovered");
    PAIRCOUNT = +event.target.dataset.countpairs;
    checkCardsPairs();
  });
}, 0);

function checkCardsPairs() {
  if (flag_elem && flag_pairs) {
    setTimeout(() => {
      displays[1].classList.add("displayMoveUp");
      boardCreation();
      init();
    }, 500);
  }
}

function getBoxSize() {
  return ELEMCOUNT === 36 ? 16.6 : 25;
}

function imageNumberCreation() {
  for (let i = 0; i < PAIRCOUNT; ++i) {
    for (let j = 1; j < ELEMCOUNT / PAIRCOUNT + 1; ++j) {
      imageNumbers.push(j);
    }
  }
}

function getTemp(colorTheme, imageNumber, sizeBox) {
  return `<div style="width: ${sizeBox}%; height: ${sizeBox}%" class="imgBx" >
    <div data-index="${imageNumber}" class="img imgColor${colorTheme}" style="background-image: url(./../img/${imageNumber}.jpg)"></div>
    </div>`;
}

function getRandomImageNumber() {
  const index = Math.floor(Math.random() * imageNumbers.length);
  return imageNumbers.splice(index, 1)[0];
}

function boardCreation() {
  imageNumberCreation();
  const sizeBox = getBoxSize();
  board.innerHTML = "";
  for (let i = 0; i < ELEMCOUNT; ++i) {
    const imageNumber = getRandomImageNumber();
    colorNumber = Math.round(Math.random() * 4);
    board.insertAdjacentHTML(
      "afterbegin",
      getTemp(colorNumber, imageNumber, sizeBox)
    );
  }
}

function init() {
  images = document.querySelectorAll(".img:not(.checkedCard)");
  images.forEach((image) => {
    image.addEventListener("click", openCard);
  });
}

function openCard(event) {
  if (event.target.classList.contains("openCard")) {
    return;
  }
  countCards++;
  event.target.classList.remove("notPair");
  event.target.classList.remove("closeCard");
  event.target.classList.add("openCard");
  if (countCards == 2) {
    countSteps++;
    stopListen();
    checkCards(event);

    countCards = 0;
  } else {
    eventPrev = event;
  }
}

function stopListen() {
  images.forEach((image) => {
    image.removeEventListener("click", openCard);
  });
}

function checkCards(event) {
  setTimeout(() => {
    init();
  }, 2600);

  setTimeout(() => {
    if (event.target.dataset.index === eventPrev.target.dataset.index) {
      score++;
      event.target.classList.add("checkedCard");
      eventPrev.target.classList.add("checkedCard");
      if (score === ELEMCOUNT / 2) {
        finish();
      }
    } else {
      notPair(event);
    }
  }, 800);
}

function notPair(event) {
  setTimeout(() => {
    event.target.classList.add("closeCard");
    eventPrev.target.classList.add("closeCard");
    event.target.classList.remove("openCard");
    eventPrev.target.classList.remove("openCard");
  }, 1000);
  event.target.classList.add("notPair");
  eventPrev.target.classList.add("notPair");
}

function finish() {
  setTimeout(() => {
    displays[3].innerHTML = `
    <h1>Congratulation</h1>
    <h2>Number of <br /> attempts: ${countSteps} </h2>
    `;
    displays[2].classList.add("displayMoveUp");
  }, 2000);
  setTimeout(() => {
    location.reload();
  }, 4000);
}
