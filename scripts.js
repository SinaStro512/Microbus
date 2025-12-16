let isMoving = false;
let offset = 0;
let bgOffset = 0;
let grassOffset = 0;

const character = document.getElementById('character')
const content = document.getElementById("content");
const grass = document.getElementById("grass");
const bg = document.getElementById('bg');
const interval = 200; //temps en millisecondes entre les grames d'animation
const duration = 3000; //temps en millisecondes entre les slides
const maxOffset = Math.round((1 - (content.offsetWidth / content.parentElement.offsetWidth)) * 100);
const increment = 100; //in %, distance between each slide
const bgIncrement = -2 //distance the bg has to travel between slides
const grassIncrement = 20; //distance the grass has to travel between slides

const walkRightFrames = [
  'images/walkRight1.png',
  'images/idleRight.png',
  'images/walkRight2.png',
  'images/idleRight.png'
];

const walkLeftFrames = [
  'images/walkLeft1.png',
  'images/idleLeft.png',
  'images/walkLeft2.png',
  'images/idleLeft.png'
];

const goBackFrames = [
  'images/goBack1.png',
  'images/goBack2.png',
  'images/goBack3.png',
  'images/goBack4.png'
];

const runRightFrames = [
  'images/runRight1.png',
  'images/runRight2.png',
  'images/runRight1.png',
  'images/runRight3.png'
];

content.style.transition = `margin-left ${duration}ms linear`;
grass.style.transition = `margin-left ${duration}ms linear`;
bg.style.transition = `margin-left ${duration}ms linear`;
document.body.style.transition = `background-position ${duration}ms linear`;

function animate(frames) {
  let index = 0;
  let frameCount = 0;

  isMoving = setInterval(() => {
    character.src = frames[index];
    index = (index + 1) % frames.length;
    frameCount++;
    
    if (frames === goBackFrames) {
      if (frameCount >= frames.length) {
      clearInterval(isMoving);
      isMoving = false;
    }
    }
  }, interval)
}

function move(direction) {
  if (direction === 'right') {
    offset -= increment;
    grassOffset -= grassIncrement;
    bgOffset += bgIncrement;
  } else if (direction === 'left') {
    offset += increment;
    grassOffset += grassIncrement;
    bgOffset -= bgIncrement;
  }
  content.style.marginLeft = offset + '%';
  grass.style.marginLeft = grassOffset + '%';
  bg.style.marginLeft = bgOffset + '%';
}

// function move(direction) {
//   if (direction === 'right') {
//     offset -= increment;
//     grassOffset -= grassIncrement;
//     bgOffset += bgIncrement;
//   } else if (direction === 'left') {
//     offset += increment;
//     grassOffset += grassIncrement;
//     bgOffset -= bgIncrement;
//   }
  
//   // Use transform instead of margin
//   content.style.transform = `translateX(${offset}%)`;
//   grass.style.transform = `translateX(${grassOffset}%)`;
//   bg.style.transform = `translateX(${bgOffset}%)`;
// }

function stop() {
  clearInterval(isMoving);
  isMoving = false;
  character.src = 'images/back.png';
}

function walkRight() {
  animate(walkRightFrames);
  setTimeout(() => {
    move('right')
  }, interval);
  setTimeout(() => {
    stop();
  }, duration + interval);
}

function walkLeft() {
  animate(walkLeftFrames);
  setTimeout(() => {
    move('left')
  }, interval);
  setTimeout(() => {
    stop();
  }, duration + interval);
}

function goBack() {
  animate(goBackFrames);
  setTimeout(() => {
    window.location.href = 'index.html';
  }, interval * goBackFrames.length + 500);
}

document.addEventListener('keydown', e => {
  if (isMoving !== false) return; // empêche les répétitions

  if (e.key === 'ArrowRight' || e.key === ' ') {
    if (offset === maxOffset) {
      goBack();
      return;
    }
    walkRight();
  }
  if (e.key === 'ArrowLeft') {
    if (offset === 0) return;

    walkLeft();
  }
  if (e.key === 'ArrowUp') {
    character.src = 'images/back.png';
  }
  if (e.key === 'ArrowDown') {
    character.src = 'images/front.png';
  }
  if (e.key === 'Enter') {
		goBack();
  }
});