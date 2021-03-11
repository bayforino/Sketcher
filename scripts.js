const gridContainer = document.querySelector("#grid-container");
const resetButton = document.querySelector("#reset-button");
const colButton = document.querySelector("#block-color-button");
const bgButton = document.querySelector("#bg-color-button");
const gridButton = document.querySelector("#grid-size-button");
const randColButton = document.querySelector("#random-color-button");
const fillRandomColorButton = document.querySelector('#fill-random-button');
const brushInfo = document.querySelector("#brush-info");
const canvasInfo = document.querySelector("#canvas-info");
const gridInfo = document.querySelector("#grid-info");


let bgColor = "white";
let blockColor = "black";
let gridSize = 50;
let isRandomColors = false;
let lastBlockColor = `black`;
let lastCanvasColor = `black`;


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

function toggleDrawing(){
  toggleDrawing === true ? toggleDrawing = false : toggleDrawing = true;
  console.log('toggling drawing');
}

function onMouseOverGridBlock(event) {
  
  if (toggleDrawing === true){
    console.log('drawing')
  if (isRandomColors) {
    event.currentTarget.style.background = getRandomColor();
  } else {
    event.currentTarget.style.background = blockColor;
  }
  event.currentTarget.classList.add("mousedOver");
}
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
  gridblocks.forEach(function (gridBlock) {
    gridBlock.addEventListener("mouseover", onMouseOverGridBlock);
 
  });
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
function setBg() {
  lastCanvasColor = bgColor;
  bgColor = prompt("set canvas colour (will reset your artwork!)");
  if (bgColor === null) {
    bgColor = lastCanvasColor;
  } else {
    generateGrid();
    canvasInfo.textContent = `canvas colour: ${bgColor}`;
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

function fillRandomColors(){

  const squares = document.querySelectorAll(".grid-block");
squares.forEach(square => {
  square.setAttribute(`style`, `background: ${getRandomColor()}`);
});
}

function fillGradient(){

  const squares = document.querySelectorAll(".grid-block");
  let r = 1,
      g = 1,
      b = 1;
squares.forEach(square => {
  square.setAttribute(`style`, `background: rgb(${r}, ${g}, ${b})`);
  r++;
  g++;
  b++;
});
}

generateGrid();

resetButton.addEventListener("click", generateGrid);
colButton.addEventListener("click", setColor);
bgButton.addEventListener("click", setBg);
gridButton.addEventListener("click", setGridSize);
randColButton.addEventListener("click", toggleRandomColors);
fillRandomColorButton.addEventListener("click", fillRandomColors);

gridContainer.addEventListener("mousedown", toggleDrawing);
gridContainer.addEventListener("mouseup", toggleDrawing);

gridContainer.addEventListener("touchstart", toggleDrawing, false);
gridContainer.addEventListener("touchend", toggleDrawing, false);
gridContainer.addEventListener("touchmove", function (e) {
  let touch = e.touches[0];
  let mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  gridContainer.dispatchEvent(mouseEvent);
})



gridContainer.ontouchstart = (e) => {
  e.preventDefault();
  e.stopPropagation();
}




// eggs
