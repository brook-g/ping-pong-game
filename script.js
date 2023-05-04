const canvas = document.getElementById('pingPongCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 8;

let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 3;
let ballSpeedY = 2;

function drawBall() {
  ctx.font = '20px monospace';
  ctx.fillStyle = '#fff';
  ctx.fillText('⌐◨-◨', ballX - 10, ballY + 5);
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

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballX - ballRadius < paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballX + ballRadius > canvas.width - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }

  paddle1Y = ballY - (paddleHeight / 2);
  paddle2Y = ballY - (paddleHeight / 2);

  drawBall();
  drawPaddle(0, paddle1Y);
  drawPaddle(canvas.width - paddleWidth, paddle2Y);

  // Collision detection for paddles
  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    } else {
      // Player 2 scores a point
      ballReset();
    }
  }

  if (ballX > canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    } else {
      // Player 1 scores a point
      ballReset();
    }
  }
}

function ballReset() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
}

setInterval(draw, 10);

