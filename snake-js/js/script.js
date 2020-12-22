// background
let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;

// snake
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box
}

// moves
let direction = 'right';

function createBackground() {
  context.fillStyle = 'lightgreen';
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
  for(i=0; i < snake.length; i++) {
    context.fillStyle = 'green';
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function startGame() {
  createBackground();
  createSnake();

  // snake coords position
  let snakePosX = snake[0].x;
  let snakePosY = snake[0].y;

  if (direction === 'right') snakePosX += box;
  if (direction === 'left') snakePosX -= box;
  if (direction === 'up') snakePosY -= box;
  if (direction === 'down') snakePosY += box;
  
  snake.pop();

  // snake head
  let newHead = {
    x: snakePosX,
    y: snakePosY
  }
  
  snake.unshift(newHead);

}

// refresh game
let game = setInterval(startGame, 100);