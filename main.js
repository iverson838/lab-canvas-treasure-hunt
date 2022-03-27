const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

// Iteration 1: Drawing the Grid
function drawGrid() {
  for (let x = 0.5; x < 500; x += 50) {
    context.moveTo(x, 0);
    context.lineTo(x, 500);

    for (let y = 0.5; y < 500; y += 50) {
      context.moveTo(0, y);
      context.lineTo(500, y);
    }
  }

  context.stroke();
}

// Iteration 2: The Character Class

class Character {
  constructor(col, row) {
    this.col = col;
    this.row = row;
    this.direction = 'down';
  }
  moveUp() {
    if (this.row < 1) {
      return 0;
    } else {
    }
    this.row--;
    this.direction = 'up';
  }
  moveRight() {
    if (this.col > 8) {
      return 9;
    } else {
    }
    this.col++;
    this.direction = 'right';
  }
  moveDown() {
    if (this.row > 8) {
      return 9;
    } else {
    }
    this.row++;
    this.direction = 'down';
  }

  moveLeft() {
    if (this.col < 1) {
      return 0;
    } else {
    }
    this.col--;
    this.direction = 'left';
  }
}

const player = new Character(0, 0);

// Iteration 3: Drawing the Player

function drawPlayer() {
  const playerImage = new Image();
  playerImage.src = '/images/character-' + player.direction + '.png';
  playerImage.onload = () => {
    context.drawImage(playerImage, player.col * 50, player.row * 50, 50, 50);
  };
}

// Iteration 4: The Treasure Class

class Treasure {
  constructor() {}

  setRandomPosition() {
    this.col = Math.floor(Math.random() * 10);
    this.row = Math.floor(Math.random() * 10);
  }
}

const treasure = new Treasure();
treasure.setRandomPosition();

function drawTreasure() {
  const treasureImage = new Image();
  treasureImage.src = '/images/treasure.png';

  treasureImage.onload = () => {
    context.drawImage(
      treasureImage,
      treasure.col * 50,
      treasure.row * 50,
      50,
      50
    );
  };
}

// Iteration 5: React to player input

window.addEventListener('keydown', (event) => {
  // Stop the default behavior (moving the screen to the left/up/right/down)
  event.preventDefault();

  // React based on the key pressed
  switch (event.keyCode) {
    case 37:
      console.log('left');
      player.moveLeft();
      break;
    case 38:
      console.log('up');
      player.moveUp();
      break;
    case 39:
      console.log('right');
      player.moveRight();
      break;
    case 40:
      console.log('down');
      player.moveDown();
      break;
  }
  drawEverything();

  if (player.row === treasure.row && player.col === treasure.col) {
    treasure.setRandomPosition();
    alert('Game Over');
  }
});

function drawEverything() {
  context.clearRect(0, 0, 500, 500);
  drawGrid();
  drawPlayer();
  drawTreasure();
}

drawEverything();
