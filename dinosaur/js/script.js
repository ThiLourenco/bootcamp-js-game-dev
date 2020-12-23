const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;

let handleKeyUp = (event) => {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

let jump = () => {
  let position = 0;
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;

        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

let createCactus = () => {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;

  cactus.classList.add('cactus');
  cactus.style.left = 1000 + 'px';
  background.appendChild(cactus);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);