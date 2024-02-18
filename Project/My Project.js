const gameArea = document.getElementById('gameArea');
let snake = [{x: 200, y: 200}];
let food = {x: 0, y: 0};
let dx = 0;
let dy = 0;

function drawSnake() {
  const snakeElements = document.querySelectorAll('.snake');
  snakeElements.forEach(element => element.remove());

  snake.forEach(segment => {
    const snakeSegment = document.createElement('div');
    snakeSegment.classList.add('snake');
    snakeSegment.style.left = segment.x + 'px';
    snakeSegment.style.top = segment.y + 'px';
    gameArea.appendChild(snakeSegment);
  });
}

function drawFood() {
  if (foodElement) foodElement.remove();

  const foodElement = document.createElement('div');
  foodElement.classList.add('food');
  foodElement.style.left = food.x + 'px';
  foodElement.style.top = food.y + 'px';
  gameArea.appendChild(foodElement);
}

function generateFood() {
  const x = Math.floor(Math.random() * 39) * 10;
  const y = Math.floor(Math.random() * 39) * 10;
  food = {x, y};
  drawFood();
}

function updateSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    generateFood();
  } else {
    snake.pop();
  }

  drawSnake();
}

function handleKeyPress(event) {
  switch (event.key) {
    case 'ArrowUp':
      dx = 0;
      dy = -10;
      break;
    case 'ArrowDown':
      dx = 0;
      dy = 10;
      break;
    case 'ArrowLeft':
      dx = -10;
      dy = 0;
      break;
    case 'ArrowRight':
      dx = 10;
      dy = 0;
      break;
  }
}

document.addEventListener('keydown', handleKeyPress);

generateFood();
setInterval(updateSnake, 100);
