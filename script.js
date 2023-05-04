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

canvas.addEventListener('mousemove', (e) => {
  const { top } = canvas.getBoundingClientRect();
  paddle1Y = e.clientY - top - paddleHeight / 2;
});

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

function aiPaddleMovement() {
  const paddle2Center = paddle2Y + (paddleHeight / 2);
  if (paddle2Center < ballY - 35) {
    paddle2Y += 2;
  } else if (paddle2Center > ballY + 35) {
    paddle2Y -= 2;
  }
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
    ballSpeedX = -ballSpeedX * 1.1; //Increase speed by 10%
  }

  if (ballX + ballRadius > canvas.width - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
    ballSpeedX = -ballSpeedX * 1.1; //Increase speed by 10%
  }

  aiPaddleMovement();

  drawBall();
  drawPaddle(0, paddle1Y);
  drawPaddle(canvas.width - paddleWidth, paddle2Y);
}

setInterval(draw, 10);

const toggleThemeButton = document.getElementById('toggleTheme');

toggleThemeButton.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

