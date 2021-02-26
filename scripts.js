const gridContainer = document.querySelector("#grid-container");
const resetButton = document.querySelector("#reset-button");
const colButton = document.querySelector("#block-color-button");
const bgButton = document.querySelector("#bg-color-button");
const gridButton = document.querySelector("#grid-size-button");
const randColButton = document.querySelector("#random-color-button");

let bgColor = "white";
let blockColor = "black";
let gridSize = 50;
let isRandCols = false;
let lastBlockColor;

function generateGrid() {
  gridContainer.innerHTML = "";
  for (i = 0; i < gridSize * gridSize; i++) {
    let generateDiv = document.createElement("div");
    generateDiv.setAttribute("class", "grid-block");
    generateDiv.style.background = bgColor;
    gridContainer.appendChild(generateDiv);
    gridContainer.setAttribute(
      "style",
      `grid-template-columns: repeat(${gridSize}, auto); grid-template-rows: repeat(${gridSize}, auto);`
    );
  }
  changeGridColor();
}

function changeGridColor() {
  let gridBlocks = document.getElementsByClassName("grid-block");
  gridBlocks = Array.from(gridBlocks);
  gridBlocks.forEach(function (gridBlock) {
    gridBlock.addEventListener("mouseover", function () {
      gridBlock.style.background = blockColor;
    });
  });
}

function setColor() {
  blockColor = prompt("set brush colour");
}

function randomCols() {
  let randPermission = prompt(
    `Are you sure? You'll have to reset to turn it off!`,
    `yes`
  );
  if (randPermission === `yes`) {
    let gridBlocks = document.getElementsByClassName("grid-block");
    gridBlocks = Array.from(gridBlocks);
    gridBlocks.forEach(function (gridBlock) {
      gridBlock.addEventListener("mouseover", function () {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let a = Math.floor(Math.random() * 100);
        blockColor = `rgb(${r},${g},${b},${a})`;
        gridBlock.style.background = blockColor;
      });
    });
  }
}
function setBg() {
  bgColor = prompt("set canvas colour");
  generateGrid();
}

function setGridSize() {
  let gridRequest = prompt("set grid size (max 100)");
  if (gridRequest > 100 || gridRequest < 1) {
    alert("Out of range! try again?");
  } else {
    gridSize = gridRequest;
    generateGrid();
  }
}

generateGrid();

resetButton.addEventListener("click", generateGrid);
colButton.addEventListener("click", setColor);
bgButton.addEventListener("click", setBg);
gridButton.addEventListener("click", setGridSize);
randColButton.addEventListener("click", randomCols);

// eggs
