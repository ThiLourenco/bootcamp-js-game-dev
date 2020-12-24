const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const aliensImg = ['./img/monster-1.png', './img/monster-2.png', './img/monster-3.png']
const instructionsText = document.querySelector('.game-intro');
const startButtom = document.querySelector('.start-bottom');
let alienInterval;

// events moviments
let flyShip = (event) => {
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    moveUp();

  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    moveDown();

  } else if (event.key === ' ') {
    event.preventDefault();
    fireLaser();
  }
}

// fn move up
let moveUp = () => {
  let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
  if (topPosition === '0px') {
    return;

  } else {
    let position = parseInt(topPosition);
    position -= 50;
    yourShip.style.top = `${position}px`;
  }
}

// fn move down
let moveDown = () => {
  let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
  if (topPosition === '510px') {
    return;

  } else {
    let position = parseInt(topPosition);
    position += 50;
    yourShip.style.top = `${position}px`;
  }
}

// fn shooter
let fireLaser = () => {
  let laser = createLaserElement();
  playArea.appendChild(laser);
  moveLaser(laser);
}

let createLaserElement = () => {
  let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
  let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
  let newLaser = document.createElement('img');
  newLaser.src = './img/shoot.png'
  newLaser.classList.add('laser');
  newLaser.style.left = `${xPosition}px`;
  newLaser.style.top = `${yPosition - 10}px`;
  return newLaser;
}

let moveLaser = (laser) => {
  let laserInterval = setInterval(() => {
    let xPosition = parseInt(laser.style.left);
    let aliens = document.querySelectorAll('.alien');

    aliens.forEach((alien) => {
      if (checkLaserCollision(laser, alien)) {
        alien.src = './img/explosion.png';
        alien.classList.remove('alien');
        alien.classList.add('dead-alien');
      }
    });

    if (xPosition === 340) {
      laser.remove();

    } else {
      laser.style.left = `${xPosition + 8}px`
    }
  }, 10);
}

// fn create enemies random
let createAliens = () => {
  let newAlien = document.createElement('img');
  let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]
  newAlien.src = alienSprite;
  newAlien.classList.add('alien');
  newAlien.classList.add('alien-transition');
  newAlien.style.left = '370px';
  newAlien.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
  playArea.appendChild(newAlien);
  moveAlien(newAlien);
}

// fn move enemies
let moveAlien = (alien) => {
  let moveAlienInterval = setInterval(() => {
    let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));

    if (xPosition <= 50) {
      if (Array.from(alien.classList).includes('dead-alien')) {
        alien.remove();

      } else {
        gameOver();
      }

    } else {
      alien.style.left = `${xPosition - 4}px`;
    }
  }, 30);
}

// fn collision
let checkLaserCollision = (laser, alien) => {
  let laserTop = parseInt(laser.style.top);
  let laserLeft = parseInt(laser.style.left);
  let laserBottom = laserTop - 20;

  let alienTop = parseInt(alien.style.top);
  let alienLeft = parseInt(alien.style.left);
  let alienBottom = alienTop - 30;

  if (laserLeft != 340 && laserLeft + 40 >= alienLeft) {
    if (laserTop <= alienTop && laserTop >= alienBottom) {
      return true;

    } else {
      return false;
    }

  } else {
    return false;
  }
}

// start game
startButtom.addEventListener('click', (event) => {
  playGame();
});

let playGame = () => {
  startButtom.style.display = 'none';
  instructionsText.style.display = 'none';
  window.addEventListener('keydown', flyShip);
  alienInterval = setInterval(() => {
    createAliens();

  }, 2000);
}

// fn game over
let gameOver = () => {
  window.removeEventListener('keydown', flyShip);
  clearInterval(alienInterval);
  let aliens = document.querySelectorAll('.alien');
  aliens.forEach((alien) => alien.remove());
  let lasers = document.querySelectorAll('.laser');
  lasers.forEach((laser) => laser.remove());
  setTimeout(() => {
    alert('GAME OVER');
    yourShip.style.top = '250px';
    startButtom.style.display = 'block';
    instructionsText.style.display = 'block';
  });
}
