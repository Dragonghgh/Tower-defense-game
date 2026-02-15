const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let enemies = [];
let towers = [];

// Example enemy
class Enemy {
  constructor(x, y, speed, health) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.health = health;
  }
  
  move() {
    this.x += this.speed; // Simple rightward movement
  }
  
  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, 20, 20);
  }
}

// Example tower
class Tower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.range = 100;
    this.fireRate = 30;
    this.counter = 0;
  }

  shoot(enemy) {
    // Simple shooting logic
    if (this.counter >= this.fireRate) {
      enemy.health -= 10;
      this.counter = 0;
    }
    this.counter++;
  }

  draw() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.x, this.y, 30, 30);
  }
}

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Update enemies
  enemies.forEach((e, i) => {
    e.move();
    e.draw();
    if (e.health <= 0) enemies.splice(i, 1);
  });

  // Update towers
  towers.forEach(t => {
    enemies.forEach(e => t.shoot(e));
    t.draw();
  });

  requestAnimationFrame(gameLoop);
}

// Initialize
enemies.push(new Enemy(0, 200, 1, 50));
towers.push(new Tower(400, 200));
gameLoop();
