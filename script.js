var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var foodX;
var foodY;

var snakeBody = [];

var veloX = 0;
var veloY = 0;

var gameOver = false;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 1000 / 10);
};

function update() {
  if (gameOver) {
    return;
  }

  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "lime";
  snakeX += veloX * blockSize;
  snakeY += veloY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  //if out of bounds
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= cols * blockSize ||
    snakeY >= rows * blockSize
  ) {
    gameOver = true;
    alert("Game Over");
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over");
    }
  }
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && veloY != 1) {
    veloX = 0;
    veloY = -1;
  } else if (e.code == "ArrowDown" && veloY != -1) {
    veloX = 0;
    veloY = 1;
  } else if (e.code == "ArrowLeft" && veloX != 1) {
    veloX = -1;
    veloY = 0;
  } else if (e.code == "ArrowRight" && veloX != -1) {
    veloX = 1;
    veloY = 0;
  }
}

function placeFood() {
  let spawnable = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      spawnable.push([i, j]);
    }
  }

  for (let i = 0; i < snakeBody.length; i++) {
    let index = spawnable.indexOf([snakeBody[i][0], snakeBody[i][1]]);
    if (index != -1) {
      spawnable.slice(index, index);
    }
  }

  let randomPos = Math.floor(Math.random() * spawnable.length);
  alert(randomPos);

  // foodX = Math.floor(Math.random() * cols) * blockSize;
  // foodY = Math.floor(Math.random() * rows) * blockSize;
  foodX = spawnable[randomPos][0];
  foodY = spawnable[randomPos][1];
}
