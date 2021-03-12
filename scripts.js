const gridContainer = document.querySelector("#grid-container");
const resetButton = document.querySelector("#reset-button");
const colButton = document.querySelector("#block-color-button");
const bgButton = document.querySelector("#bg-color-button");
const gridButton = document.querySelector("#grid-size-button");
const randColButton = document.querySelector("#random-color-button");
const fillRandomColorButton = document.querySelector("#fill-random-button");
const randomPatternButton = document.querySelector("#random-pattern-button");
const saveButton = document.querySelector("#save-button");
const brushInfo = document.querySelector("#brush-info");
const canvasInfo = document.querySelector("#canvas-info");
const gridInfo = document.querySelector("#grid-info");

let storedData;
let bgColor = "white";
let blockColor = "black";
let gridSize = 50;
let isRandomColors = false;
let lastBlockColor = `black`;
let lastCanvasColor = `black`;
let toggleDrawing = false;

function initialGenerateGrid() {
  generateGrid();
  if (localStorage.getItem("storedData")) {
    loadStoredData();
  }
}

function getRandomColorChannel() {
  return Math.floor(Math.random() * 256);
}
function getRandomColor() {
  let r = getRandomColorChannel(),
    g = getRandomColorChannel(),
    b = getRandomColorChannel(),
    a = Math.floor(Math.random() * 100);

  return `rgb(${r},${g},${b},${a})`;
}

function toggleDrawingOnOff() {
  if (toggleDrawing === true) {
    toggleDrawing = false;
    updateStorage();
  } else if (toggleDrawing === false) {
    toggleDrawing = true;
  }
}

function onMouseOverGridBlock(event) {
  if (toggleDrawing === true) {
    event.currentTarget.classList.add("drawn");
    if (isRandomColors) {
      event.currentTarget.style.background = getRandomColor();
    } else {
      event.currentTarget.style.background = blockColor;
    }
    event.currentTarget.classList.add("mousedOver");
  }
}

function setBg(event) {
  if (event.currentTarget === bgButton) {
    let lastBgColor = bgColor;
    bgColor = prompt(`Select a background colour`);
    if (bgColor === null) {
      bgColor = lastBgColor;
      return;
    }
  }
  let gridBlocks = document.querySelectorAll(".grid-block");
  gridBlocks.forEach((gridBlock) => {
    if (gridBlock.classList.contains("drawn")) {
      return;
    } else {
      gridBlock.setAttribute("style", `background: ${bgColor}`);
    }
  });
}

function generateGrid() {
  gridContainer.innerHTML = "";
  for (i = 0; i < gridSize * gridSize; i++) {
    let generateDiv = document.createElement("div");
    generateDiv.classList.add("grid-block");
    generateDiv.style.background = bgColor;
    gridContainer.appendChild(generateDiv);
    gridContainer.setAttribute(
      "style",
      `grid-template-columns: repeat(${gridSize}, auto); grid-template-rows: repeat(${gridSize}, auto);`
    );
  }
  addGridBlocksEventListeners();
}

function setColor() {
  if (isRandomColors) {
    isRandomColors = false;
  }
  lastBlockColor = blockColor;
  blockColor = prompt("set brush colour");
  if (blockColor === null) {
    blockColor = lastBlockColor;
  }
  brushInfo.textContent = `brush colour: ${blockColor}`;
}

function toggleRandomColors() {
  if (isRandomColors) {
    isRandomColors = false;
    brushInfo.textContent = `brush colour: ${blockColor}`;
  } else {
    isRandomColors = true;
    brushInfo.innerHTML = `brush colour: 
    <span style="color:${getRandomColor()}">r</span>
    <span style="color:${getRandomColor()}">a</span>
    <span style="color:${getRandomColor()}">n</span>
    <span style="color:${getRandomColor()}">d</span>
    <span style="color:${getRandomColor()}">o</span>
    <span style="color:${getRandomColor()}">m</span>`;
  }
}

function setGridSize() {
  let gridRequest = prompt("set grid size (max 100)");
  if (gridRequest > 100 || gridRequest < 1) {
    alert("Out of range! try again?");
  } else {
    gridSize = gridRequest;
    generateGrid();
    gridInfo.textContent = `grid size: ${gridSize} x ${gridSize}`;
  }
}

function fillRandomColors() {
  generateGrid();
  const squares = document.querySelectorAll(".grid-block");
  squares.forEach((square) => {
    if (square.classList.contains(`drawn`)) {
      return;
    }
    square.setAttribute(`style`, `background: ${getRandomColor()}`);
  });
}

function randomPattern() {
  setBg(event);
  function randomNumber(num) {
    return Math.floor(Math.random() * num + 1);
  }
  let num1 = randomNumber(15);
  let num2 = randomNumber(15);
  let bg = getRandomColor();
  let offset = randomNumber(10);
  const squares = document.querySelectorAll(".grid-block");
  const patternColor = getRandomColor();
  const offsetColor = getRandomColor();
  squares.forEach((square) => {
    square.classList.remove(`done`);
  });
  for (i = 0; i < squares.length; i++) {
    if (squares[i].classList.contains("done")) {
      continue;
    } else {
      if (i % num1 === 0 || i % num2 === 0) {
        if (!squares[i].classList.contains("drawn")) {
          squares[i].setAttribute(`style`, `background: ${patternColor}`);
        }

        if (i + offset >= squares.length) {
          continue;
        } else {
          if (squares[i + offset].classList.contains("drawn")) {
            continue;
          } else {
            squares[i + offset].setAttribute(
              `style`,
              `background: ${offsetColor}`
            );
            squares[i + offset].classList.add("done");
          }
        }
      } else {
        if (squares[i].classList.contains("drawn")) {
          continue;
        } else {
          squares[i].setAttribute(`style`, `background: ${bg}`);
        }
      }
    }
  }
  updateStorage();
}

function screenShot() {
  html2canvas(document.querySelector("#grid-container")).then((canvas) => {
    saveAs(canvas.toDataURL(), "sketcher.png");
  });
}

function saveAs(url, filename) {
  let link = document.createElement("a");

  if (typeof link.download === "string") {
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  } else {
    window.open(url);
  }
}

function updateStorage() {
  if (storageAvailable(`localStorage`)) {
    storedData = JSON.stringify(gridContainer.innerHTML);
    localStorage.setItem(`storedData`, storedData);
  }
}

function loadStoredData() {
  if (
    localStorage.getItem("storedData") &&
    localStorage.getItem("storedData") !== "[]"
  ) {
    storedData = JSON.parse(localStorage.getItem("storedData"));
    gridContainer.innerHTML = storedData;
  }
  addGridBlocksEventListeners();
}

function addGridBlocksEventListeners() {
  let gridBlocks = Array.from(document.getElementsByClassName("grid-block"));
  gridBlocks.forEach(function (gridBlock) {
    gridBlock.addEventListener("mouseover", onMouseOverGridBlock);
  });
}

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    let x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      (e.code === 22 ||
        e.code === 1014 ||
        e.name === "QuotaExceededError" ||
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      storage &&
      storage.length !== 0
    );
  }
}

initialGenerateGrid();

resetButton.addEventListener("click", generateGrid);
colButton.addEventListener("click", setColor);
bgButton.addEventListener("click", setBg);
gridButton.addEventListener("click", setGridSize);
randColButton.addEventListener("click", toggleRandomColors);
fillRandomColorButton.addEventListener("click", fillRandomColors);
randomPatternButton.addEventListener("click", randomPattern);
saveButton.addEventListener("click", screenShot);

window.addEventListener("touchstart", toggleDrawingOnOff, false);
window.addEventListener("touchend", toggleDrawingOnOff, false);
window.addEventListener("touchmove", function (e) {
  let touch = e.touches[0];

  let blockToColor = document.elementFromPoint(touch.clientX, touch.clientY);
  console.log(blockToColor);
  if (isRandomColors) {
    blockToColor.setAttribute("style", `background: ${getRandomColor()}`);
  } else {
    blockToColor.setAttribute("style", `background: ${blockColor}`);
  }
  blockToColor.classList.add("mousedover", "drawn");
  updateStorage();
});

gridContainer.ontouchstart = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

window.addEventListener("mousedown", toggleDrawingOnOff);
window.addEventListener("mouseup", toggleDrawingOnOff);

// eggs
