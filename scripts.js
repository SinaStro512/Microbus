let walking = null;
const interval = 175;
let index = 0;
const character = document.getElementById('character')

function walkRight() {
	
  if (walking !== null) return; // If animation is already running, do nothing

  const images = [
    'images/character/walkRightOne.png',
    'images/character/idleRight.png',
    'images/character/walkRightTwo.png',
    'images/character/idleRight.png'
  ];

  walking = setInterval(() => {
    character.src = images[index];
    index = (index + 1) % images.length;
  }, interval);
}

function walkLeft() {
	
  if (walking !== null) return; // If animation is already running, do nothing

  const images = [
    'images/character/walkLeftOne.png',
    'images/character/idleLeft.png',
    'images/character/walkLeftTwo.png',
    'images/character/idleLeft.png'
  ];

  walking = setInterval(() => {
    character.src = images[index];
    index = (index + 1) % images.length;
  }, interval);
}

function stopWalk() {
  if (walking !== null) {
    clearInterval(walking);
    walking = null;
	index = 0;
  }

  // optional: set final frame
  document.getElementById('character').src = 'images/character/idleRight.png';
}

const content = document.getElementById("content");
let offset = 0; // in percent

// duration in ms (change this and everything updates automatically)
const duration = 5000;

// apply transition dynamically
content.style.transition = `margin-left ${duration}ms linear`;

document.addEventListener("keydown", e => {
  if (walking !== null) return;
	
  if (e.key === "ArrowRight") {
	walkRight();
	
    setTimeout(() => {
      offset -= 100;
      content.style.marginLeft = offset + "%";
    }, interval);
	
	setTimeout(() => {
    stopWalk();
    }, duration);
  }
  if (e.key === "ArrowLeft") {
	walkLeft();
	
    setTimeout(() => {
      offset += 100;
      content.style.marginLeft = offset + "%";
    }, interval);
	  
	setTimeout(() => {
    stopWalk();
    }, duration);
  }
});