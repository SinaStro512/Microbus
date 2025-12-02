function walkRight() {
  const images = ['images/character/walkRightOne.png', 'images/character/idleRight.png', 'images/character/walkRightTwo.png', 'images/character/idleRight.png'];
  const interval = 175;
  let index = 0;
  const frame = document.getElementById('character');

  setInterval(() => {
    frame.src = images[index];
    index = (index + 1) % images.length;
  }, interval);
}

function walkLeft() {
  const images = ['images/character/walkLeftOne.png', 'images/character/idleLeft.png', 'images/character/walkLeftTwo.png', 'images/character/idleLeft.png'];
  const interval = 175;
  let index = 0;
  const frame = document.getElementById('character');

  setInterval(() => {
    frame.src = images[index];
    index = (index + 1) % images.length;
  }, interval);
}

const container = document.getElementById("content");
let offset = 0; // in percent

// duration in ms (change this and everything updates automatically)
const duration = 10000;

// apply transition dynamically
container.style.transition = `margin-left ${duration}ms`;

document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") {
	offset -= 100;
	walkRight();
  }
  if (e.key === "ArrowLeft") {
	offset += 100;
	walkLeft();
  }
  container.style.marginLeft = offset + "%";
});