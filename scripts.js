const gridContainer = document.querySelector("#grid-container");
const resetButton = document.querySelector("#reset-button");
const colButton = document.querySelector("#block-color-button");
const bgButton = document.querySelector("#bg-color-button");
const gridButton = document.querySelector("#grid-size-button");
const randColButton = document.querySelector("#random-color-button");

let bgColor = "white";
let blockColor = "black";
let gridSize = 50;
let isRandomColors = false;



function getRandomColorChannel(){
  return Math.floor(Math.random() * 256);
}
function getRandomColor(){
 let r = getRandomColorChannel(),
 g = getRandomColorChannel(),
 b = getRandomColorChannel(),
 a = Math.floor(Math.random() * 100);

 return `rgb(${r},${g},${b},${a})`;
}

function onMouseOverGridBlock(event){
  if (isRandomColors){
    event.currentTarget.style.background = getRandomColor();
  } else {
    event.currentTarget.style.background = blockColor;
  }
  event.currentTarget.classList.add('mousedOver');
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
  let gridBlocks = document.getElementsByClassName("grid-block");
  gridblocks = Array.from(gridBlocks);
  gridblocks.forEach(function(gridBlock){
    gridBlock.addEventListener("mouseover", onMouseOverGridBlock);
  });
}



function setColor() {
  blockColor = prompt("set brush colour");
}

function toggleRandomColors() {
  if (isRandomColors){
    isRandomColors = false;
  } else {
    isRandomColors = true;
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
randColButton.addEventListener("click", toggleRandomColors);

// eggs
