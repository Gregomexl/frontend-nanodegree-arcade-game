var gameWidth = 400;
var gameHeight = 400;
var scoreCounter = 0;
var livesCounter = 3;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.yPos = [50, 130, 225]; 
    this.height = 50;
    this.width = 50;
    this.speed = Math.floor(Math.random() * (300 - 200)) + 200;
}
 
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks   
Enemy.prototype.update = function(dt) {
     // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

//detects collision with player
    if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.height + this.y > player.y) {
        player.reset();
        livesCounter--;
    }

    if (this.x > gameWidth + 100){
        this.reset();
    }
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/* respawns enemy outside of the canvas edge 
at a randomly generated y position */
Enemy.prototype.reset = function() {
    this.x = -100;
    this.y = this.yPos[Math.floor(Math.random() * this.yPos.length)];
}    

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.height = 50;
    this.width = 50;
    this.speed = 25;
}

Player.prototype.update = function() {
   if (this.y <= 3){
        this.reset();
        scoreCounter++;
    }

//Game Over message and resets the game
    if (livesCounter < 1){
        alert('Game Over');
        livesCounter = 3;
        scoreCounter = 0;
    }
}

 // Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    ctx.font = '30px Asap';
    ctx.textAlign = 'right';
    ctx.fillStyle= 'white';

    //Score Text
    ctx.fillText('Score:', 85, 85);
    ctx.fillText(scoreCounter, 60, 115);

    //Lives Text
    ctx.fillText('Lives:', 485, 85);
    ctx.fillText(livesCounter, 460, 115);
}

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
}

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            this.y = this.y - this.speed;
            break;
        case 'down':
            if (this.y < gameHeight) {
                this.y = this.y + this.speed;
            }
            break;
        case 'left':
            if (this.x > 0){
                this.x = this.x - this.speed;
            }
            break;
        case 'right':
            if (this.x < gameWidth){
            this.x = this.x + this.speed;    
            }
            break;
        default:
            console.log('Please select an arrow key')                          
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    enemy = new Enemy(), 
    enemy2 = new Enemy(), 
    enemy3 = new Enemy()
];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});