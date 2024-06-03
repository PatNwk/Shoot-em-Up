
import Player from '../class/Player.js';
import Bullet from '../class/Bullet.js';
import Enemy from '../class/Enemy.js';
import Enemy2 from '../class/Enemy2.js';
import Boss from '../class/Boss.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const playerWidth = 150;
const playerHeight = 150;
let player;
let bullets = [];
let enemies = [];
let enemies2 = [];
let boss = [];
const enemyDeathheight = 200;
const enemyDeathwidth = 200;
const animationDuration = 500;
let gameOver = false; 
let win = false; 
let bossCreated = false;

const playerImage = new Image();
playerImage.src = '../img/output.png';

const enemiesImage = new Image();
enemiesImage.src = '../img/méchant.png';

const enemies2Image = new Image();
enemies2Image.src = '../img/méchant2.png';

const bossImage = new Image();
bossImage.src = '../img/IMG_6957.png';

const levels = [
    { score: 0, enemySpeed: 2, enemyHealth: 5, enemySpawnRate: 2000, enemy2SpawnRate: 5000 },
    { score: 300, enemySpeed: 3, enemyHealth: 15, enemySpawnRate: 1500, enemy2SpawnRate: 4000 },
    { score: 400, enemySpeed: 4, enemyHealth: 25, enemySpawnRate: 1000, enemy2SpawnRate: 3000 },
];

let currentLevel = 0;

function createPlayer() {
    const x = canvas.width / 2 - playerWidth / 2;
    const y = canvas.height - playerHeight - 10;
    const speed = 20;
    const playerlife = 10; 
    const maxLife = 10;    
    return new Player(x, y, playerWidth, playerHeight, speed, playerlife, maxLife);
}

function createBullet() {
    bullets.push(new Bullet(player.x + player.width / 2 - 2.5, player.y));
}

function createEnemy() {
    const enemyWidth = 70;
    const enemyHeight = 70;
    const enemyX = Math.random() * (canvas.width - enemyWidth);
    const enemyY = -enemyHeight;
    const enemySpeed = levels[currentLevel].enemySpeed;
    const enemyLife = levels[currentLevel].enemyHealth;
    const newEnemy = new Enemy(enemyX, enemyY, enemyWidth, enemyHeight, enemySpeed, enemyLife);
    enemies.push(newEnemy);
}

function createEnemy2() {
    const enemyWidth = 70;
    const enemyHeight = 70;
    const enemyX = Math.random() * (canvas.width - enemyWidth);
    const enemyY = -enemyHeight;
    const enemySpeed = levels[currentLevel].enemySpeed;
    const enemyLife = levels[currentLevel].enemyHealth;
    const newEnemy2 = new Enemy2(enemyX, enemyY, enemyWidth, enemyHeight, enemySpeed, enemyLife);
    enemies2.push(newEnemy2);
}

function createBoss() {
    const bossWidth = 200;
    const bossHeight = 200;
    const bossX = Math.random() * (canvas.width - bossWidth);
    const bossY = Math.random() * (canvas.height - bossHeight);
    const bossSpeed = levels[currentLevel].enemySpeed;
    const bossLife = 100; // Vie maximale du boss
    const newBoss = new Boss(bossX, bossY, bossWidth, bossHeight, bossSpeed, bossLife, canvas);
    boss.push(newBoss);
}



function checkLevelUp() {
    if (player.score >= levels[currentLevel + 1]?.score) {
        currentLevel++;
        clearInterval(enemyInterval);
        clearInterval(enemy2Interval);
        enemyInterval = setInterval(createEnemy, levels[currentLevel].enemySpawnRate);
        enemy2Interval = setInterval(createEnemy2, levels[currentLevel].enemy2SpawnRate);
    }
}

function playerTouchedByEnemy() {
    enemies.forEach((enemy) => {
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            player.playerlife--;
            enemies.splice(enemies.indexOf(enemy), 1); 
            if (player.playerlife <= 0) {
                gameOver = true; 
            }
        }
    });

    enemies2.forEach((enemy2) => {
        if (
            player.x < enemy2.x + enemy2.width &&
            player.x + player.width > enemy2.x &&
            player.y < enemy2.y + enemy2.height &&
            player.y + player.height > enemy2.y
        ) {
            player.playerlife= player.playerlife - 2;
            enemies2.splice(enemies2.indexOf(enemy2), 1); 
            if (player.playerlife <= 0) {
                gameOver = true; 
            }
        }
    });

    boss.forEach((boss) => {
        if (
            player.x < boss.x + boss.width &&
            player.x + player.width > boss.x &&
            player.y < boss.y + boss.height &&
            player.y + player.height > boss.y
        ) {
            player.playerlife = player.playerlife - 10; 
            if (player.playerlife <= 0) {
                gameOver = true; 
            }
        }
    });
}

function checkCollision3(bullet, boss) {
    if (
        bullet.x < boss.x + boss.width &&
        bullet.x + 5 > boss.x &&
        bullet.y < boss.y + boss.height &&
        bullet.y + 10 > boss.y
    ) {
        return true;
    }
    return false;
}

function checkCollision(bullet, enemy) {
    if (
        bullet.x < enemy.x + enemy.width &&
        bullet.x + 5 > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + 10 > enemy.y
    ) {
        return true;
    }
    return false;
}

function checkCollision2(bullet, enemy2) {
    if (
        bullet.x < enemy2.x + enemy2.width &&
        bullet.x + 5 > enemy2.x &&
        bullet.y < enemy2.y + enemy2.height &&
        bullet.y + 10 > enemy2.y
    ) {
        return true;
    }
    return false;
}

function drawDeathAnimation(x, y) {
    const deathFrames = [];
    for (let i = 1; i <= 6; i++) {
        const frame = new Image();
        frame.src = `../img/frame-${i}.gif`;
        deathFrames.push(frame);
    }

    const frameDuration = animationDuration / deathFrames.length;
    let frameIndex = 0;

    function animateFrame() {
        if (frameIndex < deathFrames.length) {
            ctx.clearRect(x, y, enemyDeathwidth, enemyDeathheight);
            ctx.drawImage(deathFrames[frameIndex], x - (enemyDeathwidth / 2), y - (enemyDeathheight / 2), enemyDeathwidth, enemyDeathheight);
            frameIndex++;
            setTimeout(() => {
                requestAnimationFrame(animateFrame);
            }, frameDuration);
        } else {
            ctx.clearRect(x - (enemyDeathwidth / 2), y - (enemyDeathheight / 2), enemyDeathwidth, enemyDeathheight);
        }
    }

    animateFrame();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameOver) {
        localStorage.setItem('playerScore', player.score); 
        localStorage.setItem('playerLevel', player.currentLevel);
        window.location.href = 'gameover.html';
        return;
    }

    if (win) {
        localStorage.setItem('playerScore', player.score);
        localStorage.setItem('playerLevel', currentLevel);
        window.location.href = 'win.html';
        return;
    }

    if (!player) {
        player = createPlayer();
    }

    player.update(canvas);
    player.draw(ctx, playerImage);

    bullets.forEach((bullet) => {
        bullet.update();
        bullet.draw(ctx);
    });

    bullets = bullets.filter((bullet) => bullet.y > 0);

    enemies.forEach((enemy) => {
        enemy.update();
        enemy.draw(ctx, enemiesImage);
    });

    enemies2.forEach((enemy2) => {
        enemy2.update();
        enemy2.draw(ctx, enemies2Image);
    });

    boss.forEach((boss) => {
        boss.update();
        boss.draw(ctx, bossImage);
    });

    enemies.forEach((enemy) => {
        bullets.forEach((bullet) => {
            if (checkCollision(bullet, enemy)) {
                player.score += enemy.points;
                enemy.currentLife--;
                if (enemy.currentLife <= 0) {
                    drawDeathAnimation(enemy.x + (enemy.width / 2), enemy.y + (enemy.height / 2));
                    enemies.splice(enemies.indexOf(enemy), 1);
                }
            }
        });
    });

    enemies2.forEach((enemy2) => {
        bullets.forEach((bullet) => {
            if (checkCollision2(bullet, enemy2)) {
                player.score += enemy2.points;
                enemy2.currentLife--;
                if (enemy2.currentLife <= 0) {
                    drawDeathAnimation(enemy2.x + (enemy2.width / 2), enemy2.y + (enemy2.height / 2));
                    enemies2.splice(enemies2.indexOf(enemy2), 1);
                }
            }
        });
    });

    boss.forEach((boss) => {
        bullets.forEach((bullet) => {
            if (checkCollision3(bullet, boss)) {
                boss.currentLife--; // Boss prend des dégâts
                if (boss.currentLife <= 0) {
                    win = true;
                }
            }
        });
    });

    bullets = bullets.filter((bullet) => bullet.y > 0);

    if (player.score >= 2000 && !bossCreated) {
        createBoss();
        bossCreated = true;
    }

    for (let i = 0; i < 1000; i++) {
        const radius = Math.random() * 2;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = `rgba(255, 255, 255, ${Math.random() * 0.5})`;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }

    playerTouchedByEnemy();

    checkLevelUp(); 

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Life: ${player.playerlife}`, 10, 30);
    ctx.fillText(`Score: ${player.score}`, 10, 60);
    ctx.fillText(`Level: ${currentLevel}`, 10, 90);

    requestAnimationFrame(gameLoop);
}


playerImage.onload = () => {
    enemiesImage.onload = () => {
        enemies2Image.onload = () => {
            bossImage.onload = () => {
                gameLoop();
            };
        };
    };
};

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && player.x > 0) {
        player.speedX = -player.speed;
    } else if (event.key === 'ArrowRight' && player.x < canvas.width - player.width) {
        player.speedX = player.speed;
    } else if (event.key === 'ArrowUp' && player.y > 0) {
        player.speedY = -player.speed;
    } else if (event.key === 'ArrowDown' && player.y < canvas.height - player.height) {
        player.speedY = player.speed;
    } else if (event.key === ' ') {
        createBullet();
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        player.speedX = 0;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        player.speedY = 0;
    }
});

let enemyInterval = setInterval(createEnemy, levels[currentLevel].enemySpawnRate);
let enemy2Interval = setInterval(createEnemy2, levels[currentLevel].enemy2SpawnRate); 
