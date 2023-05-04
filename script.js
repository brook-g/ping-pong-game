const canvas = document.getElementById('pingPongCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const characterWidth = 20;
const characterHeight = 20;

let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;
let characterX = canvas.width / 2;
let characterY = canvas.height / 2;
let characterSpeedX = 3;
let characterSpeedY = 2;

function drawCharacter() {
  ctx.font = '20px monospace';
  ctx.fillStyle = '#fff';
  ctx.fillText('⌐◨-◨', characterX, characterY);
}

function drawPaddle(x, y) {
  ctx.beginPath();
  ctx.rect(x, y, paddleWidth, paddleHeight);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  characterX += characterSpeedX;
  characterY += characterSpeedY;

  if (characterX + characterWidth > canvas.width || characterX < 0) {
    characterSpeedX = -characterSpeedX;
  }

  if (characterY + characterHeight > canvas.height || characterY < 0) {
    characterSpeedY = -characterSpeedY;
  }

  if (characterX < paddleWidth && characterY > paddle1Y && characterY < paddle1Y + paddleHeight) {
    characterSpeedX = -characterSpeedX;
  }

  if (characterX + characterWidth > canvas.width - paddleWidth && characterY > paddle2Y && characterY < paddle2Y + paddleHeight) {
    characterSpeedX = -characterSpeedX;
  }

  paddle1Y = characterY - (paddleHeight / 2);
  paddle2Y = characterY - (paddleHeight / 2);

  drawCharacter();
  drawPaddle(0, paddle1Y);
  drawPaddle(canvas.width - paddleWidth, paddle2Y);
}

setInterval(draw, 10);

